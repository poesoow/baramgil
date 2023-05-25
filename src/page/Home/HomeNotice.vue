<template lang="">
  <!-- 공지 / Q&A 게시판 -->
  <div class="w-full mt-20 mx-auto p-[2%] ">
    <div class="max-w-5xl mx-auto relative">
      <div class="flex flex-nowrap justify-between">
        <h2 class="ml-[3%] mb-8 text-3xl flex gap-6">
          <span @click="choose(0)" class="">공지사항</span>
          <span @click="choose(1)" class=" tracking-widest relative after:absolute after:w-[1px] after:h-[22px] after:bg-gray-900 after:-left-3 after:top-[40%] after:-translate-y-2/4">Q<span class="text-gray-400">&</span>A</span>
        </h2>
        <p class="text-lg font-light mr-[2%]">
          <router-link to="/cs/notice/list" class="block pl-3 pr-2 pb-1 pt-2">
            더 보기 +
          </router-link>
        </p>
      </div>
      <div class="max-w-5xl md:w-full md:flex md:flex-nowrap md:justify-between duration-500 transition-all">
        <div v-for="e in NoticeList" :key="e" class="last-of-type:hidden last-of-type:xl:block xl:odd:mx-8  w-full md:w-[48%] xl:w-[30%] border border-black/30 shadow-md shadow-gray-400 rounded-3xl mx-auto px-[15%] md:px-10 xl:px-[2%] py-[5%] md:py-[8%] lg:py-[7%] xl:py-[5%] mb-10 drop-shadow-xl md:h-[220px] xl:h-[180px]">
          <p class="mb-4 text-2xl">{{e.title}}</p>
          <p class="truncate break-all">{{e.content}}</p>
        </div>
      </div>
    </div>
  </div>
  <!-- 공지 / Q&A 게시판 -->
</template>
<script>

import { db } from "../../firebase"

export default {
  name:"HomeNotice",
  data() {
    return {
      NoticeList: [],
      perPage: 3,
    }
  },
  methods: {
    choose(i) {
      this.fetchPost(i)
    },
    fetchPost(i) {
      let query
      if(i == 0){
        query = db.collection("notice").orderBy("date", "desc").limit(this.perPage)
      } else if (i == 1) {
        query = db.collection("qna").orderBy("date", "desc").limit(this.perPage)
      } else {
        query = db.collection("notice").orderBy("date", "desc").limit(this.perPage)
      }
      query.get().then((data) => {
        const items = [];
        const ids = [];

        data.forEach((e) => {
          ids.push(e.id);
          items.push(e.data())
        })
        this.NoticeList = items;
      })
    },
  },
  mounted() {
    this.fetchPost();
  },
}
</script>
<style>
  
</style>