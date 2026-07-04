const fs = require('fs');
let code = fs.readFileSync('script.js', 'utf8');

const newHtml = `
function getRandomCalcHTML() {
  return \`
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
  \`;
}

function getRule72CalcHTML() {
  return \`
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
  \`;
}
`;

const newLogic = `
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
`;

// Insert HTML before function initCalculatorLogic
code = code.replace(/function initCalculatorLogic\(/, newHtml + '\nfunction initCalculatorLogic(');

// Insert Logic into initCalculatorLogic just before `if (calcId === 'scientific')`
code = code.replace(/if \(calcId === 'scientific'\)/, newLogic + '\n  if (calcId === \'scientific\')');

fs.writeFileSync('script.js', code);
