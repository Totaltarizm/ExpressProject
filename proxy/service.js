const client = require('./client');

async function getApiMessage() {
  const response = await client.get('/');
  return response.data;
}

module.exports = { getApiMessage };
