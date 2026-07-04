const fs = require('fs');

let code = fs.readFileSync('script.js', 'utf8');

const replacement = `
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
        
        <div id="bmi-result-card" class="hidden mt-8 text-center space-y-6">
          <div>
            <div id="bmi-score" class="text-7xl font-black mb-2 tracking-tighter drop-shadow-md">--</div>
            <div id="bmi-category" class="text-xl font-bold tracking-widest uppercase px-6 py-2 inline-flex items-center gap-2 rounded-full border shadow-sm mb-6">--</div>
          </div>
          <div class="grid grid-cols-2 gap-4 text-center">
             <div class="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
               <div class="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Ideal Weight</div>
               <div id="bmi-ideal" class="font-mono text-slate-700 dark:text-slate-300 font-bold">--</div>
             </div>
             <div class="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
               <div class="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Ponderal Index</div>
               <div id="bmi-pi" class="font-mono text-slate-700 dark:text-slate-300 font-bold">--</div>
             </div>
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
        <div id="age-result" class="hidden mt-8 space-y-4">
          <div class="bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl p-6 border border-indigo-100 dark:border-indigo-800/30 text-center flex flex-col items-center justify-center">
            <div class="text-[10px] text-indigo-500 dark:text-indigo-400 font-bold uppercase tracking-widest mb-3">Exact Age</div>
            <div class="flex items-center gap-4 text-slate-700 dark:text-slate-200 font-mono">
               <div class="flex flex-col items-center"><span id="age-y" class="text-3xl font-extrabold text-indigo-600 dark:text-indigo-400">0</span><span class="text-xs uppercase font-bold opacity-60">Years</span></div>
               <div class="text-2xl opacity-30">/</div>
               <div class="flex flex-col items-center"><span id="age-m" class="text-3xl font-extrabold text-indigo-600 dark:text-indigo-400">0</span><span class="text-xs uppercase font-bold opacity-60">Months</span></div>
               <div class="text-2xl opacity-30">/</div>
               <div class="flex flex-col items-center"><span id="age-d" class="text-3xl font-extrabold text-indigo-600 dark:text-indigo-400">0</span><span class="text-xs uppercase font-bold opacity-60">Days</span></div>
            </div>
          </div>
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
`;

const firstFunc = code.indexOf('function getBmiCalcHTML() {');
const endFunc = code.indexOf('function getScientificCalcHTML() {');

if (firstFunc !== -1 && endFunc !== -1) {
  code = code.substring(0, firstFunc) + replacement + '\n' + code.substring(endFunc);
  fs.writeFileSync('script.js', code);
  console.log("Replaced BMI and Age properly.");
} else {
  console.log("Could not find delimiters", firstFunc, endFunc);
}
