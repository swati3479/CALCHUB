const fs = require('fs');

let code = fs.readFileSync('script.js', 'utf8');

const regex = /function getScientificCalcHTML\(\) \{[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*`;\s*}/;
code = code.replace(regex, ''); // Delete the first occurrence!

fs.writeFileSync('script.js', code);
