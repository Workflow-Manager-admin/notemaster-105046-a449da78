//
// In-memory notes store for demonstration purposes.
//
// Note: Replace with a persistent database in production.
//
const crypto = require('crypto');

class NotesStore {
  constructor() {
    this.notes = [];
  }

  // PUBLIC_INTERFACE
  createNote({ title, content }) {
    /** Creates a new note with a unique id. */
    const note = {
      id: crypto.randomUUID(),
      title: title || '',
      content: content || '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.notes.unshift(note); // newest first
    return note;
  }

  // PUBLIC_INTERFACE
  getAllNotes({ search = '' } = {}) {
    /** Returns all notes, optionally filtered by search. */
    let results = this.notes;
    if (search) {
      const q = search.toLowerCase();
      results = results.filter(
        n =>
          n.title.toLowerCase().includes(q) ||
          n.content.toLowerCase().includes(q)
      );
    }
    return results;
  }

  // PUBLIC_INTERFACE
  getNoteById(id) {
    /** Returns a note by its id, or undefined if not found. */
    return this.notes.find(n => n.id === id);
  }

  // PUBLIC_INTERFACE
  updateNote(id, { title, content }) {
    /** Updates an existing note's title/content. */
    const idx = this.notes.findIndex(n => n.id === id);
    if (idx === -1) return null;
    // Only update provided fields
    if (title !== undefined) this.notes[idx].title = title;
    if (content !== undefined) this.notes[idx].content = content;
    this.notes[idx].updatedAt = new Date().toISOString();
    return this.notes[idx];
  }

  // PUBLIC_INTERFACE
  deleteNote(id) {
    /** Deletes a note by its id; returns true if deleted, false if not found. */
    const idx = this.notes.findIndex(n => n.id === id);
    if (idx === -1) return false;
    this.notes.splice(idx, 1);
    return true;
  }

  clearAllNotes() {
    /** FOR TESTS ONLY: Removes all notes. */
    this.notes = [];
  }
}

module.exports = new NotesStore();
