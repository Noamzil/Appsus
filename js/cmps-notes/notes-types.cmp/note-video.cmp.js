export default {
  props: ['note'],
  template: `
    <div class="note-img">
        <h3>{{note.info.title}} </h3>
        <video width="320" height="240" controls>
          <source :src="note.info.url" type="video/mp4">
        </video>
    </div>
        `,
  data() {
    return {};
  },
  computed: {},
};
