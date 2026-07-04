const fs = require('fs');
let code = fs.readFileSync('script.js', 'utf8');

// Remove from CALCULATORS array
code = code.replace(/,\n\s*\{\s*id:\s*'date',\s*name:\s*'Date Difference',\s*icon:\s*'calendar-clock',\s*category:\s*'Basic'\s*\}/, '');
code = code.replace(/\{\s*id:\s*'date',\s*name:\s*'Date Difference',\s*icon:\s*'calendar-clock',\s*category:\s*'Basic'\s*\},\n\s*/, '');

// Remove from switch case
code = code.replace(/\n\s*case\s*'date':\s*return\s*getDateCalcHTML\(\);/, '');

fs.writeFileSync('script.js', code);
