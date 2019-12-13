import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    username: null,
    room: {},
    word: '',
    gameRunning: {}
  },
  mutations: {
    SET_USERNAME (state, payload) {
      state.username = payload
    },
    SET_ROOM (state, payload) {
      state.room = payload
    },
    SET_GAME_WORD (state, payload) {
      state.word = payload
    },
    SET_GAME_OBJECT (state, payload) {
      state.gameRunning = payload
    }
  },
  actions: {
  },
  modules: {
  }
})
