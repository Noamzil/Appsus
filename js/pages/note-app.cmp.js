import { noteService } from "../services/note-service.js";
import noteList from "../cmps-notes/note-list.cmp.js";
import noteFilter from "../cmps-notes/note-filter.cmp.js";

export default {
  name: `note-page`,
  template: `
    <section class="note-page">
        <div class="input-container">
          <div class="input-icons">
            <i @click="changeInput('txt')" title="Text" class=" far fa-comment"></i>
            <i @click="changeInput('image')" title="Image" class=" far fa-image"></i>
            <i @click="changeInput('video')" title="Video" class="  fab fa-youtube"></i>
            <i @click="changeInput('todos')" title="List" class=" fas fa-list-ul"></i>
          </div>
          <input @keyup.enter ="createNewNote" class="note-input" type="text" :placeholder="inputMsg">
        </div>
        <note-filter @filtered="setFilter"/>
        <note-list @delete="deleteNote"  @pin="pinNote" @duplicate="duplicateNote" :notes="notesToShow"/>
    </section>
    `,
  data() {
    return {
      notes: null,
      inputMsg: null,
      newNote: null,
      filterBy: {
        txt: null,
        type: null,
      },
    };
  },
  created() {
    this.loadNotes();
    this.newNote = noteService.createNote();
    this.inputMsg = `What's on your mind...`;
  },

  methods: {
    setFilter(filterBy) {
      this.filterBy.txt = filterBy.txt;
      this.filterBy.type = filterBy.type;
    },
    createNewNote(ev) {
      console.log(this.newNote);
      var txt = ev.target.value;
      console.log(txt);
      this.newNote = noteService.createNote();
    },
    loadNotes() {
      noteService.query().then((notes) => {
        this.notes = notes;
      });
    },
    changeInput(val) {
      switch (val) {
        case `txt`:
          this.inputMsg = `What's on your mind...`;
          break;
        case `image`:
          this.inputMsg = `Enter image URL...`;
          break;
        case `video`:
          this.inputMsg = `Enter video URL...`;
          break;
        case `todos`:
          this.inputMsg = `Enter comma seperated line...`;
          break;
      }
      this.newNote.type = `note` + val;
    },
    pinNote(id) {
      noteService.getById(id).then((note) => {
        noteService.remove(note.id).then(() => {
          noteService.addFirst(note).then(() => {
            this.loadNotes();
          });
        });
      });
    },
    duplicateNote(id) {
      noteService.getById(id).then((note) => {
        noteService.addFirst(note).then(() => {
          this.loadNotes();
        });
      });
    },
    deleteNote(id) {
      noteService
        .remove(id)
        .then(() => {
          this.notes = this.notes.filter((note) => note.id !== id);
        })
        .catch((err) => {
          console.log("err", err);
        });
    },
  },
  computed: {
    notesToShow() {
      if (!this.filterBy.txt && !this.filterBy.type) return this.notes;
      const searchType = this.filterBy.type;
      var notesToShow = this.notes.filter((note) => {
        return note.type === searchType;
      });

      if (this.filterBy.txt) {
        const searchTxt = this.filterBy.txt.toLowerCase();
        var notesFilteredByTxt = this.notes.filter((note) => {
          if (note.info.txt && note.info.title) {
            return (
              note.info.txt.toLowerCase().includes(searchTxt) &&
              note.info.title.toLowerCase().includes(searchTxt)
            );
          }
          if (note.info.txt)
            return note.info.txt.toLowerCase().includes(searchTxt);
          else note.info.title;
          return note.info.title.toLowerCase().includes(searchTxt);
        });
      }
      if (!notesToShow.length) return notesFilteredByTxt;
      return notesToShow;
    },
  },
  components: {
    noteList,
    noteFilter,
  },
};
