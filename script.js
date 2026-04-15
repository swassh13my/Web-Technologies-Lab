// Add Note (POST)
async function addNote() {
    const data = {
        title: document.getElementById('noteTitle').value,
        subject: document.getElementById('noteSubject').value,
        description: document.getElementById('noteDesc').value
    };

    await fetch('/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    alert('Note added!');
    fetchNotes();
}

// View Notes (GET)
async function fetchNotes() {
    const response = await fetch('/notes');
    const notes = await response.json();
    const container = document.getElementById('notesList');
    container.innerHTML = notes.map(n => `
        <div style="border: 1px solid #ddd; margin: 5px; padding: 5px;">
            <h3>${n.title} (${n.subject})</h3>
            <p>${n.description}</p>
            <button onclick="deleteNote('${n._id}')">Delete</button>
        </div>
    `).join('');
}

// Delete Note (DELETE)
async function deleteNote(id) {
    await fetch(`/notes/${id}`, { method: 'DELETE' });
    fetchNotes();
}

// Search Books (GET with query string)
async function searchBooks() {
    const title = document.getElementById('searchTitle').value;
    const response = await fetch(`/books/search?title=${title}`);
    const books = await response.json();
    renderBooks(books);
}

function renderBooks(books) {
    const container = document.getElementById('booksList');
    container.innerHTML = books.map(b => `<li>${b.title} - $${b.price} (${b.rating} stars)</li>`).join('');
}