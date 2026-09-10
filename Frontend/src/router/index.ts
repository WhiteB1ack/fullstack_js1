import { createRouter, createWebHistory } from 'vue-router'

import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Todolist from '@/views/Todolist.vue'
import Todocreate from '@/views/Todocreate.vue'

const router = createRouter({
  history: createWebHistory(),

  routes: [
    {
      path: '/login',
      component: Login
    },
    {
      path: '/register',
      component: Register
    },
    {
      path: '/todo',
      component: Todolist,
    },
    {
      path: '/todo/create',
      component: Todocreate
    }
  ]  
})

export default router