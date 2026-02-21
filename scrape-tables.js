const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const seeds = [4,5,6,7,8,9,10,11,12,13];
  let grandTotal = 0;
  
  for (const seed of seeds) {
    await page.goto(`https://sanand0.github.io/tdsdata/js_table/?seed=${seed}`);
    await page.waitForSelector('table', { timeout: 10000 });
    
    const numbers = await page.evaluate(() => {
      const nums = [];
      document.querySelectorAll('table td, table th').forEach(cell => {
        const matches = cell.textContent.match(/[-+]?\d*\.?\d+/g);
        if (matches) matches.forEach(n => nums.push(parseFloat(n)));
      });
      return nums.filter(n => !isNaN(n));
    });
    
    const pageSum = numbers.reduce((a, b) => a + b, 0);
    grandTotal += pageSum;
    console.log(`Seed ${seed}: ${numbers.length} numbers, sum=${pageSum.toFixed(2)}`);
  }
  
  console.log(`\n GRAND TOTAL: ${grandTotal.toFixed(2)}`);
  console.log(`DataDash QA COMPLETE - Total numbers summed: ${grandTotal.toFixed(2)}`);
  
  await browser.close();
})();
