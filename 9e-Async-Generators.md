/**
 * LAB 4: Memory-Safe Stream Processing with Async Generators
 * 
 * Objective: Build a data pipeline that processes network chunks on demand.
 * This prevents backpressure (flooding the system memory with data before it can be processed).
 */

// Simulated paginated DB fetch or paginated third-party API
async function* fetchLogStream(totalPages) {
  let currentPage = 1;

  while (currentPage <= totalPages) {
    console.log(`📡 Fetching page ${currentPage} from remote server...`);
    // Simulate remote network I/O lag
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Yielding an array of data, pausing until the consumer asks for the next page
    yield [
      { id: `log-${currentPage}-A`, level: 'INFO' },
      { id: `log-${currentPage}-B`, level: 'WARN' }
    ];
    
    currentPage++;
  }
}

// --- Pipeline Consumer ---

async function runPipeline() {
  const logGenerator = fetchLogStream(3);

  // Elegant, sequential, async stream processing loop
  for await (const logBatch of logGenerator) {
    console.log(`⚙️ Processing batch of size: ${logBatch.length}`);
    logBatch.forEach(log => console.log(`   └─ [Processed] ${log.id} (${log.level})`));
  }
  
  console.log('🏁 Data Pipeline terminated gracefully.');
}

runPipeline();
