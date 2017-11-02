const readline = require('readline');
const fs = require('fs-extra')

const input = fs.createReadStream('./test.js')

const rl = readline.createInterface({ input });

rl.on('line', (input) => {
  return `Received: ${input}`
});
