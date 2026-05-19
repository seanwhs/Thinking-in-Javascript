// ==========================================
// 1. THE BASIC CONCEPT: A Backpack for Variables
// ==========================================

function createGreetingRobot(robotName) {
  // This is the outer function's variable. 
  // Normally, when a function finishes running, its variables vanish.
  const greeting = "Hello, human!";

  // We are returning a brand-new inner function here.
  return function(userName) {
    // Look closely! This inner function uses 'greeting' and 'robotName'.
    // Because of a CLOSURE, it wraps them up in a metaphoric "backpack" 
    // and keeps access to them forever.
    console.log(`${greeting} I am ${robotName}. Nice to meet you, ${userName}!`);
  };
}

// 'robot1' is now the inner function returned by 'createGreetingRobot'
const robot1 = createGreetingRobot("Robo-9000"); 
// 'robot2' is a completely independent instance with its own "backpack"
const robot2 = createGreetingRobot("Sparky");

// The outer function 'createGreetingRobot' has completely finished executing here.
// Yet, when we call the robots, they still remember their names and greetings!
robot1("Alice"); // Output: Hello, human! I am Robo-9000. Nice to meet you, Alice!
robot2("Bob");   // Output: Hello, human! I am Sparky. Nice to meet you, Bob!


// ==========================================
// 2. REAL-WORLD USE CASE: Data Privacy / Encapsulation
// ==========================================
// Closures are the classic way to create "private" variables in JavaScript
// so outside code can't accidentally mess with them.

function createBankAccount(initialBalance) {
  // This variable is "private". No one can touch it directly from the outside.
  let balance = initialBalance;

  // We return an object containing functions. 
  // All of these functions share the exact same closure (the same balance variable).
  return {
    deposit: function(amount) {
      if (amount > 0) {
        balance += amount;
        console.log(`Deposited $${amount}. New Balance: $${balance}`);
      }
    },
    withdraw: function(amount) {
      if (amount <= balance) {
        balance -= amount;
        console.log(`Withdrew $${amount}. Remaining Balance: $${balance}`);
      } else {
        console.log("Insufficient funds!");
      }
    },
    getBalance: function() {
      // Gives read-only access to the private variable
      return balance;
    }
  };
}

const myAccount = createBankAccount(100);

myAccount.deposit(50);   // Output: Deposited $50. New Balance: $150
myAccount.withdraw(30);  // Output: Withdrew $30. Remaining Balance: $120

// Attempting to mess with the balance directly:
console.log(myAccount.balance); // Output: undefined (It doesn't exist on the object!)
console.log(myAccount.getBalance()); // Output: 120 (Only the closure can read it)