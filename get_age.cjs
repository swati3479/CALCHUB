const fs = require('fs');
let code = fs.readFileSync('script.js', 'utf8');
let p1 = code.indexOf("function getAgeCalcHTML()");
let endP = code.indexOf("function getScientificCalcHTML()");
if (p1 > -1 && endP > -1) {
  console.log(code.substring(p1, endP));
}
