const fs = require('fs');
let code = fs.readFileSync('script.js', 'utf8');

// Remove from CALCULATORS
code = code.replace(/  \{ id: 'temperature', name: 'Temperature Converter', icon: 'thermometer', category: 'Converter' \},\n/, '');

// Remove from getCalcHTML
code = code.replace(/    case 'temperature': return getTempCalcHTML\(\);\n/, '');

// Remove function getTempCalcHTML
let p1 = code.indexOf('function getTempCalcHTML()');
if (p1 > -1) {
  let p2 = code.indexOf('function getBmiCalcHTML()', p1);
  if (p2 > -1) {
    code = code.substring(0, p1) + code.substring(p2);
  }
}

fs.writeFileSync('script.js', code);
