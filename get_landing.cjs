const fs = require('fs');
let code = fs.readFileSync('script.js', 'utf8');
let p1 = code.indexOf('function renderLandingPage()');
let p2 = code.indexOf('function renderDashboard()');
console.log(code.substring(p1, p2));
