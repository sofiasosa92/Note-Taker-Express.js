const express = require('express');

const notes = require('./notes');

const app = express();

app.use('/notes', notes);

//initialize notes route

module.exports = app;
