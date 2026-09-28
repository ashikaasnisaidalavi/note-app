import React, { useState } from "react";
import "./index.css";

function App() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [notes, setNotes] = useState([]);

  function addNote(e) {
    e.preventDefault();

    // Content validation
    if (content.trim() === "") {
      alert("Content cannot be empty");
      return;
    }

    // Title validation
    if (title.length > 100) {
      alert("Title cannot exceed 100 characters");
      return;
    }

    // Content validation
    if (content.length > 5000) {
      alert("Content cannot exceed 5000 characters");
      return;
    }

    // Duplicate validation
    const duplicate = notes.some(
      (note) =>
        note.title.trim().toLowerCase() ===
          title.trim().toLowerCase() &&
        note.content.trim().toLowerCase() ===
          content.trim().toLowerCase()
    );

    if (duplicate) {
      alert("This note already exists");
      return;
    }

    const newNote = {
      id: Date.now(),
      title: title.trim(),
      content: content.trim(),
    };

    setNotes([...notes, newNote]);

    // Clear form
    setTitle("");
    setContent("");
  }

  return (
    <div className="app">

      <h1>📝 My Notes</h1>

      {/* NOTE FORM */}

      <form className="note-form" onSubmit={addNote}>

        <input
          type="text"
          placeholder="Title (optional)"
          value={title}
          maxLength={100}
          onChange={(e) => setTitle(e.target.value)}
        />

        <p className="character-count">
          {title.length}/100
        </p>

        <textarea
          placeholder="Write your note..."
          value={content}
          maxLength={5000}
          onChange={(e) => setContent(e.target.value)}
        />

        <p className="character-count">
          {content.length}/5000
        </p>

        <button type="submit">
          Add Note
        </button>

      </form>

      {/* NOTES */}

      <div className="notes-container">

        {notes.length === 0 ? (

          <div className="empty-state">
            <h2>No notes yet</h2>
            <p>Create your first note above.</p>
          </div>

        ) : (

          notes.map((note) => (

            <div
              className="note-card"
              key={note.id}
            >

              {note.title && (
                <h2>{note.title}</h2>
              )}

              <p>{note.content}</p>

            </div>

          ))

        )}

      </div>

    </div>
  );
}

export default App;