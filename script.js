let currentView = 'home';
let sidebarOpen = window.innerWidth >= 768;
let isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
let keyboardListener = null;


window.handleSidebarSearch = () => {
  const q = document.getElementById('sidebar-search')?.value.toLowerCase() || '';
  const c = document.getElementById('sidebar-category')?.value || 'All';
  const btns = document.querySelectorAll('.calc-nav-btn');
  btns.forEach(btn => {
    const name = btn.dataset.name;
    const cat = btn.dataset.category;
    const matchQ = name.includes(q);
    const matchC = c === 'All' || cat === c;
    if (matchQ && matchC) {
      btn.style.display = 'flex';
    } else {
      btn.style.display = 'none';
    }
  });
};

window.handleLandingSearch = () => {
  const q = document.getElementById('landing-search')?.value.toLowerCase() || '';
  const c = document.getElementById('landing-category')?.value || 'All';
  const btns = document.querySelectorAll('.landing-calc-btn');
  btns.forEach(btn => {
    const name = btn.dataset.name;
    const cat = btn.dataset.category;
    const matchQ = name.includes(q);
    const matchC = c === 'All' || cat === c;
    if (matchQ && matchC) {
      btn.style.display = 'block';
    } else {
      btn.style.display = 'none';
    }
  });
};

const CALCULATORS = [
  { id: 'scientific', name: 'Calculator', icon: 'calculator', category: 'Basic' },
  { id: 'percentage', name: 'Percentage Tool', icon: 'percent', category: 'Finance' },
  { id: 'currency', name: 'Currency Exchange', icon: 'coins', category: 'Finance' },
  { id: 'gst', name: 'GST & Sales Tax', icon: 'receipt', category: 'Finance' },
  { id: 'discount', name: 'Discount Calculator', icon: 'tag', category: 'Finance' },
  { id: 'emi', name: 'EMI & Mortgage', icon: 'landmark', category: 'Finance' },
  { id: 'unit', name: 'Universal Unit Converter', icon: 'arrow-right-left', category: 'Converter' },
  { id: 'bmi', name: 'BMI & Health Index', icon: 'activity', category: 'Health' },
  { id: 'age', name: 'Age & Date Calculator', icon: 'calendar-days', category: 'Health' },
  { id: 'compound', name: 'Compound Interest', icon: 'trending-up', category: 'Finance' },
  { id: 'tip', name: 'Tip & Split Bill', icon: 'utensils', category: 'Finance' },
  { id: 'programmer', name: 'Programmer / Base', icon: 'binary', category: 'Basic' },
  { id: 'tdee', name: 'TDEE / Calories', icon: 'flame', category: 'Health' },
  { id: 'fuel', name: 'Fuel & Trip Cost', icon: 'car', category: 'Basic' },
  { id: 'salary', name: 'Salary & Wage', icon: 'banknote', category: 'Finance' },
  { id: 'ratio', name: 'Ratio Calculator', icon: 'divide', category: 'Basic' },
  { id: 'random', name: 'Random Number', icon: 'dices', category: 'Basic' },
  { id: 'rule72', name: 'Rule of 72 (Doubling Time)', icon: 'bar-chart-3', category: 'Finance' }
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
    if (typeof initCalculatorLogic === 'function') {
      initCalculatorLogic(currentView);
    }
  } else {
    if (keyboardListener) document.removeEventListener('keydown', keyboardListener);
  }
  
  if (window.lucide) {
    lucide.createIcons();
  }
}

function renderLandingPage() {
  return `
    <div class="flex-1 flex flex-col items-center justify-center p-4 sm:p-8 text-center animate-fade-in relative overflow-hidden h-full w-full">
      <div class="absolute inset-0 z-0">
        <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
        <div class="absolute top-1/3 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
        <div class="absolute -bottom-8 left-1/2 w-96 h-96 bg-rose-500/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
      </div>
      
      <div class="relative z-10 max-w-4xl mx-auto space-y-8 w-full mt-10 mb-10">
        <div class="w-20 h-20 sm:w-24 sm:h-24 mx-auto bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl flex items-center justify-center shadow-xl shadow-indigo-500/20 transform -rotate-6 transition-transform duration-300">
           <i data-lucide="calculator" class="w-10 h-10 sm:w-12 sm:h-12 text-white"></i>
        </div>
        
        <h1 class="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight text-slate-800 dark:text-slate-100">
          The <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Ultimate</span><br>Calculator Suite
        </h1>
        
        <p class="text-lg sm:text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
          18 powerful calculators in one elegant interface.
        </p>

        <div class="max-w-2xl mx-auto mt-8 flex flex-col sm:flex-row gap-3 text-left">
          <div class="relative flex-1">
            <i data-lucide="search" class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400"></i>
            <input type="text" id="landing-search" oninput="handleLandingSearch()" placeholder="Search calculators..." class="w-full pl-11 pr-4 py-3 sm:py-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200 dark:border-slate-800 rounded-2xl text-sm text-slate-700 dark:text-slate-300 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all">
          </div>
          <select id="landing-category" onchange="handleLandingSearch()" class="sm:w-48 px-4 py-3 sm:py-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200 dark:border-slate-800 rounded-2xl text-sm text-slate-700 dark:text-slate-300 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all">
            <option value="All">All Categories</option>
            <option value="Basic">Basic</option>
            <option value="Finance">Finance</option>
            <option value="Converter">Converter</option>
            <option value="Health">Health</option>
          </select>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-8 text-left">
          ${CALCULATORS.map((calc, i) => `
            <button onclick="setView('${calc.id}')" data-name="${calc.name.toLowerCase()}" data-category="${calc.category}" class="landing-calc-btn group p-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200 dark:border-slate-800 rounded-2xl hover:border-indigo-500 dark:hover:border-indigo-500 hover:shadow-lg hover:shadow-indigo-500/10 transition-all text-left">
              <div class="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-500 group-hover:text-indigo-600 group-hover:bg-indigo-50 dark:group-hover:bg-indigo-900/30 flex items-center justify-center mb-3 transition-colors">
                <i data-lucide="${calc.icon}" class="w-5 h-5"></i>
              </div>
              <h3 class="font-bold text-slate-700 dark:text-slate-200 text-sm group-hover:text-indigo-600 dark:group-hover:text-indigo-400">${calc.name}</h3>
              <p class="text-[10px] uppercase font-bold tracking-widest text-slate-400 mt-1">${calc.category}</p>
            </button>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}
function renderDashboard() {
  const sidebarHtml = `
    ${!sidebarOpen ? '' : `<div class="fixed inset-0 z-40 bg-slate-950/45 md:hidden backdrop-blur-xs transition-opacity" onclick="toggleSidebar()"></div>`}
    <aside id="sidebar-main" class="fixed top-0 bottom-0 left-0 z-50 flex flex-col justify-between bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-r border-slate-200/80 dark:border-slate-800 transition-all duration-300 md:translate-x-0 ${sidebarOpen ? 'w-64 translate-x-0 font-medium' : 'w-0 -translate-x-full md:w-16 md:translate-x-0'}">
      
      <div class="p-4 flex items-center justify-between border-b border-slate-200/80 dark:border-slate-800/80 h-16 shrink-0 overflow-hidden">
        <div onclick="setView('home')" class="flex items-center gap-3 cursor-pointer hover:opacity-85 select-none">
          <div class="w-9 h-9 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xl shrink-0">C</div>
          ${sidebarOpen ? '<span class="font-bold tracking-tight text-xl text-slate-800 dark:text-slate-100 uppercase font-mono">CalcHub</span>' : ''}
        </div>
        ${sidebarOpen ? '<button id="sidebar-close-mob" onclick="toggleSidebar()" class="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 md:hidden cursor-pointer"><i data-lucide="x" class="w-[18px] h-[18px]"></i></button>' : ''}
      </div>
      
      <nav class="flex-1 overflow-y-auto p-3 space-y-1 scrollbar-hidden">
        ${sidebarOpen ? `
          <div class="px-1 mb-4 space-y-2 mt-2">
            <div class="relative">
              <i data-lucide="search" class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"></i>
              <input type="text" id="sidebar-search" oninput="handleSidebarSearch()" placeholder="Search..." class="w-full pl-9 pr-3 py-2.5 bg-slate-200/50 dark:bg-slate-800/50 border border-transparent focus:border-indigo-500 rounded-xl text-xs text-slate-700 dark:text-slate-300 outline-none transition-colors">
            </div>
            <select id="sidebar-category" onchange="handleSidebarSearch()" class="w-full px-3 py-2.5 bg-slate-200/50 dark:bg-slate-800/50 border border-transparent focus:border-indigo-500 rounded-xl text-xs text-slate-700 dark:text-slate-300 outline-none transition-colors">
              <option value="All">All Categories</option>
              <option value="Basic">Basic</option>
              <option value="Finance">Finance</option>
              <option value="Converter">Converter</option>
              <option value="Health">Health</option>
            </select>
          </div>
        ` : ''}
        
        ${sidebarOpen ? '<div class="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3 mb-2 mt-2">Dashboard</div>' : ''}
        <button onclick="setView('home')" class="w-full py-2.5 rounded-xl text-xs font-semibold flex items-center gap-3 transition-colors select-none cursor-pointer outline-none ${sidebarOpen ? 'justify-start px-3.5' : 'justify-center px-0'} text-slate-500 dark:text-slate-400 hover:bg-slate-200/50 dark:hover:bg-slate-800/50 hover:text-slate-800 dark:hover:text-slate-200">
          <i data-lucide="home" class="w-4 h-4 shrink-0"></i>
          ${sidebarOpen ? '<span class="truncate">Landing</span>' : ''}
        </button>
        ${sidebarOpen ? '<div class="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3 mb-2 mt-4 pt-1">Tools & Calculators</div>' : ''}
        ${CALCULATORS.map(c => `
          <button onclick="setView('${c.id}')" data-nav-id="${c.id}" data-name="${c.name.toLowerCase()}" data-category="${c.category}" class="calc-nav-btn w-full py-2.5 rounded-xl text-xs font-semibold flex items-center gap-3 transition-colors select-none cursor-pointer outline-none ${sidebarOpen ? 'justify-start px-3.5' : 'justify-center px-0'} ${currentView === c.id ? 'bg-indigo-600 text-white font-bold shadow-md shadow-indigo-650/10 border border-indigo-500/20' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-200/50 dark:hover:bg-slate-800/50 hover:text-slate-800 dark:hover:text-slate-200'}">
            <i data-lucide="${c.icon}" class="w-4 h-4 shrink-0"></i>
            ${sidebarOpen ? `<span class="truncate">${c.name}</span>` : ''}
          </button>
        `).join('')}
      </nav>

      <div class="p-3 border-t border-slate-200/80 dark:border-slate-800">
        <button onclick="toggleTheme()" class="w-full flex items-center gap-3 p-2.5 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-slate-800/50 transition-colors ${!sidebarOpen ? 'justify-center px-0' : 'justify-start px-3.5'}">
          <i data-lucide="${isDark ? 'sun' : 'moon'}" class="w-4 h-4"></i>
          ${sidebarOpen ? `<span>${isDark ? 'Light Mode' : 'Dark Mode'}</span>` : ''}
        </button>
      </div>
    </aside>
  `;
  
  return `
    <div id="dashboard-container-block" class="flex-1 flex max-w-full relative animate-fade-in">
      ${sidebarHtml}
      <div class="flex-1 min-h-screen flex flex-col transition-all duration-300 ${sidebarOpen ? 'md:pl-64' : 'md:pl-16'}">
        <header class="sticky top-0 z-35 bg-white/70 dark:bg-slate-950/70 backdrop-blur-md border-b border-slate-200/50 dark:border-slate-800/60 transition-colors h-16 flex items-center justify-between px-6">
          <div class="flex items-center gap-3">
            <button id="hamburger-sidebar-trigger" onclick="toggleSidebar()" class="p-2 -ml-2 rounded-xl text-slate-500 hover:bg-slate-150/40 dark:hover:bg-slate-850/40 hover:text-slate-800 dark:hover:text-slate-100 transition-colors cursor-pointer">
              <i data-lucide="menu" class="w-[18px] h-[18px]"></i>
            </button>
            <div class="flex items-center gap-1.5 text-xs text-slate-400 dark:text-slate-500 font-mono">
              <button onclick="setView('home')" class="hidden sm:inline hover:text-indigo-600 dark:hover:text-indigo-400 font-bold transition-colors cursor-pointer outline-none">CALCHUB</button>
              <span class="hidden sm:inline">/</span>
              ${getCalcCategory() ? `<span class="uppercase text-[10px] bg-slate-100 dark:bg-slate-850 px-2 py-0.5 rounded-md font-bold text-slate-500 hidden sm:inline-block">${getCalcCategory()}</span> <span class="hidden sm:inline">/</span>` : ''}
              <span class="text-slate-700 dark:text-slate-350 font-bold tracking-tight truncate max-w-[120px] sm:max-w-none">${getCalcTitle()}</span>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <button onclick="setView('home')" class="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 border border-slate-200/60 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-800 dark:hover:text-slate-100 transition-colors font-mono cursor-pointer">
              <i data-lucide="arrow-left" class="w-3 h-3"></i>
              <span>Exit Desk</span>
            </button>
          </div>
        </header>
        <main class="flex-1 p-4 sm:p-6 md:p-8 max-w-7xl mx-auto w-full flex flex-col justify-center transition-all duration-300 animate-fade-in">
          <div id="active-calc-wrapper-${currentView}" class="w-full h-full">
            ${getCalcHTML(currentView)}
          </div>
        </main>
      </div>
    </div>
  `;
}

function getCalcHTML(view) {
  switch (view) {
    case 'scientific': return getScientificCalcHTML();
    case 'percentage': return getPercentageCalcHTML();
    case 'currency': return getCurrencyCalcHTML();
    case 'gst': return getGstCalcHTML();
    case 'discount': return getDiscountCalcHTML();
    case 'emi': return getEmiCalcHTML();
    case 'unit': return getUnitCalcHTML();
    case 'bmi': return getBmiCalcHTML();
    case 'age': return getAgeCalcHTML();
    case 'compound': return getCompoundCalcHTML();
    case 'tip': return getTipCalcHTML();
    case 'programmer': return getProgrammerCalcHTML();
    case 'tdee': return getTdeeCalcHTML();
    case 'fuel': return getFuelCalcHTML();
    case 'salary': return getSalaryCalcHTML();
    case 'ratio': return getRatioCalcHTML();
    case 'random': return getRandomCalcHTML();
    case 'rule72': return getRule72CalcHTML();
    default: return getScientificCalcHTML();
  }
}



function getScientificCalcHTML() {
  return `
    <div class="max-w-4xl mx-auto space-y-6">
      <div class="bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-950 border border-slate-200/50 dark:border-slate-800 rounded-3xl shadow-2xl p-4 sm:p-6 md:p-8">
        
        <div class="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl p-4 sm:p-6 mb-4 sm:mb-6 text-right font-mono flex flex-col justify-end min-h-[140px] relative">
          <div id="angle-mode-toggle" class="absolute top-4 left-4 bg-slate-200/50 dark:bg-slate-800/50 rounded-lg flex overflow-hidden border border-slate-300/50 dark:border-slate-700">
            <button data-mode="deg" class="px-2.5 py-1 text-[10px] font-bold bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300">DEG</button>
            <button data-mode="rad" class="px-2.5 py-1 text-[10px] font-bold text-slate-500 opacity-50">RAD</button>
          </div>
          <div id="sci-expr" class="text-slate-400 text-lg mb-2 min-h-[1.75rem] overflow-x-auto whitespace-nowrap scrollbar-hidden pb-1"></div>
          <div id="sci-res" class="text-5xl font-bold text-indigo-600 dark:text-indigo-400 truncate">0</div>
        </div>

        <div id="sci-keys" class="grid grid-cols-5 sm:grid-cols-6 gap-1.5 sm:gap-2 md:gap-3 font-mono text-sm md:text-lg">
          <button data-val="sin" class="py-2.5 sm:py-3 md:py-4 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 dark:bg-emerald-900/20 dark:hover:bg-emerald-900/40 rounded-xl font-bold">sin</button>
          <button data-val="cos" class="py-2.5 sm:py-3 md:py-4 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 dark:bg-emerald-900/20 dark:hover:bg-emerald-900/40 rounded-xl font-bold">cos</button>
          <button data-val="tan" class="py-2.5 sm:py-3 md:py-4 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 dark:bg-emerald-900/20 dark:hover:bg-emerald-900/40 rounded-xl font-bold">tan</button>
          <button data-val="ln" class="py-2.5 sm:py-3 md:py-4 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 dark:bg-emerald-900/20 dark:hover:bg-emerald-900/40 rounded-xl font-bold">ln</button>
          <button data-val="log" class="py-2.5 sm:py-3 md:py-4 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 dark:bg-emerald-900/20 dark:hover:bg-emerald-900/40 rounded-xl font-bold">log</button>
          <button data-val="pi" class="hidden sm:block py-2.5 sm:py-3 md:py-4 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 dark:bg-emerald-900/20 dark:hover:bg-emerald-900/40 rounded-xl font-bold">π</button>
          
          <button data-val="sqrt" class="py-2.5 sm:py-3 md:py-4 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 dark:bg-emerald-900/20 dark:hover:bg-emerald-900/40 rounded-xl font-bold">√</button>
          <button data-val="^" class="py-2.5 sm:py-3 md:py-4 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 dark:bg-emerald-900/20 dark:hover:bg-emerald-900/40 rounded-xl font-bold">x^y</button>
          <button data-val="(" class="py-2.5 sm:py-3 md:py-4 bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-xl font-bold">(</button>
          <button data-val=")" class="py-2.5 sm:py-3 md:py-4 bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-xl font-bold">)</button>
          <button data-val="/" class="py-2.5 sm:py-3 md:py-3 sm:py-4 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 dark:bg-indigo-900/30 dark:hover:bg-indigo-900/50 rounded-xl font-bold">÷</button>
          <button data-val="e" class="hidden sm:block py-2.5 sm:py-3 md:py-4 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 dark:bg-emerald-900/20 dark:hover:bg-emerald-900/40 rounded-xl font-bold">e</button>

          <button data-val="7" class="py-2.5 sm:py-3 md:py-4 bg-white border border-slate-100 hover:bg-slate-50 dark:bg-slate-900 dark:border-slate-800 dark:hover:bg-slate-800 rounded-xl font-bold text-slate-700 dark:text-slate-200">7</button>
          <button data-val="8" class="py-2.5 sm:py-3 md:py-4 bg-white border border-slate-100 hover:bg-slate-50 dark:bg-slate-900 dark:border-slate-800 dark:hover:bg-slate-800 rounded-xl font-bold text-slate-700 dark:text-slate-200">8</button>
          <button data-val="9" class="py-2.5 sm:py-3 md:py-4 bg-white border border-slate-100 hover:bg-slate-50 dark:bg-slate-900 dark:border-slate-800 dark:hover:bg-slate-800 rounded-xl font-bold text-slate-700 dark:text-slate-200">9</button>
          <button data-val="DEL" class="col-span-2 sm:col-span-1 py-2.5 sm:py-3 md:py-4 bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-xl font-bold text-sm">DEL</button>
          <button data-val="*" class="py-2.5 sm:py-3 md:py-3 sm:py-4 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 dark:bg-indigo-900/30 dark:hover:bg-indigo-900/50 rounded-xl font-bold">×</button>
          <button data-val="C" class="hidden sm:block py-2.5 sm:py-3 md:py-4 bg-rose-50 text-rose-600 hover:bg-rose-100 dark:bg-rose-900/20 dark:hover:bg-rose-900/40 rounded-xl font-bold">C</button>

          <button data-val="4" class="py-2.5 sm:py-3 md:py-4 bg-white border border-slate-100 hover:bg-slate-50 dark:bg-slate-900 dark:border-slate-800 dark:hover:bg-slate-800 rounded-xl font-bold text-slate-700 dark:text-slate-200">4</button>
          <button data-val="5" class="py-2.5 sm:py-3 md:py-4 bg-white border border-slate-100 hover:bg-slate-50 dark:bg-slate-900 dark:border-slate-800 dark:hover:bg-slate-800 rounded-xl font-bold text-slate-700 dark:text-slate-200">5</button>
          <button data-val="6" class="py-2.5 sm:py-3 md:py-4 bg-white border border-slate-100 hover:bg-slate-50 dark:bg-slate-900 dark:border-slate-800 dark:hover:bg-slate-800 rounded-xl font-bold text-slate-700 dark:text-slate-200">6</button>
          <button data-val="C" class="sm:hidden col-span-2 py-2.5 sm:py-3 md:py-4 bg-rose-50 text-rose-600 hover:bg-rose-100 dark:bg-rose-900/20 dark:hover:bg-rose-900/40 rounded-xl font-bold">C</button>
          <button data-val="-" class="py-2.5 sm:py-3 md:py-3 sm:py-4 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 dark:bg-indigo-900/30 dark:hover:bg-indigo-900/50 rounded-xl font-bold">-</button>
          <button data-val="=" class="hidden sm:block col-span-1 row-span-2 py-2.5 sm:py-3 md:py-3 sm:py-4 bg-indigo-600 text-white hover:bg-indigo-700 rounded-xl font-bold shadow-lg shadow-indigo-600/20 text-2xl">=</button>

          <button data-val="1" class="py-2.5 sm:py-3 md:py-4 bg-white border border-slate-100 hover:bg-slate-50 dark:bg-slate-900 dark:border-slate-800 dark:hover:bg-slate-800 rounded-xl font-bold text-slate-700 dark:text-slate-200">1</button>
          <button data-val="2" class="py-2.5 sm:py-3 md:py-4 bg-white border border-slate-100 hover:bg-slate-50 dark:bg-slate-900 dark:border-slate-800 dark:hover:bg-slate-800 rounded-xl font-bold text-slate-700 dark:text-slate-200">2</button>
          <button data-val="3" class="py-2.5 sm:py-3 md:py-4 bg-white border border-slate-100 hover:bg-slate-50 dark:bg-slate-900 dark:border-slate-800 dark:hover:bg-slate-800 rounded-xl font-bold text-slate-700 dark:text-slate-200">3</button>
          <button data-val="0" class="py-2.5 sm:py-3 md:py-4 bg-white border border-slate-100 hover:bg-slate-50 dark:bg-slate-900 dark:border-slate-800 dark:hover:bg-slate-800 rounded-xl font-bold text-slate-700 dark:text-slate-200">0</button>
          <button data-val="." class="py-2.5 sm:py-3 md:py-4 bg-white border border-slate-100 hover:bg-slate-50 dark:bg-slate-900 dark:border-slate-800 dark:hover:bg-slate-800 rounded-xl font-bold text-slate-700 dark:text-slate-200">.</button>
          <button data-val="+" class="py-2.5 sm:py-3 md:py-3 sm:py-4 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 dark:bg-indigo-900/30 dark:hover:bg-indigo-900/50 rounded-xl font-bold">+</button>

          <button data-val="=" class="sm:hidden col-span-5 py-3 sm:py-4 bg-indigo-600 text-white hover:bg-indigo-700 rounded-xl font-bold shadow-lg shadow-indigo-600/20 text-xl">=</button>
        </div>
      </div>
      
      <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xl h-48 flex flex-col">
        <h4 class="text-sm font-semibold mb-3 flex items-center gap-2 font-mono text-slate-700 dark:text-slate-300"><i data-lucide="history" class="w-4 h-4 text-indigo-500"></i> HISTORY</h4>
        <div id="sci-history" class="flex-1 overflow-y-auto space-y-2 text-sm text-slate-500 dark:text-slate-400 font-mono">No calculations yet.</div>
      </div>
    </div>
  `;
}

function getGstCalcHTML() {
  return `
    <div class="max-w-2xl mx-auto space-y-8 bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-950 border border-slate-200/50 dark:border-slate-800 rounded-3xl shadow-2xl p-5 sm:p-8 md:p-10 relative">
      <div class="absolute top-0 right-10 w-20 h-32 bg-indigo-500/10 dark:bg-indigo-500/5 rounded-b-full blur-xl"></div>
      
      <div class="flex items-center gap-4 mb-4 relative z-10">
        <div class="w-14 h-14 rounded-2xl bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shadow-inner">
           <i data-lucide="receipt" class="w-7 h-7"></i>
        </div>
        <div>
          <h3 class="font-extrabold text-2xl text-slate-800 dark:text-slate-200">GST Invoice</h3>
          <p class="text-sm text-slate-500">Tax inclusion calculator</p>
        </div>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-100/50 dark:bg-slate-800/30 p-6 rounded-3xl border border-slate-200/50 dark:border-slate-700/50 relative z-10">
        <div>
          <label class="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-3 uppercase tracking-wider ml-2">Net Base Price</label>
          <div class="relative">
            <span class="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-lg">$</span>
            <input type="number" id="gst-net" placeholder="1000" class="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl pl-10 pr-5 py-4 font-mono text-xl text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm transition-all">
          </div>
        </div>
        <div>
          <label class="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-3 uppercase tracking-wider ml-2">Tax Rate (GST)</label>
          <div class="relative">
            <select id="gst-rate" class="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl px-5 py-4 font-bold text-lg text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm appearance-none cursor-pointer">
               <option value="5">5% Standard</option>
               <option value="12">12% Medium</option>
               <option value="18" selected>18% Premium</option>
               <option value="28">28% Luxury</option>
            </select>
            <div class="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
               <i data-lucide="chevron-down" class="w-5 h-5"></i>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Receipt Section -->
      <div class="mt-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-700 p-5 sm:p-8 shadow-lg relative overflow-hidden text-center z-10">
         <div class="absolute left-0 right-0 top-0 h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-50"></div>
         <div class="grid grid-cols-1 md:grid-cols-2 gap-8 divide-y md:divide-y-0 md:divide-x divide-dashed divide-slate-200 dark:divide-slate-700">
           <div class="pt-4 md:pt-0 flex flex-col items-center justify-center">
             <div class="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-2 flex items-center gap-1"><i data-lucide="plus-circle" class="w-3 h-3 text-rose-500"></i> Tax Amount</div>
             <div id="gst-amount" class="font-mono text-3xl font-bold text-rose-500">--</div>
           </div>
           <div class="pt-8 md:pt-0 flex flex-col items-center justify-center">
             <div class="text-xs text-indigo-500 font-bold uppercase tracking-widest mb-2 flex items-center gap-1"><i data-lucide="check-circle" class="w-4 h-4"></i> Final Total</div>
             <div id="gst-total" class="font-mono text-5xl font-black text-slate-800 dark:text-slate-100 tracking-tight drop-shadow-sm">--</div>
           </div>
         </div>
      </div>
    </div>
  `;
}


function getCompoundCalcHTML() {
  return `
    <div class="max-w-2xl mx-auto space-y-6">
      <div class="bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-950 border border-slate-200/50 dark:border-slate-800 rounded-3xl shadow-2xl p-4 sm:p-6 md:p-8">
        <h3 class="font-extrabold text-2xl text-slate-800 dark:text-slate-200 mb-6 text-center">Compound Interest</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-bold text-slate-500 uppercase mb-2">Principal Amount</label>
            <input type="number" id="comp-p" class="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 font-mono text-slate-800 dark:text-slate-200 outline-none">
          </div>
          <div>
            <label class="block text-xs font-bold text-slate-500 uppercase mb-2">Annual Interest Rate (%)</label>
            <input type="number" id="comp-r" class="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 font-mono text-slate-800 dark:text-slate-200 outline-none">
          </div>
          <div>
            <label class="block text-xs font-bold text-slate-500 uppercase mb-2">Time (Years)</label>
            <input type="number" id="comp-t" class="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 font-mono text-slate-800 dark:text-slate-200 outline-none">
          </div>
          <div>
            <label class="block text-xs font-bold text-slate-500 uppercase mb-2">Compounding Frequency</label>
            <select id="comp-n" class="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 font-mono text-slate-800 dark:text-slate-200 outline-none">
              <option value="1">Annually (1/yr)</option>
              <option value="2">Semi-Annually (2/yr)</option>
              <option value="4">Quarterly (4/yr)</option>
              <option value="12" selected>Monthly (12/yr)</option>
              <option value="365">Daily (365/yr)</option>
            </select>
          </div>
        </div>
        <div class="mt-6">
          <button id="comp-btn" class="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-lg shadow-indigo-600/20">Calculate</button>
        </div>
        
        <div id="comp-result" class="hidden mt-6 bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800">
          <div class="text-center mb-4">
            <div class="text-xs text-slate-500 font-bold uppercase tracking-widest mb-1">Total Future Value</div>
            <div id="comp-tot" class="text-3xl font-extrabold text-indigo-600 dark:text-indigo-400">--</div>
          </div>
          <div class="flex justify-between border-t border-slate-200 dark:border-slate-700 pt-4 px-4 text-sm font-mono">
            <div class="text-slate-500">Principal: <span id="comp-p-res" class="font-bold text-slate-700 dark:text-slate-300">--</span></div>
            <div class="text-slate-500">Total Interest: <span id="comp-int" class="font-bold text-emerald-600 dark:text-emerald-500">--</span></div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function getTipCalcHTML() {
  return `
    <div class="max-w-2xl mx-auto space-y-6">
      <div class="bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-950 border border-slate-200/50 dark:border-slate-800 rounded-3xl shadow-2xl p-4 sm:p-6 md:p-8">
        <h3 class="font-extrabold text-2xl text-slate-800 dark:text-slate-200 mb-6 text-center">Tip & Split Bill</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div class="sm:col-span-2">
            <label class="block text-xs font-bold text-slate-500 uppercase mb-2">Bill Amount</label>
            <input type="number" id="tip-bill" class="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 font-mono text-2xl text-slate-800 dark:text-slate-200 outline-none text-center" placeholder="0.00">
          </div>
          <div>
            <label class="block text-xs font-bold text-slate-500 uppercase mb-2">Tip %</label>
            <div class="flex items-center gap-2">
              <input type="range" id="tip-perc-range" min="0" max="50" step="1" value="15" class="flex-1 accent-indigo-600">
              <input type="number" id="tip-perc" value="15" class="w-16 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-2 py-2 font-mono text-center text-slate-800 dark:text-slate-200 outline-none">
            </div>
          </div>
          <div>
            <label class="block text-xs font-bold text-slate-500 uppercase mb-2">Number of People</label>
            <div class="flex items-center gap-2">
              <button id="tip-minus" class="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold hover:bg-slate-200 dark:hover:bg-slate-700">-</button>
              <input type="number" id="tip-people" value="1" min="1" class="flex-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-2 py-2 font-mono text-center text-slate-800 dark:text-slate-200 outline-none">
              <button id="tip-plus" class="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold hover:bg-slate-200 dark:hover:bg-slate-700">+</button>
            </div>
          </div>
        </div>
        
        <div class="mt-8 grid grid-cols-2 gap-4">
          <div class="bg-indigo-50 dark:bg-indigo-900/20 p-5 rounded-2xl border border-indigo-100 dark:border-indigo-800/30 text-center">
            <div class="text-[10px] text-indigo-600 dark:text-indigo-400 font-bold uppercase tracking-widest mb-1">Tip per Person</div>
            <div id="tip-per-person" class="text-2xl font-bold text-indigo-700 dark:text-indigo-300">$0.00</div>
          </div>
          <div class="bg-emerald-50 dark:bg-emerald-900/20 p-5 rounded-2xl border border-emerald-100 dark:border-emerald-800/30 text-center">
            <div class="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-widest mb-1">Total per Person</div>
            <div id="total-per-person" class="text-2xl font-bold text-emerald-700 dark:text-emerald-300">$0.00</div>
          </div>
        </div>
        <div class="text-center mt-4 text-xs font-mono text-slate-500">
          Total Bill with Tip: <span id="tip-total-bill" class="font-bold text-slate-700 dark:text-slate-300">$0.00</span>
        </div>
      </div>
    </div>
  `;
}


function getProgrammerCalcHTML() {
  return `
    <div class="max-w-2xl mx-auto space-y-6">
      <div class="bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-950 border border-slate-200/50 dark:border-slate-800 rounded-3xl shadow-2xl p-4 sm:p-6 md:p-8">
        <h3 class="font-extrabold text-2xl text-slate-800 dark:text-slate-200 mb-6 text-center">Programmer Base Converter</h3>
        <p class="text-sm text-slate-500 text-center mb-6">Type in any field to auto-convert to all other bases.</p>
        
        <div class="space-y-4">
          <div class="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-700/80">
            <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 text-indigo-500">HEX (Base 16)</label>
            <input type="text" id="prog-hex" class="w-full bg-transparent font-mono text-xl text-slate-800 dark:text-slate-200 outline-none uppercase placeholder-slate-300 dark:placeholder-slate-700" placeholder="0">
          </div>
          
          <div class="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-700/80">
            <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 text-emerald-500">DEC (Base 10)</label>
            <input type="number" id="prog-dec" class="w-full bg-transparent font-mono text-xl text-slate-800 dark:text-slate-200 outline-none placeholder-slate-300 dark:placeholder-slate-700" placeholder="0">
          </div>
          
          <div class="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-700/80">
            <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 text-amber-500">OCT (Base 8)</label>
            <input type="number" id="prog-oct" class="w-full bg-transparent font-mono text-xl text-slate-800 dark:text-slate-200 outline-none placeholder-slate-300 dark:placeholder-slate-700" placeholder="0">
          </div>
          
          <div class="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 overflow-x-auto scrollbar-hidden">
            <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 text-rose-500">BIN (Base 2)</label>
            <input type="number" id="prog-bin" class="w-full bg-transparent font-mono text-xl text-slate-800 dark:text-slate-200 outline-none placeholder-slate-300 dark:placeholder-slate-700 min-w-[200px]" placeholder="0">
          </div>
        </div>
      </div>
    </div>
  `;
}

function getTdeeCalcHTML() {
  return `
    <div class="max-w-2xl mx-auto space-y-6">
      <div class="bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-950 border border-slate-200/50 dark:border-slate-800 rounded-3xl shadow-2xl p-4 sm:p-6 md:p-8">
        <h3 class="font-extrabold text-2xl text-slate-800 dark:text-slate-200 mb-6 text-center">TDEE & Calories</h3>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div class="sm:col-span-2">
            <label class="block text-xs font-bold text-slate-500 uppercase mb-2">Gender</label>
            <div class="flex border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
              <label class="flex-1 cursor-pointer bg-slate-50 dark:bg-slate-800 px-4 py-3 flex items-center justify-center font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700">
                <input type="radio" name="tdee-gender" value="male" checked class="mr-2"> Male
              </label>
              <label class="flex-1 cursor-pointer bg-slate-50 dark:bg-slate-800 px-4 py-3 flex items-center justify-center font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border-l border-slate-200 dark:border-slate-700">
                <input type="radio" name="tdee-gender" value="female" class="mr-2"> Female
              </label>
            </div>
          </div>
          <div>
            <label class="block text-xs font-bold text-slate-500 uppercase mb-2">Age (Years)</label>
            <input type="number" id="tdee-age" class="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 font-mono text-slate-800 dark:text-slate-200 outline-none">
          </div>
          <div>
            <label class="block text-xs font-bold text-slate-500 uppercase mb-2">Weight (kg)</label>
            <input type="number" id="tdee-weight" class="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 font-mono text-slate-800 dark:text-slate-200 outline-none">
          </div>
          <div class="sm:col-span-2">
            <label class="block text-xs font-bold text-slate-500 uppercase mb-2">Height (cm)</label>
            <input type="number" id="tdee-height" class="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 font-mono text-slate-800 dark:text-slate-200 outline-none">
          </div>
          <div class="sm:col-span-2">
            <label class="block text-xs font-bold text-slate-500 uppercase mb-2">Activity Level</label>
            <select id="tdee-activity" class="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm font-semibold text-slate-800 dark:text-slate-200 outline-none">
              <option value="1.2">Sedentary (Little or no exercise)</option>
              <option value="1.375">Lightly active (Light exercise/sports 1-3 days/week)</option>
              <option value="1.55" selected>Moderately active (Moderate exercise/sports 3-5 days/week)</option>
              <option value="1.725">Very active (Hard exercise/sports 6-7 days a week)</option>
              <option value="1.9">Extra active (Very hard exercise/sports & physical job)</option>
            </select>
          </div>
        </div>
        
        <div class="mt-6">
          <button id="tdee-btn" class="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-lg shadow-indigo-600/20">Calculate TDEE</button>
        </div>
        
        <div id="tdee-result" class="hidden mt-8 space-y-4">
          <div class="bg-indigo-50 dark:bg-indigo-900/20 p-6 rounded-2xl border border-indigo-100 dark:border-indigo-800/30 text-center">
            <div class="text-[10px] text-indigo-500 dark:text-indigo-400 font-bold uppercase tracking-widest mb-1">Maintenance Calories</div>
            <div id="tdee-maint" class="text-4xl font-black text-indigo-600 dark:text-indigo-400 font-mono tracking-tight">--</div>
            <p class="text-xs text-indigo-500/70 mt-2 font-bold">Calories/day to maintain weight</p>
          </div>
          <div class="grid grid-cols-2 gap-4 text-center">
            <div class="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-2xl border border-emerald-100 dark:border-emerald-800/30">
               <div class="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-widest mb-1">Cutting (Lose)</div>
               <div id="tdee-cut" class="text-xl font-bold text-emerald-700 dark:text-emerald-300 font-mono">--</div>
               <div class="text-[9px] text-emerald-600/60 mt-1 uppercase font-bold">-500 kcal</div>
            </div>
            <div class="bg-rose-50 dark:bg-rose-900/20 p-4 rounded-2xl border border-rose-100 dark:border-rose-800/30">
               <div class="text-[10px] text-rose-600 dark:text-rose-400 font-bold uppercase tracking-widest mb-1">Bulking (Gain)</div>
               <div id="tdee-bulk" class="text-xl font-bold text-rose-700 dark:text-rose-300 font-mono">--</div>
               <div class="text-[9px] text-rose-600/60 mt-1 uppercase font-bold">+500 kcal</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function getFuelCalcHTML() {
  return `
    <div class="max-w-2xl mx-auto space-y-6">
      <div class="bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-950 border border-slate-200/50 dark:border-slate-800 rounded-3xl shadow-2xl p-4 sm:p-6 md:p-8">
        <h3 class="font-extrabold text-2xl text-slate-800 dark:text-slate-200 mb-6 text-center">Fuel & Trip Cost</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-bold text-slate-500 uppercase mb-2">Trip Distance (km/miles)</label>
            <input type="number" id="fuel-dist" class="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 font-mono text-slate-800 dark:text-slate-200 outline-none">
          </div>
          <div>
            <label class="block text-xs font-bold text-slate-500 uppercase mb-2">Fuel Efficiency (km/L or mpg)</label>
            <input type="number" id="fuel-eff" class="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 font-mono text-slate-800 dark:text-slate-200 outline-none">
          </div>
          <div class="sm:col-span-2">
            <label class="block text-xs font-bold text-slate-500 uppercase mb-2">Fuel Price per Unit</label>
            <input type="number" id="fuel-price" class="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 font-mono text-slate-800 dark:text-slate-200 outline-none">
          </div>
        </div>
        
        <div class="mt-6">
          <button id="fuel-btn" class="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-lg shadow-indigo-600/20">Calculate Trip</button>
        </div>
        
        <div id="fuel-result" class="hidden mt-8 grid grid-cols-2 gap-4">
          <div class="bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 text-center">
            <div class="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Fuel Required</div>
            <div class="text-2xl font-bold text-slate-800 dark:text-slate-200 font-mono"><span id="fuel-req">--</span> <span class="text-xs text-slate-500">Units</span></div>
          </div>
          <div class="bg-indigo-50 dark:bg-indigo-900/20 p-5 rounded-2xl border border-indigo-100 dark:border-indigo-800/30 text-center">
            <div class="text-[10px] text-indigo-600 dark:text-indigo-400 font-bold uppercase tracking-widest mb-1">Total Cost</div>
            <div id="fuel-cost" class="text-2xl font-black text-indigo-700 dark:text-indigo-300 font-mono">--</div>
          </div>
        </div>
      </div>
    </div>
  `;
}


function getDateCalcHTML() {
  return `
    <div class="max-w-2xl mx-auto space-y-6">
      <div class="bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-950 border border-slate-200/50 dark:border-slate-800 rounded-3xl shadow-2xl p-4 sm:p-6 md:p-8">
        <h3 class="font-extrabold text-2xl text-slate-800 dark:text-slate-200 mb-6 text-center">Date Difference</h3>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-bold text-slate-500 uppercase mb-2">Start Date</label>
            <input type="date" id="date-start" class="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 font-mono text-slate-800 dark:text-slate-200 outline-none">
          </div>
          <div>
            <label class="block text-xs font-bold text-slate-500 uppercase mb-2">End Date</label>
            <input type="date" id="date-end" class="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 font-mono text-slate-800 dark:text-slate-200 outline-none">
          </div>
        </div>
        
        <div class="mt-6">
          <button id="date-btn" class="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-lg shadow-indigo-600/20">Calculate Difference</button>
        </div>
        
        <div id="date-result" class="hidden mt-8 space-y-4">
          <div class="bg-indigo-50 dark:bg-indigo-900/20 p-6 rounded-2xl border border-indigo-100 dark:border-indigo-800/30 text-center">
            <div class="text-[10px] text-indigo-500 dark:text-indigo-400 font-bold uppercase tracking-widest mb-1">Difference</div>
            <div id="date-diff-main" class="text-3xl font-black text-indigo-600 dark:text-indigo-400 font-mono tracking-tight">--</div>
          </div>
          <div class="grid grid-cols-3 gap-3 text-center">
            <div class="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800">
               <div id="date-diff-days" class="text-xl font-bold text-slate-700 dark:text-slate-300 font-mono">--</div>
               <div class="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Days</div>
            </div>
            <div class="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800">
               <div id="date-diff-weeks" class="text-xl font-bold text-slate-700 dark:text-slate-300 font-mono">--</div>
               <div class="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Weeks</div>
            </div>
            <div class="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800">
               <div id="date-diff-months" class="text-xl font-bold text-slate-700 dark:text-slate-300 font-mono">--</div>
               <div class="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Months</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function getSalaryCalcHTML() {
  return `
    <div class="max-w-2xl mx-auto space-y-6">
      <div class="bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-950 border border-slate-200/50 dark:border-slate-800 rounded-3xl shadow-2xl p-4 sm:p-6 md:p-8">
        <h3 class="font-extrabold text-2xl text-slate-800 dark:text-slate-200 mb-6 text-center">Salary & Wage Converter</h3>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div class="sm:col-span-2">
            <label class="block text-xs font-bold text-slate-500 uppercase mb-2">Amount</label>
            <div class="relative">
              <span class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
              <input type="number" id="sal-amt" class="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl pl-8 pr-4 py-3 font-mono text-xl text-slate-800 dark:text-slate-200 outline-none">
            </div>
          </div>
          <div>
            <label class="block text-xs font-bold text-slate-500 uppercase mb-2">Current Frequency</label>
            <select id="sal-freq" class="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 font-semibold text-slate-800 dark:text-slate-200 outline-none">
              <option value="hourly">Hourly</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="yearly" selected>Yearly</option>
            </select>
          </div>
          <div>
            <label class="block text-xs font-bold text-slate-500 uppercase mb-2">Hours per Week</label>
            <input type="number" id="sal-hours" value="40" class="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 font-mono text-slate-800 dark:text-slate-200 outline-none">
          </div>
        </div>
        
        <div class="mt-6">
          <button id="sal-btn" class="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold shadow-lg shadow-emerald-600/20">Convert Salary</button>
        </div>
        
        <div id="sal-result" class="hidden mt-8 grid grid-cols-2 gap-4">
          <div class="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 text-center">
            <div class="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Hourly</div>
            <div id="sal-res-hourly" class="text-xl font-bold text-slate-700 dark:text-slate-300 font-mono">--</div>
          </div>
          <div class="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 text-center">
            <div class="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Daily</div>
            <div id="sal-res-daily" class="text-xl font-bold text-slate-700 dark:text-slate-300 font-mono">--</div>
          </div>
          <div class="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 text-center">
            <div class="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Weekly</div>
            <div id="sal-res-weekly" class="text-xl font-bold text-slate-700 dark:text-slate-300 font-mono">--</div>
          </div>
          <div class="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 text-center">
            <div class="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Monthly</div>
            <div id="sal-res-monthly" class="text-xl font-bold text-slate-700 dark:text-slate-300 font-mono">--</div>
          </div>
          <div class="col-span-2 bg-emerald-50 dark:bg-emerald-900/20 p-5 rounded-2xl border border-emerald-100 dark:border-emerald-800/30 text-center">
            <div class="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-widest mb-1">Yearly Salary</div>
            <div id="sal-res-yearly" class="text-3xl font-black text-emerald-700 dark:text-emerald-300 font-mono">--</div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function getRatioCalcHTML() {
  return `
    <div class="max-w-2xl mx-auto space-y-6">
      <div class="bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-950 border border-slate-200/50 dark:border-slate-800 rounded-3xl shadow-2xl p-4 sm:p-6 md:p-8">
        <h3 class="font-extrabold text-2xl text-slate-800 dark:text-slate-200 mb-6 text-center">Ratio Calculator</h3>
        
        <p class="text-sm text-slate-500 text-center mb-6">Solve for a missing value (A : B = C : D). Leave exactly one field empty.</p>
        
        <div class="flex items-center justify-center gap-2 sm:gap-4 text-xl sm:text-2xl font-bold text-slate-400">
          <input type="number" id="ratio-a" class="w-20 sm:w-28 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-2 py-3 font-mono text-center text-slate-800 dark:text-slate-200 outline-none placeholder-slate-300 dark:placeholder-slate-700 transition-colors focus:border-indigo-500" placeholder="A">
          <span>:</span>
          <input type="number" id="ratio-b" class="w-20 sm:w-28 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-2 py-3 font-mono text-center text-slate-800 dark:text-slate-200 outline-none placeholder-slate-300 dark:placeholder-slate-700 transition-colors focus:border-indigo-500" placeholder="B">
        </div>
        
        <div class="text-center font-bold text-slate-400 my-4">=</div>
        
        <div class="flex items-center justify-center gap-2 sm:gap-4 text-xl sm:text-2xl font-bold text-slate-400">
          <input type="number" id="ratio-c" class="w-20 sm:w-28 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-2 py-3 font-mono text-center text-slate-800 dark:text-slate-200 outline-none placeholder-slate-300 dark:placeholder-slate-700 transition-colors focus:border-indigo-500" placeholder="C">
          <span>:</span>
          <input type="number" id="ratio-d" class="w-20 sm:w-28 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-2 py-3 font-mono text-center text-slate-800 dark:text-slate-200 outline-none placeholder-slate-300 dark:placeholder-slate-700 transition-colors focus:border-indigo-500" placeholder="D">
        </div>
        
        <div class="mt-8">
          <button id="ratio-btn" class="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-lg shadow-indigo-600/20">Calculate Missing Value</button>
        </div>
        <div class="mt-4 text-center">
          <button id="ratio-clear" class="text-sm text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 font-semibold transition-colors">Clear All</button>
        </div>
      </div>
    </div>
  `;
}


function getRandomCalcHTML() {
  return `
    <div class="max-w-2xl mx-auto space-y-6">
      <div class="bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-950 border border-slate-200/50 dark:border-slate-800 rounded-3xl shadow-2xl p-4 sm:p-6 md:p-8">
        <h3 class="font-extrabold text-2xl text-slate-800 dark:text-slate-200 mb-6 text-center">Random Number Generator</h3>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-bold text-slate-500 uppercase mb-2">Minimum Value</label>
            <input type="number" id="rand-min" value="1" class="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 font-mono text-slate-800 dark:text-slate-200 outline-none">
          </div>
          <div>
            <label class="block text-xs font-bold text-slate-500 uppercase mb-2">Maximum Value</label>
            <input type="number" id="rand-max" value="100" class="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 font-mono text-slate-800 dark:text-slate-200 outline-none">
          </div>
        </div>
        
        <div class="mt-6">
          <button id="rand-btn" class="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-lg shadow-indigo-600/20">Generate</button>
        </div>
        
        <div class="mt-8 bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 text-center">
          <div class="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Result</div>
          <div id="rand-res" class="text-6xl font-black text-indigo-600 dark:text-indigo-400 font-mono tracking-tight transition-all duration-300 transform scale-100">--</div>
        </div>
      </div>
    </div>
  `;
}

function getRule72CalcHTML() {
  return `
    <div class="max-w-2xl mx-auto space-y-6">
      <div class="bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-950 border border-slate-200/50 dark:border-slate-800 rounded-3xl shadow-2xl p-4 sm:p-6 md:p-8">
        <h3 class="font-extrabold text-2xl text-slate-800 dark:text-slate-200 mb-6 text-center">Rule of 72 (Doubling Time)</h3>
        
        <p class="text-sm text-slate-500 text-center mb-6">Estimate how long it takes for an investment to double at a fixed annual rate of return.</p>
        
        <div class="bg-slate-50 dark:bg-slate-900/50 p-4 sm:p-6 rounded-2xl border border-slate-200/80 dark:border-slate-700/80">
          <label class="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Annual Interest Rate (%)</label>
          <div class="relative">
            <input type="number" id="rule72-rate" class="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 font-mono text-xl text-slate-800 dark:text-slate-200 outline-none" placeholder="e.g. 8">
            <span class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">%</span>
          </div>
        </div>
        
        <div class="mt-6">
          <button id="rule72-btn" class="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-lg shadow-indigo-600/20">Calculate</button>
        </div>
        
        <div id="rule72-result" class="hidden mt-8 text-center space-y-2">
          <div class="bg-emerald-50 dark:bg-emerald-900/20 p-6 rounded-2xl border border-emerald-100 dark:border-emerald-800/30">
            <div class="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-widest mb-1">Time to Double</div>
            <div id="rule72-time" class="text-4xl font-black text-emerald-700 dark:text-emerald-300 font-mono tracking-tight">--</div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function initCalculatorLogic(calcId) {
  
  
  if (calcId === 'compound') {
    const pEl = document.getElementById('comp-p');
    const rEl = document.getElementById('comp-r');
    const tEl = document.getElementById('comp-t');
    const nEl = document.getElementById('comp-n');
    const btn = document.getElementById('comp-btn');
    const resDiv = document.getElementById('comp-result');
    
    btn.addEventListener('click', () => {
      const p = parseFloat(pEl.value);
      const r = parseFloat(rEl.value) / 100;
      const t = parseFloat(tEl.value);
      const n = parseFloat(nEl.value);
      
      if(isNaN(p) || isNaN(r) || isNaN(t)) return;
      
      const a = p * Math.pow(1 + (r / n), n * t);
      const interest = a - p;
      
      resDiv.classList.remove('hidden');
      document.getElementById('comp-tot').innerText = a.toLocaleString('en-US', {style:'currency', currency:'USD'});
      document.getElementById('comp-p-res').innerText = p.toLocaleString('en-US', {style:'currency', currency:'USD'});
      document.getElementById('comp-int').innerText = interest.toLocaleString('en-US', {style:'currency', currency:'USD'});
    });
  }
  
  if (calcId === 'tip') {
    const billEl = document.getElementById('tip-bill');
    const percRangeEl = document.getElementById('tip-perc-range');
    const percEl = document.getElementById('tip-perc');
    const peopleEl = document.getElementById('tip-people');
    
    const updateTip = () => {
      const bill = parseFloat(billEl.value) || 0;
      const perc = parseFloat(percEl.value) || 0;
      const people = parseInt(peopleEl.value) || 1;
      
      const totalTip = bill * (perc / 100);
      const totalBill = bill + totalTip;
      const tipPerPerson = totalTip / people;
      const totalPerPerson = totalBill / people;
      
      document.getElementById('tip-per-person').innerText = tipPerPerson.toLocaleString('en-US', {style:'currency', currency:'USD'});
      document.getElementById('total-per-person').innerText = totalPerPerson.toLocaleString('en-US', {style:'currency', currency:'USD'});
      document.getElementById('tip-total-bill').innerText = totalBill.toLocaleString('en-US', {style:'currency', currency:'USD'});
    };
    
    percRangeEl.addEventListener('input', (e) => {
      percEl.value = e.target.value;
      updateTip();
    });
    
    percEl.addEventListener('input', (e) => {
      percRangeEl.value = e.target.value;
      updateTip();
    });
    
    document.getElementById('tip-minus').addEventListener('click', () => {
      let p = parseInt(peopleEl.value) || 1;
      if (p > 1) {
        peopleEl.value = p - 1;
        updateTip();
      }
    });
    
    document.getElementById('tip-plus').addEventListener('click', () => {
      let p = parseInt(peopleEl.value) || 1;
      peopleEl.value = p + 1;
      updateTip();
    });
    
    billEl.addEventListener('input', updateTip);
    peopleEl.addEventListener('input', updateTip);
  }

  
  if (calcId === 'programmer') {
    const hEl = document.getElementById('prog-hex');
    const dEl = document.getElementById('prog-dec');
    const oEl = document.getElementById('prog-oct');
    const bEl = document.getElementById('prog-bin');
    
    const updateProg = (source) => {
      let dec = 0;
      let valid = true;
      try {
        if (source === 'hex' && hEl.value !== '') dec = parseInt(hEl.value, 16);
        else if (source === 'dec' && dEl.value !== '') dec = parseInt(dEl.value, 10);
        else if (source === 'oct' && oEl.value !== '') dec = parseInt(oEl.value, 8);
        else if (source === 'bin' && bEl.value !== '') dec = parseInt(bEl.value, 2);
        else valid = false;
        
        if (isNaN(dec)) valid = false;
      } catch(e) { valid = false; }
      
      if (valid) {
        if (source !== 'hex') hEl.value = dec.toString(16).toUpperCase();
        if (source !== 'dec') dEl.value = dec.toString(10);
        if (source !== 'oct') oEl.value = dec.toString(8);
        if (source !== 'bin') bEl.value = dec.toString(2);
      } else {
        if (source !== 'hex') hEl.value = '';
        if (source !== 'dec') dEl.value = '';
        if (source !== 'oct') oEl.value = '';
        if (source !== 'bin') bEl.value = '';
      }
    };
    
    hEl.addEventListener('input', () => updateProg('hex'));
    dEl.addEventListener('input', () => updateProg('dec'));
    oEl.addEventListener('input', () => updateProg('oct'));
    bEl.addEventListener('input', () => updateProg('bin'));
  }
  
  if (calcId === 'tdee') {
    const ageEl = document.getElementById('tdee-age');
    const weightEl = document.getElementById('tdee-weight');
    const heightEl = document.getElementById('tdee-height');
    const actEl = document.getElementById('tdee-activity');
    const btn = document.getElementById('tdee-btn');
    const resDiv = document.getElementById('tdee-result');
    
    btn.addEventListener('click', () => {
      const isMale = document.querySelector('input[name="tdee-gender"]:checked').value === 'male';
      const a = parseFloat(ageEl.value);
      const w = parseFloat(weightEl.value);
      const h = parseFloat(heightEl.value);
      const act = parseFloat(actEl.value);
      
      if(isNaN(a) || isNaN(w) || isNaN(h)) return;
      
      // Mifflin-St Jeor Equation
      let bmr = (10 * w) + (6.25 * h) - (5 * a);
      bmr += isMale ? 5 : -161;
      
      const maint = Math.round(bmr * act);
      
      resDiv.classList.remove('hidden');
      document.getElementById('tdee-maint').innerText = maint.toLocaleString();
      document.getElementById('tdee-cut').innerText = (maint - 500).toLocaleString();
      document.getElementById('tdee-bulk').innerText = (maint + 500).toLocaleString();
    });
  }
  
  if (calcId === 'fuel') {
    const distEl = document.getElementById('fuel-dist');
    const effEl = document.getElementById('fuel-eff');
    const priceEl = document.getElementById('fuel-price');
    const btn = document.getElementById('fuel-btn');
    const resDiv = document.getElementById('fuel-result');
    
    btn.addEventListener('click', () => {
      const d = parseFloat(distEl.value);
      const e = parseFloat(effEl.value);
      const p = parseFloat(priceEl.value);
      
      if(isNaN(d) || isNaN(e) || isNaN(p)) return;
      
      // assuming distance / efficiency (e.g. km / (km/L) = L)
      const req = d / e;
      const cost = req * p;
      
      resDiv.classList.remove('hidden');
      document.getElementById('fuel-req').innerText = req.toFixed(2);
      document.getElementById('fuel-cost').innerText = cost.toLocaleString('en-US', {style:'currency', currency:'USD'});
    });
  }

  
  if (calcId === 'salary') {
    const amtEl = document.getElementById('sal-amt');
    const freqEl = document.getElementById('sal-freq');
    const hoursEl = document.getElementById('sal-hours');
    const btn = document.getElementById('sal-btn');
    const resDiv = document.getElementById('sal-result');
    
    btn.addEventListener('click', () => {
      const amt = parseFloat(amtEl.value);
      const freq = freqEl.value;
      const hours = parseFloat(hoursEl.value) || 40;
      
      if(isNaN(amt)) return;
      
      let hourly = 0;
      const weeksPerYear = 52;
      const hoursPerYear = hours * weeksPerYear;
      
      if(freq === 'hourly') hourly = amt;
      else if(freq === 'daily') hourly = amt / (hours / 5);
      else if(freq === 'weekly') hourly = amt / hours;
      else if(freq === 'monthly') hourly = (amt * 12) / hoursPerYear;
      else if(freq === 'yearly') hourly = amt / hoursPerYear;
      
      const daily = hourly * (hours / 5);
      const weekly = hourly * hours;
      const monthly = (hourly * hoursPerYear) / 12;
      const yearly = hourly * hoursPerYear;
      
      resDiv.classList.remove('hidden');
      document.getElementById('sal-res-hourly').innerText = hourly.toLocaleString('en-US', {style:'currency', currency:'USD'});
      document.getElementById('sal-res-daily').innerText = daily.toLocaleString('en-US', {style:'currency', currency:'USD'});
      document.getElementById('sal-res-weekly').innerText = weekly.toLocaleString('en-US', {style:'currency', currency:'USD'});
      document.getElementById('sal-res-monthly').innerText = monthly.toLocaleString('en-US', {style:'currency', currency:'USD'});
      document.getElementById('sal-res-yearly').innerText = yearly.toLocaleString('en-US', {style:'currency', currency:'USD'});
    });
  }

  if (calcId === 'ratio') {
    const aEl = document.getElementById('ratio-a');
    const bEl = document.getElementById('ratio-b');
    const cEl = document.getElementById('ratio-c');
    const dEl = document.getElementById('ratio-d');
    const btn = document.getElementById('ratio-btn');
    const clearBtn = document.getElementById('ratio-clear');
    
    btn.addEventListener('click', () => {
      const a = aEl.value !== '' ? parseFloat(aEl.value) : null;
      const b = bEl.value !== '' ? parseFloat(bEl.value) : null;
      const c = cEl.value !== '' ? parseFloat(cEl.value) : null;
      const d = dEl.value !== '' ? parseFloat(dEl.value) : null;
      
      let emptyCount = 0;
      if (a === null) emptyCount++;
      if (b === null) emptyCount++;
      if (c === null) emptyCount++;
      if (d === null) emptyCount++;
      
      if (emptyCount !== 1) {
        // avoid window.alert in iframe, just update placeholder or return
        return;
      }
      
      // A / B = C / D => A * D = B * C
      if (a === null) {
        aEl.value = Number(((b * c) / d).toFixed(4)).toString();
        aEl.classList.add('text-indigo-600', 'dark:text-indigo-400');
      } else if (b === null) {
        bEl.value = Number(((a * d) / c).toFixed(4)).toString();
        bEl.classList.add('text-indigo-600', 'dark:text-indigo-400');
      } else if (c === null) {
        cEl.value = Number(((a * d) / b).toFixed(4)).toString();
        cEl.classList.add('text-indigo-600', 'dark:text-indigo-400');
      } else if (d === null) {
        dEl.value = Number(((b * c) / a).toFixed(4)).toString();
        dEl.classList.add('text-indigo-600', 'dark:text-indigo-400');
      }
    });
    
    clearBtn.addEventListener('click', () => {
      aEl.value = ''; bEl.value = ''; cEl.value = ''; dEl.value = '';
      [aEl, bEl, cEl, dEl].forEach(el => el.classList.remove('text-indigo-600', 'dark:text-indigo-400'));
    });
    
    [aEl, bEl, cEl, dEl].forEach(el => {
      el.addEventListener('input', () => el.classList.remove('text-indigo-600', 'dark:text-indigo-400'));
    });
  }

  
  if (calcId === 'random') {
    const minEl = document.getElementById('rand-min');
    const maxEl = document.getElementById('rand-max');
    const btn = document.getElementById('rand-btn');
    const resEl = document.getElementById('rand-res');
    
    btn.addEventListener('click', () => {
      const min = parseInt(minEl.value);
      const max = parseInt(maxEl.value);
      
      if(isNaN(min) || isNaN(max) || min > max) {
        resEl.innerText = 'Err';
        return;
      }
      
      resEl.classList.remove('scale-100');
      resEl.classList.add('scale-110', 'text-indigo-400');
      
      setTimeout(() => {
        const rand = Math.floor(Math.random() * (max - min + 1)) + min;
        resEl.innerText = rand;
        resEl.classList.remove('scale-110', 'text-indigo-400');
        resEl.classList.add('scale-100');
      }, 150);
    });
  }
  
  if (calcId === 'rule72') {
    const rateEl = document.getElementById('rule72-rate');
    const btn = document.getElementById('rule72-btn');
    const resDiv = document.getElementById('rule72-result');
    const timeEl = document.getElementById('rule72-time');
    
    btn.addEventListener('click', () => {
      const r = parseFloat(rateEl.value);
      if(isNaN(r) || r <= 0) return;
      
      const time = 72 / r;
      
      resDiv.classList.remove('hidden');
      timeEl.innerText = time.toFixed(1) + ' Years';
    });
  }

  if (calcId === 'scientific') {
    const exprEl = document.getElementById('sci-expr');
    const resEl = document.getElementById('sci-res');
    const histEl = document.getElementById('sci-history');
    const keys = document.querySelectorAll('#sci-keys button');
    
    let currentInput = '0';
    let expression = '';
    let shouldReset = false;
    let angleMode = 'deg'; // 'deg' or 'rad'
    
    const degBtn = document.querySelector('#angle-mode-toggle button[data-mode="deg"]');
    const radBtn = document.querySelector('#angle-mode-toggle button[data-mode="rad"]');
    
    const setAngleMode = (mode) => {
      angleMode = mode;
      if(mode === 'deg') {
        degBtn.classList.remove('opacity-50');
        degBtn.classList.add('bg-indigo-100', 'text-indigo-700', 'dark:bg-indigo-900/50', 'dark:text-indigo-300');
        radBtn.classList.add('opacity-50');
        radBtn.classList.remove('bg-indigo-100', 'text-indigo-700', 'dark:bg-indigo-900/50', 'dark:text-indigo-300');
      } else {
        radBtn.classList.remove('opacity-50');
        radBtn.classList.add('bg-indigo-100', 'text-indigo-700', 'dark:bg-indigo-900/50', 'dark:text-indigo-300');
        degBtn.classList.add('opacity-50');
        degBtn.classList.remove('bg-indigo-100', 'text-indigo-700', 'dark:bg-indigo-900/50', 'dark:text-indigo-300');
      }
    };
    
    if(degBtn && radBtn) {
      degBtn.addEventListener('click', () => setAngleMode('deg'));
      radBtn.addEventListener('click', () => setAngleMode('rad'));
    }
    
    resEl.textContent = '0';
    
    const updateUI = () => {
      exprEl.textContent = expression || '0';
      resEl.textContent = currentInput || '0';
    };
    
    const addToHistory = (exp, result) => {
      if(histEl.innerHTML.includes('No calculations yet.')) {
        histEl.innerHTML = '';
      }
      const item = document.createElement('div');
      item.className = 'group p-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-xl transition-all cursor-pointer border border-transparent hover:border-slate-200 dark:hover:border-slate-700 text-right';
      item.innerHTML = `<div class="text-xs text-slate-400 mb-1">${exp} =</div><div class="text-xl font-bold text-slate-700 dark:text-slate-200 group-hover:text-indigo-500">${result}</div>`;
      item.addEventListener('click', () => {
        currentInput = String(result);
        expression = '';
        shouldReset = true;
        updateUI();
      });
      histEl.prepend(item);
    };

    keys.forEach(btn => {
      btn.addEventListener('click', () => {
        const val = btn.dataset.val;
        
        if (val === 'C') {
          currentInput = '0';
          expression = '';
          updateUI();
          return;
        }
        
        if (val === 'DEL') {
          if (shouldReset) {
            currentInput = '0';
            shouldReset = false;
          } else {
            currentInput = currentInput.slice(0, -1) || '0';
          }
          updateUI();
          return;
        }
        
        if (val === '=') {
          if (expression || currentInput !== '0') {
            try {
              let fullExp = expression + currentInput;
              
              // Prepare evaluation string
              let evalExp = fullExp
                .replace(/×/g, '*')
                .replace(/÷/g, '/')
                .replace(/pi/g, 'Math.PI')
                .replace(/e/g, 'Math.E')
                .replace(/\^/g, '**')
                .replace(/sqrt\(/g, 'Math.sqrt(')
                .replace(/ln\(/g, 'Math.log(')
                .replace(/log\(/g, 'Math.log10(');
                
              // Handle trig functions based on angleMode
              const trigFunctions = ['sin', 'cos', 'tan'];
              trigFunctions.forEach(func => {
                const regex = new RegExp(func + '\(([^)]+)\)', 'g');
                // We need to evaluate the expression inside to convert it. Wait, simpler approach:
                // Since this is eval, we can just replace sin(x) with Math.sin(angleMode === 'deg' ? (x)*Math.PI/180 : x)
                // Actually regex might be tricky if nested.
              });
              
              // Instead of regex, let's redefine trig functions in the evaluation scope
              const mathScope = {
                PI: Math.PI,
                E: Math.E,
                sin: (x) => Math.sin(angleMode === 'deg' ? x * Math.PI / 180 : x),
                cos: (x) => Math.cos(angleMode === 'deg' ? x * Math.PI / 180 : x),
                tan: (x) => Math.tan(angleMode === 'deg' ? x * Math.PI / 180 : x),
                sqrt: Math.sqrt,
                log: Math.log10,
                ln: Math.log
              };
              
              // We can build a safe function wrapper
              let parsedExp = fullExp
                .replace(/×/g, '*')
                .replace(/÷/g, '/')
                .replace(/pi/g, 'PI')
                .replace(/e/g, 'E')
                .replace(/\^/g, '**');
                
              // Expose mathScope properties to the local scope of the function
              const argNames = Object.keys(mathScope);
              const argValues = Object.values(mathScope);
              
              const evaluator = new Function(...argNames, 'return ' + parsedExp);
              const result = evaluator(...argValues);
              
              if(!isFinite(result) || isNaN(result)) throw new Error('Math Error');
              
              const formatRes = Number.isInteger(result) ? result : Number(result.toFixed(6));
              addToHistory(fullExp, formatRes);
              currentInput = String(formatRes);
              expression = '';
              shouldReset = true;
            } catch (e) {
              currentInput = 'Error';
              expression = '';
            }
            updateUI();
          }
          return;
        }
        
        if (['/', '*', '-', '+', '^'].includes(val)) {
          if (currentInput === 'Error') return;
          
          let operatorMap = { '*': '×', '/': '÷', '+': '+', '-': '-', '^': '^' };
          let visualOp = operatorMap[val];
          
          if (shouldReset) {
            expression = currentInput + visualOp;
            shouldReset = false;
          } else {
            // Evaluates previous before continuing
            if(expression) {
                // simple chaining might be buggy with scientific, just append to expression
                expression += currentInput + visualOp;
            } else {
                expression = currentInput + visualOp;
            }
          }
          currentInput = '';
          updateUI();
          return;
        }
        
        if (['sin', 'cos', 'tan', 'log', 'ln', 'sqrt'].includes(val)) {
           if (currentInput === '0' || shouldReset) {
             currentInput = val + '(';
             shouldReset = false;
           } else {
             currentInput += val + '(';
           }
           updateUI();
           return;
        }
        
        if (['pi', 'e'].includes(val)) {
           if (currentInput === '0' || shouldReset) {
             currentInput = val;
             shouldReset = false;
           } else {
             currentInput += val;
           }
           updateUI();
           return;
        }
        
        // Numbers, dot, parenthesis
        if (shouldReset) {
          currentInput = val;
          shouldReset = false;
        } else {
          if (currentInput === '0' && val !== '.' && val !== '(' && val !== ')') {
            currentInput = val;
          } else {
            currentInput += val;
          }
        }
        updateUI();
      });
    });
  }


  if (calcId === 'percentage') {
    const bind = (idx, idy, idr, func) => {
      const inX = document.getElementById(idx);
      const inY = document.getElementById(idy);
      const res = document.getElementById(idr);
      const calc = () => {
        const x = parseFloat(inX.value);
        const y = parseFloat(inY.value);
        if (!isNaN(x) && !isNaN(y)) {
          res.textContent = func(x, y);
        } else res.textContent = '--';
      };
      inX.addEventListener('input', calc);
      inY.addEventListener('input', calc);
    };
    
    bind('p1-x', 'p1-y', 'p1-res', (x, y) => ((x/100) * y).toFixed(2));
    bind('p2-x', 'p2-y', 'p2-res', (x, y) => y !== 0 ? ((x/y) * 100).toFixed(2) + '%' : 'Error');
    bind('p3-x', 'p3-y', 'p3-res', (x, y) => {
      if (x === 0) return 'Error';
      const change = ((y - x) / Math.abs(x)) * 100;
      return (change > 0 ? '+' : '') + change.toFixed(2) + '%';
    });
  }
  
  if (calcId === 'discount') {
    const pIn = document.getElementById('disc-price');
    const dIn = document.getElementById('disc-perc');
    const tIn = document.getElementById('disc-tax');
    const sv = document.getElementById('disc-saved');
    const fn = document.getElementById('disc-final');
    const ti = document.getElementById('disc-tax-info');
    
    const calc = () => {
      const p = parseFloat(pIn.value);
      const d = parseFloat(dIn.value);
      const t = parseFloat(tIn.value) || 0;
      
      if (!isNaN(p) && !isNaN(d)) {
        const saved = (p * d) / 100;
        const discountedPrice = p - saved;
        const taxAmount = (discountedPrice * t) / 100;
        const finalPrice = discountedPrice + taxAmount;
        
        sv.textContent = saved.toFixed(2);
        fn.textContent = finalPrice.toFixed(2);
        if(t > 0) {
          ti.classList.remove('hidden');
        } else {
          ti.classList.add('hidden');
        }
      } else {
        sv.textContent = '--';
        fn.textContent = '--';
        ti.classList.add('hidden');
      }
    };
    pIn.addEventListener('input', calc);
    dIn.addEventListener('input', calc);
    tIn.addEventListener('input', calc);
  }
  
  if (calcId === 'emi') {
    const assetIn = document.getElementById('emi-asset');
    const downIn = document.getElementById('emi-down');
    const pDisplay = document.getElementById('emi-p-display');
    const rIn = document.getElementById('emi-r');
    const tIn = document.getElementById('emi-t');
    const btn = document.getElementById('emi-btn');
    const res = document.getElementById('emi-result');
    const val = document.getElementById('emi-val');
    const intDisp = document.getElementById('emi-int');
    const totDisp = document.getElementById('emi-tot');
    const radios = document.querySelectorAll('input[name="emi-tenure-type"]');
    
    const updatePrincipal = () => {
      const asset = parseFloat(assetIn.value) || 0;
      const down = parseFloat(downIn.value) || 0;
      const p = Math.max(0, asset - down);
      if(pDisplay) pDisplay.textContent = '$' + p.toLocaleString();
      return p;
    };
    
    if(assetIn && downIn) {
      assetIn.addEventListener('input', updatePrincipal);
      downIn.addEventListener('input', updatePrincipal);
    }
    
    if(btn) {
      btn.addEventListener('click', () => {
        const p = updatePrincipal();
        const r = parseFloat(rIn.value);
        let t = parseFloat(tIn.value);
        
        let isMonths = false;
        if(radios) {
          radios.forEach(radio => {
            if(radio.checked && radio.value === 'months') isMonths = true;
          });
        }
        
        if (!isNaN(p) && !isNaN(r) && !isNaN(t) && p > 0) {
          res.classList.remove('hidden');
          let n = isMonths ? t : t * 12; // total months
          const rate = r / 12 / 100;
          
          let emi = 0;
          if (rate === 0) {
            emi = p / n;
          } else {
            emi = (p * rate * Math.pow(1 + rate, n)) / (Math.pow(1 + rate, n) - 1);
          }
          
          const total = emi * n;
          const interest = total - p;
          val.textContent = emi.toFixed(2);
          intDisp.textContent = interest.toFixed(2);
          totDisp.textContent = total.toFixed(2);
        } else {
          res.classList.add('hidden');
        }
      });
    }
  }
  
  if (calcId === 'currency') {
    const valIn = document.getElementById('curr-val');
    const fromSel = document.getElementById('curr-from');
    const toSel = document.getElementById('curr-to');
    const res = document.getElementById('curr-res');
    const rateDisp = document.getElementById('curr-rate');
    const swapBtn = document.getElementById('curr-swap');
    
    // Static simulation rates relative to USD
    const rates = {
      USD: 1, EUR: 0.92, GBP: 0.79, INR: 83.2, JPY: 151.3, AUD: 1.54, CAD: 1.36
    };
    
    if(valIn && fromSel && toSel && res) {
      const calc = () => {
        const v = parseFloat(valIn.value);
        const f = fromSel.value;
        const t = toSel.value;
        
        const rate = rates[t] / rates[f];
        rateDisp.textContent = `1 ${f} = ${rate.toFixed(4)} ${t}`;
        
        if (!isNaN(v)) {
          res.textContent = (v * rate).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}) + ' ' + t;
        } else {
          res.textContent = '--';
        }
      };
      
      swapBtn.addEventListener('click', () => {
        const temp = fromSel.value;
        fromSel.value = toSel.value;
        toSel.value = temp;
        calc();
      });
      
      valIn.addEventListener('input', calc);
      fromSel.addEventListener('change', calc);
      toSel.addEventListener('change', calc);
      
      calc(); // initial setup
    }
  }

  if (calcId === 'unit') {
    const catSel = document.getElementById('unit-category');
    const fromVal = document.getElementById('unit-from-val');
    const toVal = document.getElementById('unit-to-val');
    const fromSel = document.getElementById('unit-from-sel');
    const toSel = document.getElementById('unit-to-sel');
    const swapBtn = document.getElementById('unit-swap');
    
    if(catSel && fromVal && toVal && fromSel && toSel) {
      const units = {
        length: {
          meter: 1, kilometer: 1000, centimeter: 0.01, millimeter: 0.001,
          mile: 1609.34, yard: 0.9144, foot: 0.3048, inch: 0.0254
        },
        weight: {
          kilogram: 1, gram: 0.001, milligram: 0.000001, metricTon: 1000,
          pound: 0.453592, ounce: 0.0283495
        },

        temperature: {
          celsius: 1, fahrenheit: 1, kelvin: 1
        },
        
    data: {
      b: 1,
      kb: 1024,
      mb: 1024 * 1024,
      gb: 1024 * 1024 * 1024,
      tb: 1024 * 1024 * 1024 * 1024,
      pb: 1024 * 1024 * 1024 * 1024 * 1024
    },
    volume: {
          liter: 1, milliliter: 0.001, cubicMeter: 1000,
          gallonUS: 3.78541, quartUS: 0.946353, pintUS: 0.473176
        },
        area: {
          squareMeter: 1, squareKilometer: 1000000, hectare: 10000,
          acre: 4046.86, squareFoot: 0.092903, squareMile: 2589988
        },
        data: {
          byte: 1, kilobyte: 1024, megabyte: 1048576, gigabyte: 1073741824, terabyte: 1099511627776
        }
      };
      
      const formatName = (str) => {
        const result = str.replace(/([A-Z])/g, " $1");
        return result.charAt(0).toUpperCase() + result.slice(1);
      };

      const populateSelects = () => {
        const cat = catSel.value;
        const opts = Object.keys(units[cat]);
        fromSel.innerHTML = '';
        toSel.innerHTML = '';
        opts.forEach(opt => {
          fromSel.add(new Option(formatName(opt), opt));
          toSel.add(new Option(formatName(opt), opt));
        });
        if(opts.length > 1) toSel.selectedIndex = 1;
        calcFrom();
      };
      
      const calcFrom = () => {
        const v = parseFloat(fromVal.value);
        if(isNaN(v)) { toVal.value = ''; return; }
        const cat = catSel.value;
        const f = fromSel.value;
        const t = toSel.value;
        
        if (cat === 'temperature') {
            let c = 0;
            if (f === 'celsius') c = v;
            else if (f === 'fahrenheit') c = (v - 32) * 5/9;
            else if (f === 'kelvin') c = v - 273.15;
            
            let res = 0;
            if (t === 'celsius') res = c;
            else if (t === 'fahrenheit') res = (c * 9/5) + 32;
            else if (t === 'kelvin') res = c + 273.15;
            
            toVal.value = Number(res.toPrecision(7)).toString();
            return;
        }

        const base = v * units[cat][f];
        const res = base / units[cat][t];
        toVal.value = Number(res.toPrecision(7)).toString();
      };
      
      const calcTo = () => {
        const v = parseFloat(toVal.value);
        if(isNaN(v)) { fromVal.value = ''; return; }
        const cat = catSel.value;
        const f = fromSel.value;
        const t = toSel.value;
        
        if (cat === 'temperature') {
            let c = 0;
            if (t === 'celsius') c = v;
            else if (t === 'fahrenheit') c = (v - 32) * 5/9;
            else if (t === 'kelvin') c = v - 273.15;
            
            let res = 0;
            if (f === 'celsius') res = c;
            else if (f === 'fahrenheit') res = (c * 9/5) + 32;
            else if (f === 'kelvin') res = c + 273.15;
            
            fromVal.value = Number(res.toPrecision(7)).toString();
            return;
        }

        const base = v * units[cat][t];
        const res = base / units[cat][f];
        fromVal.value = Number(res.toPrecision(7)).toString();
      };
      
      swapBtn.addEventListener('click', () => {
        const temp = fromSel.value;
        fromSel.value = toSel.value;
        toSel.value = temp;
        calcFrom();
      });
      
      catSel.addEventListener('change', populateSelects);
      fromVal.addEventListener('input', calcFrom);
      toVal.addEventListener('input', calcTo);
      fromSel.addEventListener('change', calcFrom);
      toSel.addEventListener('change', calcFrom);
      
      populateSelects();
    }
  }

  if (calcId === 'gst') {
    const modeAddBtn = document.getElementById('gst-mode-add');
    const modeRemBtn = document.getElementById('gst-mode-remove');
    const amtLabel = document.getElementById('gst-label-amount');
    const amtIn = document.getElementById('gst-amount-in');
    const rateSel = document.getElementById('gst-rate');
    
    const netOut = document.getElementById('gst-net-out');
    const taxOut = document.getElementById('gst-tax-out');
    const grossOut = document.getElementById('gst-gross-out');
    
    if(modeAddBtn && modeRemBtn && amtIn && rateSel) {
      let isAddMode = true;
      
      const updateModeUI = () => {
        if(isAddMode) {
          modeAddBtn.className = 'px-6 py-2 rounded-xl text-sm font-bold bg-white dark:bg-slate-700 shadow text-indigo-600 dark:text-indigo-400 transition-all';
          modeRemBtn.className = 'px-6 py-2 rounded-xl text-sm font-bold text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-all';
          amtLabel.textContent = 'Net Base Price (Excl. Tax)';
        } else {
          modeRemBtn.className = 'px-6 py-2 rounded-xl text-sm font-bold bg-white dark:bg-slate-700 shadow text-indigo-600 dark:text-indigo-400 transition-all';
          modeAddBtn.className = 'px-6 py-2 rounded-xl text-sm font-bold text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-all';
          amtLabel.textContent = 'Gross Price (Incl. Tax)';
        }
        calc();
      };
      
      modeAddBtn.addEventListener('click', () => { isAddMode = true; updateModeUI(); });
      modeRemBtn.addEventListener('click', () => { isAddMode = false; updateModeUI(); });
      
      const calc = () => {
        const amt = parseFloat(amtIn.value);
        const rate = parseFloat(rateSel.value);
        
        if(!isNaN(amt) && !isNaN(rate)) {
          if(isAddMode) {
            const tax = (amt * rate) / 100;
            const gross = amt + tax;
            netOut.textContent = amt.toFixed(2);
            taxOut.textContent = tax.toFixed(2);
            grossOut.textContent = gross.toFixed(2);
          } else {
            const net = amt / (1 + (rate/100));
            const tax = amt - net;
            netOut.textContent = net.toFixed(2);
            taxOut.textContent = tax.toFixed(2);
            grossOut.textContent = amt.toFixed(2);
          }
        } else {
          netOut.textContent = '--';
          taxOut.textContent = '--';
          grossOut.textContent = '--';
        }
      };
      
      amtIn.addEventListener('input', calc);
      rateSel.addEventListener('change', calc);
    }
  }

  if (calcId === 'bmi') {
    const btn = document.getElementById('bmi-btn');
    if(btn) {
      btn.addEventListener('click', () => {
        const w = parseFloat(document.getElementById('bmi-weight').value);
        const h = parseFloat(document.getElementById('bmi-height').value) / 100;
        if (w > 0 && h > 0) {
          const bmi = (w / (h * h)).toFixed(1);
          let cat = '', color = '';
          if (bmi < 18.5) { cat = 'Underweight'; color = 'text-blue-500 bg-blue-100 dark:bg-blue-900/30 border-blue-200'; }
          else if (bmi < 25) { cat = 'Normal Weight'; color = 'text-emerald-500 bg-emerald-100 dark:bg-emerald-900/30 border-emerald-200'; }
          else if (bmi < 30) { cat = 'Overweight'; color = 'text-amber-500 bg-amber-100 dark:bg-amber-900/30 border-amber-200'; }
          else { cat = 'Obese'; color = 'text-rose-500 bg-rose-100 dark:bg-rose-900/30 border-rose-200'; }
          
          document.getElementById('bmi-score').textContent = bmi;
          document.getElementById('bmi-score').className = `text-7xl font-black mb-2 tracking-tighter drop-shadow-md ${color.split(' ')[0]}`;
          document.getElementById('bmi-category').textContent = cat;
          document.getElementById('bmi-category').className = `text-xl font-bold tracking-widest uppercase px-6 py-2 inline-flex items-center gap-2 rounded-full border shadow-sm mb-6 ${color}`;
          
          const idealMin = (18.5 * h * h).toFixed(1);
          const idealMax = (24.9 * h * h).toFixed(1);
          document.getElementById('bmi-ideal').textContent = `${idealMin} - ${idealMax} kg`;
          
          const pi = (w / (h * h * h)).toFixed(2);
          document.getElementById('bmi-pi').textContent = `${pi} kg/m³`;
          
          document.getElementById('bmi-result-card').classList.remove('hidden');
        }
      });
    }
  }
  
  if (calcId === 'age') {
    const compEl = document.getElementById('age-compare');
    if(compEl) {
      compEl.valueAsDate = new Date();
    }
    const btn = document.getElementById('age-btn');
    if(btn) {
      btn.addEventListener('click', () => {
        const dobStr = document.getElementById('age-dob').value;
        const compStr = document.getElementById('age-compare').value;
        if (!dobStr) return;
        
        const dob = new Date(dobStr);
        const compareDate = compStr ? new Date(compStr) : new Date();
        if (dob > compareDate) return;
        
        let y = compareDate.getFullYear() - dob.getFullYear();
        let m = compareDate.getMonth() - dob.getMonth();
        let d = compareDate.getDate() - dob.getDate();
        
        if (d < 0) {
          m--;
          d += new Date(compareDate.getFullYear(), compareDate.getMonth(), 0).getDate();
        }
        if (m < 0) {
          y--;
          m += 12;
        }
        
        document.getElementById('age-y').textContent = y;
        document.getElementById('age-m').textContent = m;
        document.getElementById('age-d').textContent = d;
        
        const diffTime = Math.abs(compareDate - dob);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        const diffWeeks = Math.floor(diffDays / 7);
        const diffMonths = (y * 12) + m;
        
        document.getElementById('age-tot-d').textContent = diffDays;
        document.getElementById('age-tot-w').textContent = diffWeeks;
        document.getElementById('age-tot-m').textContent = diffMonths;
        
        const nextB = new Date(dob);
        nextB.setFullYear(compareDate.getFullYear());
        if (nextB < compareDate) nextB.setFullYear(compareDate.getFullYear() + 1);
        const daysToNext = Math.ceil((nextB - compareDate) / (1000 * 60 * 60 * 24));
        document.getElementById('age-next-b').textContent = daysToNext + ' days';
        
        document.getElementById('age-result').classList.remove('hidden');
      });
    }
  }
}

// Ensure the variables and functions are available globally for onclick attributes
window.setView = setView;
window.toggleSidebar = toggleSidebar;
window.toggleTheme = toggleTheme;

renderApp();


// Global Input Handling
document.addEventListener('keydown', (e) => {
  if (e.target.tagName === 'INPUT' && e.target.type === 'number') {
    // Prevent scientific notation characters and plus
    if (['e', 'E', '+'].includes(e.key)) {
      e.preventDefault();
    }
  }
});

// Extra paste protection
document.addEventListener('input', (e) => {
  if (e.target.tagName === 'INPUT' && e.target.type === 'number') {
    if (e.target.value.includes('e') || e.target.value.includes('E')) {
      e.target.value = '';
    }
  }
});
// Inject animation styles
const style = document.createElement('style');
style.innerHTML = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fade-in {
    animation: fadeIn 0.3s ease-out forwards;
  }
`;
document.head.appendChild(style);


