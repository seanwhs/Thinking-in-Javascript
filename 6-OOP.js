/**
 * LESSON: The 4 Pillars of Object-Oriented Programming (OOP)
 * 
 * Run this code to see how modern JS classes structure clean, 
 * secure, and reusable software systems.
 */

// ==========================================
// 1. Encapsulation & Abstraction
// ==========================================

console.log("--- 1. Encapsulation & Abstraction ---");

class BankAccount {
    // # denotes a private field. It is physically inaccessible outside this class.
    // PILLAR: Encapsulation (Hiding raw internal state and restricting direct access)
    #balance; 

    constructor(owner, initialBalance) {
        this.owner = owner;
        this.#balance = initialBalance;
    }

    // A public method to modify the private state safely
    deposit(amount) {
        if (amount > 0) {
            this.#balance += amount;
            this.#logTransaction(`Deposited $${amount}`);
        }
    }

    // PILLAR: Abstraction (Hiding complex internal logic from the user)
    // The user doesn't need to know how we log transactions, they just call deposit().
    #logTransaction(msg) {
        console.log(`[LOG] ${this.owner}'s Account: ${msg}`);
    }

    // A getter method to safely read private data without exposing the raw variable
    get balance() {
        return this.#balance;
    }
}

const myAccount = new Account("Alice", 1000);
myAccount.deposit(500); 

// Proof of Encapsulation:
// console.log(myAccount.#balance); // Throws SyntaxError! Private field cannot be accessed.
console.log("Current Balance:", myAccount.balance); // 1500 (Accessed safely via getter)


// ==========================================
// 2. Inheritance
// ==========================================

console.log("\n--- 2. Inheritance ---");

// Base Class (Parent)
class PaymentProcessor {
    constructor(merchantId) {
        this.merchantId = merchantId;
    }

    process(amount) {
        console.log(`Processing a base payment of $${amount} for merchant ${this.merchantId}`);
    }
}

// Derived Class (Child)
// PILLAR: Inheritance (Reusing logic from a parent class to prevent code duplication)
class StripeProcessor extends PaymentProcessor {
    constructor(merchantId, apiKey) {
        // 'super' calls the constructor of the parent class (PaymentProcessor)
        super(merchantId); 
        this.apiKey = apiKey;
    }
}

const stripe = new StripeProcessor("m_123", "sk_live_abc");
// stripe automatically inherits the process method from PaymentProcessor!
stripe.process(250); 


// ==========================================
// 3. Polymorphism
// ==========================================

console.log("\n--- 3. Polymorphism ---");

class PayPalProcessor extends PaymentProcessor {
    // PILLAR: Polymorphism (Overriding an inherited method to change its behavior)
    // The same method name ('process') takes on a different form here.
    process(amount) {
        console.log(`[PayPal] Authenticating user wallet...`);
        console.log(`[PayPal] Successfully processed $${amount} (Fee: $${amount * 0.03})`);
    }
}

// Let's explicitly override Stripe's method too
class CustomStripeProcessor extends StripeProcessor {
    process(amount) {
        console.log(`[Stripe] Charging tokenized card...`);
        console.log(`[Stripe] Successfully processed $${amount} (Fee: $${amount * 0.02})`);
    }
}

// Polymorphism allows us to treat different objects interchangeably
const checkoutCartProcessors = [
    new PayPalProcessor("merchant_paypal"),
    new CustomStripeProcessor("merchant_stripe", "sk_test")
];

// We can loop through them blindly and execute 'process'. 
// Each object responds based on its own specific implementation!
checkoutCartProcessors.forEach(processor => {
    processor.process(100);
    console.log("---");
});