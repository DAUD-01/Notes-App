const noteForm = document.getElementById('noteForm');
const noteInput = document.getElementById('noteInput');
const notesList = document.getElementById('notesList');

const API = '/notes';

// Get notes function

async function getNotes() {
    const res = await fetch(API);
    const notes = await res.json();

    notesList.innerHTML = ''; 

    notes.forEach( note => {

        const li = document.createElement('li');
        li.textContent = note.text + '';

        // Delete Button
        const delBtn = document.createElement('button');
        delBtn.textContent = '❌'
        delBtn.addEventListener('dblclick', () => {
            deleteNote(note.id); // call the delete note function when user double clicks 
        });

        // Edit Button
        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.addEventListener('click', () => {
            noteInput.value = note.text;
            currentEditID = note.id;
            noteInput.focus();
        })

        li.appendChild(editBtn); // append delete button inside ul li [ul > li > Edit]
        li.appendChild(delBtn); // append delete button inside ul li [ul > li > delete]
        notesList.appendChild(li); // append li inside ul [ul > li]

    });
    
};

// Add notes function

async function addNote(text) {

    await fetch(API, {
        method: "POST", 
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify( {text: text} )
    });

    getNotes();
}

// Update notes function 

async function updateNote(text) {

    await fetch(`${API}/${id}`, {
        method: "PUT", 
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify( {text: text} )
    });

    currentEditID = null; // reset after the note has been update
    getNotes();
}

// Delete Note

async function deleteNote(id) {

    await fetch(`${API}/${id}`, {
        method: 'DELETE' // fixed case
    });

    getNotes();
}

// Submit form 

noteForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const text = noteInput.value.trim(); // fixed variable name

    if (!text) return;

    if(currentEditID) {
        updateNote(currentEditID, text);
    } else {
        addNote(text);
    }

    noteInput.value = '';
});

getNotes(); // call function on startup to load the notes