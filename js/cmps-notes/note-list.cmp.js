import notePreview from './note-preview.cmp.js';

export default {
  name: `note-list`,
  props: ['notes'],
  template: `
    <section class="notes-list-container">
      <ul class="notes-list">
        <li v-for="note in notes" :key="note.id" class="note-container">
            <note-preview :note="note"/>
        </li>
      </ul>
    </section>
    `,
  created() {},
  components: {
    notePreview,
  },
};
