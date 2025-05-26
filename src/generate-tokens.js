const fs = require('fs');
const path = require('path');

// Example: Read a tokens file, transform it, and write to output
const inputFile = path.join(__dirname, '../tokens/example-tokens.json');
const outputFile = path.join(__dirname, '../dist/generated-tokens.json');

if (!fs.existsSync(path.dirname(outputFile))) {
  fs.mkdirSync(path.dirname(outputFile), { recursive: true });
}

try {
  const tokens = JSON.parse(fs.readFileSync(inputFile, 'utf8'));

  // Example transformation: uppercase all token keys
  const transformed = {};
  for (const key in tokens) {
    transformed[key.toUpperCase()] = tokens[key];
  }

  fs.writeFileSync(outputFile, JSON.stringify(transformed, null, 2));
  console.log('✅ Tokens generated and saved to', outputFile);
} catch (err) {
  console.error('❌ Error generating tokens:', err.message);
}