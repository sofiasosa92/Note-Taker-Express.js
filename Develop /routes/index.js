const express = require('express');

const notesRouter = require('./notes');

const app = express();

app.use('/notes', notesRouter);

//initialize notes route

module.exports = app;
