const express = require('express');
const app = express();
const serveStatic = require('serve-static');


app.use('/',serveStatic('./api/public', { 'public': ['login.html'] }));

module.exports = app;