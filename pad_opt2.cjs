const fs = require('fs');
let code = fs.readFileSync('script.js', 'utf8');
code = code.replace(/p-6 mb-6/g, 'p-4 sm:p-6 mb-4 sm:mb-6');
fs.writeFileSync('script.js', code);
