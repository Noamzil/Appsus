export default {
  props: ['note'],
  template: `
          <div class="note-text">
            <h2>{{note.info.title}}</h2>
            <h4>{{note.info.txt}}</h4>
          </div>
      `,
  data() {
    return {};
  },
  computed: {},
};
