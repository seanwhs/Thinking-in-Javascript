// 1. Scope opens. TDZ for 'movie' begins.

function watchMovie() {
    // 3. This function executes AFTER the TDZ has already ended!
    console.log("Watching: " + movie); 
}

// --- WE ARE IN THE TDZ FOR 'movie' ---

let movie = "Inception"; // 2. 'movie' exits the TDZ right here.

watchMovie(); //  Outputs: "Watching: Inception" (No error!)