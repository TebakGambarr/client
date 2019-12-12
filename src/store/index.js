import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    username: null,
    room: {}
  },
  mutations: {
    SET_USERNAME (state, payload) {
      state.username = payload
    },
    SET_ROOM (state, payload) {
      state.room = payload
    }
  },
  actions: {
  },
  modules: {
  }
})
