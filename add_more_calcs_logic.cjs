const fs = require('fs');
let code = fs.readFileSync('script.js', 'utf8');

const newLogic = `
  if (calcId === 'programmer') {
    const hEl = document.getElementById('prog-hex');
    const dEl = document.getElementById('prog-dec');
    const oEl = document.getElementById('prog-oct');
    const bEl = document.getElementById('prog-bin');
    
    const updateProg = (source) => {
      let dec = 0;
      let valid = true;
      try {
        if (source === 'hex' && hEl.value !== '') dec = parseInt(hEl.value, 16);
        else if (source === 'dec' && dEl.value !== '') dec = parseInt(dEl.value, 10);
        else if (source === 'oct' && oEl.value !== '') dec = parseInt(oEl.value, 8);
        else if (source === 'bin' && bEl.value !== '') dec = parseInt(bEl.value, 2);
        else valid = false;
        
        if (isNaN(dec)) valid = false;
      } catch(e) { valid = false; }
      
      if (valid) {
        if (source !== 'hex') hEl.value = dec.toString(16).toUpperCase();
        if (source !== 'dec') dEl.value = dec.toString(10);
        if (source !== 'oct') oEl.value = dec.toString(8);
        if (source !== 'bin') bEl.value = dec.toString(2);
      } else {
        if (source !== 'hex') hEl.value = '';
        if (source !== 'dec') dEl.value = '';
        if (source !== 'oct') oEl.value = '';
        if (source !== 'bin') bEl.value = '';
      }
    };
    
    hEl.addEventListener('input', () => updateProg('hex'));
    dEl.addEventListener('input', () => updateProg('dec'));
    oEl.addEventListener('input', () => updateProg('oct'));
    bEl.addEventListener('input', () => updateProg('bin'));
  }
  
  if (calcId === 'tdee') {
    const ageEl = document.getElementById('tdee-age');
    const weightEl = document.getElementById('tdee-weight');
    const heightEl = document.getElementById('tdee-height');
    const actEl = document.getElementById('tdee-activity');
    const btn = document.getElementById('tdee-btn');
    const resDiv = document.getElementById('tdee-result');
    
    btn.addEventListener('click', () => {
      const isMale = document.querySelector('input[name="tdee-gender"]:checked').value === 'male';
      const a = parseFloat(ageEl.value);
      const w = parseFloat(weightEl.value);
      const h = parseFloat(heightEl.value);
      const act = parseFloat(actEl.value);
      
      if(isNaN(a) || isNaN(w) || isNaN(h)) return;
      
      // Mifflin-St Jeor Equation
      let bmr = (10 * w) + (6.25 * h) - (5 * a);
      bmr += isMale ? 5 : -161;
      
      const maint = Math.round(bmr * act);
      
      resDiv.classList.remove('hidden');
      document.getElementById('tdee-maint').innerText = maint.toLocaleString();
      document.getElementById('tdee-cut').innerText = (maint - 500).toLocaleString();
      document.getElementById('tdee-bulk').innerText = (maint + 500).toLocaleString();
    });
  }
  
  if (calcId === 'fuel') {
    const distEl = document.getElementById('fuel-dist');
    const effEl = document.getElementById('fuel-eff');
    const priceEl = document.getElementById('fuel-price');
    const btn = document.getElementById('fuel-btn');
    const resDiv = document.getElementById('fuel-result');
    
    btn.addEventListener('click', () => {
      const d = parseFloat(distEl.value);
      const e = parseFloat(effEl.value);
      const p = parseFloat(priceEl.value);
      
      if(isNaN(d) || isNaN(e) || isNaN(p)) return;
      
      // assuming distance / efficiency (e.g. km / (km/L) = L)
      const req = d / e;
      const cost = req * p;
      
      resDiv.classList.remove('hidden');
      document.getElementById('fuel-req').innerText = req.toFixed(2);
      document.getElementById('fuel-cost').innerText = cost.toLocaleString('en-US', {style:'currency', currency:'USD'});
    });
  }
`;

// Insert into initCalculatorLogic just before `if (calcId === 'scientific')`
code = code.replace(/if \(calcId === 'scientific'\)/, newLogic + '\n  if (calcId === \'scientific\')');

fs.writeFileSync('script.js', code);
