const fs = require('fs');
let code = fs.readFileSync('script.js', 'utf8');

const p1 = code.indexOf('function getSimpleCalcHTML() {');
const p2 = code.indexOf('function getScientificCalcHTML() {');
if(p1 !== -1 && p2 !== -1) {
    code = code.substring(0, p1) + code.substring(p2);
}

const p3 = code.indexOf("if (calcId === 'simple') {");
const p4 = code.indexOf("if (calcId === 'scientific') {");
if(p3 !== -1 && p4 !== -1) {
    code = code.substring(0, p3) + code.substring(p4);
}

fs.writeFileSync('script.js', code);
