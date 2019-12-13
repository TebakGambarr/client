import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/lobby',
    name: 'lobby',
    component: () => import(/* webpackChunkName: "lobby" */ '../views/Lobby.vue')
  },
  {
    path: '/arena',
    name: 'arena',
    component: () => import(/* webpackChunkName: "arena" */ '../views/Arena.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
