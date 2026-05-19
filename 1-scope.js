/*
  SUMMARY OF SCOPE IN JAVASCRIPT:
  - Global Scope: Accessible everywhere across the script.
  - Function Scope: Restricted to the declaring function body.
  - Block Scope: Restricted to the enclosing {} block (applies ONLY to let and const).

  ⚠️ The 'var' Hoisting/Leak Trap:
  Variables declared with 'var' ignore block boundaries and leak into the surrounding function scope,
  which frequently leads to accidental bugs. Always prefer 'let' and 'const' in modern JS.
*/

// 1. GLOBAL SCOPE
// Visible everywhere—inside functions, loops, and conditional blocks.
const globalVar = "I am global";

function scopeDemo() {
  // 2. FUNCTION SCOPE
  // Accessible anywhere inside this function, but invisible outside of it.
  const functionVar = "I am inside the function";
  var functionVarOld = "I am function-scoped via var";

  console.log(globalVar);     // Success: Inner scopes can read outer scopes
  console.log(functionVar);   // Success: Inside its own declaring scope

  if (true) {
    // 3. BLOCK SCOPE
    // {} creates a block scope. Only const and let respect it.
    const blockConst = "Block-scoped (const)";
    let blockLet = "Block-scoped (let)";
    var blockVar = "NOT block-scoped (var leaks out)";

    console.log(blockConst);  // Success: Inside the declaring block
  }

  // --- Testing Block Scope Boundaries ---
  try {
    console.log(blockVar);    // Success: 'var' ignores block scope and is available here
  } catch (e) {
    console.log("Error reading blockVar");
  }

  try {
    console.log(blockLet);    // Throws Error: 'let' is trapped inside the 'if' block
  } catch (e) {
    console.log("let failed outside block: " + e.message);
  }
}

scopeDemo();

// --- Testing Function Scope Boundaries ---
try {
  console.log(functionVar);   // Throws Error: Trapped inside scopeDemo()
} catch (e) {
  console.log("functionVar failed globally: " + e.message);
}