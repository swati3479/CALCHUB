const fs = require('fs');
let code = fs.readFileSync('script.js', 'utf8');

// Add to CALCULATORS
code = code.replace(/\{ id: 'ratio', name: 'Ratio Calculator', icon: 'divide', category: 'Basic' \}/, 
`{ id: 'ratio', name: 'Ratio Calculator', icon: 'divide', category: 'Basic' },
  { id: 'random', name: 'Random Number', icon: 'dices', category: 'Basic' },
  { id: 'rule72', name: 'Rule of 72 (Doubling Time)', icon: 'bar-chart-3', category: 'Finance' }`);

// Add to getCalcHTML
code = code.replace(/case 'ratio': return getRatioCalcHTML\(\);/,
`case 'ratio': return getRatioCalcHTML();
    case 'random': return getRandomCalcHTML();
    case 'rule72': return getRule72CalcHTML();`);

fs.writeFileSync('script.js', code);
