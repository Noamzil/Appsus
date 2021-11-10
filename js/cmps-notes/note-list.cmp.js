import noteTxt from './notes-types.cmp/note-text.cmp.js';
import noteImg from './notes-types.cmp/note-img.cmp.js';
import noteTodos from './notes-types.cmp/note-todo.cmp.js';
import noteVideo from './notes-types.cmp/note-video.cmp.js';

export default {
  name: `note-list`,
  props: ['notes'],
  template: `
    <section class="notes-list-container">
      <ul class="notes-list">
        <li v-for="note in notes" :key="note.id" class="note-container">
            <component :is="note.type" :note="note"/> </component>
            <div class="note-icons"><i class="fas fa-thumbtack"></i><i class="fas fa-palette"></i><i class="fas fa-envelope"></i><i class="far fa-edit"></i><i class="fas fa-trash-alt"></i></div>
        </li>
      </ul>
    </section>
    `,
  created() {},
  components: {
    noteTxt,
    noteImg,
    noteTodos,
    noteVideo,
  },
};
