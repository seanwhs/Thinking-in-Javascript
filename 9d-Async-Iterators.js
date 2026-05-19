/**
 * LAB 3: Async Iteration (`Symbol.asyncIterator`)
 * 
 * Objective: Understand that an Async Iterator's `.next()` method does NOT
 * return a data object. It returns a *Promise* that resolves to a data object.
 */

const slowNetworkStream = {
  chunks: ['packet-1', 'packet-2', 'packet-3'],

  // The engine looks for this symbol when running `for await...of`
  [Symbol.asyncIterator]() {
    let index = 0;
    const streams = this.chunks;

    return {
      // Notice this returns a Promise resolving to { value, done }
      async next() {
        if (index < streams.length) {
          // Simulate network latency for each packet chunk
          await new Promise(resolve => setTimeout(resolve, 1000));
          return { value: streams[index++], done: false };
        }
        return { value: undefined, done: true };
      }
    };
  }
};

// --- Execution & Verification ---

async function consumeStream() {
  console.log('⏳ Starting async data consumption...');
  const start = Date.now();

  // for await...of automatically handles the promise resolution at each step
  for await (const chunk of slowNetworkStream) {
    console.log(`📥 Received: ${chunk} at ${Date.now() - start}ms`);
  }
  
  console.log('✅ Stream closed safely without blocking main-thread UI.');
}

consumeStream();
