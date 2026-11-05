const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      if (file !== 'node_modules' && file !== '.next' && file !== '.git') {
        results = results.concat(walk(filePath));
      }
    } else if (/\.(tsx?|jsx?|json|html|css)$/.test(file)) {
      results.push(filePath);
    }
  }
  return results;
}

const files = walk('.');
// Common mojibake signatures in UTF-8 decoded as Windows-1252/ISO-8859-1
const patterns = [
  { name: 'bullet / en-dash / em-dash / quotes', regex: /â€[¢™œ\x9d–—]/g },
  { name: 'non-breaking space / currency / latin mojibake', regex: /Â[\s\xa0\u00A0-\u00FF]/g },
  { name: 'double utf8 latin', regex: /Ã[\x80-\xBF]/g },
  { name: 'unicode replacement character', regex: /\uFFFD/g },
  { name: 'literal mojibake', regex: /(â€¢|â€™|â€œ|â€\x9d|â€“|â€”|Â)/g }
];

console.log('Auditing', files.length, 'source files for character encoding corruption...');

let issuesFound = 0;
for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  for (const p of patterns) {
    const matches = content.match(p.regex);
    if (matches && matches.length > 0) {
      console.log(`[DEFECT] ${file}: ${p.name} (${matches.length} matches)`);
      // Find exact line
      const lines = content.split('\n');
      lines.forEach((line, idx) => {
        if (p.regex.test(line)) {
          console.log(`  Line ${idx + 1}: ${line.trim().slice(0, 100)}`);
        }
      });
      issuesFound += matches.length;
    }
  }
}

console.log('Done scanning. Total defects found:', issuesFound);
