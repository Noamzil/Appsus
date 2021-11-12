import { noteService } from "../services/note-service.js";
import noteTxt from "./notes-types.cmp/note-text.cmp.js";
import noteImage from "./notes-types.cmp/note-img.cmp.js";
import noteTodos from "./notes-types.cmp/note-todo.cmp.js";
import noteVideo from "./notes-types.cmp/note-video.cmp.js";

export default {
  template: `
    <section class="note-edit app-main">
    <h3>Edit the note</h3>
      <form class="note-edit-forms" v-if="noteToEdit" @submit.prevent="save" >
      <div class="edit-lines-container">
      <input v-model="noteToEdit.info.title" type="text" placeholder="Title">
      <template v-if="noteToEdit.type != 'note-todos'" >
      <input v-if="isUrlHere()" v-model="noteToEdit.info.url" type="text" placeholder="URL">
      <input v-model="noteToEdit.info.txt" type="text" placeholder="Text">
      </template>
      <div class="todo-edit" v-if="noteToEdit.type === 'note-todos'">
      <ul>
      <li v-for="todo in noteToEdit.info.todos">
      <input v-model="todo.txt" type="text" placeholder="Text">
      </li>
      </ul>
      <button @click="addTodo">Add line</button>
      </div>
      </div>
      <div>
      <component class="note-description-container" :is="noteToEdit.type" :note="noteToEdit"/> </component>
      <button class="save-btn">Save</button>
            </div>
       </form>
    </section>
    `,
  data() {
    return {
      noteToEdit: null,
    };
  },
  created() {
    const { noteId } = this.$route.params;
    noteService.getById(noteId).then((note) => {
      this.noteToEdit = note;
    });
  },
  methods: {
    save() {
      noteService.save(this.noteToEdit).then(() => this.$router.push("/note"));
    },
    isUrlHere() {
      return (
        this.noteToEdit.type === "note-img" ||
        this.noteToEdit.type === "note-video"
      );
    },
    addTodo(ev) {
      ev.preventDefault();
      this.noteToEdit.info.todos.push({
        txt: "",
        doneAt: null,
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
