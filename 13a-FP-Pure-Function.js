// ============================================================================
// THE CONCEPT: PURE FUNCTIONS
// A pure function is like a vending machine: put the same coin in, get the same 
// drink out. Every single time. It cannot look at or touch anything outside itself.
// ============================================================================

// --- THE IMPURE WAY (Fragile & Unpredictable) ---
let globalTaxRate = 0.07; // This lives in the global scope

function calculateCartTotal(subtotal) {
  // ❌ PITFALL 1: It relies on 'globalTaxRate'. If another script changes that 
  // variable to 0.10 mid-session, this function returns a different result 
  // for the exact same subtotal. That makes debugging a nightmare.
  return subtotal + (subtotal * globalTaxRate);
}


// --- THE PURE WAY (Safe & Testable) ---
// Rule 1: Everything the function needs MUST be passed in explicitly as an argument.
// Rule 2: It must not modify anything outside its own curly braces.
const calculateCartTotalPure = (subtotal, taxRate) => {
  //  BENEFIT: No matter what happens to the rest of the app, passing 100 and 0.07 
  // will ALWAYS return 107. It is 100% predictable and incredibly easy to unit test.
  return subtotal + (subtotal * taxRate);
};