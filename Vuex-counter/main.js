const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
  	Increment: state => state.count++,
    Decrement: state => (state.count != 0) ? state.count-- : state.count=0
  }
})

const app = new Vue({
  el: '#app',
  computed: {
    count () {
	    return store.state.count
    }
  },
  methods: {
    increment () {
      store.commit('Increment')
    },
    decrement () {
    	store.commit('Decrement')
    }
  }
})