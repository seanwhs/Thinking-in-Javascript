{ // 1. The Block Scope Opens. The TDZ for 'pizza' begins right here!

    // --- WE ARE NOW IN THE TDZ ---
    // The JavaScript engine knows 'pizza' exists in memory, 
    // but it is completely uninitialized and locked.
    
    try {
        console.log(pizza); // ❌ Throws ReferenceError!
    } catch (e) {
        console.log("Error caught: " + e.message);
    }

    // --- STILL IN THE TDZ ---
    // You cannot read it, write to it, or even check its type.
    // try { typeof pizza; } would also throw an error!

    let pizza; // 2. The Declaration Line. 'pizza' officially EXITS the TDZ!
    
    // --- THE TDZ IS OVER ---
    // The variable is now initialized (implicitly to `undefined`).

    console.log(pizza); //  Outputs: undefined (Safe to use!)

    pizza = "Pepperoni"; 
    console.log(pizza); //  Outputs: "Pepperoni"

} // 3. Scope closes.