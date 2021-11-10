import { utilService } from './util-service.js';
import { storageService } from './async-storage-service.js';

const NOTES_KEY = 'notes';
var gNoteId = 101;
_createNotes();

export const noteService = {
  query,
  getEmptyNote,
  remove,
  save,
  getById,
};

function query() {
  return storageService.query(NOTES_KEY).then((notes) => {
    return notes;
  });
}

function remove(noteId) {
  console.log(`in note`);
  return storageService.remove(NOTES_KEY, noteId);
}

function save(note) {
  if (note.id) return storageService.put(NOTES_KEY, note);
  else return storageService.post(NOTES_KEY, note);
}

function getById(noteId) {
  return storageService.get(NOTES_KEY, noteId);
}

function getEmptyNote() {
  return {
    id: _nextId(),
    type,
    isPinned: false,
    info: {},
    style,
  };
}

function _nextId() {
  var nextId = `n` + gNoteId;
  gNoteId++;
  return nextId;
}

function _createNotes() {
  let notes = utilService.loadFromStorage(NOTES_KEY);
  if (!notes || !notes.length) {
    notes = [];
    notes.push(
      _createNote(
        'note-txt',
        'Fullstack Me Baby!',
        undefined,
        undefined,
        undefined
      )
    );
    notes.push(
      _createNote(
        'note-img',
        undefined,
        'Bobi and Me',
        'https://dogtime.com/assets/uploads/2011/03/puppy-development.jpg',
        undefined
      )
    );
    notes.push(
      _createNote(
        'note-todos',
        undefined,
        'Get my stuff together',
        undefined,
        [
          { txt: 'Driving liscence', doneAt: null },
          { txt: 'Coding power', doneAt: 187111111 },
        ]
      )
    );
    notes.push(
      _createNote(
        'note-video',
        undefined,
        'Try video',
        'https://www.w3schools.com/html/mov_bbb.mp4',
        undefined
      )
    );
    utilService.saveToStorage(NOTES_KEY, notes);
  }
  return notes;
}

function _createNote(type, txt, title, url, todos) {
  const note = {
    id: _nextId(),
    type,
    isPinned: false,
    info: {
      txt,
      title,
      url,
      todos,
    },
    style: { backgroundColor: '#A39E9E' },
  };
  return note;
}