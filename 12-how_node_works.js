import fs from 'node:fs';
import crypto from 'node:crypto';

console.log('============== 🏎️ PHASE 1: STARTING MAIN THREAD ==============');
const programStart = performance.now();

// Helper to log timestamps relative to program boot time
function logMarker(message) {
  const elapsed = (performance.now() - programStart).toFixed(0);
  console.log(`[+${elapsed}ms] ${message}`);
}

// -----------------------------------------------------------------
// 1. SYNCHRONOUS CODE (The Call Stack)
// -----------------------------------------------------------------
// JavaScript processes this line immediately on the single main thread.
logMarker('Step A: Synchronous log executes instantly.');


// -----------------------------------------------------------------
// 2. NON-BLOCKING ASYNC I/O (The Libuv Event Loop)
// -----------------------------------------------------------------
// Node registers this timer with libuv and immediately moves on.
setTimeout(() => {
  logMarker('⏱️ Timer Callback: Fired from the Macro-task Queue.');
}, 50);


// -----------------------------------------------------------------
// 3. MICRO-TASKS (The VIP Fast Track)
// -----------------------------------------------------------------
// Promise callbacks queue up in the Micro-task Queue. 
// Node executes them immediately after the current synchronous stack clears,
// BEFORE it checks any standard timers or file operations.
Promise.resolve().then(() => {
  logMarker('🚀 Promise Callback: Fired from the Micro-task Queue (VIP Fast Track).');
});


// -----------------------------------------------------------------
// 4. BLOCKING THREAD POOL WORKLOAD (Libuv Background Worker Threads)
// -----------------------------------------------------------------
// Node handles some tasks asynchronously but cannot do them natively through the OS kernel 
// (like cryptography, hashing, or file system compression). 
// Libuv automatically offloads these heavy tasks to its background Thread Pool (4 threads by default).
logMarker('Step B: Dispatching heavy password hash to the Thread Pool...');

crypto.pbkdf2('my_secret_password', 'salt_string', 100000, 64, 'sha512', (err, derivedKey) => {
  logMarker('🔑 Crypto Callback: Thread Pool finished processing the heavy hash calculation.');
});


// -----------------------------------------------------------------
// 5. ASYNC FILE SYSTEM I/O (Operating System Hand-off)
// -----------------------------------------------------------------
// Reading files is offloaded asynchronously. Libuv acts as a bridge, handing 
// the operation over to the OS file systems subsystem whenever possible.
logMarker('Step C: Dispatching asynchronous file system read to Libuv...');

fs.readFile('non_existent_file.txt', 'utf8', (err, data) => {
  logMarker('📁 File I/O Callback: System read complete (or failed cleanly).');
});


// -----------------------------------------------------------------
// 6. WRAPPING UP SYNCHRONOUS INITIALIZATION
// -----------------------------------------------------------------
logMarker('Step D: Synchronous main thread script has completely finished.');
console.log('============== 🔄 PHASE 2: ENTERING THE EVENT LOOP ==============\n');