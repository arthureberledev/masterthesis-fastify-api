import Fastify from "fastify";

const fastify = Fastify();

// TODO: Extend this example with other types of work

// CPU-bound task
function doCpuWork(permutations: number): number {
  let count = 0;
  for (let i = 0; i < permutations; i++) {
    for (let j = 0; j < permutations; j++) {
      for (let k = 0; k < permutations; k++) {
        for (let l = 0; l < permutations; l++) {
          count++;
        }
      }
    }
  }
  return count;
}

// I/O-bound task (simulated sleep)
async function doIoWork(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Memory-bound task (sort array)
function doMemoryWork(size: number): number[] {
  const arr = [];
  for (let i = 0; i < size; i++) {
    arr.push(Math.random());
  }
  return arr.sort();
}

// Network-bound task (simulated sleep for latency)
async function doNetworkWork(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// function doWork(permutations: number): number {
//   let count = 0;
//   for (let i = 0; i < permutations; i++) {
//     for (let j = 0; j < permutations; j++) {
//       for (let k = 0; k < permutations; k++) {
//         for (let l = 0; l < permutations; l++) {
//           count++;
//         }
//       }
//     }
//   }
//   return count;
// }

fastify.get("/nodejs-test", async (_request, reply) => {
  const cpuResult = doCpuWork(10);
  await doIoWork(50);
  const memResult = doMemoryWork(1000);
  await doNetworkWork(30);
  const result = `CPU: ${cpuResult}, Memory: ${memResult.length}, Network: 30ms`;
  reply.send(`Results for Node.js Server ${result}`);
});

fastify.listen({ port: 8080, host: "0.0.0.0" }, (error, address) => {
  if (error) {
    console.error(error);
    process.exit(1);
  }
  console.log(`Started server at ${address}`);
});
