export default {
    props: ['note'],
    template: `
          <div class="text-note">
              <h3>{{note.type}} </h3>
              <h3>{{note.isPinned}} </h3>
              <p>{{note.info.txt}} </p>
          </div>
      `,
    data() {
      return {};
    },
    computed: {},
  };
  