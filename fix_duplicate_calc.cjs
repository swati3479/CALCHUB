const fs = require('fs');
let code = fs.readFileSync('script.js', 'utf8');

// Remove 'simple' from CALCULATORS
code = code.replace(/\{\s*id:\s*'simple',\s*name:\s*'Standard Calculator',\s*icon:\s*'calculator',\s*category:\s*'Basic'\s*\},\n\s*/, '');

// Rename 'scientific' to 'Calculator' and give it the standard icon
code = code.replace(/\{\s*id:\s*'scientific',\s*name:\s*'Scientific',\s*icon:\s*'flask-conical',\s*category:\s*'Basic'\s*\}/, "{ id: 'scientific', name: 'Calculator', icon: 'calculator', category: 'Basic' }");

// Remove case 'simple' from switch
code = code.replace(/\n\s*case\s*'simple':\s*return\s*getSimpleCalcHTML\(\);/, '');

// Make scientific default instead of simple
code = code.replace(/default:\s*return\s*getSimpleCalcHTML\(\);/, "default: return getScientificCalcHTML();");

// Update landing page text if it says 19
code = code.replace(/19 powerful calculators in one elegant interface\./g, '18 powerful calculators in one elegant interface.');

fs.writeFileSync('script.js', code);
