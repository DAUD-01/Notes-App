const noteForm = document.getElementById('noteForm');
const noteInput = document.getElementById('noteInput');
const notesList = document.getElementById('notesList');

const API = '/notes';
let currentEditID;

// Get notes function

async function getNotes() {
    const res = await fetch(API);
    const notes = await res.json();

    notesList.innerHTML = ''; 

    notes.forEach( note => {

        const li = document.createElement('li');
        
        // Create a span for the text to allow CSS to truncate long notes
        const textSpan = document.createElement('span');
        textSpan.textContent = note.text;

        // Create a container for buttons to keep them small and at the bottom
        const actionDiv = document.createElement('div');
        actionDiv.className = 'note-actions';

        // Delete Button
        const delBtn = document.createElement('button');
        delBtn.textContent = 'Delete';
        delBtn.id = 'delete-btn';
        delBtn.addEventListener('click', () => {
            deleteNote(note.id); // call the delete note function when user double clicks 
        });

        // Edit Button
        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.id = 'edit-btn';
        editBtn.addEventListener('click', () => {
            noteInput.value = note.text;
            currentEditID = note.id;
            noteInput.focus();
            // Optional: change button text to show we are editing
            document.getElementById('addNoteBtn').textContent = 'Update Note';
        })

        // Assembly
        actionDiv.appendChild(editBtn); 
        actionDiv.appendChild(delBtn); 
        
        li.appendChild(textSpan); 
        li.appendChild(actionDiv); 

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

async function updateNote(id, text) {

    await fetch(`${API}/${id}`, {
        method: "PUT", 
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify( {text: text} )
    });

    currentEditID = null; // reset after the note has been update
    document.getElementById('addNoteBtn').textContent = 'Add Note';
    getNotes();
}

// Delete Note

async function deleteNote(id) {

    await fetch(`${API}/${id}`, {
        method: 'DELETE' 
    });

    getNotes();
}

// Submit form 

noteForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const text = noteInput.value.trim(); 

    if (!text) return;

    if(currentEditID) {
        updateNote(currentEditID, text);
    } else {
        addNote(text);
    }

    noteInput.value = '';
});

getNotes(); // call function on startup to load the notes