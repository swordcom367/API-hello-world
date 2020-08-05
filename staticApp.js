const express = require('express');
const app = express();
const serveStatic = require('serve-static');


app.use('/static',serveStatic('./api/public', { 'public': ['index.html'] }));

module.exports = app;