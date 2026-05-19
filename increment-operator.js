// INCREMENT OPERATOR (++) RULE OF THUMB:
// ++num (Prefix):  "Change then Use" -> Increments first, then evaluates.
// num++ (Postfix): "Use then Change" -> Evaluates first, then increments.

// 1. Inline Assignments
// -------------------------------------------------------------------------
let numA = 5;
let resultA = ++numA;   // 1. numA becomes 6 -> 2. resultA gets 6
console.log(resultA);   // 6 (Evaluated AFTER increment)
console.log(numA);      // 6

let numB = 5;
let resultB = numB++;   // 1. resultB gets 5 -> 2. numB becomes 6
console.log(resultB);   // 5 (Evaluated BEFORE increment)
console.log(numB);      // 6


// 2. Standalone Statements (No difference)
// -------------------------------------------------------------------------
// i++ and ++i act identically here; the evaluated return value is discarded.
for (let i = 0; i < 2; i++) {
  console.log(`For i: ${i}`); // Prints 0, then 1
}


// 3. Conditional Expressions (High risk for bugs!)
// -------------------------------------------------------------------------
let count = 0;
while (count++ < 3) {   // 1. Compares count to 3 -> 2. Increments count
  console.log(`Postfix loop: ${count}`); // Prints 1, 2, 3 (Compared 0, 1, 2)
}

let tracking = 0;
while (++tracking < 3) { // 1. Increments tracking -> 2. Compares to 3
  console.log(`Prefix loop: ${tracking}`); // Prints 1, 2 (Compared 1, 2)
}