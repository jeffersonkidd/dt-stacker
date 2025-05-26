const fs = require('fs');
const path = require('path');

const inputFile = path.join(__dirname, '../tokens/expanded-tokens.json');
const outputFile = path.join(__dirname, '../dist/expanded-tokens.compact.json');

function compact(obj) {
  if (typeof obj !== 'object' || obj === null) return obj;
  if (
    Object.keys(obj).length === 2 &&
    obj.hasOwnProperty('$type') &&
    obj.hasOwnProperty('$value')
  ) {
    return obj;
  }
  const result = Array.isArray(obj) ? [] : {};
  for (const key in obj) {
    result[key] = compact(obj[key]);
  }
  return result;
}

const json = JSON.parse(fs.readFileSync(inputFile, 'utf8'));
const compacted = compact(json);

function replacer(key, value) {
  if (
    typeof value === 'object' &&
    value !== null &&
    Object.keys(value).length === 2 &&
    value.hasOwnProperty('$type') &&
    value.hasOwnProperty('$value')
  ) {
    return { ...value, __compact: true };
  }
  return value;
}

let output = JSON.stringify(compacted, replacer, 2);

output = output.replace(
  /{\n\s+"(\$type)": "([^"]+)",\n\s+"(\$value)": ([^\n]+)\n\s+}/g,
  (match, tKey, tVal, vKey, vVal) =>
    `{ "$type": "${tVal}", "$value": ${vVal.trim()} }`
);
output = output.replace(
  /{\n\s+"(\$type)": "([^"]+)",\n\s+"(\$value)": "([^"]+)"\n\s+}/g,
  (match, tKey, tVal, vKey, vVal) =>
    `{ "$type": "${tVal}", "$value": "${vVal}" }`
);

fs.mkdirSync(path.dirname(outputFile), { recursive: true });
fs.writeFileSync(outputFile, output);
console.log('✅ Compacted expanded-tokens saved to', outputFile);