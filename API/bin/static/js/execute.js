const renderer = require('./server-bundle.js').default;

console.log(process.argv[2]);
console.log(process.argv[3]);
const result = renderer(process.argv[2], process.argv[3]);
console.log(JSON.stringify(result));