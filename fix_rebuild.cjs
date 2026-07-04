const fs = require('fs');
let code = fs.readFileSync('rebuild_script.cjs', 'utf8');
code = code.replace(/\\\`/g, '`');
code = code.replace(/\\\\\$/g, '\\$');
// Let's just rewrite the problematic part
const replaceRegex = /newCode \+= \`[\s\S]*?\}\n\`;/;
code = code.replace(replaceRegex, `newCode += "\\nfunction " + funcName + "() {\\n  return \\\`" + escapeHtml(html) + "\\\`;\\n}\\n";`);
fs.writeFileSync('rebuild_script_fixed.cjs', code);
