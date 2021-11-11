export default {
  props: ["note"],
  template: `
          <div class="note-img">
              <h3>{{note.info.title}} </h3>
              <img :src="note.info.url">
              <p>{{note.info.txt}}</p>
          </div>
      `,
};
