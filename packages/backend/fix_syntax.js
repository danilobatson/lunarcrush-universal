const fs = require('fs');

const filePath = 'src/services/lunarcrush.ts';
let content = fs.readFileSync(filePath, 'utf8');

// Fix the syntax error - add missing backticks
content = content.replace(
  'makeRequest<any>(config, /coins/list/v2, {',
  'makeRequest<any>(config, `/coins/list/v2`, {'
);

fs.writeFileSync(filePath, content);
console.log('✅ Syntax error fixed - added missing backticks');
