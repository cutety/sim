import Vue from 'vue'
import VueRouter from 'vue-router'
import storageService from '../service/storageService'

// 路由重复点击捕获错误
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}


Vue.use(VueRouter)

const Login = () => import(/* webpackChunkName: "Login" */ '../views/Login.vue')
const Home = () => import(/* webpackChunkName: "Home" */ '../views/Home.vue')
const Application = () => import(/* webpackChunkName: "Application" */ '@/components/user/Application.vue')
const MentorMatch = () => import(/* webpackChunkName: "MentorMatch" */ '@/components/user/MentorMatch.vue')
const ChangePassword = () => import(/* webpackChunkName: "ChangePassword" */ '@/components/user/ChangePassword.vue')
const UserInfo = () => import(/* webpackChunkName: "UserInfo" */ '@/components/user/UserInfo.vue')
const AddMentor = () => import(/* webpackChunkName: "AddMentor" */ '@/components/admin/AddMentor.vue')
const BatchAddMentors = () => import(/* webpackChunkName: "BatchAddMentors" */ '@/components/admin/BatchAddMentors.vue')
const MentorStudents = () => import(/* webpackChunkName: "MentorStudents" */ '@/components/mentor/MentorStudents.vue')
const InstructRequest = () => import(/* webpackChunkName: "InstructRequest" */ '@/components/mentor/InstructRequest.vue')
const SelectionResult = () => import(/* webpackChunkName: "SelectionResult" */ '@/components/user/SelectionResult.vue')
const StudentsList = () => import(/* webpackChunkName: "StudentsList" */ '@/components/student/StudentsList.vue')
const AdmissionHistory = () => import(/* webpackChunkName: "AdmissionHistory" */ '@/components/user/AdmissionHistory.vue')
const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/',
    name: 'home',
    component: Home,
    children: [
      {path: '/application', component: Application},
      {path: '/mentorMatch', component: MentorMatch},
      {path: '/changePassword', component: ChangePassword},
      {path: '/userInfo', component: UserInfo},
      {path: '/addMentor', component: AddMentor},
      {path: '/batchAddMentors', component: BatchAddMentors},
      {path: '/mentorStudents', component: MentorStudents},
      {path: '/instructRequest', component: InstructRequest},
      {path: '/selectionResult', component: SelectionResult},
      {path: '/studentsList', component: StudentsList},
      {path: '/admissionHistory', component: AdmissionHistory}
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
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
