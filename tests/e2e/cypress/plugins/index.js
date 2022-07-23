// eslint-disable-next-line @typescript-eslint/no-var-requires
const cypressTypescriptPreprocessor = require('./cy-ts-preprocessor');

module.exports = on => {
  on('file:preprocessor', cypressTypescriptPreprocessor);
};
