export default {
  props: ['note'],
  template: `
          <div class="todo-note">
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
      this.todos = this.note.todos;
    },
  },
  computed: {},
};
