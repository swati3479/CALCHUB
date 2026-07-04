const fs = require('fs');
let code = fs.readFileSync('script.js', 'utf8');

const newSidebar = `
      <div class="p-4 flex items-center justify-between border-b border-slate-200/80 dark:border-slate-800/80 h-16 shrink-0 overflow-hidden">
        <div onclick="setView('home')" class="flex items-center gap-3 cursor-pointer hover:opacity-85 select-none">
          <div class="w-9 h-9 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xl shrink-0">C</div>
          \${sidebarOpen ? '<span class="font-bold tracking-tight text-xl text-slate-800 dark:text-slate-100 uppercase font-mono">CalcHub</span>' : ''}
        </div>
        \${sidebarOpen ? '<button id="sidebar-close-mob" onclick="toggleSidebar()" class="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 md:hidden cursor-pointer"><i data-lucide="x" class="w-[18px] h-[18px]"></i></button>' : ''}
      </div>
      
      <nav class="flex-1 overflow-y-auto p-3 space-y-1 scrollbar-hidden">
        \${sidebarOpen ? \`
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
        \` : ''}
        
        \${sidebarOpen ? '<div class="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3 mb-2 mt-2">Dashboard</div>' : ''}
        <button onclick="setView('home')" class="w-full py-2.5 rounded-xl text-xs font-semibold flex items-center gap-3 transition-colors select-none cursor-pointer outline-none \${sidebarOpen ? 'justify-start px-3.5' : 'justify-center px-0'} text-slate-500 dark:text-slate-400 hover:bg-slate-200/50 dark:hover:bg-slate-800/50 hover:text-slate-800 dark:hover:text-slate-200">
          <i data-lucide="home" class="w-4 h-4 shrink-0"></i>
          \${sidebarOpen ? '<span class="truncate">Landing</span>' : ''}
        </button>
        \${sidebarOpen ? '<div class="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3 mb-2 mt-4 pt-1">Tools & Calculators</div>' : ''}
        \${CALCULATORS.map(c => \`
          <button onclick="setView('\${c.id}')" data-nav-id="\${c.id}" data-name="\${c.name.toLowerCase()}" data-category="\${c.category}" class="calc-nav-btn w-full py-2.5 rounded-xl text-xs font-semibold flex items-center gap-3 transition-colors select-none cursor-pointer outline-none \${sidebarOpen ? 'justify-start px-3.5' : 'justify-center px-0'} \${currentView === c.id ? 'bg-indigo-600 text-white font-bold shadow-md shadow-indigo-650/10 border border-indigo-500/20' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-200/50 dark:hover:bg-slate-800/50 hover:text-slate-800 dark:hover:text-slate-200'}">
            <i data-lucide="\${c.icon}" class="w-4 h-4 shrink-0"></i>
            \${sidebarOpen ? \`<span class="truncate">\${c.name}</span>\` : ''}
          </button>
        \`).join('')}
      </nav>
`;

// replace in script
code = code.replace(/<div class="p-4 flex items-center justify-between border-b border-slate-200\/80 dark:border-slate-800\/80 h-16 shrink-0 overflow-hidden">[\s\S]*?<\/nav>/, newSidebar);

fs.writeFileSync('script.js', code);
