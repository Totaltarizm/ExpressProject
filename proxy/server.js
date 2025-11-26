const express = require('express');
const app = express();
const router = require('./routes');
const config = require('./config');

app.use('/', router);

app.listen(config.get('port'), () => {
  console.log(`Proxy server listening on port ${config.get('port')}`);
});
