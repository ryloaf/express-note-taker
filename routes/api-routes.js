const router = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const fs = require ("fs");

// sets up a route for a GET request to 'api/notes' on a router object
router.get('/api/notes', async (req, res) => {
    const dbJson = await JSON.parse(fs.readFileSync("db/db.json","utf8"));
    res.json(dbJson);
});

// handles a POST request to '/api/notes' so a new note can be recieved
router.post('/api/notes', (req, res) => {
    const dbJson = JSON.parse(fs.readFileSync("db/db.json","utf8"));
    const newFeedback = {
        title: req.body.title,
        text: req.body.text,
        id: uuidv4(),
    };
    dbJson.push(newFeedback);
    fs.writeFileSync("db/db.json",JSON.stringify(dbJson));
    res.json(dbJson);
});

// handles a delete request to /api/notes/id:' to delete a note from the list of notes stores in the json file
router.delete('/api/notes/:id', (req, res) => {
    let data = fs.readFileSync("db/db.json", "utf8");
    const dataJSON = JSON.parse(data);
    const newNotes = dataJSON.filter((note) => {
        return note.id !== req.params.id;
    });
    fs.writeFileSync("db/db.json",JSON.stringify(newNotes));
    res.json("Note has been deleted.");
});

module.exports = router;