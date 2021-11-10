import { noteService } from '../services/note-service.js';
import noteList from '../cmps-notes/note-list.cmp.js';

export default {
  name: `note-page`,
  template: `
        <section class="note-page">
            <h1>Notes</h1>
            <input type="text" placeholder="What's on your mind..">
            <note-list :notes="notesToShow"/>
        </section>
    `,
  data() {
    return {
      notes: null,
    };
  },
  created() {
    this.loadNotes();
  },

  methods: {
    loadNotes() {
      noteService.query().then((notes) => {
        this.notes = notes;
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
  },
};
