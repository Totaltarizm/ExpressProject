const express = require('express');
const router = express.Router();
const proxyService = require('./service');

router.get('/', async (req, res) => {
  try {
    const result = await proxyService.getApiMessage();
    res.send(result);
  } catch (err) {
    res.status(500).send('Error contacting API');
  }
});

module.exports = router;
