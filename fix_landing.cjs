const fs = require('fs');

let code = fs.readFileSync('script.js', 'utf8');

const replacement = `function renderLandingPage() {
  return \`
    <div class="flex-1 flex flex-col items-center justify-center p-8 text-center animate-fade-in relative overflow-hidden h-full w-full">
      <div class="absolute inset-0 z-0">
        <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
        <div class="absolute top-1/3 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
        <div class="absolute -bottom-8 left-1/2 w-96 h-96 bg-rose-500/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
      </div>
      
      <div class="relative z-10 max-w-3xl mx-auto space-y-8 w-full">
        <div class="w-24 h-24 mx-auto bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl flex items-center justify-center shadow-xl shadow-indigo-500/20 transform -rotate-6 transition-transform duration-300">
           <i data-lucide="calculator" class="w-12 h-12 text-white"></i>
        </div>
        
        <h1 class="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-800 dark:text-slate-100">
          The <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Ultimate</span><br>Calculator Suite
        </h1>
        
        <p class="text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
          11 powerful calculators in one elegant interface. From complex scientific equations to everyday financial planning.
        </p>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 text-left">
          \${CALCULATORS.map((calc, i) => \`
            <button onclick="setView('\${calc.id}')" class="group p-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200 dark:border-slate-800 rounded-2xl hover:border-indigo-500 dark:hover:border-indigo-500 hover:shadow-lg hover:shadow-indigo-500/10 transition-all">
              <div class="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-500 group-hover:text-indigo-600 group-hover:bg-indigo-50 dark:group-hover:bg-indigo-900/30 flex items-center justify-center mb-3 transition-colors">
                <i data-lucide="\${calc.icon}" class="w-5 h-5"></i>
              </div>
              <h3 class="font-bold text-slate-700 dark:text-slate-200 text-sm group-hover:text-indigo-600 dark:group-hover:text-indigo-400">\${calc.name}</h3>
              <p class="text-[10px] uppercase font-bold tracking-widest text-slate-400 mt-1">\${calc.category}</p>
            </button>
          \`).join('')}
        </div>
      </div>
    </div>
  \`;
}`;

code = code.replace(/function renderLandingPage\(\) \{\s*return \`\$\{data\.landing\}\`;\s*\}/, replacement);

fs.writeFileSync('script.js', code);
