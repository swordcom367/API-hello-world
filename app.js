const express = require('express');
const app = express();
const prodictroutes = require('./api/routes/products');

app.use('/static',express.static('./api/public'));

app.use('/products',prodictroutes);

module.exports = app;