const express = require('express')
const PORT = process.env.PORT || 3050;

const notesRoutes = require('./routes/notes')

const app = express();

app.use(express.json());

app.use('/notes', notesRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`)
})

