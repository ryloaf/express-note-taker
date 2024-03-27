// required dependencies
const express = require('express');
const path = require('path');
const fs = require('fs');
let noteData = require('./db/db.json')

// setting up server
const PORT = process.env.PORT || 3001;
const app = express();


app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public'));

// HTML route for 'index.html'
app.get('/', (req, res) => {
    const indexPath = path.join(__dirname, './public/index.html');
    res.sendFile(indexPath, (err) => {
        if (err) {
            console.error('Error sending index.html:', err);
            res.status(500).send('Internal Server Error');
        }
    });
});

// HTML route for 'notes.html'
app.get('/notes', (req, res) => {
    const indexPath = path.join(__dirname, './public/notes.html');
    res.sendFile(indexPath, (err) => {
        if (err) {
            console.error('Error sending index.html:', err);
            res.status(500).send('Internal Server Error');
        }
    });
});

app.get('/api/notes', (req, res) => res.json(noteData));

app.post('/api/notes', (req, res) => {
    const id = Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
    const dbJson = JSON.parse(fs.readFileSync('db/db.json', 'utf8'));
    const newNote = {
        title: req.body.title,
        text: req.body.text,
        id: id,
    };
    console.log(newNote);

      fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
          console.error(err);
        } else {
          // Convert string into JSON object
          const parsedNotes = JSON.parse(data);
  
          // Add a new note to the json file
          parsedNotes.push(newNote);
          //updates note data with changes to json file
          noteData = parsedNotes;
  
          // Write updated notes back to the file
          fs.writeFile(
            './db/db.json',
            JSON.stringify(parsedNotes, null, 4),
            (writeErr) =>
              writeErr
                ? console.error(writeErr)
                : console.info('updated notes')
          );
        }
      });
    });

    app.delete('/api/notes/:id', (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
          console.error(err);
        } else {
          // Convert string into JSON object
          let parsedNotes = JSON.parse(data);
          parsedNotes = parsedNotes.filter(function(obj) {
            return obj.id !== req.params.id;
          });
          noteData=parsedNotes;
  
          // Write updated notes back to the file
          fs.writeFile(
            './db/db.json',
            JSON.stringify(parsedNotes, null, 4),
            (writeErr) =>
              writeErr
                ? console.error(writeErr)
                : console.info('updated notes')
        
            );
        }
    });
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});