// required dependencies
const express = require('express');
const path = require('path');
const fs = require('fs');

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

app.post('/notes', (req, res) => {
    const dbJson = JSON.parse(fs.readFileSync('db/db.json', 'utf8'));
    const newNote = {
        title: req.body.title,
        text: req.body.text,
    };
    dbJson.push(newNote);
    fs.writeFilesync('db/db.json', JSON.stringify(dbJson));
    res.json(newNote);
});

// API routes
app.get('/api/notes', async (req, res) => {
    const indexPath = path.join(__dirname, './public/notes.html');
    const dbJson = JSON.parse(fs.readFileSync('db/db.json', 'utf8'));
    const newFeedback = {
        title: req.body.title,
        text: req.body.text,
    };
    dbJson.push(newFeedback);
    fs.writeFileSync('db/db.json', JSON.stringify(dbJson));
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});