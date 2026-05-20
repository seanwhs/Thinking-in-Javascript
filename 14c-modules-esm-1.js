/**
 * Calculates the sum of two numbers.
 * 
 * @param {number} addend - The first number to be added.
 * @param {number} augend - The second number to be added.
 * @returns {number} The arithmetic sum of the two inputs.
 * 
 * @throws {TypeError} If either argument is not a finite number.
 */
export function add(addend, augend) {
  if (typeof addend !== 'number' || typeof augend !== 'number') {
    throw new TypeError('Both arguments must be numbers.');
  }
  
  if (!Number.isFinite(addend) || !Number.isFinite(augend)) {
    throw new TypeError('Arguments must be finite numbers (cannot be NaN or Infinity).');
  }

  return addend + augend;
}
