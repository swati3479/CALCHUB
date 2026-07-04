const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  console.log("Starting Puppeteer...");
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  
  await page.goto('https://calchub-tan.vercel.app/', { waitUntil: 'networkidle0' });
  
  const htmlMap = {};
  
  // Click simple calc to enter dashboard
  await page.evaluate(() => {
    const btn = document.querySelector('#showcase-card-simple');
    if (btn) btn.click();
  });
  
  await new Promise(r => setTimeout(r, 1000));
  
  // Sidebar loop
  const calcIds = ['simple', 'scientific', 'percentage', 'currency', 'gst', 'discount', 'emi', 'unit', 'temperature', 'bmi', 'age'];
  
  for (const calcId of calcIds) {
    await page.evaluate((id) => {
      const btn = document.querySelector('#sidebar-item-' + id);
      if (btn) btn.click();
    }, calcId);
    
    await new Promise(r => setTimeout(r, 500));
    
    const calcHtml = await page.evaluate((id) => {
      const wrapper = document.querySelector('#active-calc-wrapper-' + id);
      return wrapper ? wrapper.innerHTML : null;
    }, calcId);
    
    htmlMap[calcId] = calcHtml;
  }
  
  fs.writeFileSync('extracted_html2.json', JSON.stringify(htmlMap, null, 2));
  console.log("Done extracting!");
  await browser.close();
})();
