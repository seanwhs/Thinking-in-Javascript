/**
 * Application entry point demonstrating stateful module side-effects.
 */

// Import the stateful math utility. 
// This resolves to a cached object holding a reference to the private `runningTotal` variable.
const statefulMath = require("./14b-1-modules-node");

try {
  const incrementAmount = 5;
  const currentTotal = statefulMath.add(incrementAmount);
  
  // Output: The shared accumulator updated to: 5
  console.log(`The shared accumulator updated to: ${currentTotal}`); 
} catch (error) {
  console.error(`Accumulation failed: ${error.message}`);
}
