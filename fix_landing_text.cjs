const fs = require('fs');
let code = fs.readFileSync('script.js', 'utf8');
code = code.replace(/11 powerful calculators in one elegant interface\./g, '18 powerful calculators in one elegant interface.');
fs.writeFileSync('script.js', code);
