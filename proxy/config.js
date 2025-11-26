const convict = require('convict');
require('dotenv').config();

const config = convict({
  port: {
    doc: 'Port for proxy server',
    format: 'port',
    default: 3001,
    env: 'PROXY_PORT'
  },
  apiUrl: {
    doc: 'URL of API server',
    format: String,
    default: 'http://localhost:3000',
    env: 'API_URL'
  }
});

config.validate({ allowed: 'strict' });
module.exports = config;
