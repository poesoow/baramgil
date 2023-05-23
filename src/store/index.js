import { createStore } from 'vuex'

export default createStore({
  state: {
    loginChk: false,
    displayName: "",
    loginToken: null,
    uid: "",
    noticeId: 0,
    onlineId: 0,
    qnaId: 0,
    reviewId: 0,
    galleryId: 0,
    data: null
  },
  getters: {
  },
  mutations: {
    NoticeRead(state, payload) {
      state.noticeId = payload
    },
    QnaRead(state, payload) {
      state.qnaId = payload
    },
    ReviewRead(state, payload) {
      state.qnaId = payload
    },
    detailInfo(state, payload) {
      state.data = payload
    }
  },
  actions: {
  },
  modules: {
  }
})
