const fs = require('fs');

let code = fs.readFileSync('script.js', 'utf8');

const regex = /function getScientificCalcHTML\(\) \{[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*`;\s*}/;

const replacement = `function getScientificCalcHTML() {
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
          <button data-val="sin" class="py-3 sm:py-4 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 dark:bg-emerald-900/20 dark:hover:bg-emerald-900/40 rounded-xl font-bold">sin</button>
          <button data-val="cos" class="py-3 sm:py-4 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 dark:bg-emerald-900/20 dark:hover:bg-emerald-900/40 rounded-xl font-bold">cos</button>
          <button data-val="tan" class="py-3 sm:py-4 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 dark:bg-emerald-900/20 dark:hover:bg-emerald-900/40 rounded-xl font-bold">tan</button>
          <button data-val="ln" class="py-3 sm:py-4 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 dark:bg-emerald-900/20 dark:hover:bg-emerald-900/40 rounded-xl font-bold">ln</button>
          <button data-val="log" class="py-3 sm:py-4 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 dark:bg-emerald-900/20 dark:hover:bg-emerald-900/40 rounded-xl font-bold">log</button>
          <button data-val="pi" class="hidden sm:block py-3 sm:py-4 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 dark:bg-emerald-900/20 dark:hover:bg-emerald-900/40 rounded-xl font-bold">π</button>
          
          <button data-val="sqrt" class="py-3 sm:py-4 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 dark:bg-emerald-900/20 dark:hover:bg-emerald-900/40 rounded-xl font-bold">√</button>
          <button data-val="^" class="py-3 sm:py-4 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 dark:bg-emerald-900/20 dark:hover:bg-emerald-900/40 rounded-xl font-bold">x^y</button>
          <button data-val="(" class="py-3 sm:py-4 bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-xl font-bold">(</button>
          <button data-val=")" class="py-3 sm:py-4 bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-xl font-bold">)</button>
          <button data-val="/" class="py-3 sm:py-4 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 dark:bg-indigo-900/30 dark:hover:bg-indigo-900/50 rounded-xl font-bold">÷</button>
          <button data-val="e" class="hidden sm:block py-3 sm:py-4 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 dark:bg-emerald-900/20 dark:hover:bg-emerald-900/40 rounded-xl font-bold">e</button>

          <button data-val="7" class="py-3 sm:py-4 bg-white border border-slate-100 hover:bg-slate-50 dark:bg-slate-900 dark:border-slate-800 dark:hover:bg-slate-800 rounded-xl font-bold text-slate-700 dark:text-slate-200">7</button>
          <button data-val="8" class="py-3 sm:py-4 bg-white border border-slate-100 hover:bg-slate-50 dark:bg-slate-900 dark:border-slate-800 dark:hover:bg-slate-800 rounded-xl font-bold text-slate-700 dark:text-slate-200">8</button>
          <button data-val="9" class="py-3 sm:py-4 bg-white border border-slate-100 hover:bg-slate-50 dark:bg-slate-900 dark:border-slate-800 dark:hover:bg-slate-800 rounded-xl font-bold text-slate-700 dark:text-slate-200">9</button>
          <button data-val="DEL" class="col-span-2 sm:col-span-1 py-3 sm:py-4 bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-xl font-bold text-sm">DEL</button>
          <button data-val="*" class="py-3 sm:py-4 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 dark:bg-indigo-900/30 dark:hover:bg-indigo-900/50 rounded-xl font-bold">×</button>
          <button data-val="C" class="hidden sm:block py-3 sm:py-4 bg-rose-50 text-rose-600 hover:bg-rose-100 dark:bg-rose-900/20 dark:hover:bg-rose-900/40 rounded-xl font-bold">C</button>

          <button data-val="4" class="py-3 sm:py-4 bg-white border border-slate-100 hover:bg-slate-50 dark:bg-slate-900 dark:border-slate-800 dark:hover:bg-slate-800 rounded-xl font-bold text-slate-700 dark:text-slate-200">4</button>
          <button data-val="5" class="py-3 sm:py-4 bg-white border border-slate-100 hover:bg-slate-50 dark:bg-slate-900 dark:border-slate-800 dark:hover:bg-slate-800 rounded-xl font-bold text-slate-700 dark:text-slate-200">5</button>
          <button data-val="6" class="py-3 sm:py-4 bg-white border border-slate-100 hover:bg-slate-50 dark:bg-slate-900 dark:border-slate-800 dark:hover:bg-slate-800 rounded-xl font-bold text-slate-700 dark:text-slate-200">6</button>
          <button data-val="C" class="sm:hidden col-span-2 py-3 sm:py-4 bg-rose-50 text-rose-600 hover:bg-rose-100 dark:bg-rose-900/20 dark:hover:bg-rose-900/40 rounded-xl font-bold">C</button>
          <button data-val="-" class="py-3 sm:py-4 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 dark:bg-indigo-900/30 dark:hover:bg-indigo-900/50 rounded-xl font-bold">-</button>
          <button data-val="=" class="hidden sm:block col-span-1 row-span-2 py-3 sm:py-4 bg-indigo-600 text-white hover:bg-indigo-700 rounded-xl font-bold shadow-lg shadow-indigo-600/20 text-2xl">=</button>

          <button data-val="1" class="py-3 sm:py-4 bg-white border border-slate-100 hover:bg-slate-50 dark:bg-slate-900 dark:border-slate-800 dark:hover:bg-slate-800 rounded-xl font-bold text-slate-700 dark:text-slate-200">1</button>
          <button data-val="2" class="py-3 sm:py-4 bg-white border border-slate-100 hover:bg-slate-50 dark:bg-slate-900 dark:border-slate-800 dark:hover:bg-slate-800 rounded-xl font-bold text-slate-700 dark:text-slate-200">2</button>
          <button data-val="3" class="py-3 sm:py-4 bg-white border border-slate-100 hover:bg-slate-50 dark:bg-slate-900 dark:border-slate-800 dark:hover:bg-slate-800 rounded-xl font-bold text-slate-700 dark:text-slate-200">3</button>
          <button data-val="0" class="py-3 sm:py-4 bg-white border border-slate-100 hover:bg-slate-50 dark:bg-slate-900 dark:border-slate-800 dark:hover:bg-slate-800 rounded-xl font-bold text-slate-700 dark:text-slate-200">0</button>
          <button data-val="." class="py-3 sm:py-4 bg-white border border-slate-100 hover:bg-slate-50 dark:bg-slate-900 dark:border-slate-800 dark:hover:bg-slate-800 rounded-xl font-bold text-slate-700 dark:text-slate-200">.</button>
          <button data-val="+" class="py-3 sm:py-4 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 dark:bg-indigo-900/30 dark:hover:bg-indigo-900/50 rounded-xl font-bold">+</button>

          <button data-val="=" class="sm:hidden col-span-5 py-4 bg-indigo-600 text-white hover:bg-indigo-700 rounded-xl font-bold shadow-lg shadow-indigo-600/20 text-xl">=</button>
        </div>
      </div>
      
      <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xl h-48 flex flex-col">
        <h4 class="text-sm font-semibold mb-3 flex items-center gap-2 font-mono text-slate-700 dark:text-slate-300"><i data-lucide="history" class="w-4 h-4 text-indigo-500"></i> HISTORY</h4>
        <div id="sci-history" class="flex-1 overflow-y-auto space-y-2 text-sm text-slate-500 dark:text-slate-400 font-mono">No calculations yet.</div>
      </div>
    </div>
  \`;
}`;

code = code.replace(regex, replacement);

fs.writeFileSync('script.js', code);
