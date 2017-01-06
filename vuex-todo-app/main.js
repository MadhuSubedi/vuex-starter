
const store = new Vuex.Store({
  state: {
     todos: [
      { todo: 'Learn JavaScript', completed: false },
      { todo: 'Learn Vue', completed: false },
      { todo: 'Build something awesome', completed: false }
    ]
  },
  mutations: {
  	TaskCompleted: (state, todo) =>  {
  		state.todos.todo = todo;
  		state.todos.todo.completed = true;
  	} 
  }
})

const app = new Vue({
  el: '#app',
  computed: {
  	todos() {
  		return store.state.todos;
  	},
	remaining(){
		var self = this;
		return store.state.todos.filter(function(todo) { 
			return self.isCompleted(todo);
		});
	}
  },
  methods: {
	complete: function(todo) {
		store.commit('TaskCompleted', todo)
	},
	isCompleted: function(todo) { 
		return !todo.completed;
	}
  }
})