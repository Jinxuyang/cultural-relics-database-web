import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/login/Login'
import Home from '../components/Home'
import Register from '@/views/register/Register'
import User from '@/views/user/User'
import Table from "@/views/table/Table"
import Detail from "@/views/detail/Detail";


Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', name: 'Login', component: Login },
  { path: '/register', name: 'Register', component: Register },
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      { path: '/user', name: 'User', component: User },
      { path: '/table', name: 'Table', component: Table },
      { path: '/detail', name: 'Detail', component: Detail },
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
