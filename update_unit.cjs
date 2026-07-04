const fs = require('fs');
let code = fs.readFileSync('script.js', 'utf8');

// Add "Data Storage" to categories
code = code.replace(
    /<option value="volume">Volume<\/option>/,
    '<option value="volume">Volume</option>\n            <option value="data">Data Storage</option>'
);

// Add logic to units
const dataStorageUnits = `
    data: {
      b: 1,
      kb: 1024,
      mb: 1024 * 1024,
      gb: 1024 * 1024 * 1024,
      tb: 1024 * 1024 * 1024 * 1024,
      pb: 1024 * 1024 * 1024 * 1024 * 1024
    },`;

code = code.replace(/volume: {/, dataStorageUnits + '\n    volume: {');

fs.writeFileSync('script.js', code);
