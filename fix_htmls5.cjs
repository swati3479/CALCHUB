const fs = require('fs');

let code = fs.readFileSync('script_fixed.js', 'utf8');

const replacement = `
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
  \`;
}

function getPercentageCalcHTML() {
  return \`
    <div class="max-w-3xl mx-auto space-y-8">
      <div class="bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-950 border border-slate-200/50 dark:border-slate-800 rounded-[2.5rem] shadow-2xl p-6 md:p-8">
        <h3 class="font-extrabold text-2xl text-slate-800 dark:text-slate-200 mb-6 text-center">Percentage Toolkit</h3>
        
        <div class="mb-6 p-5 bg-slate-100/50 dark:bg-slate-800/30 rounded-3xl border border-slate-200/50 dark:border-slate-700/50">
          <div class="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">1. What is X% of Y?</div>
          <div class="flex items-center gap-3">
             <input type="number" id="p1-x" placeholder="X" class="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 font-mono text-slate-800 dark:text-slate-200 outline-none">
             <span class="font-bold text-slate-400">% of</span>
             <input type="number" id="p1-y" placeholder="Y" class="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 font-mono text-slate-800 dark:text-slate-200 outline-none">
             <span class="font-bold text-slate-400">=</span>
             <div class="w-full bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 font-mono font-bold text-xl px-4 py-3 rounded-xl text-center border border-indigo-100 dark:border-indigo-800/30 min-w-[100px]" id="p1-res">--</div>
          </div>
        </div>

        <div class="mb-6 p-5 bg-slate-100/50 dark:bg-slate-800/30 rounded-3xl border border-slate-200/50 dark:border-slate-700/50">
          <div class="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">2. X is what % of Y?</div>
          <div class="flex items-center gap-3">
             <input type="number" id="p2-x" placeholder="X" class="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 font-mono text-slate-800 dark:text-slate-200 outline-none">
             <span class="font-bold text-slate-400">is what % of</span>
             <input type="number" id="p2-y" placeholder="Y" class="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 font-mono text-slate-800 dark:text-slate-200 outline-none">
             <span class="font-bold text-slate-400">=</span>
             <div class="w-full bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 font-mono font-bold text-xl px-4 py-3 rounded-xl text-center border border-indigo-100 dark:border-indigo-800/30 min-w-[100px]" id="p2-res">--</div>
          </div>
        </div>

        <div class="p-5 bg-slate-100/50 dark:bg-slate-800/30 rounded-3xl border border-slate-200/50 dark:border-slate-700/50">
          <div class="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">3. Percentage Change (X to Y)</div>
          <div class="flex items-center gap-3">
             <span class="font-bold text-slate-400">From</span>
             <input type="number" id="p3-x" placeholder="X" class="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 font-mono text-slate-800 dark:text-slate-200 outline-none">
             <span class="font-bold text-slate-400">To</span>
             <input type="number" id="p3-y" placeholder="Y" class="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 font-mono text-slate-800 dark:text-slate-200 outline-none">
             <span class="font-bold text-slate-400">=</span>
             <div class="w-full bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 font-mono font-bold text-xl px-4 py-3 rounded-xl text-center border border-indigo-100 dark:border-indigo-800/30 min-w-[100px]" id="p3-res">--</div>
          </div>
        </div>
      </div>
    </div>
  \`;
}

function getCurrencyCalcHTML() {
  return \`
    <div class="max-w-2xl mx-auto space-y-6">
      <div class="bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-950 border border-slate-200/50 dark:border-slate-800 rounded-[2.5rem] shadow-2xl p-6 md:p-8">
        <h3 class="font-extrabold text-2xl text-slate-800 dark:text-slate-200 mb-6 text-center">Currency Exchange</h3>
        <div class="bg-slate-100/50 dark:bg-slate-800/30 p-6 rounded-3xl border border-slate-200/50 dark:border-slate-700/50 space-y-4">
          <div>
            <label class="block text-xs font-bold text-slate-500 uppercase mb-2">Amount</label>
            <input type="number" id="curr-val" value="100" class="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 font-mono text-lg text-slate-800 dark:text-slate-200 outline-none">
          </div>
          <div class="flex items-center gap-4">
            <div class="flex-1">
              <label class="block text-xs font-bold text-slate-500 uppercase mb-2">From</label>
              <select id="curr-from" class="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 font-mono text-slate-800 dark:text-slate-200 outline-none">
                <option value="USD">USD - US Dollar</option>
                <option value="EUR">EUR - Euro</option>
                <option value="GBP">GBP - British Pound</option>
                <option value="INR">INR - Indian Rupee</option>
                <option value="JPY">JPY - Japanese Yen</option>
                <option value="AUD">AUD - Australian Dollar</option>
                <option value="CAD">CAD - Canadian Dollar</option>
              </select>
            </div>
            <button id="curr-swap" class="mt-6 p-3 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 dark:bg-indigo-900/30 dark:hover:bg-indigo-900/50 rounded-xl transition-colors">
              <i data-lucide="arrow-right-left" class="w-5 h-5"></i>
            </button>
            <div class="flex-1">
              <label class="block text-xs font-bold text-slate-500 uppercase mb-2">To</label>
              <select id="curr-to" class="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 font-mono text-slate-800 dark:text-slate-200 outline-none">
                <option value="EUR">EUR - Euro</option>
                <option value="USD">USD - US Dollar</option>
                <option value="GBP">GBP - British Pound</option>
                <option value="INR">INR - Indian Rupee</option>
                <option value="JPY">JPY - Japanese Yen</option>
                <option value="AUD">AUD - Australian Dollar</option>
                <option value="CAD">CAD - Canadian Dollar</option>
              </select>
            </div>
          </div>
        </div>
        <div class="mt-8 text-center bg-indigo-50 dark:bg-indigo-900/20 rounded-3xl p-6 border border-indigo-100 dark:border-indigo-800/30">
          <div class="text-xs text-indigo-400 font-bold uppercase tracking-wider mb-2">Converted Amount</div>
          <div id="curr-res" class="text-4xl font-extrabold text-indigo-600 dark:text-indigo-400 truncate">--</div>
          <div id="curr-rate" class="text-xs text-slate-500 mt-3 font-mono">--</div>
        </div>
      </div>
    </div>
  \`;
}

function getDiscountCalcHTML() {
  return \`
    <div class="max-w-2xl mx-auto space-y-6">
      <div class="bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-950 border border-slate-200/50 dark:border-slate-800 rounded-[2.5rem] shadow-2xl p-6 md:p-8">
        <h3 class="font-extrabold text-2xl text-slate-800 dark:text-slate-200 mb-6 text-center">Discount & Tax</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-bold text-slate-500 uppercase mb-2">Original Price</label>
            <input type="number" id="disc-price" class="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 font-mono text-lg text-slate-800 dark:text-slate-200 outline-none">
          </div>
          <div>
            <label class="block text-xs font-bold text-slate-500 uppercase mb-2">Discount %</label>
            <input type="number" id="disc-perc" class="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 font-mono text-lg text-slate-800 dark:text-slate-200 outline-none">
          </div>
          <div class="md:col-span-2">
            <label class="block text-xs font-bold text-slate-500 uppercase mb-2">Tax % (Optional)</label>
            <input type="number" id="disc-tax" class="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 font-mono text-lg text-slate-800 dark:text-slate-200 outline-none">
          </div>
        </div>
        <div class="mt-8 grid grid-cols-2 gap-4">
          <div class="bg-emerald-50 dark:bg-emerald-900/20 p-5 rounded-2xl border border-emerald-100 dark:border-emerald-800/30 text-center">
            <div class="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-widest mb-1">You Save</div>
            <div id="disc-saved" class="text-2xl font-bold text-emerald-700 dark:text-emerald-300">--</div>
          </div>
          <div class="bg-indigo-50 dark:bg-indigo-900/20 p-5 rounded-2xl border border-indigo-100 dark:border-indigo-800/30 text-center relative overflow-hidden">
            <div class="text-[10px] text-indigo-600 dark:text-indigo-400 font-bold uppercase tracking-widest mb-1">Final Price</div>
            <div id="disc-final" class="text-2xl font-bold text-indigo-700 dark:text-indigo-300">--</div>
            <div id="disc-tax-info" class="text-[9px] text-indigo-400 mt-1 hidden">+ Tax Included</div>
          </div>
        </div>
      </div>
    </div>
  \`;
}

function getEmiCalcHTML() {
  return \`
    <div class="max-w-2xl mx-auto space-y-6">
      <div class="bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-950 border border-slate-200/50 dark:border-slate-800 rounded-[2.5rem] shadow-2xl p-6 md:p-8">
        <h3 class="font-extrabold text-2xl text-slate-800 dark:text-slate-200 mb-6 text-center">EMI & Loan</h3>
        <div class="space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-bold text-slate-500 uppercase mb-2">Asset Value</label>
              <input type="number" id="emi-asset" class="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 font-mono text-slate-800 dark:text-slate-200 outline-none">
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-500 uppercase mb-2">Down Payment</label>
              <input type="number" id="emi-down" class="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 font-mono text-slate-800 dark:text-slate-200 outline-none">
            </div>
          </div>
          <div class="text-center text-xs font-mono text-slate-500 my-2">Principal Amount: <span id="emi-p-display" class="font-bold text-indigo-600 dark:text-indigo-400">$0</span></div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-bold text-slate-500 uppercase mb-2">Interest Rate (%)</label>
              <input type="number" id="emi-r" class="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 font-mono text-slate-800 dark:text-slate-200 outline-none">
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-500 uppercase mb-2">Tenure</label>
              <div class="flex">
                <input type="number" id="emi-t" class="w-full rounded-l-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 px-4 py-3 font-mono text-slate-800 dark:text-slate-200 outline-none border-r-0">
                <div class="flex border border-slate-200 dark:border-slate-700 rounded-r-xl overflow-hidden text-xs">
                  <label class="flex-1 cursor-pointer bg-slate-50 dark:bg-slate-800 px-3 flex items-center justify-center font-bold text-slate-500 hover:text-slate-700">
                    <input type="radio" name="emi-tenure-type" value="Y" checked class="mr-1"> Y
                  </label>
                  <label class="flex-1 cursor-pointer bg-slate-50 dark:bg-slate-800 px-3 flex items-center justify-center font-bold text-slate-500 hover:text-slate-700 border-l border-slate-200 dark:border-slate-700">
                    <input type="radio" name="emi-tenure-type" value="M" class="mr-1"> M
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="mt-6">
          <button id="emi-btn" class="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-lg shadow-indigo-600/20">Calculate EMI</button>
        </div>
        <div id="emi-result" class="hidden mt-6 bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800">
          <div class="text-center mb-4">
            <div class="text-xs text-slate-500 font-bold uppercase tracking-widest mb-1">Monthly EMI</div>
            <div id="emi-val" class="text-3xl font-extrabold text-indigo-600 dark:text-indigo-400">--</div>
          </div>
          <div class="flex justify-between border-t border-slate-200 dark:border-slate-700 pt-4 px-4 text-sm font-mono">
            <div class="text-slate-500">Total Interest: <span id="emi-int" class="font-bold text-amber-600 dark:text-amber-500">--</span></div>
            <div class="text-slate-500">Total Amount: <span id="emi-tot" class="font-bold text-emerald-600 dark:text-emerald-500">--</span></div>
          </div>
        </div>
      </div>
    </div>
  \`;
}

function getUnitCalcHTML() {
  return \`
    <div class="max-w-2xl mx-auto space-y-6">
      <div class="bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-950 border border-slate-200/50 dark:border-slate-800 rounded-[2.5rem] shadow-2xl p-6 md:p-8">
        <h3 class="font-extrabold text-2xl text-slate-800 dark:text-slate-200 mb-6 text-center">Unit Converter</h3>
        <div class="mb-6">
          <label class="block text-xs font-bold text-slate-500 uppercase mb-2">Category</label>
          <select id="unit-category" class="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 font-mono text-slate-800 dark:text-slate-200 outline-none">
            <option value="length">Length</option>
            <option value="weight">Weight & Mass</option>
            <option value="temperature">Temperature</option>
            <option value="volume">Volume</option>
          </select>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
          <div>
            <label class="block text-xs font-bold text-slate-500 uppercase mb-2">From</label>
            <input type="number" id="unit-from-val" value="1" class="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-t-xl px-4 py-3 font-mono text-slate-800 dark:text-slate-200 outline-none border-b-0">
            <select id="unit-from-sel" class="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-b-xl px-4 py-2 text-sm text-slate-700 dark:text-slate-300 outline-none"></select>
          </div>
          <div class="flex justify-center md:hidden my-2">
            <button id="unit-swap" class="p-2 bg-indigo-50 text-indigo-600 rounded-full"><i data-lucide="arrow-down-up" class="w-4 h-4"></i></button>
          </div>
          <div>
            <label class="block text-xs font-bold text-slate-500 uppercase mb-2">To</label>
            <input type="number" id="unit-to-val" class="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-t-xl px-4 py-3 font-mono text-slate-800 dark:text-slate-200 outline-none border-b-0" readonly>
            <select id="unit-to-sel" class="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-b-xl px-4 py-2 text-sm text-slate-700 dark:text-slate-300 outline-none"></select>
          </div>
        </div>
      </div>
    </div>
  \`;
}

function getTempCalcHTML() {
  return \`
    <div class="max-w-2xl mx-auto space-y-6">
      <div class="bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-950 border border-slate-200/50 dark:border-slate-800 rounded-[2.5rem] shadow-2xl p-6 md:p-8 text-center">
        <h3 class="font-extrabold text-2xl text-slate-800 dark:text-slate-200 mb-6 text-center">Temperature</h3>
        <p class="text-slate-500 mb-4">Temperature conversion is handled by the Universal Unit Converter.</p>
        <button onclick="setView('unit')" class="px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold shadow-lg shadow-indigo-600/20">Go to Unit Converter</button>
      </div>
    </div>
  \`;
}

function getBmiCalcHTML() {
  return \`
    <div class="max-w-2xl mx-auto space-y-6">
      <div class="bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-950 border border-slate-200/50 dark:border-slate-800 rounded-[2.5rem] shadow-2xl p-6 md:p-8">
        <h3 class="font-extrabold text-2xl text-slate-800 dark:text-slate-200 mb-6 text-center">BMI Calculator</h3>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-bold text-slate-500 uppercase mb-2">Weight (kg)</label>
            <input type="number" id="bmi-weight" class="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 font-mono text-slate-800 dark:text-slate-200 outline-none">
          </div>
          <div>
            <label class="block text-xs font-bold text-slate-500 uppercase mb-2">Height (cm)</label>
            <input type="number" id="bmi-height" class="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 font-mono text-slate-800 dark:text-slate-200 outline-none">
          </div>
        </div>
        <div class="mt-6">
          <button id="bmi-btn" class="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-lg shadow-indigo-600/20">Calculate BMI</button>
        </div>
        <div id="bmi-result" class="hidden mt-8 text-center">
          <div class="inline-block px-8 py-6 rounded-3xl border-2 transition-colors duration-300" id="bmi-category">
            <div class="text-sm font-bold uppercase tracking-widest opacity-80 mb-2">Your BMI Score</div>
            <div id="bmi-score" class="text-5xl font-extrabold">--</div>
          </div>
        </div>
      </div>
    </div>
  \`;
}

function getAgeCalcHTML() {
  return \`
    <div class="max-w-2xl mx-auto space-y-6">
      <div class="bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-950 border border-slate-200/50 dark:border-slate-800 rounded-[2.5rem] shadow-2xl p-6 md:p-8">
        <h3 class="font-extrabold text-2xl text-slate-800 dark:text-slate-200 mb-6 text-center">Age Calculator</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-bold text-slate-500 uppercase mb-2">Date of Birth</label>
            <input type="date" id="age-dob" class="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 font-mono text-slate-800 dark:text-slate-200 outline-none">
          </div>
          <div>
            <label class="block text-xs font-bold text-slate-500 uppercase mb-2">Compare At Date</label>
            <input type="date" id="age-compare" class="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 font-mono text-slate-800 dark:text-slate-200 outline-none">
          </div>
        </div>
        <div class="mt-6">
          <button id="age-btn" class="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-lg shadow-indigo-600/20">Calculate Age</button>
        </div>
        <div id="age-result" class="hidden mt-8">
          <div class="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
            <div class="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-700/50">
              <div class="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Total Months</div>
              <div id="age-tot-m" class="text-xl font-bold text-slate-700 dark:text-slate-300 font-mono">--</div>
            </div>
            <div class="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-700/50">
              <div class="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Total Weeks</div>
              <div id="age-tot-w" class="text-xl font-bold text-slate-700 dark:text-slate-300 font-mono">--</div>
            </div>
            <div class="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-700/50">
              <div class="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Total Days</div>
              <div id="age-tot-d" class="text-xl font-bold text-slate-700 dark:text-slate-300 font-mono">--</div>
            </div>
            <div class="bg-indigo-50 dark:bg-indigo-900/30 p-4 rounded-2xl border border-indigo-100 dark:border-indigo-800/50">
              <div class="text-[10px] text-indigo-500 dark:text-indigo-400 font-bold uppercase tracking-widest mb-1">Next B-Day</div>
              <div id="age-next-b" class="text-xl font-bold text-indigo-700 dark:text-indigo-300 font-mono">--</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  \`;
}

function getScientificCalcHTML() {
  return \`
    <div class="max-w-4xl mx-auto space-y-6">
      <div class="bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-950 border border-slate-200/50 dark:border-slate-800 rounded-[2.5rem] shadow-2xl p-6 md:p-8">
        
        <div class="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 mb-6 text-right font-mono flex flex-col justify-end min-h-[140px] relative">
          <div id="angle-mode-toggle" class="absolute top-4 left-4 bg-slate-200/50 dark:bg-slate-800/50 rounded-lg flex overflow-hidden border border-slate-300/50 dark:border-slate-700">
            <button data-mode="deg" class="px-2.5 py-1 text-[10px] font-bold bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300">DEG</button>
            <button data-mode="rad" class="px-2.5 py-1 text-[10px] font-bold text-slate-500 opacity-50">RAD</button>
          </div>
          <div id="sci-expr" class="text-slate-400 text-lg mb-2 min-h-[1.75rem] overflow-x-auto whitespace-nowrap scrollbar-hidden pb-1"></div>
          <div id="sci-res" class="text-5xl font-bold text-indigo-600 dark:text-indigo-400 truncate">0</div>
        </div>

        <div id="sci-keys" class="grid grid-cols-5 sm:grid-cols-6 gap-2 md:gap-3 font-mono text-sm md:text-lg">
          <button class="py-3 sm:py-4 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 dark:bg-emerald-900/20 dark:hover:bg-emerald-900/40 rounded-xl font-bold">sin</button>
          <button class="py-3 sm:py-4 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 dark:bg-emerald-900/20 dark:hover:bg-emerald-900/40 rounded-xl font-bold">cos</button>
          <button class="py-3 sm:py-4 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 dark:bg-emerald-900/20 dark:hover:bg-emerald-900/40 rounded-xl font-bold">tan</button>
          <button class="py-3 sm:py-4 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 dark:bg-emerald-900/20 dark:hover:bg-emerald-900/40 rounded-xl font-bold">ln</button>
          <button class="py-3 sm:py-4 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 dark:bg-emerald-900/20 dark:hover:bg-emerald-900/40 rounded-xl font-bold">log</button>
          <button class="hidden sm:block py-3 sm:py-4 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 dark:bg-emerald-900/20 dark:hover:bg-emerald-900/40 rounded-xl font-bold">π</button>
          
          <button class="py-3 sm:py-4 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 dark:bg-emerald-900/20 dark:hover:bg-emerald-900/40 rounded-xl font-bold">√</button>
          <button class="py-3 sm:py-4 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 dark:bg-emerald-900/20 dark:hover:bg-emerald-900/40 rounded-xl font-bold">x^y</button>
          <button class="py-3 sm:py-4 bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-xl font-bold">(</button>
          <button class="py-3 sm:py-4 bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-xl font-bold">)</button>
          <button class="py-3 sm:py-4 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 dark:bg-indigo-900/30 dark:hover:bg-indigo-900/50 rounded-xl font-bold">÷</button>
          <button class="hidden sm:block py-3 sm:py-4 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 dark:bg-emerald-900/20 dark:hover:bg-emerald-900/40 rounded-xl font-bold">e</button>

          <button class="py-3 sm:py-4 bg-white border border-slate-100 hover:bg-slate-50 dark:bg-slate-900 dark:border-slate-800 dark:hover:bg-slate-800 rounded-xl font-bold text-slate-700 dark:text-slate-200">7</button>
          <button class="py-3 sm:py-4 bg-white border border-slate-100 hover:bg-slate-50 dark:bg-slate-900 dark:border-slate-800 dark:hover:bg-slate-800 rounded-xl font-bold text-slate-700 dark:text-slate-200">8</button>
          <button class="py-3 sm:py-4 bg-white border border-slate-100 hover:bg-slate-50 dark:bg-slate-900 dark:border-slate-800 dark:hover:bg-slate-800 rounded-xl font-bold text-slate-700 dark:text-slate-200">9</button>
          <button class="col-span-2 sm:col-span-1 py-3 sm:py-4 bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-xl font-bold text-sm">DEL</button>
          <button class="py-3 sm:py-4 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 dark:bg-indigo-900/30 dark:hover:bg-indigo-900/50 rounded-xl font-bold">×</button>
          <button class="hidden sm:block py-3 sm:py-4 bg-rose-50 text-rose-600 hover:bg-rose-100 dark:bg-rose-900/20 dark:hover:bg-rose-900/40 rounded-xl font-bold">C</button>

          <button class="py-3 sm:py-4 bg-white border border-slate-100 hover:bg-slate-50 dark:bg-slate-900 dark:border-slate-800 dark:hover:bg-slate-800 rounded-xl font-bold text-slate-700 dark:text-slate-200">4</button>
          <button class="py-3 sm:py-4 bg-white border border-slate-100 hover:bg-slate-50 dark:bg-slate-900 dark:border-slate-800 dark:hover:bg-slate-800 rounded-xl font-bold text-slate-700 dark:text-slate-200">5</button>
          <button class="py-3 sm:py-4 bg-white border border-slate-100 hover:bg-slate-50 dark:bg-slate-900 dark:border-slate-800 dark:hover:bg-slate-800 rounded-xl font-bold text-slate-700 dark:text-slate-200">6</button>
          <button class="sm:hidden col-span-2 py-3 sm:py-4 bg-rose-50 text-rose-600 hover:bg-rose-100 dark:bg-rose-900/20 dark:hover:bg-rose-900/40 rounded-xl font-bold">C</button>
          <button class="py-3 sm:py-4 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 dark:bg-indigo-900/30 dark:hover:bg-indigo-900/50 rounded-xl font-bold">-</button>
          <button class="hidden sm:block col-span-1 row-span-2 py-3 sm:py-4 bg-indigo-600 text-white hover:bg-indigo-700 rounded-xl font-bold shadow-lg shadow-indigo-600/20 text-2xl">=</button>

          <button class="py-3 sm:py-4 bg-white border border-slate-100 hover:bg-slate-50 dark:bg-slate-900 dark:border-slate-800 dark:hover:bg-slate-800 rounded-xl font-bold text-slate-700 dark:text-slate-200">1</button>
          <button class="py-3 sm:py-4 bg-white border border-slate-100 hover:bg-slate-50 dark:bg-slate-900 dark:border-slate-800 dark:hover:bg-slate-800 rounded-xl font-bold text-slate-700 dark:text-slate-200">2</button>
          <button class="py-3 sm:py-4 bg-white border border-slate-100 hover:bg-slate-50 dark:bg-slate-900 dark:border-slate-800 dark:hover:bg-slate-800 rounded-xl font-bold text-slate-700 dark:text-slate-200">3</button>
          <button class="py-3 sm:py-4 bg-white border border-slate-100 hover:bg-slate-50 dark:bg-slate-900 dark:border-slate-800 dark:hover:bg-slate-800 rounded-xl font-bold text-slate-700 dark:text-slate-200">0</button>
          <button class="py-3 sm:py-4 bg-white border border-slate-100 hover:bg-slate-50 dark:bg-slate-900 dark:border-slate-800 dark:hover:bg-slate-800 rounded-xl font-bold text-slate-700 dark:text-slate-200">.</button>
          <button class="py-3 sm:py-4 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 dark:bg-indigo-900/30 dark:hover:bg-indigo-900/50 rounded-xl font-bold">+</button>

          <button class="sm:hidden col-span-5 py-4 bg-indigo-600 text-white hover:bg-indigo-700 rounded-xl font-bold shadow-lg shadow-indigo-600/20 text-xl">=</button>
        </div>
      </div>
      
      <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xl h-48 flex flex-col">
        <h4 class="text-sm font-semibold mb-3 flex items-center gap-2 font-mono text-slate-700 dark:text-slate-300"><i data-lucide="history" class="w-4 h-4 text-indigo-500"></i> HISTORY</h4>
        <div id="sci-history" class="flex-1 overflow-y-auto space-y-2 text-sm text-slate-500 dark:text-slate-400 font-mono">No calculations yet.</div>
      </div>
    </div>
  \`;
}
`;

const gstFunc = code.indexOf('function getGstCalcHTML() {');
if (gstFunc !== -1) {
  code = code.substring(0, gstFunc) + replacement + '\n' + code.substring(gstFunc);
  fs.writeFileSync('script.js', code);
  console.log("Replaced script.js perfectly!");
}
