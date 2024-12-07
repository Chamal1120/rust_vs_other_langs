const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');

function sumOfSquares(start, end) {
    let sum = 0;
    for (let i = start; i <= end; i++) {
        sum += i * i;
    }
    return sum;
}

if (isMainThread) {
    const n = 1_000_000_000;
    const numThreads = 4; // Use 4 threads (adjust for your CPU cores)
    const range = Math.ceil(n / numThreads);
    const workers = [];
    let result = 0;

    const startTime = Date.now();

    for (let i = 0; i < numThreads; i++) {
        const start = i * range + 1;
        const end = i === numThreads - 1 ? n : (i + 1) * range;
        workers.push(new Worker(__filename, { workerData: { start, end } }));
    }

    let completed = 0;
    workers.forEach(worker => {
        worker.on('message', (partialSum) => {
            result += partialSum;
            completed++;
            if (completed === numThreads) {
                console.log(`Sum of squares from 1 to ${n} = ${result}`);
                console.log(`Time taken: ${(Date.now() - startTime) / 1000} seconds`);
            }
        });
    });
} else {
    const { start, end } = workerData;
    parentPort.postMessage(sumOfSquares(start, end));
}

