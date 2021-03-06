import { noteService } from "../services/note-service.js";
import { storageService } from "../services/async-storage-service.js";
import { router } from "../routes.js";
import noteList from "../cmps-notes/note-list.cmp.js";
import noteFilter from "../cmps-notes/note-filter.cmp.js";

export default {
  name: `note-page`,
  template: `
    <section class="note-page">
        <div class="input-container">
          <div class="input-icons">
            <i v-bind:class="{ active: isActive[0]}" @click="changeInput('txt')" title="Text" class=" far fa-comment"></i>
            <i v-bind:class="{ active: isActive[1]}" @click="changeInput('image')" title="Image" class=" far fa-image"></i>
            <i v-bind:class="{ active: isActive[2]}" @click="changeInput('video')" title="Video" class="  fab fa-youtube"></i>
            <i v-bind:class="{ active: isActive[3]}" @click="changeInput('todos')" title="List" class=" fas fa-list-ul"></i>
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
      newNoteType: `note-txt`,
      isActive: [false, true, true, true],
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
      var txt = ev.target.value;
      this.newNote.type = this.newNoteType;
      if (
        this.newNote.type === "note-image" ||
        this.newNote.type === "note-video"
      ) {
        this.newNote.info.url = txt;
      } else this.newNote.info.title = txt;
      storageService.push("notes", this.newNote);
      router.push(`note/` + this.newNote.id + `/new`);
    },
    loadNotes() {
      noteService.query().then((notes) => {
        this.notes = notes;
      });
    },
    changeInput(val) {
      this.isActiveFalse();
      switch (val) {
        case `txt`:
          this.inputMsg = `What's on your mind...`;
          this.isActive[0] = false;
          break;
        case `image`:
          this.inputMsg = `Enter image URL...`;
          this.isActive[1] = false;
          break;
        case `video`:
          this.inputMsg = `Enter video URL...`;
          this.isActive[2] = false;
          break;
        case `todos`:
          this.inputMsg = `Enter comma seperated line...`;
          this.isActive[3] = false;
          break;
      }
      this.newNoteType = `note-` + val;
    },
    isActiveFalse() {
      this.isActive[0] = true;
      this.isActive[1] = true;
      this.isActive[2] = true;
      this.isActive[3] = true;
    },
    pinNote(id) {
      noteService.getById(id).then((note) => {
        noteService.remove(note.id).then(() => {
          note.isPinned = !note.isPinned;
          if (note.isPinned) {
            noteService.addFirst(note).then(() => {
              this.loadNotes();
            });
          } else {
            noteService.addLast(note).then(() => {
              this.loadNotes();
            });
          }
        });
      });
    },
    duplicateNote(id) {
      noteService.getById(id).then((note) => {
        note.id = storageService.makeId();
        noteService.addLast(note).then((note) => {
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
