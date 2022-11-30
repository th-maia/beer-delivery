const express = require('express');
require('express-async-errors');
const { loginRoute } = require('./routes/Login.route');

const handle = (error, _req, res, next) => {
  res.status(error.status || 500).json({ message: error.message });
  next();
};

const app = express();
app.use(express.json());

app.get('/coffee', (_req, res) => res.status(418).end());
app.use('/login', loginRoute);
app.use(handle);

module.exports = app;
