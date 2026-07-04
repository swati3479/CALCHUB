const fs = require('fs');

const rawData = fs.readFileSync('extracted_html.json', 'utf8');
const data = JSON.parse(rawData);

// Read current script to get initCalculatorLogic and getGstCalcHTML (if needed)
const currentScript = fs.readFileSync('script.js', 'utf8');
const gstStart = currentScript.indexOf('function getGstCalcHTML()');

// We will construct the beginning part of the script
let newCode = `let currentView = 'home';
let sidebarOpen = window.innerWidth >= 768;
let isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

const CALCULATORS = [
  { id: 'simple', name: 'Standard Calculator', icon: 'calculator', category: 'Basic' },
  { id: 'scientific', name: 'Scientific', icon: 'flask-conical', category: 'Basic' },
  { id: 'percentage', name: 'Percentage Tool', icon: 'percent', category: 'Finance' },
  { id: 'currency', name: 'Currency Exchange', icon: 'coins', category: 'Finance' },
  { id: 'gst', name: 'GST & Sales Tax', icon: 'receipt', category: 'Finance' },
  { id: 'discount', name: 'Discount Calculator', icon: 'tag', category: 'Finance' },
  { id: 'emi', name: 'EMI & Mortgage', icon: 'landmark', category: 'Finance' },
  { id: 'unit', name: 'Universal Unit Converter', icon: 'arrow-right-left', category: 'Converter' },
  { id: 'temperature', name: 'Temperature Converter', icon: 'thermometer', category: 'Converter' },
  { id: 'bmi', name: 'BMI & Health Index', icon: 'activity', category: 'Health' },
  { id: 'age', name: 'Age & Birthday Finder', icon: 'calendar-days', category: 'Health' }
];

function setView(view) {
  currentView = view;
  if (window.innerWidth < 768 && view !== 'home') sidebarOpen = false;
  renderApp();
}

function toggleSidebar() {
  sidebarOpen = !sidebarOpen;
  renderApp();
}

function toggleTheme() {
  isDark = !isDark;
  if (isDark) document.documentElement.classList.add('dark');
  else document.documentElement.classList.remove('dark');
  renderApp();
}

function getCalcTitle() {
  if (currentView === 'home') return 'Landing';
  const c = CALCULATORS.find(x => x.id === currentView);
  return c ? c.name : 'Calculator';
}

function getCalcCategory() {
  if (currentView === 'home') return '';
  const c = CALCULATORS.find(x => x.id === currentView);
  return c ? c.category : '';
}

function renderApp() {
  const root = document.getElementById('app-root-wrapper');
  if (currentView === 'home') {
    root.innerHTML = renderLandingPage();
  } else {
    root.innerHTML = renderDashboard();
  }
  
  if (isDark) document.documentElement.classList.add('dark');
  else document.documentElement.classList.remove('dark');
  
  if (currentView !== 'home') {
    // Only call this if initCalculatorLogic exists
    if (typeof initCalculatorLogic === 'function') {
      initCalculatorLogic(currentView);
    }
  }
}
`;

function escapeHtml(html) {
  return html.replace(/`/g, '\\`').replace(/\\$/g, '\\\$');
}

// Add the HTML functions
newCode += "\nfunction " + funcName + "() {\n  return \`" + escapeHtml(html) + "\`;\n}\n";

['simple', 'scientific', 'percentage', 'currency', 'unit', 'temperature', 'bmi', 'age'].forEach(id => {
  // Convert standard ID to HTML generating func
  let funcName = '';
  switch(id) {
    case 'simple': funcName = 'getSimpleCalcHTML'; break;
    case 'scientific': funcName = 'getScientificCalcHTML'; break;
    case 'percentage': funcName = 'getPercentageCalcHTML'; break;
    case 'currency': funcName = 'getCurrencyCalcHTML'; break;
    case 'unit': funcName = 'getUnitCalcHTML'; break;
    case 'temperature': funcName = 'getTempCalcHTML'; break;
    case 'bmi': funcName = 'getBmiCalcHTML'; break;
    case 'age': funcName = 'getAgeCalcHTML'; break;
  }
  
  if (data[id]) {
    // Replace React specific stuff in the scraped HTML (e.g. data-lucide SVG -> we want data-lucide attrs to be triggered)
    // Actually, puppeteer dumps fully rendered SVGs. We should probably strip the SVGs and replace them with <i data-lucide="..."></i>
    // to keep the code clean and use the lucide script like it used to.
    let html = data[id];
    // A quick hack to replace rendered lucide icons if possible, or just keep them as SVGs.
    // Keeping them as SVGs is fine, but it makes the code huge.
    // Let's just keep them as SVGs. Vanilla JS doesn't care.
    newCode += `
function \${funcName}() {
  return \\`\${escapeHtml(html)}\\`;
}
`;
  }
});

// We have getGstCalcHTML and initCalculatorLogic from the current script.js
if (gstStart !== -1) {
  newCode += '\n' + currentScript.substring(gstStart);
}

fs.writeFileSync('script_fixed.js', newCode);
