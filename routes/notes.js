const express = require('express');

const router = express.Router();

const Note = require('../models/Note'); // Mongo model


// Get Route

router.get('/', async (req, res) => {

    const notes = await Note.find();

    res.json(notes)

})


// Post Route

router.post('/', async (req, res) => {

    const newNote = new Note({
        text: req.body.text
    });

    await newNote.save();

    res.json(newNote)

})


// Delete Route

router.delete('/:id', async (req, res) => {

    await Note.findByIdAndDelete(req.params.id);

    res.json({ message: 'deleted' });
    console.log('Deleted');

})


// Update Route

router.put('/:id', async (req, res) => {

    const { text } = req.body;

    if (!text) return res.status(400).json({ message: 'text is required' });

    const note = await Note.findByIdAndUpdate(
        req.params.id,
        { text },
        { new: true }
    );

    if (!note) return res.status(404).json({ message: 'note not found' });

    res.json(note);

    console.log('appended');

})


module.exports = router;