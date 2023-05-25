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
    data: null,
    adminUid: ['5Qucezu5dDdxaeZUDQqqTeMalED3','M7LNwyklrBQT7T4qZHeQw1v2ujf2', '212LifFLK8Uut4AWRUiYfHK23iI2', 'Kp1ScKZGP8bAILdzYAm59WkOS923', 'XElftfQLdEbENLxMllrmZycOVUk2']
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
      state.loginToken = payload.refreshToken
      state.loginChk = true
      state.uid = payload.uid
      console.log(payload.uid)
    },
    logOutToken(state){
      state.loginChk = false
      state.loginToken = null
      state.displayName = ''
      state.uid =''
      sessionStorage.removeItem("refreshToken")
      sessionStorage.removeItem("displayName")
    },
    loginState(state,payload){
      state.loginToken = sessionStorage.getItem("refreshToken");
      state.displayName = payload.displayName
      state.uid = payload.uid
      state.loginChk = true
    },
    ReviewRead(state, payload) {
      state.reviewId = payload
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
