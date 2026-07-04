const fs = require('fs');
let code = fs.readFileSync('script_fixed.js', 'utf8');
const makeCode = require('fs').readFileSync('fix_htmls.cjs', 'utf8');

// evaluate makeCode string directly
const fnStr = makeCode.match(/const makeCode = \(\) => `([\s\S]*?)`;/)[1];
const actualStr = fnStr.replace(/\\\\`/g, '`');

const gstFunc = code.indexOf('function getGstCalcHTML() {');
if (gstFunc !== -1) {
  code = code.substring(0, gstFunc) + actualStr + '\n' + code.substring(gstFunc);
  fs.writeFileSync('script_fixed4.js', code);
  console.log("Appended HTML generators successfully!");
}
