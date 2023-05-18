import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../page/HomePage.vue'
import TourapiPage from '../page/TourapiPage.vue'


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage
  },
  {
    path: '/tour',
    name: 'tourapi',
    component: TourapiPage
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
