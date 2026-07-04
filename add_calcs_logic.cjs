const fs = require('fs');
let code = fs.readFileSync('script.js', 'utf8');

const newLogic = `
  if (calcId === 'compound') {
    const pEl = document.getElementById('comp-p');
    const rEl = document.getElementById('comp-r');
    const tEl = document.getElementById('comp-t');
    const nEl = document.getElementById('comp-n');
    const btn = document.getElementById('comp-btn');
    const resDiv = document.getElementById('comp-result');
    
    btn.addEventListener('click', () => {
      const p = parseFloat(pEl.value);
      const r = parseFloat(rEl.value) / 100;
      const t = parseFloat(tEl.value);
      const n = parseFloat(nEl.value);
      
      if(isNaN(p) || isNaN(r) || isNaN(t)) return;
      
      const a = p * Math.pow(1 + (r / n), n * t);
      const interest = a - p;
      
      resDiv.classList.remove('hidden');
      document.getElementById('comp-tot').innerText = a.toLocaleString('en-US', {style:'currency', currency:'USD'});
      document.getElementById('comp-p-res').innerText = p.toLocaleString('en-US', {style:'currency', currency:'USD'});
      document.getElementById('comp-int').innerText = interest.toLocaleString('en-US', {style:'currency', currency:'USD'});
    });
  }
  
  if (calcId === 'tip') {
    const billEl = document.getElementById('tip-bill');
    const percRangeEl = document.getElementById('tip-perc-range');
    const percEl = document.getElementById('tip-perc');
    const peopleEl = document.getElementById('tip-people');
    
    const updateTip = () => {
      const bill = parseFloat(billEl.value) || 0;
      const perc = parseFloat(percEl.value) || 0;
      const people = parseInt(peopleEl.value) || 1;
      
      const totalTip = bill * (perc / 100);
      const totalBill = bill + totalTip;
      const tipPerPerson = totalTip / people;
      const totalPerPerson = totalBill / people;
      
      document.getElementById('tip-per-person').innerText = tipPerPerson.toLocaleString('en-US', {style:'currency', currency:'USD'});
      document.getElementById('total-per-person').innerText = totalPerPerson.toLocaleString('en-US', {style:'currency', currency:'USD'});
      document.getElementById('tip-total-bill').innerText = totalBill.toLocaleString('en-US', {style:'currency', currency:'USD'});
    };
    
    percRangeEl.addEventListener('input', (e) => {
      percEl.value = e.target.value;
      updateTip();
    });
    
    percEl.addEventListener('input', (e) => {
      percRangeEl.value = e.target.value;
      updateTip();
    });
    
    document.getElementById('tip-minus').addEventListener('click', () => {
      let p = parseInt(peopleEl.value) || 1;
      if (p > 1) {
        peopleEl.value = p - 1;
        updateTip();
      }
    });
    
    document.getElementById('tip-plus').addEventListener('click', () => {
      let p = parseInt(peopleEl.value) || 1;
      peopleEl.value = p + 1;
      updateTip();
    });
    
    billEl.addEventListener('input', updateTip);
    peopleEl.addEventListener('input', updateTip);
  }
`;

// Insert into initCalculatorLogic just before `if (calcId === 'scientific')`
code = code.replace(/if \(calcId === 'scientific'\)/, newLogic + '\n  if (calcId === \'scientific\')');

fs.writeFileSync('script.js', code);
