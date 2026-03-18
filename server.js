const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 3050;

const notesRoutes = require('./routes/notes')

const app = express();

app.use(express.json());
app.use('/notes', notesRoutes);
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`)
})

