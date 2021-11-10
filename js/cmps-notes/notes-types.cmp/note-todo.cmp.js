import todoPreview from './todo-preview.cmp.js';

export default {
  props: ['note'],
  template: `
          <div class="note-todo">
              <h3>{{note.info.label}} </h3>
              <ul v-if="todos" class="todo-list">
                <li v-for="todo in todos">
                  <todo-preview :todo="todo"/>
                  <i @click="deleteTodo(todo)" title="delete todo" class="fas fa-times"></i>
                </li>
                <p>I need to do...</p>
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
    deleteTodo(todo){
      console.log(todo);
      console.log(`delete this todo`);
    }
  },
  computed: {},
  components: {
    todoPreview,
  },
};
