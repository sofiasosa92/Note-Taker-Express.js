const express = require('express');
const path = require('path');

const api = require('./routes/index.js');

//identify my server
const PORT = process.env.port || 3001;

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/api', api);


//HTML routes
app.get('/notes', (req, res) =>
res.sendFile(path.join(_dirname, '/public/notes.html'))
);

app.get('*', (req, res) =>
res.sendFile(path.join(__dirname, '/public/index.html'))
);

//this activitates the port to open tunnel to communicate with my server
//the most important part
app.listen(PORT, () =>
console.log(`App listening at http://localhost:${PORT}`)
);


