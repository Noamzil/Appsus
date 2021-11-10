export default {
  props: ['note'],
  template: `
    <div class="note-img">
        <h3>{{note.type}} </h3>
        <video width="320" height="240" controls>
          <source :src="note.info.url" type="video/mp4">
        </video>
        <p>{{note.info.title}} </p>
    </div>
        `,
  data() {
    return {};
  },
  computed: {},
};
