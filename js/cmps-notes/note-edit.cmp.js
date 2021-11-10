import { noteService } from '../services/note-service.js';
import noteTxt from './notes-types.cmp/note-text.cmp.js';
import noteImg from './notes-types.cmp/note-img.cmp.js';
import noteTodos from './notes-types.cmp/note-todo.cmp.js';
import noteVideo from './notes-types.cmp/note-video.cmp.js';

export default {
  template: `
        <section class="note-edit app-main">
            <h3>Add a new note</h3>
            <form v-if="noteToEdit" @submit.prevent="save" >
                <input v-model="noteToEdit.info.title" type="text" placeholder="Title">
                <input v-model="noteToEdit.info.url" type="text" placeholder="URL">
                <input v-model="noteToEdit.info.txt" type="text" placeholder="Text">
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
    const { noteId } = this.$route.params;
    if (noteId) {
      noteService.getById(noteId).then((note) => {
        this.noteToEdit = note;
        console.log(this.noteToEdit);
      });
    } else {
      this.noteToEdit = noteService.getEmptyNote();
    }
  },
  methods: {
    save() {
      noteService
        .save(this.noteToEdit)
        .then((note) => this.$router.push('/note'));
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
