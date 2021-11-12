import { noteService } from "../services/note-service.js";
import { router } from "../routes.js";
import noteTxt from "./notes-types.cmp/note-text.cmp.js";
import noteImage from "./notes-types.cmp/note-img.cmp.js";
import noteTodos from "./notes-types.cmp/note-todo.cmp.js";
import noteVideo from "./notes-types.cmp/note-video.cmp.js";

export default {
  name: `note-create`,
  template: `
        <section class="note-edit app-main">
        
          <form v-if="noteToEdit" @submit.prevent="save" >
             <select v-model="noteToEdit.type">
              <option value="note-txt">Text</option>
              <option value="note-image">Image</option>
              <option value="note-video">Video</option>
              <option value="note-todos">Todo</option>
             </select> 
            <h3>Add a new note</h3>
            <input v-model="noteToEdit.info.title" type="text" placeholder="Title">
        <template v-if="noteToEdit.type != 'note-todos'">
            <input v-model="noteToEdit.info.url"  v-if="isUrlHere()" type="text" placeholder="URL">
            <input v-model="noteToEdit.info.txt" type="text" placeholder="Text">
        </template>
          <div class="todo-edit" v-else>
              <ul>
                  <li v-for="todo in noteToEdit.info.todos">
                   <input v-model="todo.txt" type="text" placeholder="Text">
                  </li>
              </ul>
              <button @click="addTodo">Add line</button>
              </div>
              <button>Save</button>
            <component class="note-description-container" :is="noteToEdit.type" :note="noteToEdit"/> </component>
           </form>

        </section>
      `,
  data() {
    return {
      noteToEdit: null,
    };
  },
  created() {
    this.loadNote();
  },
  methods: {
    loadNote() {
      const { noteId } = this.$route.params;
      noteService.getById(noteId).then((note) => {
        this.noteToEdit = note;
      });
      noteService.remove(noteId);
    },
    isUrlHere() {
      return (
        this.noteToEdit.type === "note-image" ||
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
    save() {
      noteService.save(this.noteToEdit);
      router.push({ name: "note" });
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
