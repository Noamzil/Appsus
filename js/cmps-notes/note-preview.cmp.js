export default {
  props: ['note'],
  template: `
        <div class="note-preview">
            <h3>{{note.type}} </h3>
            <h3>{{note.isPinned}} </h3>
            <p>{{note.info}} </p>
        </div>
    `,
  data() {
    return {};
  },
  computed: {},
};
