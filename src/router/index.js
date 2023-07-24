import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Profile from '../views/Profile.vue'
import Watch from '../views/Watch.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path:'/profile',
    name: 'profile',
    component:Profile
  },
  {
    path:'/watch',
    name:'watch',
    component:Watch
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
