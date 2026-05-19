/**
 * LESSON: JavaScript Execution Context
 * 
 * Run this code mentally or in a browser console to see how JS engine 
 * handles memory allocation and execution.
 */

// ==========================================
// Phase 1: The Global Execution Context (GEC)
// ==========================================

// Even before line 1 runs, the JS engine sets up the "Global Environment".
// It sets up the 'window' object (in browsers), links 'this' to 'window',
// and hoists variables/functions.

console.log("--- 1. Global Creation Phase (Hoisting) ---");
console.log("Value of standardVar:", standardVar); // Output: undefined (hoisted!)
console.log("Value of blockVar:", typeof blockVar);    // Throws ReferenceError if accessed directly! 
                                                       // It's in the "Temporal Dead Zone".

var standardVar = "I am a global var";
let blockVar = "I am a global let"; // block-scoped, not bound to global object


// ==========================================
// Phase 2: Function Invocation & Context Stack
// ==========================================

// Every time you execute (call) a function, a brand new 
// Function Execution Context (FEC) is created and pushed onto the Call Stack.

function outerFunction(outerParam) {
    // [New Context Created Here]
    // Inside this box, we have access to:
    // 1. Its own Variable Environment (outerParam, localToOuter)
    // 2. Its Scope Chain (access to Global Context variables)
    // 3. The 'this' keyword
    
    var localToOuter = "Outer Local Data";
    
    console.log("\n--- 2. Inside outerFunction Context ---");
    console.log("Accessing global:", standardVar); // "I am a global var" via Scope Chain
    
    function innerFunction() {
        // [Another New Context Created Here]
        // This sits on top of the Call Stack right now.
        
        var localToInner = "Inner Local Data";
        
        console.log("\n--- 3. Inside innerFunction Context ---");
        console.log("Scope Chain Check:");
        console.log("- Inner local:", localToInner);
        console.log("- Outer local:", localToOuter); // Lexical scoping allows this
        console.log("- Global variable:", blockVar);   // Reaches all the way to GEC
    }
    
    innerFunction(); // Invoking this creates the inner context
    
    // Once innerFunction finishes, its context is popped off the stack 
    // and garbage collected (unless a closure prevents it).
}

// Trigger the chain
outerFunction("Hello Context!");

// Once outerFunction finishes, we are back strictly in the Global Context.