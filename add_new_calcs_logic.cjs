const fs = require('fs');
let code = fs.readFileSync('script.js', 'utf8');

const newLogic = `
  if (calcId === 'date') {
    const sEl = document.getElementById('date-start');
    const eEl = document.getElementById('date-end');
    const btn = document.getElementById('date-btn');
    const resDiv = document.getElementById('date-result');
    
    btn.addEventListener('click', () => {
      if(!sEl.value || !eEl.value) return;
      const d1 = new Date(sEl.value);
      const d2 = new Date(eEl.value);
      
      const diffTime = Math.abs(d2 - d1);
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      const diffWeeks = (diffDays / 7).toFixed(1);
      const diffMonths = (diffDays / 30.44).toFixed(1);
      
      resDiv.classList.remove('hidden');
      document.getElementById('date-diff-main').innerText = diffDays + ' Days';
      document.getElementById('date-diff-days').innerText = diffDays;
      document.getElementById('date-diff-weeks').innerText = diffWeeks;
      document.getElementById('date-diff-months').innerText = diffMonths;
    });
  }

  if (calcId === 'salary') {
    const amtEl = document.getElementById('sal-amt');
    const freqEl = document.getElementById('sal-freq');
    const hoursEl = document.getElementById('sal-hours');
    const btn = document.getElementById('sal-btn');
    const resDiv = document.getElementById('sal-result');
    
    btn.addEventListener('click', () => {
      const amt = parseFloat(amtEl.value);
      const freq = freqEl.value;
      const hours = parseFloat(hoursEl.value) || 40;
      
      if(isNaN(amt)) return;
      
      let hourly = 0;
      const weeksPerYear = 52;
      const hoursPerYear = hours * weeksPerYear;
      
      if(freq === 'hourly') hourly = amt;
      else if(freq === 'daily') hourly = amt / (hours / 5);
      else if(freq === 'weekly') hourly = amt / hours;
      else if(freq === 'monthly') hourly = (amt * 12) / hoursPerYear;
      else if(freq === 'yearly') hourly = amt / hoursPerYear;
      
      const daily = hourly * (hours / 5);
      const weekly = hourly * hours;
      const monthly = (hourly * hoursPerYear) / 12;
      const yearly = hourly * hoursPerYear;
      
      resDiv.classList.remove('hidden');
      document.getElementById('sal-res-hourly').innerText = hourly.toLocaleString('en-US', {style:'currency', currency:'USD'});
      document.getElementById('sal-res-daily').innerText = daily.toLocaleString('en-US', {style:'currency', currency:'USD'});
      document.getElementById('sal-res-weekly').innerText = weekly.toLocaleString('en-US', {style:'currency', currency:'USD'});
      document.getElementById('sal-res-monthly').innerText = monthly.toLocaleString('en-US', {style:'currency', currency:'USD'});
      document.getElementById('sal-res-yearly').innerText = yearly.toLocaleString('en-US', {style:'currency', currency:'USD'});
    });
  }

  if (calcId === 'ratio') {
    const aEl = document.getElementById('ratio-a');
    const bEl = document.getElementById('ratio-b');
    const cEl = document.getElementById('ratio-c');
    const dEl = document.getElementById('ratio-d');
    const btn = document.getElementById('ratio-btn');
    const clearBtn = document.getElementById('ratio-clear');
    
    btn.addEventListener('click', () => {
      const a = aEl.value !== '' ? parseFloat(aEl.value) : null;
      const b = bEl.value !== '' ? parseFloat(bEl.value) : null;
      const c = cEl.value !== '' ? parseFloat(cEl.value) : null;
      const d = dEl.value !== '' ? parseFloat(dEl.value) : null;
      
      let emptyCount = 0;
      if (a === null) emptyCount++;
      if (b === null) emptyCount++;
      if (c === null) emptyCount++;
      if (d === null) emptyCount++;
      
      if (emptyCount !== 1) {
        // avoid window.alert in iframe, just update placeholder or return
        return;
      }
      
      // A / B = C / D => A * D = B * C
      if (a === null) {
        aEl.value = Number(((b * c) / d).toFixed(4)).toString();
        aEl.classList.add('text-indigo-600', 'dark:text-indigo-400');
      } else if (b === null) {
        bEl.value = Number(((a * d) / c).toFixed(4)).toString();
        bEl.classList.add('text-indigo-600', 'dark:text-indigo-400');
      } else if (c === null) {
        cEl.value = Number(((a * d) / b).toFixed(4)).toString();
        cEl.classList.add('text-indigo-600', 'dark:text-indigo-400');
      } else if (d === null) {
        dEl.value = Number(((b * c) / a).toFixed(4)).toString();
        dEl.classList.add('text-indigo-600', 'dark:text-indigo-400');
      }
    });
    
    clearBtn.addEventListener('click', () => {
      aEl.value = ''; bEl.value = ''; cEl.value = ''; dEl.value = '';
      [aEl, bEl, cEl, dEl].forEach(el => el.classList.remove('text-indigo-600', 'dark:text-indigo-400'));
    });
    
    [aEl, bEl, cEl, dEl].forEach(el => {
      el.addEventListener('input', () => el.classList.remove('text-indigo-600', 'dark:text-indigo-400'));
    });
  }
`;

// Insert into initCalculatorLogic just before `if (calcId === 'scientific')`
code = code.replace(/if \(calcId === 'scientific'\)/, newLogic + '\n  if (calcId === \'scientific\')');

fs.writeFileSync('script.js', code);
