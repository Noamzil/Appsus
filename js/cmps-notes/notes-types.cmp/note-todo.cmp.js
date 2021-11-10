import todoPreview from './todo-preview.cmp.js';

export default {
  props: ['note'],
  template: `
          <div class="note-todo">
              <h3>{{note.type}} </h3>
              <h3>{{note.info.label}} </h3>
              <ul v-if="todos" class="todo-list">
                <li v-for="todo in todos">
                  <todo-preview :todo="todo"/>
                </li>
            </ul>
          </div>
      `,
  data() {
    return {
      todos: null,
    };
  },
  created() {
    this.loadTodos();
  },
  methods: {
    loadTodos() {
      this.todos = this.note.info.todos;
    },
  },
  computed: {},
  components: {
    todoPreview,
  },
};
