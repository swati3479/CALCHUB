const fs = require('fs');
let code = fs.readFileSync('script.js', 'utf8');

const newHtml = `
function getProgrammerCalcHTML() {
  return \`
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
  \`;
}

function getTdeeCalcHTML() {
  return \`
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
  \`;
}

function getFuelCalcHTML() {
  return \`
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
  \`;
}
`;

// Insert before function initCalculatorLogic
code = code.replace(/function initCalculatorLogic\(/, newHtml + '\nfunction initCalculatorLogic(');

fs.writeFileSync('script.js', code);
