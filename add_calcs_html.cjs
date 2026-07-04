const fs = require('fs');
let code = fs.readFileSync('script.js', 'utf8');

const newHtml = `
function getCompoundCalcHTML() {
  return \`
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
  \`;
}

function getTipCalcHTML() {
  return \`
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
  \`;
}
`;

// Insert before function initCalculatorLogic
code = code.replace(/function initCalculatorLogic\(/, newHtml + '\nfunction initCalculatorLogic(');

fs.writeFileSync('script.js', code);
