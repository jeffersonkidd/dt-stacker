// Stub: Add tests for your token files here
const fs = require("fs");
const assert = require("assert");

const files = ["core.json", "light.json", "dark.json", "brand.json", "typography.json"];
files.forEach(file => {
  const data = fs.readFileSync(`tokens/${file}`, "utf8");
  assert.doesNotThrow(() => JSON.parse(data), `${file} is not valid JSON`);
});