const express = require('express');

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  // eslint-disable-next-line no-console
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

module.exports = app;
