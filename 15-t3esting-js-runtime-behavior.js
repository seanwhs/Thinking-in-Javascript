/**
 * File: runtime-lab-kit.js
 * Description: A diagnostic utility for exploring JavaScript runtime behaviors, 
 * including Garbage Collection (GC) tracking, event loop lag, and layout thrashing.
 */
(function RuntimeLabKit() {
  // Prevent duplicate initialization if the script is injected multiple times
  if (globalThis.__RUNTIME_LAB__) return;

  // Initialize the core library object and expose it globally
  const LAB = {};
  globalThis.__RUNTIME_LAB__ = LAB;

  // Clear the console and print a clean initialization message
  console.clear();
  console.log(
    "%c🧪 Runtime Lab Kit Initialized",
    "background:#2e7d32;color:white;padding:4px 8px;font-weight:bold;"
  );

  // =========================================================
  // 🧠 MEMORY LAB
  // Utility for monitoring Garbage Collection behavior.
  // =========================================================
  LAB.memory = {
    // FinalizationRegistry triggers a callback when an object held in memory is garbage collected.
    // Note: The timing of this callback is non-deterministic and relies entirely on the browser's engine.
    registry: new FinalizationRegistry((label) => {
      console.group("%c♻️ GC EVENT", "color:#2e7d32;font-weight:bold;");
      console.log(`Collected: ${label}`);
      console.groupEnd();
    }),

    /**
     * Registers an object to be tracked by the FinalizationRegistry.
     * @param {Object} obj - The targeted object to monitor for memory release.
     * @param {string} label - A friendly identifier printed when the object is reallocated.
     */
    track(obj, label = "object") {
      // FinalizationRegistry only accepts objects (primitives cannot be tracked)
      if (!obj || typeof obj !== "object") {
        console.warn("Memory Lab: only objects supported");
        return obj;
      }

      // Register the object. It holds a weak reference to 'obj' so it won't prevent GC.
      this.registry.register(obj, label);

      console.group("%c👀 Memory Tracking Active", "color:#0288d1;font-weight:bold;");
      console.log("Label:", label);
      console.log("Step 1: assign object");
      console.log("Step 2: null reference");
      console.log("Step 3: run GC manually in DevTools");
      console.groupEnd();

      return obj;
    }
  };

  // =========================================================
  // ⚡ EVENT LOOP LAB
  // Tools to analyze main thread responsiveness and execution blocking.
  // =========================================================
  LAB.eventLoop = {
    /**
     * Measures how long a setTimeout(..., 0) macro-task is delayed.
     * High lag values imply that other operations are monopolizing the event loop.
     */
    measureLag() {
      const start = performance.now();

      setTimeout(() => {
        const lag = performance.now() - start;

        // An ideal event loop fires the timeout almost instantly. 
        // Anything above 10ms usually points to heavy main thread activity.
        if (lag > 10) {
          console.group("%c⏳ EVENT LOOP LAG", "color:#f57c00;font-weight:bold;");
          console.log(`Lag detected: ${lag.toFixed(2)}ms`);
          console.log("Main thread was blocked or delayed.");
          console.groupEnd();
        }
      }, 0);
    },

    /**
     * Artificially chokes the browser's main thread using a synchronous while-loop.
     * Use this to simulate CPU-heavy code and test UI responsiveness.
     * @param {number} ms - The total duration in milliseconds to freeze the thread.
     */
    block(ms = 150) {
      console.log("%c🧪 Blocking main thread...", "color:#7b1fa2;font-weight:bold;");
      const start = Date.now();
      // Synchronous spin-lock that keeps the main thread entirely busy
      while (Date.now() - start < ms) {}
    }
  };

  // =========================================================
  // 🎨 RENDERING / LAYOUT LAB (SAFE SCOPED VERSION)
  // Demonstrates layout thrashing (forced synchronous layout).
  // =========================================================
  LAB.render = {
    /**
     * Iteratively reads DOM geometry properties right before altering the DOM.
     * This forces the engine to recalculate layout mid-loop instead of batching updates.
     */
    runLayoutThrash({
      iterations = 3,
      nodes = 50,
      mode = "standard"
    } = {}) {
      console.log("%c🧪 Layout Thrash Lab", "color:#7b1fa2;font-weight:bold;");

      // Set up a isolated wrapper element in the DOM to avoid breaking existing styles
      const root = document.createElement("div");
      root.style.border = "2px solid red";
      root.style.padding = "8px";
      root.textContent = "LAB ROOT";
      document.body.appendChild(root);

      const els = [];

      // Generate the sample elements for testing
      for (let i = 0; i < nodes; i++) {
        const el = document.createElement("div");
        el.textContent = `node-${i}`;
        root.appendChild(el);
        els.push(el);
      }

      // Execute the layout thrashing loop
      for (let i = 0; i < iterations; i++) {
        console.group(`Iteration ${i + 1}`);

        // READ PHASE: Requesting 'offsetHeight' forces the browser to calculate layout immediately 
        // if any styling changes are pending.
        const sizes = els.map(el => el.offsetHeight);

        console.log("Read phase complete", sizes.slice(0, 5));

        // WRITE PHASE: Modifying the DOM invalidates the current layout, ensuring that the 
        // subsequent iteration's READ phase triggers a forced recalculation.
        els.forEach((el, idx) => {
          el.innerHTML =
            mode === "extreme"
              ? `X-${i}-${idx}-${Date.now()}`
              : `updated-${i}-${idx}`;
        });

        console.log("Write phase complete");
        console.groupEnd();
      }

      // Self-cleaning step: safely remove the generated lab nodes after 1 second
      setTimeout(() => root.remove(), 1000);
    }
  };

  // =========================================================
  // 🧭 LAB CONTROLLER API
  // Simplifies access to individual lab sub-modules.
  // =========================================================
  LAB.run = function (name, config) {
    if (name === "memory") return LAB.memory;
    if (name === "eventLoop") return LAB.eventLoop;
    if (name === "render") return LAB.render;

    console.warn("Unknown lab:", name);
  };

  /**
   * Outputs the interactive usage guide directly to the developer console.
   */
  LAB.help = function () {
    console.log(`
🧪 LAB COMMANDS

Memory:
  __RUNTIME_LAB__.memory.track(obj, "label")

Event Loop:
  __RUNTIME_LAB__.eventLoop.block(150)
  __RUNTIME_LAB__.eventLoop.measureLag()

Rendering:
  __RUNTIME_LAB__.render.runLayoutThrash()

Controller:
  __RUNTIME_LAB__.run("memory")
  __RUNTIME_LAB__.run("render")
`);
  };

  // Print a helpful welcome directive for incoming interactive sessions
  console.log(
    "%c🧪 Type __RUNTIME_LAB__.help() to begin",
    "background:#455a64;color:white;padding:6px;font-family:monospace;"
  );
})();
