// ============================================================================
// THE CONCEPT: HIGHER-ORDER FUNCTIONS & COMPOSITION
// Instead of telling the computer HOW to loop step-by-step (Imperative), we tell 
// the computer WHAT we want to happen by chaining specialized mini-functions (Declarative).
// ============================================================================

const inventory = [
  { item: "Mechanical Keyboard", price: 120, stock: 5 },
  { item: "Ergonomic Mouse", price: 80, stock: 0 },
  { item: "4K Monitor", price: 400, stock: 2 },
  { item: "USB-C Cable", price: 15, stock: 15 }
];

// --- THE IMPERATIVE WAY (Messy & Loop-Heavy) ---
// We have to manage state counters, array pushing, and loop boundaries manually.
let expensiveItemsInStock = [];
for (let i = 0; i < inventory.length; i++) {
  if (inventory[i].stock > 0 && inventory[i].price >= 100) {
    expensiveItemsInStock.push(inventory[i].item.toUpperCase());
  }
}


// --- THE FUNCTIONAL WAY (Clean & Readable Pipeline) ---
// We chain simple, single-responsibility functions together. Each method returns 
// a brand new array, allowing the next method to pick up right where it left off.
const expensiveInStockNames = inventory
  // Step 1: Filter out items that don't match our criteria
  // (.filter expects a function that returns true or false)
  .filter(product => product.stock > 0 && product.price >= 100)
  
  // Step 2: Transform the remaining items into a new format
  // (.map transforms every element in the array using the function you give it)
  .map(product => product.item.toUpperCase());

// Reading this feels like an English sentence: "Take inventory, filter it, then map it."
console.log(expensiveInStockNames); // ['MECHANICAL KEYBOARD', '4K MONITOR']