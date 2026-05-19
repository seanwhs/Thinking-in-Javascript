/**
 * TEACHING HOISTING IN JAVASCRIPT
 * Run this file using Node.js or paste it into your browser console.
 */

// ============================================================================
// 1. Function Declarations (Fully Hoisted)
// ============================================================================
console.log("--- 1. Function Declarations ---");

// This works perfectly! The entire function is hoisted into memory.
sayHello(); 

function sayHello() {
  console.log("Hello from a hoisted function!");
}


// ============================================================================
// 2. The `var` Keyword (Hoisted as `undefined`)
// ============================================================================
console.log("\n--- 2. The 'var' Keyword ---");

// JavaScript knows the variable exists, but NOT its value yet.
console.log("Value of oldVariable before assignment:", oldVariable); // outputs: undefined

var oldVariable = "I am a var variable";

console.log("Value of oldVariable after assignment:", oldVariable);  // outputs: "I am a var variable"


// ============================================================================
// 3. `let` and `const` (Hoisted but Uninitialized)
// ============================================================================
console.log("\n--- 3. 'let' and 'const' (The Temporal Dead Zone) ---");

try {
  // `let` and `const` ARE hoisted, but they are uninitialized. 
  // Accessing them before their actual line of code throws a ReferenceError.
  console.log(newVariable); 
} catch (error) {
  console.log("Error caught safely:", error.message); 
  // outputs: Cannot access 'newVariable' before initialization
}

// This gap of time/lines between the scope opening and the variable being 
// declared is called the "Temporal Dead Zone" (TDZ).
let newVariable = "I am a let variable"; 
console.log("Value of newVariable after assignment:", newVariable);


// ============================================================================
// Bonus: Function Expressions act like Variables!
// ============================================================================
console.log("\n--- Bonus: Function Expressions ---");

try {
  // Because it uses `var`, the *variable* is hoisted as undefined, 
  // but it isn't a function yet!
  secretFunction(); 
} catch (error) {
  console.log("Error caught safely:", error.message);
  // outputs: secretFunction is not a function (because it's currently undefined)
}

var secretFunction = function() {
  console.log("You can't see me until the engine reaches my line.");
};