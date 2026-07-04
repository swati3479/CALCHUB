const fs = require('fs');
let code = fs.readFileSync('script.js', 'utf8');
code = code.replace(/p-4 sm:p-4 sm:p-6/g, 'p-4 sm:p-6');
code = code.replace(/sm:p-4 sm:p-8/g, 'sm:p-8');
code = code.replace(/p-4 sm:p-4 sm:p-8/g, 'p-4 sm:p-8');
fs.writeFileSync('script.js', code);
