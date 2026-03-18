const express = require('express')
const fs = require('fs');

const router = express.Router();

router.get('/', (req, res) => {
    const data = fs.readFileSync('notes.json')
    const notes = JSON.parse(data)

    res.json(notes)
})

router.post('/', (req, res) => {
    const data = fs.readFileSync('notes.json');
    const notes = JSON.parse(data);

    const newNote = {
        id: Date.now(),
        text: req.body.text
    };

    notes.push(newNote);

    fs.writeFileSync('notes.json', JSON.stringify(notes));

    res.json(newNote)
})

router.delete('/:id', (req, res) => {
    const data = fs.readFileSync('notes.json');
    let notes = JSON.parse(data);

    const id = Number(req.params.id);

    notes = notes.filter( n => n.id !== id); // filter out all those which doesn't match id

    fs.writeFileSync('notes.json', JSON.stringify(notes));

    res.json( {message: 'deleted'} );
    console.log('Deleted');

})

router.put('/:id', (req, res) => {
    const data = fs.readFileSync('notes.json');
    let notes = JSON.parse(data);

    const id = Number(req.params.id);

    const { text } = req.body;

    const note = notes.find(n => n.id === id);
    if (!note) return res.status(404).json({ message: 'note not found' });

    if (!text) return res.status(400).json({ message: 'text is required' });

    note.text = text;

    fs.writeFileSync('notes.json', JSON.stringify(notes));

    res.json(note);
    
    console.log('appended');
})


module.exports = router;