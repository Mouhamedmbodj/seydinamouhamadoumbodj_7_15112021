import Vue from 'vue'
import VueRouter from 'vue-router'
import Signup from '../views/register.vue'
import Login from '../views/login.vue'
import User from '../views/user.vue'
import Notifications from '../views/notifications.vue'
import Profil from '../views/profil.vue'
import Users from '../views/users.vue'
import Post from '../views/post.vue'
import modifyPublication from '../views/modifyPublication.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Signup',
    component: Signup
  },
  {
    path:'/login',
    name:'Login',
    component:Login,
  },
  {
    path:'/notifications/:id',
    name:'Notifications',
    component:Notifications,
  },
  {
    path:'/user/:id',
    name:'User',
    component:User,
  },
  {
    path:'/profil/:id',
    name:'Profil',
    component:Profil,
  },
  {
    path:'/users/:id',
    name:'Users',
    component:Users,
  },
  {
    path:'/post/:id',
    name:'Post',
    component:Post
  },
  {
    path:'/modifyPublication/:id',
    name:'modifyPublication',
    component:modifyPublication
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
