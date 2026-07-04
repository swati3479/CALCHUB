const fs = require('fs');
const code = fs.readFileSync('script_fixed.js', 'utf8');

const calcIds = ['simple', 'scientific', 'percentage', 'currency', 'discount', 'emi', 'unit', 'temperature', 'bmi', 'age'];
for (let c of calcIds) {
  const s = code.indexOf(`if (calcId === '${c}')`);
  if (s !== -1) {
    let e = code.indexOf('if (calcId ===', s + 10);
    if (e === -1) e = code.length;
    console.log(`\n\n--- ${c} ---`);
    console.log(code.substring(s, e).substring(0, 1000)); // print first 1000 chars of logic
  }
}
