function createBankAccount(customerName, initialBalance) {
  // This variable lives inside the function scope.
  // It is completely invisible to the outside world once this function returns.
  let balance = initialBalance; 

  // We return an object containing public methods.
  // These methods hold a reference to the 'balance' variable via closure.
  return {
    customerName,
    
    deposit(amount) {
      if (amount > 0) {
        balance += amount;
        console.log(`Deposited $${amount}. New balance: $${balance}`);
      }
    },
    
    withdraw(amount) {
      if (amount <= balance) {
        balance -= amount;
        return amount;
      }
      console.log("Insufficient funds!");
      return 0;
    },
    
    // Instead of exposing the variable, we expose a read-only checker function
    checkBalance() {
      return balance;
    }
  };
}

// --- TESTING CLOSURE PRIVACY ---

const account = createBankAccount("Tony Stark", 5000);

account.deposit(1000); // Output: Deposited $1000. New balance: $6000

// Proof of absolute privacy:
console.log(account.balance); // Output: undefined (The property doesn't exist on the object)
console.log(account.checkBalance()); // Output: 6000 (Accessed safely via the closure method)