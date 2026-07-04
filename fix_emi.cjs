const fs = require('fs');
let code = fs.readFileSync('script.js', 'utf8');

let p1 = code.indexOf('function getEmiCalcHTML');
let p2 = code.indexOf('function getUnitCalcHTML');
if (p1 > -1 && p2 > -1) {
    let html = code.substring(p1, p2);
    html = html.replace(/<div class="grid grid-cols-2 gap-4">/g, '<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">');
    code = code.substring(0, p1) + html + code.substring(p2);
    fs.writeFileSync('script.js', code);
}
