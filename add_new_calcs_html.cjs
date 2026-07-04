const fs = require('fs');
let code = fs.readFileSync('script.js', 'utf8');

const newHtml = `
function getDateCalcHTML() {
  return \`
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
  \`;
}

function getSalaryCalcHTML() {
  return \`
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
  \`;
}

function getRatioCalcHTML() {
  return \`
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
  \`;
}
`;

// Insert before function initCalculatorLogic
code = code.replace(/function initCalculatorLogic\(/, newHtml + '\nfunction initCalculatorLogic(');

fs.writeFileSync('script.js', code);
