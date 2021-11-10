export default {
  props: ['note'],
  template: `
          <div class="note-text">
              <h3>{{note.info.txt}}</h3>
          </div>
      `,
  data() {
    return {};
  },
  computed: {},
};
