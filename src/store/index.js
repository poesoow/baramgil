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
    loginToken(state, payload){
      state.loginChk = payload.refreshToken
      state.loginChk = true
      state.uid = payload.uid
      console.log(payload.uid)
    },
    logOutToken(state){
      state.loginChk = false
      state.loginToken = null
      state.uid =''
      sessionStorage.removeItem("refreshToken")
      sessionStorage.removeItem("displayName")
    },
    loginState(state,payload){
      state.loginToken = sessionStorage.getItem("refreshToken");
      state.displayName = payload.displayName
      state.uid = payload.uid
      state.loginChk =true
    ReviewRead(state, payload) {
      state.qnaId = payload
    },
    detailInfo(state, payload) {
      state.data = payload
      console.log(payload)
    }
  },
  actions: {
  },
  modules: {
  }
})
