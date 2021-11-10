import noteTxt from './notes-types.cmp/note-text.cmp.js';
import noteImg from './notes-types.cmp/note-img.cmp.js';
import noteTodos from './notes-types.cmp/note-todo.cmp.js';
import noteVideo from './notes-types.cmp/note-video.cmp.js';
import { noteService } from '../services/note-service.js';

export default {
  name: `note-list`,
  props: ['notes'],
  template: `
    <section class="notes-list-container">
      <ul class="notes-list">
        <li v-for="note in notes" :key="note.id" class="note-container">
            <component class="note-description-container" :is="note.type" :note="note"/> </component>
            <div class="note-icons">
              <i @click="pinNote(note.id)" title="pin note" class="fas fa-thumbtack"></i>
              <i @click="changeNoteColor(note)" title="change color" class="fas fa-palette"></i>
              <i @click="sendAsEmail(note)" title="send as email" class="fas fa-envelope"></i>
              <i @click="editNote(note)" title="edit note" class="far fa-edit"></i>
              <i @click="deleteNote(note.id)" title="delete note" class="fas fa-trash-alt"></i>
            </div>
        </li>
      </ul>
    </section>
    `,
  created() {},
  methods: {
    pinNote(noteId) {
      console.log(`pinned this note`, noteId);
    },
    changeNoteColor(note) {
      console.log(`${note.style.backgroundColor} note color pre change`);
    },
    sendAsEmail(note) {
      console.log(note);
      console.log(` note sent as email`);
    },
    editNote(note) {
      console.log(note);
      console.log(` edit..`);
    },
    deleteNote(noteId) {
      this.$emit('delete', noteId);
    },
  },
  components: {
    noteTxt,
    noteImg,
    noteTodos,
    noteVideo,
    noteService,
  },
};
