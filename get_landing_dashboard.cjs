const fs = require('fs');
let code = fs.readFileSync('script.js', 'utf8');

let p1 = code.indexOf('function renderLandingPage');
let p2 = code.indexOf('function getCalcHTML');
if (p1 > -1 && p2 > -1) {
    console.log(code.substring(p1, p2));
}
