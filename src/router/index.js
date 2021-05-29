import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import IntoRoom from '../views/IntoRoom.vue'
import CreateRoom from '../views/CreateRoom.vue'
import Game from '../views/Game.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/intoRoom',
    name: 'IntoRoom',
    component: IntoRoom
  },
  {
    path: '/createRoom',
    name: 'CreateRoom',
    component: CreateRoom
  },
  {
    path: '/game',
    name: 'Game',
    component: Game
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
