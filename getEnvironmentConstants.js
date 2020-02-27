const fs = require('fs');
// Load environment variables from these files
const dotenvFiles = [
  '.env'
];

// expose environment variables to the frontend
const frontendConstants = [
  'APP_NAME',
  'APP_HOST',
  'SERVER_PORT',
  'WEBPACK_SERVER_PORT'
];

const { NODE_ENV } = process.env;

// Temporary until we setup our ENV variables infrastructure
const path = fs.existsSync(`.env.${NODE_ENV}`)
  ? `.env.${NODE_ENV}`
  : '.env';

require('dotenv').config({ path });
process.env['env.config']=path;

/*
dotenvFiles.forEach(dotenvFile => {
  if (fs.existsSync(dotenvFile)) {
    require('dotenv-expand')(
      require('dotenv').config({
        path: dotenvFile,
      })
    );
  }
});
*/

function getEnvironmentConstants() {
  

  
  const arrayToObject = (array) =>
  array.reduce((obj, item, key) => {
    debugger;
    obj[item] = JSON.stringify(process.env[item]);
    return obj;
  }, {})

  return arrayToObject(frontendConstants);      
}

module.exports = getEnvironmentConstants;