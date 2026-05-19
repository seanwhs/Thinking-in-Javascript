/**
 * RENDERING PIPELINE LAB
 * DOM → Style → Layout → Paint → Composite
 *
 * Run in Chrome DevTools (Performance tab recommended)
 */

const log = (msg) => console.log(`${performance.now().toFixed(2)}ms | ${msg}`);


/* -----------------------------------------
   1. BASELINE PIPELINE INTUITION
------------------------------------------*/

function baselineRenderCycle() {
  const box = document.createElement("div");

  box.style.width = "100px";
  box.style.height = "100px";
  box.style.background = "red";

  document.body.appendChild(box);

  log("DOM updated (triggers style → layout → paint → composite)");

  requestAnimationFrame(() => {
    log("🟢 rAF: before paint (safe place to read/write layout)");
    box.style.background = "green";
  });
}

// baselineRenderCycle();


/* -----------------------------------------
   2. REPAINT VS REFLOW DEMO
------------------------------------------*/

function repaintVsReflow() {
  const box = document.createElement("div");
  box.style.width = "100px";
  box.style.height = "100px";
  box.style.background = "blue";
  box.style.position = "absolute";

  document.body.appendChild(box);

  log("Initial render complete");

  // 🔥 Repaint only (no layout change)
  setTimeout(() => {
    box.style.background = "orange";
    log("Repaint only (color change)");
  }, 500);

  // 🔥 Reflow (layout change)
  setTimeout(() => {
    box.style.width = "300px";
    log("Reflow triggered (layout invalidation)");
  }, 1000);
}

// repaintVsReflow();


/* -----------------------------------------
   3. LAYOUT THRASHING (THE KILLER BUG)
------------------------------------------*/

function layoutThrashingDemo() {
  const box = document.createElement("div");
  box.style.width = "100px";
  box.style.height = "100px";
  box.style.background = "purple";

  document.body.appendChild(box);

  log("Starting layout thrash loop");

  for (let i = 0; i < 1000; i++) {
    // ❌ READ layout
    const width = box.offsetWidth;

    // ❌ WRITE layout (invalidates style + layout)
    box.style.width = width + 1 + "px";
  }

  log("Finished (forced synchronous layout pipeline 1000x)");
}

// layoutThrashingDemo();


/* -----------------------------------------
   4. FIXED VERSION (BATCHED LAYOUT)
------------------------------------------*/

function layoutThrashingFixed() {
  const box = document.createElement("div");
  box.style.width = "100px";
  box.style.height = "100px";
  box.style.background = "green";

  document.body.appendChild(box);

  log("Starting optimized batch update");

  let width = box.offsetWidth;

  // ✅ write once, not inside loop
  let newWidth = width;

  for (let i = 0; i < 1000; i++) {
    newWidth += 1;
  }

  box.style.width = newWidth + "px";

  log("Single layout invalidation (optimized)");
}

// layoutThrashingFixed();


/* -----------------------------------------
   5. SCROLL PERFORMANCE DEGRADATION
------------------------------------------*/

function scrollJankDemo() {
  const container = document.createElement("div");
  container.style.height = "2000px";
  document.body.appendChild(container);

  const box = document.createElement("div");
  box.style.width = "50px";
  box.style.height = "50px";
  box.style.background = "red";
  box.style.position = "fixed";
  box.style.top = "10px";

  document.body.appendChild(box);

  window.addEventListener("scroll", () => {
    // ❌ Forces layout on every scroll tick
    const top = container.getBoundingClientRect().top;

    box.style.transform = `translateY(${Math.abs(top)}px)`;

    log("Scroll handler executed (potential jank)");
  });
}

// scrollJankDemo();


/* -----------------------------------------
   6. rAF-SYNCED ANIMATION (GOOD PATTERN)
------------------------------------------*/

function smoothAnimation() {
  const box = document.createElement("div");

  box.style.width = "50px";
  box.style.height = "50px";
  box.style.background = "cyan";
  box.style.position = "absolute";

  document.body.appendChild(box);

  let x = 0;

  function animate() {
    // ✅ synced with paint cycle
    x += 2;
    box.style.transform = `translateX(${x}px)`;

    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);

  log("Smooth GPU-friendly animation started");
}

// smoothAnimation();


/* -----------------------------------------
   7. GPU COMPOSITING LAYERS INSIGHT
------------------------------------------*/

function gpuLayerDemo() {
  const box = document.createElement("div");

  box.style.width = "100px";
  box.style.height = "100px";
  box.style.background = "pink";

  // 🚀 promote to compositor layer
  box.style.willChange = "transform";

  document.body.appendChild(box);

  let i = 0;

  requestAnimationFrame(function move() {
    i += 2;

    // ✅ only composite step (no layout / paint)
    box.style.transform = `translateX(${i}px)`;

    requestAnimationFrame(move);
  });

  log("GPU composited animation (no layout/paint)");
}

// gpuLayerDemo();


/* -----------------------------------------
   8. DIAGNOSTIC: DETECTING JANK
------------------------------------------*/

function jankDetector() {
  let last = performance.now();

  function frame(now) {
    const delta = now - last;

    if (delta > 16.7) {
      log(`⚠️ JANK detected: ${delta.toFixed(2)}ms frame`);
    }

    last = now;
    requestAnimationFrame(frame);
  }

  requestAnimationFrame(frame);
}

// jankDetector();


/* -----------------------------------------
   ENTRY POINT
------------------------------------------*/

log("Rendering Pipeline Lab loaded");
log("Uncomment a demo to observe DOM → Style → Layout → Paint → Composite behavior");
