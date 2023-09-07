const fm = require('front-matter');
const { readFileSync, writeFileSync, existsSync, mkdirSync } = require('fs');
const { execSync } = require('child_process');
const ghpages = require('gh-pages');

(() => {
  const clientKeys = fm(readFileSync('./settings.md', 'utf-8')).attributes.clients
    .map(client => client.client_key).sort();
  console.log(clientKeys)
  if (!existsSync('./_configs')) mkdirSync('./_configs');
  clientKeys.forEach(clientKey => {
    writeFileSync(`./_configs/${clientKey}.yml`, `client_key: ${clientKey}`)
      const clientKeyParts = clientKey.split('_');
      const command = `jekyll build --config _config.yml,_configs/${clientKey}.yml --destination _site/${clientKeyParts[0]}/${clientKeyParts[1] || ''}`
      console.log(command);
      execSync(command);
      writeFileSync(`_site/${clientKeyParts[0]}/CNAME`, `${clientKeyParts[0]}.com`);
  })
})();