const fm = require('front-matter');
const { readFileSync, writeFileSync, existsSync, mkdirSync } = require('fs');

(() => {
  const clientKeys = fm(readFileSync('./clients.md', 'utf-8')).attributes.clients.map(client => client.client_key).sort();
  if (!existsSync('./_configs')) mkdirSync('./_configs');
  clientKeys.forEach(clientKey => writeFileSync(`./_configs/${clientKey}.yml`, `client_key: ${clientKey}`));
})();
