const noteForm = document.getElementById('noteFrom');
const noteInput = document.getElementById('noteInput');
const notesList = document.getElementById('noteList');

const API = '/notes';

// Get notes function

async function getNotes() {
    const res = await fetch(API);
    const notes = res.json();

    notesList.innerHTML = '';

    notes.forEach( note => {

        const li = document.createElement('li');
        li.textContent = note.text + '';

        const delBtn = document.createElement('button');
        delBtn.textContent = '❌'
        delBtn.addEventListener('doubleClick', () => {
            deleteNote(note.id); // call the delete note function when user double clicks 
        });

        li.appendChild(delBtn); // append delete button inside ul li [ul > li > delete]
        notesList.appendChild(li); // append li inside ul [ul > li]

    })
}