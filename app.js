const express = require('express');
const app = express();
const cors = require('cors');
const serveStatic = require('serve-static');
const prodictroutes = require('./api/routes/products');


app.use('/products',cors(),prodictroutes);

module.exports = app;