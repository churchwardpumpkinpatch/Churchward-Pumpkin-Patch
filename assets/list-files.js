const fs = require('fs');
const path = require('path');

// target the current folder (assets)
const dir = __dirname;

try {
  const files = fs.readdirSync(dir)
    .filter(file => file.endsWith('.pdf') || file.endsWith('.png'))
    .map(file => `'assets/${file}'`);

  console.log('const files = [');
  console.log(files.join(',\n'));
  console.log('];');
} catch (err) {
  console.error('Error reading assets folder:', err);
}
