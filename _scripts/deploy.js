const fm = require('front-matter');
const { readFileSync, writeFileSync } = require('fs');
const { execSync } = require('child_process');

(() => {
  const clientKeys = fm(readFileSync('./clients.md', 'utf-8')).attributes.clients
    .map(client => client.client_key).sort();
  console.log(clientKeys)
  clientKeys.forEach(clientKey => {
    const clientKeyParts = clientKey.split('_');
    const command = `jekyll build --config _config.yml,_configs/${clientKey}.yml --destination _site/${clientKeyParts[0]}/${clientKeyParts[1] || ''}`;
    console.log(command);
    execSync(command);
  })
  clientKeys.filter(clientKey => !clientKey.includes('_')).forEach(clientKey => {
    writeFileSync(`_site/${clientKey}/CNAME`, `${clientKey}.com`);
    execSync(`git config --local user.email "action@github.com" && git config --local user.name "GitHub Action" && npx gh-pages --repo https://git:${process.env.GH_API_KEY}@github.com/CIMAAI/${clientKey}.com.git --dist _site/${clientKey} -t`);
  });
  execSync('rm -rf _site');
  execSync('npx tinacms build');
  execSync('jekyll build');
  writeFileSync(`_site/CNAME`, `landing.cima.ai`);
  execSync(`git config --local user.email "action@github.com" && git config --local user.name "GitHub Action" && npx gh-pages --repo https://git:${process.env.GH_API_KEY}@github.com/CIMAAI/landing.git --dist _site -t`);
})();
