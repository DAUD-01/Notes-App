const API = '/notes'

async function getNotes() {
    const res = await fetch(API);
    const notes = await res.json();

    const list = document.getElementById('noteList');
    list.innerHTML = "";

    notes.forEach(note => {
        const li = document.createElement('li');
        btn.textContent = 'Delete';
        btn.onclick = () => deleteNote(note.id);

        li.appendChild(btn)
        li.append(li)
    });
}

getNotes();

async function addNote() {
  const input = document.getElementById('noteInput');

  await fetch(API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      text: input.value
    })
  });

  input.value = '';
  getNotes();
}

async function deleteNote(id) {
  await fetch(`${API}/${id}`, {
    method: 'DELETE'
  });

  getNotes();
}