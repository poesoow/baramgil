<template lang="">
  <div class="basis-full">
    <div class="max-w-7xl mx-auto my-10">
      <ul class="flex justify-between border-t-indigo-500 border-t-2 p-4 py-2 bg-indigo-50">
        <li class="basis-1/12 text-center">번호</li>
        <li class="basis-4/12 text-center">제목</li>
        <li class="basis-2/12 text-center">글쓴이</li>
        <li class="basis-2/12 text-center">날짜</li>
        <li class="basis-1/12 text-center">조회수</li>
        <li class="basis-1/12 text-center">추천</li>
        <li class="basis-1/12 text-center">비추천</li>
      </ul>
      <template v-for="(e, index) in dataList" :key="index">
        <ul v-if="calculateNumber(totalLength, perPage, page, index) > 0" class="flex justify-between border-b text-center py-2 even:bg-gray-50 text-xs sm:text-sm">
          <li class="basis-1/12 text-center">{{ calculateNumber(totalLength, perPage, page, index) }}</li>
          <li class="basis-4/12 text-center"><router-link :to="{ name: 'QnaRead', query:{ docId: dataId[index] } }" @click="$store.commit('QnaRead', dataId[index])">{{ e.title }}</router-link></li>
          <li class="basis-2/12 text-center">{{ e.name }}</li>
          <li class="basis-2/12 text-center">{{ BoardDate(index) }}</li>
          <li class="basis-1/12 text-center">{{ e.hit }}</li>
          <li class="basis-1/12 text-center">{{ e.good }}</li>
          <li class="basis-1/12 text-center">{{ e.bad }}</li>
        </ul>
      </template>
    </div>
    <div class="flex justify-end pb-24">
      <router-link to="/cs/qna/write" class="bg-indigo-400 hover:bg-indigo-600 focus:ring-indigo-400 py-2 px-4  text-white font-semibold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-opacity-75 text-xs sm:text-sm">글쓰기</router-link>
    </div>
  </div>
  <div class="flex justify-center basis-full gap-x-5">
    <button @click="pervPage" :disabled = "currentPage <= 1">이전</button>
    <button v-for="e in pageCount.pagination" :key="e" @click="goToPage(e)" :class="page == e && 'font-bold, text-orange-500'">
    {{ e }}</button>
    <button @click="nextPage" :disabled = "currentPage >= pageCount.totalPage / block">다음</button>
  </div>
  {{ $store.state.loginToken }}
  {{ pageCount.pagination }}
  {{ page }}
  {{ currentPage }}
  {{ pageCount.pagination[0] }}
</template>
<script>
import { db } from "../../firebase"

export default {
  name: "QnaList",
  data() {
    return {
      dataList: [],
      dataId: [],
      posts: [],
      page: 1,
      perPage: 5,
      lastVisible: null,
      totalLength : 0,
      block: 5,
      currentPage: 1,
    }
  },
  computed: {
    pageCount(){
      const totalPage = Math.ceil(this.totalLength / this.perPage);
      const start = (this.currentPage - 1) * this.perPage;
      const end = start + this.perPage;
      const pagination = [];
      for(let i = start + 1; i <= end && i <= totalPage; i++){
        pagination.push(i)
      }
      if(pagination.length === 0 && totalPage > 0){
        pagination.push(totalPage);
      }
      return { totalPage, start, end, pagination }
    },
  },
  methods: {

    goToPage(e){
      this.page = e,
      this.fetchPost()
    },
    prevPage(){
      this.currentPage = this.currentPage - 1;
      this.page = this.pageCount.pagination[4];
      this.fetchPost();
    },
    nextPage(){
      this.currentPage = this.currentPage + 1;
      this.page = this.pageCount.pagination[0];


      this.fetchPost();
    },

    BoardDate(index){
      const date = this.dataList[index].date.seconds * 1000 + this.dataList[index].date.nanoseconds / 1000000
      const new_date = new Date(date);
      const formattedDate = ('' + new_date.getFullYear()).slice(-2) + '-'
      + ('0' + (new_date.getMonth() + 1)).slice(-2) + '-'
      + ('0' + (new_date.getDate())).slice(-2) + ''
      return formattedDate
    },


    fetchTotalLength(){
      db.collection("qna").get().then((data) => {
        this.totalLength = data.size
        console.log(data.size)
      })
    },
    fetchPost(){

      let query = db.collection("qna").orderBy("date", "desc").limit(this.perPage)
      
      if(this.page > 1 && this.lastVisible){
        query = query.startAfter(this.lastVisible);
      }

      query.get().then((data) => {
        const items = [];
        const ids = [];

        data.forEach((e) => {
          ids.push(e.id);
          items.push(e.data())
        })

        this.dataId = ids;
        this.dataList = items;
        this.lastVisible = data.docs[data.docs.length - 1]
        console.log(this.dataList)

      })
    },
    calculateNumber(totalLength, perPage, page, index){
      const totalPages = perPage * (page - 1);
      const postIndex = totalLength - (totalPages + index);
      if(postIndex <= 0){
        return
      }

      return postIndex;
    },
  },
  mounted() {
    this.fetchTotalLength();
    this.fetchPost();
  },
}
</script>
<style lang="">
  
</style>