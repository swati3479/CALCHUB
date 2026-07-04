const fs = require('fs');
let code = fs.readFileSync('script.js', 'utf8');

// Add to CALCULATORS
code = code.replace(/\{ id: 'tip', name: 'Tip & Split Bill', icon: 'utensils', category: 'Finance' \}/, 
`{ id: 'tip', name: 'Tip & Split Bill', icon: 'utensils', category: 'Finance' },
  { id: 'programmer', name: 'Programmer / Base', icon: 'binary', category: 'Basic' },
  { id: 'tdee', name: 'TDEE / Calories', icon: 'flame', category: 'Health' },
  { id: 'fuel', name: 'Fuel & Trip Cost', icon: 'car', category: 'Basic' }`);

// Add to getCalcHTML
code = code.replace(/case 'tip': return getTipCalcHTML\(\);/,
`case 'tip': return getTipCalcHTML();
    case 'programmer': return getProgrammerCalcHTML();
    case 'tdee': return getTdeeCalcHTML();
    case 'fuel': return getFuelCalcHTML();`);

fs.writeFileSync('script.js', code);
