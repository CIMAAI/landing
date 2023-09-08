const fm = require('front-matter');
const { readFileSync, writeFileSync, existsSync, mkdirSync } = require('fs');
const { execSync } = require('child_process');

(() => {
  const clientKeys = fm(readFileSync('./settings.md', 'utf-8')).attributes.clients
    .map(client => client.client_key).sort();
  console.log(clientKeys)
  if (!existsSync('./_configs')) mkdirSync('./_configs');
  clientKeys.forEach(clientKey => {
    writeFileSync(`./_configs/${clientKey}.yml`, `client_key: ${clientKey}`);
    const clientKeyParts = clientKey.split('_');
    const command = `jekyll build --config _config.yml,_configs/${clientKey}.yml --destination _site/${clientKeyParts[0]}/${clientKeyParts[1] || ''}`;
    console.log(command);
    execSync(command);
  })
  clientKeys.filter(clientKey => !clientKey.includes('_')).forEach(clientKey => {
    writeFileSync(`_site/${clientKey}/CNAME`, `${clientKey}.com`);
    execSync(`git config --local user.email "action@github.com" && git config --local user.name "GitHub Action" && npx gh-pages --repo https://git:$(echo $GH_API_KEY)@github.com:CIMAAI/${clientKey}.com.git --dist _site/${clientKey} -t`);
  });
})();