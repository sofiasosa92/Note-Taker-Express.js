const notes = require('express').Router();

const { readFromFile, readAndAppend } = require('../helpers/fsUtils');

const { v4: uuidv4 } = require('uuid');

//retrieving all notes
notes.get('/',(req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
});

notes.post('/', (req, res) => {
    console.log(req.body);

    //from line 72 index.js 
    const { title, text  } = req.body;

    if (req.body) {
        const newNote = {
            title,
            text,
            id: uuidv4(),
        };
        const notesInfo = readAndAppend(newNote, './db/db.json');
        res.json(notesInfo);
    } else {
        res.json('Error adding note');
    }
});

//to delete the notes function
notes.delete('/:')

module.exports = notes; 