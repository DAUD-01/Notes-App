const noteForm = document.getElementById('noteFrom');
const noteInput = document.getElementById('noteInput');
const notesList = document.getElementById('notesList');

const API = '/notes';

// Get notes function

async function getNotes() {
    const res = await fetch(API);
    const notes = res.json();

    // notesList.innerHTML = '';

    notes.forEach( note => {

        const li = document.createElement('li');
        li.textContent = note.text + '';

        const delBtn = document.createElement('button');
        delBtn.textContent = '❌'
        delBtn.addEventListener('dblclick', () => {
            deleteNote(note.id); // call the delete note function when user double clicks 
        });

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

// Delete Note

async function deleteNote(id) {

    await fetch(`${API}/${id}`, {
        method: 'Delete'
    });

    getNotes();
}

// Submit form 

noteForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const text = input.value.trim();

    if (!text) return;

    addNote(text);

    noteInput.value = '';
});

getNotes(); // call function on startup to load the notes