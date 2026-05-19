/**
 * LAB 1: Synchronous Iteration Protocol from Scratch
 * 
 * Objective: Understand that an "Iterable" is just an object with a method 
 * keyed by [Symbol.iterator] that returns an "Iterator" object containing a .next() method.
 */

const customRange = {
  start: 1,
  end: 3,

  // 1. The Iterable Protocol: The engine looks for this exact symbol
  [Symbol.iterator]() {
    let current = this.start;
    const max = this.end;

    // 2. The Iterator Protocol: Returns an object with a stateful .next() method
    return {
      next() {
        // The engine checks the 'done' property on every iteration step
        if (current <= max) {
          return { value: current++, done: false };
        } else {
          // Once done is true, the loop breaks. Value is discarded.
          return { value: undefined, done: true };
        }
      }
    };
  }
};

// --- Execution & Verification ---

// Behind the scenes, the JavaScript engine does exactly this:
console.log('--- Manual Iteration ---');
const iterator = customRange[Symbol.iterator]();
console.log(iterator.next()); // { value: 1, done: false }
console.log(iterator.next()); // { value: 2, done: false }
console.log(iterator.next()); // { value: 3, done: false }
console.log(iterator.next()); // { value: undefined, done: true }

// Clean abstraction syntax sugar powered by the underlying protocol:
console.log('\n--- Sugar Iteration ---');
for (const value of customRange) {
  console.log(value); // 1, 2, 3
}
