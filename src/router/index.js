import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../page/HomePage.vue'
import TourapiView from '../page/TourapiPage.vue'


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/tour',
    name: 'tourapi',
    component: TourapiView
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
