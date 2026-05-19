// ============================================================================
// THE NEXT LEVEL: FUNCTION COMPOSITION
// What if you have 5 different pure functions and you want to pass data through 
// all of them sequentially like an assembly line? We use a 'pipe'.
// ============================================================================

// Let's define three ultra-simple, reusable math functions:
const double = x => x * 2;
const addTen = x => x + 10;
const square = x => x * x;

// --- WITHOUT A PIPE (The "Onion" Anti-Pattern) ---
// Reading this is awful because you have to read it from the INSIDE out.
const messyResult = square(addTen(double(5))); // (5 * 2) + 10 = 20 -> 20 * 20 = 400


// --- WITH A CUSTOM PIPE FUNCTION ---
// 'pipe' takes an array of functions and combines them.
// It uses .reduce() to pass the result of the first function as the input to the next.
const pipe = (...functions) => (initialValue) => {
  return functions.reduce((currentValue, currentFunction) => {
    return currentFunction(currentValue);
  }, initialValue);
};

// Now we can build a reusable pipeline that reads naturally from LEFT to RIGHT.
const runMathPipeline = pipe(
  double,   // First:  5 * 2 = 10
  addTen,   // Second: 10 + 10 = 20
  square    // Third:  20 * 20 = 400
);

console.log(runMathPipeline(5)); // Output: 400