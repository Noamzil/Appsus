export default {
  name: `note-list`,
  props: ['notes'],
  template: `
    <section class="note-list">
        <p>{{notes}}</p>
    </section>
    `,
  created() {},
};
