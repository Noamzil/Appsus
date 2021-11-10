export default {
  props: ['note'],
  template: `
          <div class="img-note">
              <h3>{{note.type}} </h3>
              <h3>{{note.info.url}} </h3>
              <p>{{note.info.title}} </p>
          </div>
      `,
  data() {
    return {};
  },
  computed: {},
};
