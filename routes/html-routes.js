const router = require('express').Router();
const path = require('path');

router.get('/', (req, res) => {
    const indexPath = path.join(__dirname, '../public/index.html');
    res.sendFile(indexPath, (err) => {
        if (err) {
            console.error('Error sending index.html:', err);
            res.status(500).send('Internal Server Error');
        }
    });
});   

router.get('/notes', (req, res) => {
    const indexPath = path.join(__dirname, '../public/notes.html');
    res.sendFile(indexPath, (err) => {
        if (err) {
            console.error('Error sending notes.html:', err);
            res.status(500).send('Internal Server Error');
        }
    });
});

module.exports = router;