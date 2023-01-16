const notes = require('express').Router();

const { readFromFile, readAndAppend, writeToFile } = require('../helpers/fsUtils');

const { v4: uuidv4 } = require('uuid');
const { response } = require('.');

//retrieving all notes
notes.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
});

notes.post('/', (req, res) => {
    console.log(req.body);

    //from line 72 index.js 
    const { title, text } = req.body;

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
    const id = req.params.id;
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        const dataBase = JSON.parse(data);
        const filteredData = dataBase.filter(note => note.id !== id);
        fs.writeFile('./db/db.json', JSON.stringify(filteredData), (err) => {
            res.json('Note was deleted successfully!')
        })
    })
});

module.exports = notes; 