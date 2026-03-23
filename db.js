const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://Dawvix:DbZPY1QGxKqYE6sj@notes.eecqzq0.mongodb.net/notesDB/?appName=Notes');

const db = mongoose.connection;

db.on('open', () => {
    console.log('Mongoose Connected');
});

db.on('error', (err) => {
    console.log(err);
});

module.exports = mongoose;