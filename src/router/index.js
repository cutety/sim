import Vue from 'vue'
import VueRouter from 'vue-router'
import storageService from '../service/storageService'

Vue.use(VueRouter)

const Login = () => import(/* webpackChunkName: "Login" */ '../views/Login.vue')
const Home = () => import(/* webpackChunkName: "Home" */ '../views/Home.vue')
const Application = () => import(/* webpackChunkName: "Application" */ '@/components/user/Application.vue')
const MentorMatch = () => import(/* webpackChunkName: "MentorMatch" */ '@/components/user/MentorMatch.vue')
const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    children: [
      {path: '/application', component: Application},
      {path: '/mentorMatch', component: MentorMatch},
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

router.beforeEach((to, from, next) => {
  const token = storageService.get(storageService.USER_TOKEN)
  if (to.path === '/login') return next()
  if (!token) {
    next('/login')
  } else {
    next()
  }
})

export default router
