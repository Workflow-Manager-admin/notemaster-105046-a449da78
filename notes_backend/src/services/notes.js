const notesStore = require('../models/notesStore');

// PUBLIC_INTERFACE
function createNote(data) {
  /** Create a new note.
   * @param {object} data - {title, content}
   * @returns {object} - Created note.
   */
  return notesStore.createNote(data);
}

// PUBLIC_INTERFACE
function getAllNotes({ search } = {}) {
  /** Get all notes, optionally filtered by search.
   * @param {object} opts - { search: string }
   * @returns {Array} - Array of notes.
   */
  return notesStore.getAllNotes({ search });
}

// PUBLIC_INTERFACE
function getNoteById(id) {
  /** Get a single note by id.
   * @param {string} id
   * @returns {object|null}
   */
  return notesStore.getNoteById(id) || null;
}

// PUBLIC_INTERFACE
function updateNote(id, data) {
  /** Update an existing note.
   * @param {string} id
   * @param {object} data - fields to update
   * @returns {object|null}
   */
  return notesStore.updateNote(id, data);
}

// PUBLIC_INTERFACE
function deleteNote(id) {
  /** Delete a note by id.
   * @param {string} id
   * @returns {boolean} true if deleted
   */
  return notesStore.deleteNote(id);
}

module.exports = {
  createNote,
  getAllNotes,
  getNoteById,
  updateNote,
  deleteNote,
};
