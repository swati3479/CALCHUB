const fs = require('fs');
let code = fs.readFileSync('script.js', 'utf8');
code = code.replace(/p-6 md:p-8/g, 'p-4 sm:p-6 md:p-8');
code = code.replace(/p-8 text-center animate-fade-in/g, 'p-4 sm:p-8 text-center animate-fade-in');
code = code.replace(/mt-8 bg-white dark:bg-slate-900 rounded-\[2rem\] border border-slate-200 dark:border-slate-700 p-8/g, 'mt-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-700 p-5 sm:p-8');
code = code.replace(/rounded-\[2rem\]/g, 'rounded-3xl');
fs.writeFileSync('script.js', code);
