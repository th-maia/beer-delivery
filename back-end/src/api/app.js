const cors = require('cors');
const express = require('express');
require('express-async-errors');
const { loginRoute } = require('./routes/Login.route');
const { registerRoute } = require('./routes/Register.route');
const { productsRoute } = require('./routes/Products.route');

const handle = (error, _req, res, next) => {
  res.status(error.status || 500).json({ message: error.message });
  next();
};

const app = express();
app.use(cors());
app.use(express.json());

app.get('/coffee', (_req, res) => res.status(418).end());
app.use('/login', loginRoute);
app.use('/register', registerRoute);
app.use('/products', productsRoute);

app.use(handle);

module.exports = app;
