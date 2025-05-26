const fs = require('fs');
const path = require('path');

const inputFolder = './tokens';
const outputDir = './dist';
const outputFile = path.join(outputDir, 'merged-tokens.json');
const metadataFile = path.join(inputFolder, '$metadata.json');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

// Read $metadata.json to get the list of files to merge
const metadata = JSON.parse(fs.readFileSync(metadataFile, 'utf8'));
const filesToMerge = metadata.tokenSetOrder || [];

const output = {};

filesToMerge.forEach(name => {
  const file = `${name}.json`;
  const filePath = path.join(inputFolder, file);
  if (fs.existsSync(filePath)) {
    const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    output[name] = content;
  } else {
    console.warn(`⚠️ File not found: ${filePath}`);
  }
});

fs.writeFileSync(outputFile, JSON.stringify(output, null, 2));
console.log('✅ Merged tokens saved to', outputFile);