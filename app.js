const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const prodictroutes = require('./api/routes/products');
const loginRoutes = require('./api/routes/login');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/products',prodictroutes);
app.use('/login',loginRoutes)

module.exports = app;