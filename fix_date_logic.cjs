const fs = require('fs');
let code = fs.readFileSync('script.js', 'utf8');

const p1 = code.indexOf("if (calcId === 'date') {");
const p2 = code.indexOf("if (calcId === 'salary') {");
if (p1 !== -1 && p2 !== -1) {
    code = code.substring(0, p1) + code.substring(p2);
    fs.writeFileSync('script.js', code);
}
