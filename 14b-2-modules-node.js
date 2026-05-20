// 14b-2-modules-node.js

/**
 * Import the custom math module. 
 * Resolves to the cached export object containing the `add` method.
 */
const math = require("./14b-1-modules-node");

// Executes the add function, updating the module's internal state to 5.
console.log(math.add(5)); // Output: 5
