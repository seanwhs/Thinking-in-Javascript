import { Worker, isMainThread, parentPort, workerData } from 'node:worker_threads';
import { fileURLToPath } from 'node:url';

// Convert module URL to a standard absolute file path string
const __filename = fileURLToPath(import.meta.url);

// =================================================================
// 1. THE MAIN THREAD PROCESSOR
// =================================================================
if (isMainThread) {
  console.log(`[Main Thread] 🖥️ Main process running on Process ID (PID): ${process.pid}`);

  // A simple interval loop to prove that the Main Event Loop stays fluid and unblocked
  const heartBeatInterval = setInterval(() => {
    console.log('[Main Thread] ❤️ Event Loop heartbeat... (I am responsive and free!)');
  }, 400);

  // Define a heavy workload parameters (Looping 4 Billion times)
  const taskSize = 4_000_000_000;

  console.log(`\n[Main Thread] 🧵 Offloading heavy calculation to a Worker Thread...`);
  const startTime = performance.now();

  // Spin up a secondary background thread by pointing the Worker to THIS exact file path
  const secondaryThread = new Worker(__filename, {
    workerData: { iterations: taskSize } // Securely inject data down into the background worker context
  });

  // Listen for the final answer sent back up from the worker thread
  secondaryThread.on('message', (message) => {
    if (message.status === 'SUCCESS') {
      const endTime = performance.now();
      console.log(`\n[Main Thread] 🎉 Worker thread finished! Received result: ${message.result}`);
      console.log(`[Main Thread] ⏱️ Total operation turnaround time: ${(endTime - startTime).toFixed(0)}ms`);
      
      // Clean up our heartbeat tracker loop and exit gracefully
      clearInterval(heartBeatInterval);
    }
  });

  // Listen for runtime compilation errors inside the worker
  secondaryThread.on('error', (err) => {
    console.error(`[Main Thread] ❌ Worker encountered a runtime crash:`, err);
  });

  // Catch exit codes if the worker thread shuts down unexpectedly
  secondaryThread.on('exit', (code) => {
    if (code !== 0) console.error(`[Main Thread] Worker stopped with exit code ${code}`);
  });

} 
// =================================================================
// 2. THE BACKGROUND WORKER THREAD LAYER
// =================================================================
else {
  // Inside the separate V8 instance thread! We have our own memory allocation.
  const workLimit = workerData.iterations;
  
  let count = 0;
  for (let i = 0; i < workLimit; i++) {
    count++;
  }

  // Communicate the results straight back up to the parent orchestration thread
  parentPort.postMessage({ status: 'SUCCESS', result: count });
}