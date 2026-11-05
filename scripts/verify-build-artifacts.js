const fs = require('fs');
const path = require('path');

function checkFile(relPath, checks) {
  const fullPath = path.join(process.cwd(), '.next/server/app', relPath);
  if (!fs.existsSync(fullPath)) {
    console.log('FILE NOT FOUND:', relPath);
    return false;
  }
  const content = fs.readFileSync(fullPath, 'utf-8');
  console.log(`\n=== Checking ${relPath} ===`);
  let allOk = true;
  for (const [desc, val] of Object.entries(checks)) {
    let passed = false;
    if (typeof val === 'function') {
      passed = Boolean(val(content));
    } else if (typeof val === 'string') {
      passed = content.includes(val);
    } else if (val instanceof RegExp) {
      passed = val.test(content);
    }
    console.log(passed ? `✓ [PASS] ${desc}` : `✗ [FAIL] ${desc}`);
    if (!passed) allOk = false;
  }
  return allOk;
}

// 1. ISS-005: Metadata checks
const appsOk = checkFile('apps.html', {
  'Contains exact non-duplicated title': '<title>Custom App Development Company in Coimbatore | BlazeByte Studio</title>',
  'Does not contain double brand suffix': (c) => !c.includes('BlazeByte Studio | BlazeByte Studio'),
  'Canonical URL is declared': (c) => c.includes('rel="canonical"') && c.includes('href="https://www.blazebyte.shop/apps"')
});

const aiOk = checkFile('ai.html', {
  'Contains local targeting in Coimbatore': '<title>AI Automation Services in Coimbatore | BlazeByte Studio</title>',
  'Canonical URL is declared': (c) => c.includes('rel="canonical"') && c.includes('href="https://www.blazebyte.shop/ai"')
});

// 2. ISS-012: FAQ content checks
const webFaqOk = checkFile('web.html', {
  'Contains Web FAQ heading': 'Web Development FAQs',
  'Contains buyer pricing FAQ': 'How much does a website development project cost?',
  'Contains ownership FAQ': 'Do I get full ownership of my website and source code?'
});

const marketingFaqOk = checkFile('marketing.html', {
  'Contains Marketing FAQ heading': 'Digital Marketing FAQs',
  'Contains ad spend FAQ': 'Is media ad spend included in the package fee?',
  'Contains results timeline FAQ': 'How quickly do we see measurable marketing results?'
});

const aiFaqOk = checkFile('ai.html', {
  'Contains AI FAQ heading': 'AI Automation FAQs',
  'Contains AI automation scope FAQ': 'What kind of AI automation can BlazeByte build for my business?',
  'Contains data confidentiality FAQ': 'Does our business data remain secure and confidential?'
});

const appsFaqOk = checkFile('apps.html', {
  'Contains Apps FAQ heading': 'Custom App Development FAQs',
  'Contains app types FAQ': 'What types of custom applications do you develop?',
  'Contains IP ownership FAQ': 'Who owns the code and intellectual property?'
});

console.log('\n=================================================');
if (appsOk && aiOk && webFaqOk && marketingFaqOk && aiFaqOk && appsFaqOk) {
  console.log('✓ [PASS] ALL ISS-005 & ISS-012 BUILD ARTIFACTS VERIFIED');
} else {
  console.log('✗ [FAIL] SOME CHECKS FAILED');
  process.exit(1);
}
console.log('=================================================');
