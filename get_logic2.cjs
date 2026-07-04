const fs = require('fs');
const code = fs.readFileSync('script_fixed.js', 'utf8');

const s = code.indexOf(`if (calcId === 'simple')`);
if (s !== -1) {
  let e = code.indexOf('if (calcId ===', s + 10);
  console.log(code.substring(s, e).substring(0, 1000));
}
