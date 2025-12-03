const express = require('express');
const routes = require('./routes');

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  // eslint-disable-next-line no-console
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

app.use('/api/v1', routes);

// Middleware для обробки 404
app.use((req, res) => {
  res.status(404).json({ message: 'Not Found' });
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, _next) => {
  // eslint-disable-next-line no-console
  console.error(err.stack);
  res.status(500).json({
    message: 'Something went wrong!',
    error: err.message,
  });
});

module.exports = app;
