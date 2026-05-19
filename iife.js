// =========================================================================
// IIFE RULE OF THUMB:
// ( function() { ... } ) ();
//  ^----------------^   ^^
//  1. The Definition    2. The Execution
// =========================================================================

// 1. Anatomy of an IIFE
// -------------------------------------------------------------------------
// Grouping parentheses () turn the function into an expression.
// The final parentheses () execute it immediately.

(function() {
  console.log("1. I ran instantly without being explicitly called!");
})();

// You can also write them cleanly as arrow functions:
(() => {
  console.log("2. Arrow function IIFEs work exactly the same way.");
})();


// 2. Passing Arguments
// -------------------------------------------------------------------------
// Just like normal functions, you can pass data into the executing parentheses.

((username) => {
  console.log(`3. Hello, ${username}! Arguments go in the trailing parens.`);
})("Alice"); // <- Passing the value here


// 3. The Return Value
// -------------------------------------------------------------------------
// Because an IIFE is an expression, it can compute a value and assign the 
// result directly to a variable.

const currentYear = (() => {
  const date = new Date();
  return date.getFullYear(); // Computes locally
})(); 

console.log(`4. Computed year stored in variable: ${currentYear}`);


// 4. Primary Use Case: Private Scope / Data Isolation
// -------------------------------------------------------------------------
// Before modern JS modules, IIFEs were used to prevent global scope pollution.
// Variables inside an IIFE cannot leak out into the rest of your app.

(() => {
  let privateCounter = 100;
  console.log(`5. Safe inside IIFE: ${privateCounter}`);
})();

try {
  console.log(privateCounter); 
} catch (error) {
  console.log("6. Caught Error: 'privateCounter' is completely invisible out here!");
}