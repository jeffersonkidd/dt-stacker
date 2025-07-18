const fs = require('fs');
const path = require('path');

const tokensDir = path.resolve(__dirname, '../tokens');
const outputDir = path.resolve(__dirname, '../dist');
const outputFile = path.join(outputDir, 'merged-tokens.json');

function mergeTokens() {
  const files = fs.readdirSync(tokensDir).filter(f => f.endsWith('.json'));
  const merged = {};

  files.forEach(file => {
    const filePath = path.join(tokensDir, file);
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    // Merge by top-level keys; adjust as needed for your structure
    Object.assign(merged, data);
  });

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
  }

  fs.writeFileSync(outputFile, JSON.stringify(merged, null, 2));
  console.log(`Merged ${files.length} files into ${outputFile}`);
}

mergeTokens();