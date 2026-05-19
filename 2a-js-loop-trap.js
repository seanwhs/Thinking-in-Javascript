/**
 * TEACHING LESSON: Demystifying the JavaScript Loop Trap
 * 
 * To run this script:
 *   Node.js:  node loop_trap_lesson.js
 *   Browser:  Copy and paste this into your DevTools Console.
 * 
 * This file is structured as an interactive lesson exploring the mechanics
 * of the Event Loop, Scope Environments, and Closures.
 */

// Simple visual separators for our terminal output
const separator = () => console.log("-".repeat(60));
const heading = (title) => { console.log(`\n=== ${title.toUpperCase()} ===`); separator(); };

/**
 * LESSON 1: The 'var' Approach (The Shared Scope Trap)
 * 
 * Watch what happens when we use 'var'. Because 'var' ignores block boundaries,
 * JavaScript allocates exactly ONE memory slot for the variable 'i'.
 */
function runVarExperiment() {
  heading("Starting Experiment 1: The 'var' Loop");
  console.log("[Engine]: Initializing loop with 'var i = 0'...");

  // We keep a manual reference to show you what happens behind the scenes in memory
  // In a real 'var' scenario, this variable attaches to the enclosing function scope.
  for (var i = 0; i < 3; i++) {
    
    // Capture the current loop iteration index
    const currentIteration = i;
    console.log(`[Loop]: Ticking... i is currently ${i}. Registering Timer #${i} with Web API.`);

    setTimeout(() => {
      console.log(`\n[Callback Fired!]: Timer wakes up after 1000ms.`);
      console.log(`  -> Closure Check: This callback looks back at the shared scope.`);
      console.log(`  -> Current value of shared variable 'i' in memory is: ${i}`);
      console.log(`  -> OUTPUT: Iteration ${i} -`);
    }, 1000);
  }

  // --- SYNCHRONOUS COAL-FACE ---
  // The loop finishes long before 1000ms passes.
  console.log(`\n[Loop Terminated]: The loop condition (i < 3) failed because i reached: ${i}`);
  console.log("After For Loop (Synchronous execution finishes, Call Stack clears)");
  separator();
  console.log("... [Event Loop active: Waiting 1 second for background timers to expire] ...");
}


/**
 * LESSON 2: The 'let' Approach (The Block Scope Photocopy)
 * 
 * Watch what happens when we switch to 'let'. Every single iteration of the loop
 * forces JavaScript to spin up a completely fresh, unique block scope.
 */
function runLetExperiment() {
  // We use a small delay here so the 'var' outputs finish printing first
  setTimeout(() => {
    heading("Starting Experiment 2: The 'let' Loop");
    console.log("[Engine]: Initializing loop with 'let i = 0'...");

    for (let i = 0; i < 3; i++) {
      // Behind the scenes, JavaScript creates a BRAND NEW variable environment 
      // containing a totally isolated snapshot of 'i' for this scope block {}
      console.log(`[Loop]: Iteration environment created. Isolated 'i' initialized to: ${i}`);

      setTimeout(() => {
        console.log(`\n[Callback Fired!]: Timer wakes up after 1000ms.`);
        console.log(`  -> Closure Check: This callback holds an anchor to its individual environment block.`);
        console.log(`  -> Local value of 'i' safely preserved in this block is: ${i}`);
        console.log(`  -> OUTPUT: Iteration ${i} -`);
      }, 1000);
    }

    // --- SYNCHRONOUS COAL-FACE ---
    // Outside the block, the individual 'i' variables cannot be read directly anymore.
    console.log("\nAfter For Loop (Synchronous execution finishes, Call Stack clears)");
    separator();
    console.log("... [Event Loop active: Waiting 1 second for background timers to expire] ...");
    
  }, 1500); // Triggered 1.5s later to avoid mixing log prints
}


// --- EXECUTE LESSON RUNNER ---
runVarExperiment();
runLetExperiment();