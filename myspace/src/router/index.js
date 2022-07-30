import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import UserList from '@/views/UserList.vue'
import LoginView from "@/views/LoginView.vue"
import RegisterView from "@/views/RegisterView.vue"
import NotFound from "@/views/NotFoundView.vue"
import UserProfile from '@/views/UserProfile.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/userlist/',
    name: 'userlist',
    component: UserList
  },
  {
    path: '/login/',
    name: 'login',
    component: LoginView
  },  {
    path: '/register/',
    name: 'register',
    component: RegisterView
  },  {
    path: '/userprofile/:userId/',
    name: 'userprofile',
    component: UserProfile
  },  {
    path: '/404/',
    name: 'error',
    component: NotFound
  },{
    path: '/:catchAll(.*)',
    name: 'other',
    redirect: '/404/',
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
