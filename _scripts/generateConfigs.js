const fm = require('front-matter');
const { readFileSync, writeFileSync, existsSync, mkdirSync } = require('fs');
const { execSync, exec } = require('child_process');

(() => {
  const clientKeys = fm(readFileSync('./settings.md', 'utf-8')).attributes.clients
    .map(client => client.client_key).sort();
  console.log(clientKeys)
  if (!existsSync('./_configs')) mkdirSync('./_configs');
  clientKeys.forEach(clientKey => {
    writeFileSync(`./_configs/${clientKey}.yml`, `client_key: ${clientKey}`)
      const clientKeyParts = clientKey.split('_');
      console.log(`jekyll build --config _configs/${clientKey}.yml _config.yml --destination _site/${clientKeyParts[0]}/${clientKeyParts[1] || ''}`);
      execSync(`jekyll build --config _configs/${clientKey}.yml _config.yml --destination _site/${clientKeyParts[0]}/${clientKeyParts[1] || ''}`);
      writeFileSync(`_site/${clientKeyParts[0]}/CNAME`, `${clientKeyParts[0]}.com`);
  })
})();