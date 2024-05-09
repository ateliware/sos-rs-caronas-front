const path = require('path');
const {
  compilerOptions: { paths },
} = require(`./tsconfig.json`);

const tsPathAliases = Object.keys(paths).reduce((acc, item) => {
  const key = item.replace('/*', '');
  const value = path.resolve(
    __dirname,
    'src/' + paths[item][0].replace('/*', '')
  );
  acc[key] = [value];
  return acc;
}, {});

const cracoConfig = { webpack: { alias: tsPathAliases } };

module.exports = cracoConfig;
