const fs = require('fs');
let code = fs.readFileSync('script.js', 'utf8');

let p1 = code.indexOf("function getPercentageCalcHTML()");
let endP = code.indexOf("function getCurrencyCalcHTML()");
if (p1 > -1 && endP > -1) {
  console.log(code.substring(p1, p1 + 500));
}
