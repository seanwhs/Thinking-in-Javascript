// 14b-1-modules-node.js

/**
 * Internal counter variable. 
 * Node.js caches modules on the first require(), so this state is 
 * shared globally across any file that imports this module.
 * @type {number}
 */
let value = 0;

/**
 * Adds a number to the internal tracking value and returns the updated total.
 * 
 * @param {number} x - The number to add to the running total.
 * @returns {number} The updated cumulative value.
 */
function add(x) {
  value += x;
  return value;
}

/**
 * Exported mathematical utilities.
 * @exports {Object}
 * @property {Function} add - Method to add to the internal accumulator.
 */
module.exports = { add };
