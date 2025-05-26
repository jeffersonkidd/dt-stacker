const fs = require('fs');
const path = require('path');

const inputFolder = './tokens';
const outputDir = './dist';
const outputFile = path.join(outputDir, 'merged-tokens.json');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

const output = {};

fs.readdirSync(inputFolder).forEach(file => {
  if (file.endsWith('.json')) {
    const key = path.basename(file, '.json');
    const content = JSON.parse(fs.readFileSync(path.join(inputFolder, file), 'utf8'));
    output[key] = content;
  }
});

fs.writeFileSync(outputFile, JSON.stringify(output, null, 2));
console.log('✅ Merged tokens saved to', outputFile);