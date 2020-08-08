const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const serveStatic = require('serve-static');
const prodictroutes = require('./api/routes/products');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/products',prodictroutes);

module.exports = app;