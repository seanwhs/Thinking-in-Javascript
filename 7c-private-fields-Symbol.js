// 1. Create unique Symbols (usually kept private inside a closed module scope)
// The string description ('secretKey') is just a label for debugging; 
// every single Symbol() call generates a 100% globally unique token.
const _secretKey = Symbol('secretKey');
const _accessLogs = Symbol('accessLogs');
const _logAccess = Symbol('logAccess');

class SymbolVault {
  constructor(owner, initialKey) {
    this.owner = owner; // Public property: accessible to anyone
    
    // 2. Assign properties using the unique Symbol variables as keys (computed property syntax)
    this[_secretKey] = initialKey; 
    this[_accessLogs] = [];
  }

  // A public method to interact with the hidden data safely
  tryAccess(attemptedKey) {
    if (attemptedKey === this[_secretKey]) {
      this[_logAccess]("SUCCESS");
      return "Welcome to the inner sanctum.";
    }
    this[_accessLogs].push({ timestamp: new Date().toLocaleTimeString(), status: "FAILED" });
    return "Access Denied.";
  }

  // 3. A "private" method using a Symbol key
  [_logAccess](status) {
    console.log(`[Internal Log] Recorded: ${status}`);
  }
}

// --- TESTING SYMBOL PRIVACY ---

const bobsVault = new SymbolVault("Bob", "Password123");

// Standard public access works fine:
console.log(bobsVault.owner); // Output: Bob

// Regular strings cannot touch the hidden properties because the keys are Symbols:
console.log(bobsVault["secretKey"]);  // Output: undefined
console.log(bobsVault["_secretKey"]); // Output: undefined

// Standard serialization and loops skip Symbols entirely:
console.log(Object.keys(bobsVault));   // Output: ['owner']
console.log(JSON.stringify(bobsVault)); // Output: {"owner":"Bob"}


// --- THE "SEMI-PRIVATE" CATCH: BREAKING THE VAULT ---

// While protected against normal operations, Symbols do not offer hard runtime security.
// JavaScript provides built-in reflection tools that can retrieve them:
const hiddenKeys = Object.getOwnPropertySymbols(bobsVault); 
console.log(hiddenKeys); // Output: [ Symbol(secretKey), Symbol(accessLogs) ]

// Once an external script extracts the Symbol references, the data can be stolen or modified:
const stolenKey = bobsVault[hiddenKeys[0]];
console.log("Stolen Key:", stolenKey); // Output: Stolen Key: Password123