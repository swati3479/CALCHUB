const fs = require('fs');
let code = fs.readFileSync('script.js', 'utf8');
code = code.replace(
    /<div class="flex items-center gap-4">/,
    '<div class="flex flex-col sm:flex-row items-center gap-4">'
);
fs.writeFileSync('script.js', code);
