const request = require('supertest');
const express = require('express');

require('dotenv').config();
const app = express();
const MESSAGE = process.env.MESSAGE || "Hello World";

app.get('/', (req, res) => {
  res.send(MESSAGE);
});

describe('GET /', () => {
  it('повертає повідомлення', async () => {
    const res = await request(app).get('/');
    expect(res.text).toBe(MESSAGE);
    expect(res.statusCode).toBe(200);
  });
});
