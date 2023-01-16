//imports the Express.js module
const express = require('express');

//imports the path module
const path = require('path');

//imports the route handlers for the API.
const api = require('./routes/index.js');

//identify my server
const PORT = process.env.PORT || 3001;

//creates express application
const app = express();

//allows express to parse data from requests
app.use(express.json());

//allows express to parse url data from requests
app.use(express.urlencoded({ extended: true }));

app.use(express.static('./develop/public'));

//uses apivariables as middleware to handle requests
app.use('/api', api);


//HTML routes
app.get('/notes', (req, res) =>
res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get('/', (req, res) =>
res.sendFile(path.join(__dirname, '/public/index.html'))
);

//this activitates the port to open tunnel to communicate with my server
//the most important part
app.listen(PORT, () =>
console.log(`App listening at http://localhost:${PORT}`)
);


