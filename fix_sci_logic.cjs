const fs = require('fs');
let code = fs.readFileSync('script.js', 'utf8');

const p1 = code.indexOf("if (calcId === 'scientific') {");
const p2 = code.indexOf("if (calcId === 'scientific') {", p1 + 1);

if (p1 !== -1 && p2 !== -1) {
    console.log('Duplicate scientific logic block found. Removing one.');
    // find the end of the first block
    let p3 = code.indexOf("if (calcId === 'percentage') {", p1);
    if(p3 === -1) {
      console.log('Could not find percentage block');
    } else {
       if (p2 < p3) {
          // Both blocks are before percentage, meaning the block is literally duplicated.
          code = code.substring(0, p2) + code.substring(p3);
          fs.writeFileSync('script.js', code);
       }
    }
} else {
    console.log('No duplicate found');
}
