
const store = new Vuex.Store({
  state: {
     todos: [
      { todo: 'Learn JavaScript', completed: false },
      { todo: 'Learn Vue', completed: false },
      { todo: 'Build something awesome', completed: false }
    ]
  },
  actions: {
      TaskCompleted ({ commit }, todo) {
        commit('Task_Completed', todo)
      },
      DeleteTask ({ commit }, todo) {
        commit('Delete_Task', todo)
      },
      AddTodo({commit}, newTodoText) {
        commit('Add_Todo', newTodoText)
      }
  },
  mutations: {
  	Task_Completed: (state, todo) =>  {
  		this.todo = todo;
      state.todos = state.todos.filter(function () {
        return this.todo.todo.completed = true;
      });
  	},
    Delete_Task: (state, todo) => {
      let self = this;
      self.todo = todo;
      state.todos = state.todos.filter(function (todo) {
        return self.todo.todo.todo != todo.todo;
      });
    },
    Add_Todo: (state, newTodoText) => {
      this.newTodoText = newTodoText.newTodoText;
      state.todos.push({todo:this.newTodoText, completed:false})
      state.newTodoText = '';
    } 
  }
})

let Home = {
  template:
   `<div class="well">
      <h1>Hello This is Home Page</h1>
    </div>`
 }
let CreateTodo = {
  template: 
  `<div class="well">
    <h1>Create Todo </h1>
    <form> 
      <div class="form-group">
        <label for="todo"> Todo Name </label>
        <input type="text" v-model="newTodoText" class="form-control">
      </div>

      <div class="form-group text-right">
        <button class="btn btn-primary" @click="addNewTodo">Save</button>
      </div>
    </form>
  </div>`,
  data(){
    return{
      newTodoText: '',
      completed: false
    }
  },
  methods: {
    addNewTodo(){
      var self = this;
      let newTodoText = this.newTodoText;
      store.dispatch('AddTodo', {
        newTodoText
      });
      this.newTodoText = '';
      this.$router.push('/todo');
    }
  }
}
let Todo = {
  template: `
      <div class="row well"> 
        <div class="col-md-12">    
          <h1>Todos</h1>
            <span v-if="remaining.length"> Remaining ( {{ remaining.length }} ) </span>

          <ul class="list-group">
            <li class="list-group-item" v-for="todo in todos">
              <span class="badge" v-if="todo.completed">Done</span>
              <span class="badge" v-else>Not Completed</span>

              <span class="label label-danger" v-if="todo.completed" @click="deleteTask(todo)">&times;</span>
              {{ todo.todo }}
              <button 
                class="label label-success"
                v-if="!todo.completed" 
                @click="complete(todo)"
              >
                check
              </button>
            </li>
          </ul> 
        </div>
      </div>`,

  computed: {
    todos() {
      return store.state.todos;
    },
    remaining(){
      let self = this;
      return store.state.todos.filter(function(todo) { 
        return self.isCompleted(todo);
      });
     }
  },
  methods: {
    complete(todo) {
      store.dispatch('TaskCompleted', {
        todo
      })
    },
    isCompleted(todo) { 
      return !todo.completed;
    },
    deleteTask(todo) {
      store.dispatch('DeleteTask', {
        todo
      })
    }
  }
}

Vue.use(VueRouter)
let routes = [
  {path: '/', component: Home},
  {path: '/create-todo', component: CreateTodo},
  {path: '/todo', component: Todo},
]
const router = new VueRouter({
  routes
})
new Vue({
  router
}).$mount('#app1')