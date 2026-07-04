const fs = require('fs');
let code = fs.readFileSync('script.js', 'utf8');

let p1 = code.indexOf('function getCurrencyCalcHTML');
let p2 = code.indexOf('function getDiscountCalcHTML');
if (p1 > -1 && p2 > -1) {
    let html = code.substring(p1, p2);
    html = html.replace(/<div class="flex-1">/g, '<div class="flex-1 w-full">');
    // For unit swap as well
    code = code.substring(0, p1) + html + code.substring(p2);
    fs.writeFileSync('script.js', code);
}
