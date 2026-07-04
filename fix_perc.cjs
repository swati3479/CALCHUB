const fs = require('fs');
let code = fs.readFileSync('script.js', 'utf8');

let p1 = code.indexOf('function getPercentageCalcHTML');
let p2 = code.indexOf('function getCurrencyCalcHTML');
if (p1 > -1 && p2 > -1) {
    let html = code.substring(p1, p2);
    
    // Replace the flex row with a grid on mobile and flex on desktop, or simply wrap
    html = html.replace(/<div class="flex items-center gap-3">/g, '<div class="flex flex-col sm:flex-row items-center gap-2 sm:gap-3">');
    
    // Make text spans subtlely adjust
    html = html.replace(/<span class="font-bold text-slate-400">([^<]+)<\/span>/g, '<span class="font-bold text-slate-400 text-sm sm:text-base">$1</span>');

    code = code.substring(0, p1) + html + code.substring(p2);
    fs.writeFileSync('script.js', code);
}
