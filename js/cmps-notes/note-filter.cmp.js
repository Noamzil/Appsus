import { noteService } from "../services/note-service.js";

export default {
  name: `note-page`,
  template: `
      <section class="note-page">
      <h1>Filter</h1>
          <div class="filetr-container">
            <div class="filter-icons">
                <i class=" far fa-comment"></i>
                <i class=" far fa-image"></i>
                <i class="  fab fa-youtube"></i>
                <i class=" fas fa-list-ul"></i>
            </div>
            <input @keyup.enter ="filter" class="note-input" type="text" placeholder="Search for...">
          </div>
      </section>
      `,
  methods: {
    filter(ev) {
      console.log(ev.target.value);
      console.log(`filter`);
    },
  },
};
