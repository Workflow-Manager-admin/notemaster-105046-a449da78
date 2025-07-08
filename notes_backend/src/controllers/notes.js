const notesService = require('../services/notes');

/**
 * Controller for notes REST API endpoints. Handles validation and response shaping.
 */
class NotesController {
  // PUBLIC_INTERFACE
  async create(req, res) {
    /** Create a note. */
    const { title, content } = req.body;
    if (typeof title !== 'string' || typeof content !== 'string') {
      return res.status(400).json({ message: 'title and content are required as strings.' });
    }
    const note = notesService.createNote({ title, content });
    res.status(201).json(note);
  }
  // PUBLIC_INTERFACE
  async list(req, res) {
    /** List all notes, optional search. */
    const { search } = req.query;
    const notes = notesService.getAllNotes({ search });
    res.json(notes);
  }
  // PUBLIC_INTERFACE
  async get(req, res) {
    /** Get a note by id. */
    const { id } = req.params;
    const note = notesService.getNoteById(id);
    if (!note) return res.status(404).json({ message: 'Note not found' });
    res.json(note);
  }
  // PUBLIC_INTERFACE
  async update(req, res) {
    /** Update a note by id. */
    const { id } = req.params;
    const { title, content } = req.body;
    if (title !== undefined && typeof title !== 'string') {
      return res.status(400).json({ message: 'title must be a string.' });
    }
    if (content !== undefined && typeof content !== 'string') {
      return res.status(400).json({ message: 'content must be a string.' });
    }
    const updated = notesService.updateNote(id, { title, content });
    if (!updated) return res.status(404).json({ message: 'Note not found' });
    res.json(updated);
  }
  // PUBLIC_INTERFACE
  async delete(req, res) {
    /** Delete a note by id. */
    const { id } = req.params;
    const deleted = notesService.deleteNote(id);
    if (!deleted) return res.status(404).json({ message: 'Note not found' });
    res.status(204).send();
  }
}

module.exports = new NotesController();
