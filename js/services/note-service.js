import { utilService } from './util-service.js';
import { storageService } from './async-storage-service.js';

const NOTES_KEY = 'notes';

var gNoteId = 101;

export const noteService = {
  query,
  getEmptyTxtNote,
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
  return storageService.remove(NOTES_KEY, noteId);
}

function save(note) {
  if (note.id) return storageService.put(NOTES_KEY, note);
  else return storageService.post(NOTES_KEY, note);
}

function getById(noteId) {
  return storageService.get(NOTES_KEY, noteId);
}

function getEmptyTxtNote() {
  return {
    id: '',
    type: '',
    isPinned: false,
    info: {},
  };
}

function _createTxtNote(isPinned, info) {
  const note = {
    id: _nextId(),
    type: `note-txt`,
    isPinned,
    info,
  };
  return note;
}

function _nextId() {
  var nextId = `n` + gNoteId;
  gNoteId++;
  return nextId;
}
const notes = [
  {
    id: 'n101',
    type: 'note-txt',
    isPinned: true,
    info: { txt: 'Fullstack Me Baby!' },
  },
  {
    id: 'n102',
    type: 'note-img',
    info: {
      url: 'https://dogtime.com/assets/uploads/2011/03/puppy-development.jpg',
      title: 'Bobi and Me',
    },
    style: { backgroundColor: '#00d' },
  },
  {
    id: 'n103',
    type: 'note-todos',
    info: {
      label: 'Get my stuff together',
      todos: [
        { txt: 'Driving liscence', doneAt: null },
        { txt: 'Coding power', doneAt: 187111111 },
      ],
    },
  },
  {
    id: 'n104',
    type: 'note-video',
    info: {
      url: 'https://www.w3schools.com/html/mov_bbb.mp4',
      title: 'Try video',
    },
    style: { backgroundColor: '#00d' },
  },
];

utilService.saveToStorage(NOTES_KEY, notes);
