/**
 * @module StatefulMathUtils
 * @description Provides mathematical utilities with a shared, persistent state.
 * Because Node.js caches modules on the first require(), this internal accumulator
 * acts as a global singleton across the lifetime of the application.
 */

/**
 * The internal, private running total.
 * @type {number}
 */
let runningTotal = 0;

/**
 * Adds a finite number to the internal running total and returns the updated sum.
 * 
 * @param {number} valueToAdd - The number to accumulate.
 * @returns {number} The updated cumulative total.
 * @throws {TypeError} If the input is not a finite number.
 */
function add(valueToAdd) {
  if (typeof valueToAdd !== 'number' || !Number.isFinite(valueToAdd)) {
    throw new TypeError('Value to add must be a finite number.');
  }

  runningTotal += valueToAdd;
  return runningTotal;
}

/**
 * @exports {Object}
 * @property {Function} add - Appends a value to the shared global accumulator.
 */
module.exports = { add };
