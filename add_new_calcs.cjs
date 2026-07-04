const fs = require('fs');
let code = fs.readFileSync('script.js', 'utf8');

// Add to CALCULATORS
code = code.replace(/\{ id: 'fuel', name: 'Fuel & Trip Cost', icon: 'car', category: 'Basic' \}/, 
`{ id: 'fuel', name: 'Fuel & Trip Cost', icon: 'car', category: 'Basic' },
  { id: 'date', name: 'Date Difference', icon: 'calendar-clock', category: 'Basic' },
  { id: 'salary', name: 'Salary & Wage', icon: 'banknote', category: 'Finance' },
  { id: 'ratio', name: 'Ratio Calculator', icon: 'divide', category: 'Basic' }`);

// Add to getCalcHTML
code = code.replace(/case 'fuel': return getFuelCalcHTML\(\);/,
`case 'fuel': return getFuelCalcHTML();
    case 'date': return getDateCalcHTML();
    case 'salary': return getSalaryCalcHTML();
    case 'ratio': return getRatioCalcHTML();`);

fs.writeFileSync('script.js', code);
