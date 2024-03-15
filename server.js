const express = require('express');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

const PORT = process.env.PORT || 3001;
const app = express();


app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public'));

// HTML routes
app.get('/', (req, res) => {
    const indexPath = path.join(__dirname, './public/index.html');
    res.sendFile(indexPath, (err) => {
        if (err) {
            console.error('Error sending index.html:', err);
            res.status(500).send('Internal Server Error');
        }
    });
});

app.get('/notes', (req, res) => {
    const indexPath = path.join(__dirname, './public/notes.html');
    res.sendFile(indexPath, (err) => {
        if (err) {
            console.error('Error sending index.html:', err);
            res.status(500).send('Internal Server Error');
        }
    });
});

// API routes
app.get('/api/notes', async (req, res) => {
    const indexPath = path.join(__dirname, './public/notes.html');
    const dbJson = JSON.parse(fs.readFileSync('db/db.json', 'utf8'));
    const newFeedback = {
        title: req.body.title,
        text: req.body.text,
        id: uuidv4(),
    };
    dbJson.push(newFeedback);
    fs.writeFileSync('db/db.json', JSON.stringify(dbJson));
});


// code to delete notes goes here


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});