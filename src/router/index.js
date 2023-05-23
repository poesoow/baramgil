import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../page/HomePage.vue'

import TourapiPage from '../page/TourapiPage.vue'
import TourserviceView from '../page/Tourapi/TourserviceView'
import TourcourseView from '../page/Tourapi/TourcourseView'

import CsPage from '../page/CsPage.vue'

import NoticeView from '@/page/Cs/NoticeView.vue'
import NoticeList from '@/page/Cs/NoticeList.vue'
import NoticeRead from '@/page/Cs/NoticeRead.vue'
import NoticeModify from '@/page/Cs/NoticeModify.vue'
import NoticeWrite from '@/page/Cs/NoticeWrite.vue'

import QnaView from '@/page/Cs/QnaView.vue'
import QnaList from '@/page/Cs/QnaList.vue'
import QnaRead from '@/page/Cs/QnaRead.vue'
import QnaModify from '@/page/Cs/QnaModify.vue'
import QnaWrite from '@/page/Cs/QnaWrite.vue'

import LoginPage from '@/page/LoginPage.vue'
import MemberPage from '@/page/MemberPage.vue'
import SignupPage from '@/page/SignupPage.vue'

import NotPage from '@/page/NotPage.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage
  },
  {
    path: '/tour',
    name: 'tourapi',
    component: TourapiPage,
    redirect: '/tour/info',
    children: [
      {
        path: "/tour/info",
        name: "TourserviceView",
        component: TourserviceView
      },
      {
        path: "/tour/course",
        name: "TourcourseView",
        component: TourcourseView
      }
    ]
  },
  {
    path: '/cs',
    name: 'CsPage',
    component: CsPage,
    redirect: '/cs/notice',
    children: [
      {
        path: '/cs/notice',
        name: 'NoticeView',
        component: NoticeView,
        redirect: "/cs/notice/list",
        children: [
          {
            path: "/cs/notice/list",
            name: "NoticeList",
            component: NoticeList
          },
          {
            path: "/cs/notice/write",
            name: "NoticeWrite",
            component: NoticeWrite
          },
          {
            path: "/cs/notice/read",
            name: "NoticeRead",
            component: NoticeRead
          },
          {
            path: "/cs/notice/modify",
            name: "NoticeModify",
            component: NoticeModify
          },
        ]
      },
      {
        path: '/cs/qna',
        name: 'QnaView',
        component: QnaView,
        redirect: '/cs/qna/list',
        children: [
          {
            path: "/cs/qna/list",
            name: "QnaList",
            component: QnaList
          },
          {
            path: "/cs/qna/write",
            name: "QnaWrite",
            component: QnaWrite
          },
          {
            path: "/cs/qna/read",
            name: "QnaRead",
            component: QnaRead
          },
          {
            path: "/cs/qna/modify",
            name: "QnaModify",
            component: QnaModify
          }
        ]
      },
    ]
  },
  {
    path: '/login',
    name: 'LoginPage',
    component: LoginPage
  },
  {
    path: '/member',
    name: 'MemberPage',
    component: MemberPage
  },
  {
    path: '/signup',
    name: 'SignupPage',
    component: SignupPage
  },
  {
    path: '/404',
    name: 'NotPage',
    component: NotPage
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
