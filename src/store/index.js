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
    galleryId: 0,
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
  },
  actions: {
  },
  modules: {
  }
})
