const fs = require('fs');
let code = fs.readFileSync('script.js', 'utf8');
code = code.replace(/[0-9]+ powerful calculators in one elegant interface\./g, '19 powerful calculators in one elegant interface.');
fs.writeFileSync('script.js', code);
