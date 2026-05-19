/**
 * LESSON: JavaScript Prototypes & The Prototype Chain
 * 
 * Run this code to see how objects look up properties they don't own.
 */

// ==========================================
// 1. Plain Object Linkage (The __proto__ way)
// ==========================================

console.log("--- 1. Manual Prototype Linking ---");

// Base "parent" object
const animal = {
    isAlive: true,
    eat() {
        return "Nom nom nom";
    }
};

// "Child" object
const dog = {
    bark() {
        return "Woof!";
    }
};

// We manually link dog's prototype to animal.
// (Note: Modern JS prefers Object.create() or classes, but this makes the mental model crystal clear!)
dog.__proto__ = animal;

console.log("Does dog have bark?", dog.bark());   // "Woof!" (Found directly on dog)
console.log("Does dog have eat?", dog.eat());     // "Nom nom nom" (Found via prototype chain!)
console.log("Does dog have isAlive?", dog.isAlive); // true


// ==========================================
// 2. The Prototype Shadowing Mechanism
// ==========================================

console.log("\n--- 2. Property Shadowing ---");

const cat = {
    meow() { return "Meow!"; }
};
cat.__proto__ = animal;

// What if the cat has its own concept of eating?
cat.eat = function() {
    return "Nibbles delicately at fish";
};

// The engine finds 'eat' directly on cat first, so it stops looking!
// This is called "shadowing" (overriding).
console.log("Cat eating:", cat.eat());       // "Nibbles delicately at fish"
console.log("Animal eating:", animal.eat()); // "Nom nom nom" (The parent remains untouched)


// ==========================================
// 3. The Standard Way: Constructor Functions
// ==========================================

console.log("\n--- 3. Constructor Prototypes ---");

// When you use 'new', JavaScript automates this prototype linking process.
function Robot(name) {
    this.name = name;
    // Don't put methods here! If you do, every single robot gets its own copy, wasting memory.
}

// Instead, attach methods to the function's shared .prototype object:
Robot.prototype.greet = function() {
    return `Beep boop, I am ${this.name}`;
};

const wallE = new Robot("Wall-E");
const r2d2 = new Robot("R2-D2");

console.log(wallE.greet()); // "Beep boop, I am Wall-E"
console.log(r2d2.greet());  // "Beep boop, I am R2-D2"

// Proof that they share the exact same function in memory:
console.log("Do they share the same greet method?", wallE.greet === r2d2.greet); // true


// ==========================================
// 4. Verifying the Hidden Links
// ==========================================

console.log("\n--- 4. Inspecting the Chain ---");

// Does wallE actually own the 'greet' property?
console.log("Does wallE physically own 'name'?", wallE.hasOwnProperty('name'));   // true
console.log("Does wallE physically own 'greet'?", wallE.hasOwnProperty('greet')); // false

// Where is it then?
console.log("Is wallE's prototype the Robot prototype?", Object.getPrototypeOf(wallE) === Robot.prototype); // true