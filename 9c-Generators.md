/**
 * LAB 2: Generators (`function*`) and Execution Yielding
 * 
 * Objective: Internalize that `yield` is a two-way street. It doesn't just
 * push values out; it can also inject values back *into* the function scope.
 */

function* statefulLab() {
  console.log('▶️ Execution started inside generator');
  
  // yield 1: Emits 'A', pauses execution context frame
  const input1 = yield 'A'; 
  
  // When resumed, input1 contains whatever the caller passed into .next(value)
  console.log(`📥 Generator resumed. Received input1: ${input1}`);
  
  const input2 = yield 'B';
  
  console.log(`📥 Generator resumed. Received input2: ${input2}`);
  return 'Execution Complete';
}

// --- Execution & Verification ---

const gen = statefulLab(); // Does NOT run the code. It instantiates the iterator state machine.

// Step 1: Run until the first yield
console.log('1. Calling first next()');
const step1 = gen.next(); 
console.log('Emitted:', step1); // { value: 'A', done: false }

// Step 2: Resume, and pass data *into* the generator scope
console.log('\n2. Injecting data into paused state');
const step2 = gen.next('First Injection'); 
console.log('Emitted:', step2); // { value: 'B', done: false }

// Step 3: Final step
console.log('\n3. Resuming to completion');
const step3 = gen.next('Second Injection');
console.log('Emitted:', step3); // { value: 'Execution Complete', done: true }
