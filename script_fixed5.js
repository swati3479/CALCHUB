let currentView = 'home';
let sidebarOpen = window.innerWidth >= 768;
let isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
let keyboardListener = null;

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
    if (typeof initCalculatorLogic === 'function') {
      initCalculatorLogic(currentView);
    }
  } else {
    if (keyboardListener) document.removeEventListener('keydown', keyboardListener);
  }
}

function renderLandingPage() {
  return `${data.landing}`;
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
        ${sidebarOpen ? '<div class="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3 mb-2 mt-2">Dashboard</div>' : ''}
        <button onclick="setView('home')" class="w-full py-2.5 rounded-xl text-xs font-semibold flex items-center gap-3 transition-colors select-none cursor-pointer outline-none ${sidebarOpen ? 'justify-start px-3.5' : 'justify-center px-0'} text-slate-500 dark:text-slate-400 hover:bg-slate-200/50 dark:hover:bg-slate-800/50 hover:text-slate-800 dark:hover:text-slate-200">
          <i data-lucide="home" class="w-4 h-4 shrink-0"></i>
          ${sidebarOpen ? '<span class="truncate">Landing</span>' : ''}
        </button>
        ${sidebarOpen ? '<div class="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3 mb-2 mt-4 pt-1">Tools & Calculators</div>' : ''}
        ${CALCULATORS.map(c => `
          <button onclick="setView('${c.id}')" class="w-full py-2.5 rounded-xl text-xs font-semibold flex items-center gap-3 transition-colors select-none cursor-pointer outline-none ${sidebarOpen ? 'justify-start px-3.5' : 'justify-center px-0'} ${currentView === c.id ? 'bg-indigo-600 text-white font-bold shadow-md shadow-indigo-650/10 border border-indigo-500/20' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-200/50 dark:hover:bg-slate-800/50 hover:text-slate-800 dark:hover:text-slate-200'}">
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
        <main class="flex-1 p-6 md:p-8 max-w-7xl mx-auto w-full flex flex-col justify-center transition-all duration-300 animate-fade-in">
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


function getSimpleCalcHTML() {
  return \`
    <div class="max-w-2xl mx-auto space-y-6">
      <div class="bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-950 border border-slate-200/50 dark:border-slate-800 rounded-[2.5rem] shadow-2xl p-6 md:p-8">
        <div class="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 mb-6 text-right font-mono flex flex-col justify-end min-h-[140px]">
          <div id="simple-expr" class="text-slate-400 text-lg mb-2 min-h-[1.75rem]"></div>
          <div id="simple-res" class="text-5xl font-bold text-indigo-600 dark:text-indigo-400 truncate">0</div>
        </div>
        <div id="simple-keys" class="grid grid-cols-4 gap-3 font-mono">
          <button class="col-span-2 py-4 bg-rose-50 text-rose-600 hover:bg-rose-100 dark:bg-rose-900/20 dark:hover:bg-rose-900/40 rounded-2xl text-xl font-bold">C</button>
          <button class="py-4 bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-2xl text-xl font-bold">DEL</button>
          <button class="py-4 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 dark:bg-indigo-900/30 dark:hover:bg-indigo-900/50 rounded-2xl text-2xl font-bold">÷</button>
          <button class="py-4 bg-white border border-slate-100 hover:bg-slate-50 dark:bg-slate-900 dark:border-slate-800 dark:hover:bg-slate-800 rounded-2xl text-2xl font-bold text-slate-700 dark:text-slate-200">7</button>
          <button class="py-4 bg-white border border-slate-100 hover:bg-slate-50 dark:bg-slate-900 dark:border-slate-800 dark:hover:bg-slate-800 rounded-2xl text-2xl font-bold text-slate-700 dark:text-slate-200">8</button>
          <button class="py-4 bg-white border border-slate-100 hover:bg-slate-50 dark:bg-slate-900 dark:border-slate-800 dark:hover:bg-slate-800 rounded-2xl text-2xl font-bold text-slate-700 dark:text-slate-200">9</button>
          <button class="py-4 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 dark:bg-indigo-900/30 dark:hover:bg-indigo-900/50 rounded-2xl text-2xl font-bold">×</button>
          <button class="py-4 bg-white border border-slate-100 hover:bg-slate-50 dark:bg-slate-900 dark:border-slate-800 dark:hover:bg-slate-800 rounded-2xl text-2xl font-bold text-slate-700 dark:text-slate-200">4</button>
          <button class="py-4 bg-white border border-slate-100 hover:bg-slate-50 dark:bg-slate-900 dark:border-slate-800 dark:hover:bg-slate-800 rounded-2xl text-2xl font-bold text-slate-700 dark:text-slate-200">5</button>
          <button class="py-4 bg-white border border-slate-100 hover:bg-slate-50 dark:bg-slate-900 dark:border-slate-800 dark:hover:bg-slate-800 rounded-2xl text-2xl font-bold text-slate-700 dark:text-slate-200">6</button>
          <button class="py-4 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 dark:bg-indigo-900/30 dark:hover:bg-indigo-900/50 rounded-2xl text-2xl font-bold">-</button>
          <button class="py-4 bg-white border border-slate-100 hover:bg-slate-50 dark:bg-slate-900 dark:border-slate-800 dark:hover:bg-slate-800 rounded-2xl text-2xl font-bold text-slate-700 dark:text-slate-200">1</button>
          <button class="py-4 bg-white border border-slate-100 hover:bg-slate-50 dark:bg-slate-900 dark:border-slate-800 dark:hover:bg-slate-800 rounded-2xl text-2xl font-bold text-slate-700 dark:text-slate-200">2</button>
          <button class="py-4 bg-white border border-slate-100 hover:bg-slate-50 dark:bg-slate-900 dark:border-slate-800 dark:hover:bg-slate-800 rounded-2xl text-2xl font-bold text-slate-700 dark:text-slate-200">3</button>
          <button class="py-4 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 dark:bg-indigo-900/30 dark:hover:bg-indigo-900/50 rounded-2xl text-2xl font-bold">+</button>
          <button class="col-span-2 py-4 bg-white border border-slate-100 hover:bg-slate-50 dark:bg-slate-900 dark:border-slate-800 dark:hover:bg-slate-800 rounded-2xl text-2xl font-bold text-slate-700 dark:text-slate-200">0</button>
          <button class="py-4 bg-white border border-slate-100 hover:bg-slate-50 dark:bg-slate-900 dark:border-slate-800 dark:hover:bg-slate-800 rounded-2xl text-2xl font-bold text-slate-700 dark:text-slate-200">.</button>
          <button class="py-4 bg-indigo-600 text-white hover:bg-indigo-700 rounded-2xl text-2xl font-bold shadow-lg shadow-indigo-600/20">=</button>
        </div>
      </div>
      <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xl h-48 flex flex-col">
        <h4 class="text-sm font-semibold mb-3 flex items-center gap-2 font-mono text-slate-700 dark:text-slate-300"><i data-lucide="history" class="w-4 h-4 text-indigo-500"></i> HISTORY</h4>
        <div id="simple-history" class="flex-1 overflow-y-auto space-y-2 text-sm text-slate-500 dark:text-slate-400 font-mono">No calculations yet.</div>
      </div>
    </div>
  \\\
function getGstCalcHTML() {
  return `
    <div class="max-w-2xl mx-auto space-y-8 bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-950 border border-slate-200/50 dark:border-slate-800 rounded-[2.5rem] shadow-2xl p-5 sm:p-8 md:p-10 relative">
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
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-100/50 dark:bg-slate-800/30 p-6 rounded-[2rem] border border-slate-200/50 dark:border-slate-700/50 relative z-10">
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
      <div class="mt-8 bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-700 p-8 shadow-lg relative overflow-hidden text-center z-10">
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

function initCalculatorLogic(calcId) {
  
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


  if (calcId === 'simple') {
    const exprEl = document.getElementById('simple-expr');
    const resEl = document.getElementById('simple-res');
    const histEl = document.getElementById('simple-history');
    const keys = document.querySelectorAll('#simple-keys button');
    
    let currentInput = '0';
    let expression = '';
    let shouldReset = false;
    
    // Default zero state
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
          if (expression && currentInput !== 'Error') {
            try {
              let fullExp = expression + currentInput;
              // Safe evaluation for basic math
              let evalExp = fullExp.replace(/×/g, '*').replace(/÷/g, '/');
              const result = new Function('return ' + evalExp)();
              
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
        
        if (['/', '*', '-', '+'].includes(val)) {
          if (currentInput === 'Error') return;
          
          let operatorMap = { '*': '×', '/': '÷', '+': '+', '-': '-' };
          let visualOp = operatorMap[val];
          
          if (shouldReset) {
            expression = currentInput + visualOp;
            shouldReset = false;
          } else {
            // Evaluates previous before continuing
            if(expression) {
                try {
                  let evalExp = (expression + currentInput).replace(/×/g, '*').replace(/÷/g, '/');
                  let intRes = new Function('return ' + evalExp)();
                  expression = Number(Number(intRes).toFixed(6)) + visualOp;
                } catch {
                  expression = 'Error' + visualOp;
                }
            } else {
                expression = currentInput + visualOp;
            }
          }
          currentInput = '0';
          updateUI();
          return;
        }
        
        // Numbers and dot
        if (shouldReset) {
          currentInput = val;
          shouldReset = false;
        } else {
          if (currentInput === '0' && val !== '.') {
            currentInput = val;
          } else if (val === '.' && currentInput.includes('.')) {
            // prevent multiple dots
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

init();


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


