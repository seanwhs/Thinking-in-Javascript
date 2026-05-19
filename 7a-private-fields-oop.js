class Vault {
  // 1. Private fields MUST be declared at the top of the class
  #secretKey;
  #accessLogs = [];

  constructor(owner, initialKey) {
    this.owner = owner; // Public property
    this.#secretKey = initialKey; // Private property
  }

  // A public method to interact with private data safely
  tryAccess(attemptedKey) {
    if (attemptedKey === this.#secretKey) {
      this.#logAccess("SUCCESS");
      return "Welcome to the inner sanctum.";
    }
    this.#logAccess("FAILED");
    return "Access Denied.";
  }

  // 2. Private methods are also supported
  #logAccess(status) {
    const timestamp = new Date().toLocaleTimeString();
    this.#accessLogs.push({ timestamp, status });
    console.log(`[Internal Log] Access attempt recorded: ${status}`);
  }

  // A public getter to read properties of private data without exposing the raw array
  get attemptsCount() {
    return this.#accessLogs.length;
  }
}

// --- TESTING NATIVE PRIVACY ---

const myVault = new Vault("Bruce Wayne", "Alfred123");

console.log(myVault.owner); // Output: Bruce Wayne

// Direct access to the secret key or logs will crash the engine immediately:
// console.log(myVault.#secretKey); 
// SyntaxError: Private field '#secretKey' must be declared in an enclosing class

// Trying to trick it by guessing or calling the private method dynamically fails:
// myVault["#logAccess"]("HACKED"); // TypeError: myVault.#logAccess is not a function

// The only way through is the public API route
console.log(myVault.tryAccess("WrongKey")); // Output: Access Denied.
console.log(myVault.tryAccess("Alfred123")); // Output: Welcome to the inner sanctum.
console.log("Total Attempts:", myVault.attemptsCount); // Output: Total Attempts: 2