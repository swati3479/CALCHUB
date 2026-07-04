const fs = require('fs');
let code = fs.readFileSync('script.js', 'utf8');

// Optimize paddings and borders
code = code.replace(/rounded-\[2\.5rem\]/g, 'rounded-3xl');
code = code.replace(/p-6 md:p-8/g, 'p-4 sm:p-6 md:p-8');
code = code.replace(/p-6 mb-6/g, 'p-4 sm:p-6 mb-4 sm:mb-6');
code = code.replace(/grid-cols-2 md:grid-cols-4 gap-4/g, 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4');

// Optimize simple calculator buttons
code = code.replace(/id="simple-keys" class="grid grid-cols-4 gap-3 font-mono"/g, 'id="simple-keys" class="grid grid-cols-4 gap-2 sm:gap-3 font-mono"');
// Change py-4 to py-3 sm:py-4 in simple calculator
let p1 = code.indexOf('function getSimpleCalcHTML');
let p2 = code.indexOf('function getPercentageCalcHTML');
if (p1 > -1 && p2 > -1) {
    let simpleHtml = code.substring(p1, p2);
    simpleHtml = simpleHtml.replace(/py-4 /g, 'py-3 sm:py-4 ');
    code = code.substring(0, p1) + simpleHtml + code.substring(p2);
}

// Optimize scientific calculator layout
let s1 = code.indexOf('function getScientificCalcHTML');
let s2 = code.indexOf('function getGstCalcHTML');
if (s1 > -1 && s2 > -1) {
    let sciHtml = code.substring(s1, s2);
    sciHtml = sciHtml.replace(/gap-2 md:gap-3/g, 'gap-1.5 sm:gap-2 md:gap-3');
    sciHtml = sciHtml.replace(/py-3 sm:py-4 /g, 'py-2.5 sm:py-3 md:py-4 ');
    sciHtml = sciHtml.replace(/py-4 bg-indigo/g, 'py-3 sm:py-4 bg-indigo'); // equals button
    code = code.substring(0, s1) + sciHtml + code.substring(s2);
}

// Ensure the main container has better mobile padding
code = code.replace(/<main class="flex-1 p-6 md:p-8 /g, '<main class="flex-1 p-3 sm:p-6 md:p-8 ');

fs.writeFileSync('script.js', code);
