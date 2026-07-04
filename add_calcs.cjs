const fs = require('fs');
let code = fs.readFileSync('script.js', 'utf8');

// Add to CALCULATORS
code = code.replace(/\{ id: 'age', name: 'Age & Birthday Finder', icon: 'calendar-days', category: 'Health' \}/, 
`{ id: 'age', name: 'Age & Birthday Finder', icon: 'calendar-days', category: 'Health' },
  { id: 'compound', name: 'Compound Interest', icon: 'trending-up', category: 'Finance' },
  { id: 'tip', name: 'Tip & Split Bill', icon: 'utensils', category: 'Finance' }`);

// Add to getCalcHTML
code = code.replace(/case 'age': return getAgeCalcHTML\(\);/,
`case 'age': return getAgeCalcHTML();
    case 'compound': return getCompoundCalcHTML();
    case 'tip': return getTipCalcHTML();`);

fs.writeFileSync('script.js', code);
