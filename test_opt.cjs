const fs = require('fs');
let code = fs.readFileSync('script.js', 'utf8');
let p1 = code.indexOf("function getAgeCalcHTML()");
console.log(code.substring(p1, p1 + 300));
