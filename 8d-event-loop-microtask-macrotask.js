/**
 * EVENT LOOP VISUAL LAB
 * Run in:
 *  - Browser DevTools (best for rendering insights)
 *  - Node.js (best for queue ordering differences)
 */

const log = (msg) => {
  console.log(`${Date.now()} | ${msg}`);
};

/* ---------------------------
   1. BASIC ORDERING MODEL
----------------------------*/

log("SCRIPT START (macrotask: initial execution)");

setTimeout(() => {
  log("MACROTASK: setTimeout 0");
}, 0);

setTimeout(() => {
  log("MACROTASK: setTimeout 1");
}, 0);

Promise.resolve().then(() => {
  log("MICROTASK: Promise.then 1");
});

Promise.resolve().then(() => {
  log("MICROTASK: Promise.then 2");
});

queueMicrotask(() => {
  log("MICROTASK: queueMicrotask");
});

log("SCRIPT END");

/*
EXPECTED ORDER (browser & Node generally):
1. SCRIPT START
2. SCRIPT END
3. MICROTASK: Promise.then 1
4. MICROTASK: Promise.then 2
5. MICROTASK: queueMicrotask
6. MACROTASK: setTimeout 0
7. MACROTASK: setTimeout 1
*/


/* ---------------------------
   2. MICROTASK STARVATION
   (important conceptual trap)
----------------------------*/

function microtaskStarvationDemo() {
  log("START STARVATION DEMO");

  let count = 0;

  function loop() {
    Promise.resolve().then(() => {
      count++;
      log(`MICROTASK LOOP ${count}`);

      // 🔥 This prevents macrotasks/rendering from running
      if (count < 5) loop();
    });
  }

  loop();

  setTimeout(() => {
    log("MACROTASK: This is delayed until microtasks drain");
  }, 0);
}

// Uncomment to observe starvation:
// microtaskStarvationDemo();


/* ---------------------------
   3. RENDERING PHASE (Browser only)
----------------------------*/

/**
 * In browsers:
 * - After macrotask completes
 * - AND microtasks are fully drained
 * - THEN rendering happens
 */

function renderingObservationDemo() {
  const box = document.createElement("div");
  box.style.width = "100px";
  box.style.height = "100px";
  box.style.background = "red";
  document.body.appendChild(box);

  log("DOM updated (red box added)");

  setTimeout(() => {
    box.style.background = "green";
    log("MACROTASK: changed color to green (render will batch after task)");
  }, 0);

  Promise.resolve().then(() => {
    log("MICROTASK: runs BEFORE paint");
  });
}

// Only run in browser:
// renderingObservationDemo();


/* ---------------------------
   4. NODE vs BROWSER DIFFERENCE
----------------------------*/

function nodeVsBrowserNotes() {
  log("=== NODE vs BROWSER EVENT LOOP ===");

  /*
    BROWSER:
    - Microtasks: Promise.then, queueMicrotask
    - Macrotasks: setTimeout, DOM events, IO (abstracted)
    - Rendering happens between macrotasks

    NODE:
    - Macrotask phases:
        timers → poll → check → close callbacks
    - Microtasks:
        process.nextTick (HIGHEST PRIORITY in Node)
        Promise microtasks
  */

  Promise.resolve().then(() => {
    log("MICROTASK: Promise.then (Node & Browser)");
  });

  setTimeout(() => {
    log("MACROTASK: setTimeout (timers phase in Node)");
  }, 0);

  if (typeof process !== "undefined") {
    process.nextTick(() => {
      log("⚠️ NODE-ONLY MICROTASK: process.nextTick (runs before Promise microtasks)");
    });
  }
}

// nodeVsBrowserNotes();


/* ---------------------------
   5. PRIORITY TRUTH TABLE
----------------------------*/

/**
Execution priority (simplified):

BROWSER:
1. Sync code
2. Microtasks (Promise, queueMicrotask)
3. Rendering
4. Macrotask (setTimeout, events)

NODE:
1. Sync code
2. process.nextTick queue
3. Promise microtasks
4. Timers phase (setTimeout)
5. I/O callbacks
6. check (setImmediate)
*/

log("🎯 Load complete. Uncomment experiments to explore.");
