export default {
  props: ['note'],
  template: `
          <div class="note-img">
              <h3>{{note.type}} </h3>
              <img :src="note.info.url">
              <p>{{note.info.title}} </p>
          </div>
      `,
  data() {
    return {};
  },
  computed: {},
};
