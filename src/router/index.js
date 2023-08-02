import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Profile from '../views/Profile.vue'
import Watch from '../views/Watch.vue'
import UserAccount from '../views/UserAccount.vue'
import Chatroom from '../views/Chatroom.vue'
import { auth } from '@/firebase/config'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    beforeEnter(to,from,next){
      let user = auth.currentUser;
      if(user){
        next();
      }else{
        next('/createAccount');
      }
    }
  },
  {
    path:'/updateProfile',
    name: 'updateProfile',
    component:Profile,
    beforeEnter(to,from,next){
      let user = auth.currentUser;
      if(user){
        next();
      }else{
        next('/createAccount');
      }
    }
  },
  {
    path:'/watch',
    name:'watch',
    component:Watch,
    beforeEnter(to,from,next){
      let user = auth.currentUser;
      if(user){
        next();
      }else{
        next('/createAccount');
      }
    }
  },
  {
    path:'/chatroom',
    name:'chatroom',
    component:Chatroom,
    beforeEnter(to,from,next){
      let user = auth.currentUser;
      if(user){
        next();
      }else{
        next('/createAccount');
      }
    }
  },
  {
    path:'/createAccount',
    name:'createAccount',
    component:UserAccount,
    beforeEnter(to,from,next){
      let user = auth.currentUser;
      if(!user){
        next();
      }else{
        next('/');
      }
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
