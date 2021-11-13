import { utilService } from "./util-service.js";
import { storageService } from "./async-storage-service.js";

const NOTES_KEY = "notes";
_createNotes();

export const noteService = {
  query,
  remove,
  save,
  getById,
  createNote,
  addFirst,
  isNewNote,
  addLast,
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

function addFirst(note) {
  return storageService.unshift(NOTES_KEY, note);
}
function addLast(note) {
  return storageService.push(NOTES_KEY, note);
}

function getById(noteId) {
  return storageService.get(NOTES_KEY, noteId);
}

function isNewNote(noteId) {
  var ok = storageService.get(NOTES_KEY, noteId).then();
  if (ok) return false;
  return true;
}

function _createNotes() {
  let notes = utilService.loadFromStorage(NOTES_KEY);
  if (!notes || !notes.length) {
    notes = [];
    notes.push(createNote("note-txt", "Fullstack Me Baby!", "", "", ""));
    notes.push(
      createNote(
        "note-image",
        "",
        "Bobi and Me",
        "https://dogtime.com/assets/uploads/2011/03/puppy-development.jpg",
        ""
      )
    );
    notes.push(
      createNote("note-todos", "", "Get my stuff together", "", [
        { txt: "Driving liscence", doneAt: null },
        { txt: "Coding power", doneAt: 187111111 },
      ])
    );
    notes.push(
      createNote(
        "note-video",
        "",
        "Try video",
        "https://www.w3schools.com/html/mov_bbb.mp4",
        ""
      )
    );
    notes.push(createNote("note-txt", "Get some Sleep!", "", "", ""));
    notes.push(
      createNote("note-todos", "", "Learn somthing new", "", [
        { txt: "Cooking", doneAt: null },
        { txt: "Playing on guitar", doneAt: null },
      ])
    );
    notes.push(
      createNote(
        "note-image",
        "",
        "eiffel",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpeg0XF-QNxJIdogTS_y2CXKoXUjzfdncs1g&usqp=CAU"
      )
    );
    notes.push(createNote("note-txt", "Workout 5PM!", "", "", ""));
    utilService.saveToStorage(NOTES_KEY, notes);
  }
  return notes;
}

function createNote(
  type = null,
  txt = null,
  title = null,
  url = null,
  todos = []
) {
  const note = {
    id: storageService.makeId(),
    type,
    isPinned: false,
    info: {
      txt,
      title,
      url,
      todos,
    },
    style: { backgroundColor: `#${utilService.getRandomCol()}` },
  };
  return note;
}
