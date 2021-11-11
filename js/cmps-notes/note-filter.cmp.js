import { noteService } from "../services/note-service.js";

export default {
  name: `note-page`,
  template: `
      <section class="note-page">
        <input @input ="filter" v-model="filterBy.txt" class="note-input" type="text" placeholder="Search for...">
          <div class="filetr-container">
          <select v-model="filterBy.type" @change="filter">
                    <option value="">All</option>
                    <option value="note-txt">Text</option>
                    <option value="note-img">Image</option>
                    <option value="note-video">Video</option>
                    <option value="note-todos">Todo</option>
                </select>
          </div>
      </section>
      `,
  data() {
    return {
      filterBy: {
        txt: null,
        type: null,
      },
    };
  },
  methods: {
    filter() {
      this.$emit("filtered", { ...this.filterBy });
    },
  },
};
