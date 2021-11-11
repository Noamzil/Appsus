import { noteService } from "../services/note-service.js";
import noteList from "../cmps-notes/note-list.cmp.js";
import noteFilter from "../cmps-notes/note-filter.cmp.js";

export default {
  name: `note-page`,
  template: `
    <section class="note-page">
        <h1>Notes</h1>
        <div class="input-container">
          <div class="input-icons">
              <i @click="changeInput('txt')" class=" far fa-comment"></i>
              <i @click="changeInput('image')"class=" far fa-image"></i>
              <i @click="changeInput('video')" class="  fab fa-youtube"></i>
              <i @click="changeInput('todo')" class=" fas fa-list-ul"></i>
          </div>
          <input @keyup.enter ="createNewNote" class="note-input" type="text" :placeholder="inputMsg">
        </div>
        <note-filter/>
        <note-list @delete="deleteNote" :notes="notesToShow"/>
    </section>
    `,
  data() {
    return {
      notes: null,
      inputMsg: null,
      newNote: null,
      filterBy: {
        title: null,
        read: null,
    },
    };
  },
  created() {
    this.loadNotes();
    this.inputMsg = `What's on your mind...`;
  },

  methods: {
    createNewNote(ev) {
      var txt = ev.target.value;
      console.log(txt);
      this.newNote = noteService.createNote(type, txt, title, url, todos);
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
        case `todo`:
          this.inputMsg = `Enter comma seperated line...`;
          break;
      }
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
      return this.notes;
    },
  },
  components: {
    noteList,
    noteFilter,
  },
};
