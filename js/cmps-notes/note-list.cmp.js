import noteTxt from "./notes-types.cmp/note-text.cmp.js";
import noteImage from "./notes-types.cmp/note-img.cmp.js";
import noteTodos from "./notes-types.cmp/note-todo.cmp.js";
import noteVideo from "./notes-types.cmp/note-video.cmp.js";
import { noteService } from "../services/note-service.js";

export default {
  name: `note-list`,
  props: ["notes"],
  template: `
    <section class="notes-list-container">
      <ul class="notes-list">
        <li v-for="note in notes" :key="note.id" >
        <div class="note-container" :style="{ backgroundColor: note.style.backgroundColor}" >
            <component @deleteTodo="deleteTodoLine($event,note)" class="note-description-container" :is="note.type" :note="note"/> </component>
            <div class="note-icons">
              <i @click="pinNote(note.id)" title="Pin note" class="fas fa-thumbtack" v-bind:class="{ yellow: note.isPinned }" ></i>
              <div class="font-col-container">
                <input v-model="note.style.backgroundColor" title="Change color" class="font-color" @input="changeNoteColor(note)" type="color"/>
                <i class="fas fa-palette"></i>
              </div>
              <i @click="sendAsEmail(note)" title="Send as email" class="fas fa-envelope"></i>
              <router-link :to="'/note/'+note.id + '/edit'" ><i title="Edit note" class="far fa-edit"></i></router-link>
              <i @click="deleteNote(note.id)" title="Delete note" class="fas fa-trash-alt"></i>
              <i @click="duplicateNote(note.id)" title="Duplicate note" class="far fa-copy"></i>
            </div>
            </div>
        </li>
      </ul>
    </section>
    `,
  methods: {
    pinNote(noteId) {
      this.$emit("pin", noteId);
    },
    changeNoteColor(note) {
      noteService.getById(note.id).then((currNote) => {
        currNote.style.backgroundColor = note.style.backgroundColor;
        noteService.save(currNote);
      });
    },
    sendAsEmail(note) {
      console.log(note);
      console.log(`note sent as email`);
    },
    deleteNote(noteId) {
      this.$emit("delete", noteId);
    },
    duplicateNote(noteId) {
      this.$emit("duplicate", noteId);
    },
    deleteTodoLine(ev, note) {
      noteService.getById(note.id).then((currNote) => {
        currNote.info.todos = ev;
        noteService.save(currNote);
      });
    },
  },
  components: {
    noteTxt,
    noteImage,
    noteTodos,
    noteVideo,
    noteService,
  },
};
