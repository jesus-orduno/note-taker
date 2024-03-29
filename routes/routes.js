const fs = require('fs');
const uuid = require('../helpers/uuid');
const router = require('express').Router();

router.get('/notes', (req, res) => {
  console.log('Retrieving past notes');
  fs.readFile('./db/db.json', 'utf8', (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.json(JSON.parse(data));
    }
  })
});

router.post('/notes', (req, res) => {
  console.log('Adding new note');
  fs.readFile('./db/db.json', 'utf8', (err, data) => {
    if (err) {
      console.log(err);
    } else {
      const notes = JSON.parse(data);
      const newNote = req.body;
      newNote.id = uuid();
      notes.push(newNote);
      fs.writeFile('./db/db.json', JSON.stringify(notes), (err) => {
        if (err) {
          console.log(err);
        } else {
          res.json(newNote);
        }
      })
    }
  })
});

router.delete('/notes/:id', (req, res) => {
  fs.readFile('./db/db.json', 'utf8', (err, data) => {
    let notes = JSON.parse(data);
    notes = notes.filter(note => note.id !== req.params.id);
    fs.writeFile('./db/db.json', JSON.stringify(notes), (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log('Note has been deleted');
        res.json(notes);
      }
    })
  })
});

module.exports = router;