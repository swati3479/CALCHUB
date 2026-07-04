const fs = require('fs');
const code = fs.readFileSync('vercel_app.js', 'utf8');

const components = [
  'SimpleCalc', 'PercentageCalc', 'AgeCalc', 'BmiCalc', 
  'CurrencyCalc', 'TempCalc', 'UnitCalc', 'GstCalc', 
  'DiscountCalc', 'EmiCalc', 'LandingPage', 'Sidebar', 'AppContent'
];

components.forEach(c => {
  const idx = code.indexOf('function ' + c);
  if (idx !== -1) {
    console.log('FOUND:', c);
  } else {
    const idx2 = code.indexOf('const ' + c + '=');
    if (idx2 !== -1) {
      console.log('FOUND CONST:', c);
    }
  }
});
