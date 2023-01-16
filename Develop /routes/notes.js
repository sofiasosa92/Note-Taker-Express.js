const notes = require('express').Router();

const { readFromFile, readAndAppend, writeToFile } = require('../helpers/fsUtils');

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

//To delete the notes function 
//  check this later  ??? 
notes.delete('/:id', (req, res) => {
    const { id }= req.params;
    readFromFile('./db/db.json').then((data) => {
        const notes = JSON.parse(data);
        const newNote = notes.filter((notes) => notes.id !== id);
        writeToFile('./db/db.json', JSON.stringify(newNote));
        res.json(`Note with id: ${id} deleted successfully`);
    })
    .catch((err) => res.status(404).json(`Error: ${err}`));
});

module.exports = notes; 