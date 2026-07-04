const fs = require('fs');
let code = fs.readFileSync('script_fixed4.js', 'utf8');
code = code.replace(/\\\\\`/g, '`');
fs.writeFileSync('script_fixed5.js', code);
