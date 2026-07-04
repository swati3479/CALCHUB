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
  return html.replace(/\`/g, '\\\`').replace(/\\\$/g, '\\\\$');
}

// Add the HTML functions
newCode += `
function renderLandingPage() {
  return \`${escapeHtml(data.landing || '')}\`;
}

function renderDashboard() {
  // Try to use the scraped sidebar/header, or just reconstruct it
  // Since scraped might have react stuff or specific states baked in, 
  // it might be safer to dynamically generate the sidebar like we did before.
  // Actually, we can just use the dynamic sidebar logic!
  const sidebarHtml = \\\`
    \\\${!sidebarOpen ? '' : \\\`<div class="fixed inset-0 z-40 bg-slate-950/45 md:hidden backdrop-blur-xs transition-opacity" onclick="toggleSidebar()"></div>\\\`}
    <aside id="sidebar-main" class="fixed top-0 bottom-0 left-0 z-50 flex flex-col justify-between bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-r border-slate-200/80 dark:border-slate-800 transition-all duration-300 md:translate-x-0 \\\${sidebarOpen ? 'w-64 translate-x-0 font-medium' : 'w-0 -translate-x-full md:w-16 md:translate-x-0'}">
      <div class="p-4 flex items-center justify-between border-b border-slate-200/80 dark:border-slate-800/80 h-16 shrink-0 overflow-hidden">
        <div onclick="setView('home')" class="flex items-center gap-3 cursor-pointer hover:opacity-85 select-none">
          <div class="w-9 h-9 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xl shrink-0">C</div>
          \\\${sidebarOpen ? '<span class="font-bold tracking-tight text-xl text-slate-800 dark:text-slate-100 uppercase font-mono">CalcHub</span>' : ''}
        </div>
        \\\${sidebarOpen ? '<button id="sidebar-close-mob" onclick="toggleSidebar()" class="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 md:hidden cursor-pointer"><i data-lucide="x" class="w-[18px] h-[18px]"></i></button>' : ''}
      </div>
      <nav class="flex-1 overflow-y-auto p-3 space-y-1 scrollbar-hidden">
        \\\${sidebarOpen ? '<div class="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3 mb-2 mt-2">Dashboard</div>' : ''}
        <button onclick="setView('home')" class="w-full py-2.5 rounded-xl text-xs font-semibold flex items-center gap-3 transition-colors select-none cursor-pointer outline-none \\\${sidebarOpen ? 'justify-start px-3.5' : 'justify-center px-0'} text-slate-500 dark:text-slate-400 hover:bg-slate-200/50 dark:hover:bg-slate-800/50 hover:text-slate-800 dark:hover:text-slate-200">
          <i data-lucide="home" class="w-4 h-4 shrink-0"></i>
          \\\${sidebarOpen ? '<span class="truncate">Landing</span>' : ''}
        </button>
        \\\${sidebarOpen ? '<div class="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3 mb-2 mt-4 pt-1">Tools & Calculators</div>' : ''}
        \\\${CALCULATORS.map(c => \\\`
          <button onclick="setView('\\\${c.id}')" class="w-full py-2.5 rounded-xl text-xs font-semibold flex items-center gap-3 transition-colors select-none cursor-pointer outline-none \\\${sidebarOpen ? 'justify-start px-3.5' : 'justify-center px-0'} \\\${currentView === c.id ? 'bg-indigo-600 text-white font-bold shadow-md shadow-indigo-650/10 border border-indigo-500/20' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-200/50 dark:hover:bg-slate-800/50 hover:text-slate-800 dark:hover:text-slate-200'}">
            <i data-lucide="\\\${c.icon}" class="w-4 h-4 shrink-0"></i>
            \\\${sidebarOpen ? \\\`<span class="truncate">\\\${c.name}</span>\\\` : ''}
          </button>
        \\\`).join('')}
      </nav>
      <div class="p-3 border-t border-slate-200/80 dark:border-slate-800">
        <button onclick="toggleTheme()" class="w-full flex items-center gap-3 p-2.5 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-slate-800/50 transition-colors \\\${!sidebarOpen ? 'justify-center px-0' : 'justify-start px-3.5'}">
          <i data-lucide="\\\${isDark ? 'sun' : 'moon'}" class="w-4 h-4"></i>
          \\\${sidebarOpen ? \\\`<span>\\\${isDark ? 'Light Mode' : 'Dark Mode'}</span>\\\` : ''}
        </button>
      </div>
    </aside>
  \\\`;
  
  return \\\`
    <div id="dashboard-container-block" class="flex-1 flex max-w-full relative animate-fade-in">
      \\\${sidebarHtml}
      <div class="flex-1 min-h-screen flex flex-col transition-all duration-300 \\\${sidebarOpen ? 'md:pl-64' : 'md:pl-16'}">
        <header class="sticky top-0 z-35 bg-white/70 dark:bg-slate-950/70 backdrop-blur-md border-b border-slate-200/50 dark:border-slate-800/60 transition-colors h-16 flex items-center justify-between px-6">
          <div class="flex items-center gap-3">
            <button id="hamburger-sidebar-trigger" onclick="toggleSidebar()" class="p-2 -ml-2 rounded-xl text-slate-500 hover:bg-slate-150/40 dark:hover:bg-slate-850/40 hover:text-slate-800 dark:hover:text-slate-100 transition-colors cursor-pointer">
              <i data-lucide="menu" class="w-[18px] h-[18px]"></i>
            </button>
            <div class="flex items-center gap-1.5 text-xs text-slate-400 dark:text-slate-500 font-mono">
              <button onclick="setView('home')" class="hidden sm:inline hover:text-indigo-600 dark:hover:text-indigo-400 font-bold transition-colors cursor-pointer outline-none">CALCHUB</button>
              <span class="hidden sm:inline">/</span>
              \\\${getCalcCategory() ? \\\`<span class="uppercase text-[10px] bg-slate-100 dark:bg-slate-850 px-2 py-0.5 rounded-md font-bold text-slate-500 hidden sm:inline-block">\\\${getCalcCategory()}</span> <span class="hidden sm:inline">/</span>\\\` : ''}
              <span class="text-slate-700 dark:text-slate-350 font-bold tracking-tight truncate max-w-[120px] sm:max-w-none">\\\${getCalcTitle()}</span>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <button onclick="setView('home')" class="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 border border-slate-200/60 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-800 dark:hover:text-slate-100 transition-colors font-mono cursor-pointer">
              <i data-lucide="arrow-left" class="w-3 h-3"></i>
              <span>Exit Desk</span>
            </button>
          </div>
        </header>
        <main class="flex-1 p-6 md:p-8 max-w-7xl mx-auto w-full flex flex-col justify-center transition-all duration-300 animate-fade-in">
          <div id="active-calc-wrapper-\\\${currentView}" class="w-full h-full">
            \\\${getCalcHTML(currentView)}
          </div>
        </main>
      </div>
    </div>
  \\\`;
}

function getCalcHTML(view) {
  switch (view) {
    case 'simple': return getSimpleCalcHTML();
    case 'scientific': return getScientificCalcHTML();
    case 'percentage': return getPercentageCalcHTML();
    case 'currency': return getCurrencyCalcHTML();
    case 'gst': return getGstCalcHTML();
    case 'discount': return getDiscountCalcHTML();
    case 'emi': return getEmiCalcHTML();
    case 'unit': return getUnitCalcHTML();
    case 'temperature': return getTempCalcHTML();
    case 'bmi': return getBmiCalcHTML();
    case 'age': return getAgeCalcHTML();
    default: return getSimpleCalcHTML();
  }
}
\`;

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
    newCode += \`
function \${funcName}() {
  return \\\`\${escapeHtml(html)}\\\`;
}
\`;
  }
});

// We have getGstCalcHTML and initCalculatorLogic from the current script.js
if (gstStart !== -1) {
  newCode += '\n' + currentScript.substring(gstStart);
}

fs.writeFileSync('script_fixed.js', newCode);
