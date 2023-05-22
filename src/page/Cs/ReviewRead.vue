<template lang="">
  <div class="basis-full flex flex-wrap justify-between text-xl font-light rounded-sm mb-4 border-b">
    <div class="ml-2 my-1 flex flex-wrap gap-y-20 py-5 px-6 justify-between gap-x-0 border-t border-b box-border basis-full">
      <div class="flex basis-full gap-x-24">
        <p class="text-lg">제목</p>
        <div class="text-lg">
          {{ BoardContent.title }}
        </div>
      </div>
      <div class="flex basis-full justify-between">
        <div class="flex basis-4/12 gap-x-20">
          <p class="text-lg">작성자</p>
          <div class="text-lg">
            {{ BoardContent.name }}
          </div>
        </div>
        <div class="flex basis-4/12 justify-end items-center">
          <div class="flex justify-end gap-x-16 text-sm font-extralight">
            <p>조회수 : {{ BoardContent.hit }}</p>
            <p>{{ dateTime }}</p>
          </div>
        </div>
      </div>
    </div>
      <!-- <div class="mr-2 my-1 flex flex-wrap justify-between gap-x-0 border box-border basis-[45%]">
      </div> -->
      <div class="basis-full px-3 text-xl font-light mb-7">
        <div class="w-full ml-2 my-1">
          {{ BoardContent.content }}
          <div class="my-7 w-9/12 mx-auto">
            <img v-if="BoardContent.file" :src="BoardContent.file" :alt="BoardContent.title">
          </div>
        </div>
      </div>
      <div class="mt-6 flex basis-full mx-auto gap-y-6 flex-wrap justify-center my-6">
        <p class="basis-full text-center">{{ BoardContent.good }}</p>
        <font-awesome-icon @click.once="GoodChk" icon="fa-thumbs-up" class="basis-full cursor-pointer" />
        <p @click.once="GoodChk" class="basis-full text-base text-center cursor-pointer">추천하기</p>
      </div>
  </div>
  <!-- <div class="basis-9/12 mx-auto flex justify-end gap-x-5 text-sm font-extralight mb-3">
    <p>조회수 : {{ BoardContent.hit }}</p>
    <p @click.once="GoodChk"><font-awesome-icon icon="fa-thumbs-up" class="cursor-pointer" /> {{ BoardContent.good }}</p>
    <p>{{ dateTime }}</p>
  </div> -->
  <div class="flex basis-9/12 mx-auto justify-end pb-24 gap-x-5 mt-5">
    <div class="mt-[5px]">
      <router-link to="/cs/review/list" class="bg-blue-400 hover:bg-blue-600 focus:ring-blue-400 py-2 px-4  text-white font-semibold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-opacity-75 text-xs sm:text-sm">목록</router-link>
    </div>
    <div class="flex gap-x-5">
      <router-link to="/cs/review/modify" class="bg-green-400 hover:bg-green-600 focus:ring-green-400 py-2 px-4  text-white font-semibold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-opacity-75 text-xs sm:text-sm">수정</router-link>
      <button class="bg-red-400 hover:bg-red-600 focus:ring-red-400 py-2 px-4  text-white font-semibold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-opacity-75 text-xs sm:text-sm" @click="Delete">삭제</button>
    </div>
  </div>
</template>
<script>
import { db } from "../../firebase"

export default {
  name: "ReviewRead",
  data() {
    return {
      BoardContent: [],
      dateTime: '',
    }
  },
  methods: {
    Delete(){
      let msg = confirm("삭제된 데이터는 복구할 수 없습니다. /r/r 삭제하시겠습니까?");
      if(msg){
        console.log("!!")
        db.collection("review").doc(this.$route.query.docId).delete().then(() => {
          alert("삭제가 완료 되었습니다.")
          this.$router.replace("/cs/review")
        })
      }
    },
    GoodChk() {
      if(this.BoardContent.goodChk){
        alert("이미 추천 하셨습니다.");
        return; 
      }
      db.collection("review").doc(this.$route.query.docId).update({
        good: this.BoardContent.good + 1,
        goodChk : true
      }).then(() => {
        db.collection("review").doc(this.$route.query.docId).get().then((data) => {
          this.BoardContent = data.data()
        })
      })
    },
  },
  mounted() {
    if(this.$store.state.reviewId == null){
      this.$router.replace("/cs/review")
    }
    db.collection("review").doc(this.$route.query.docId).get().then((data) => {
      this.BoardContent = data.data()
      if(data.data().isUpdate){
        return;
      }
      db.collection("review").doc(this.$route.query.docId).update({
        hit: data.data().hit + 1,
      })
    }).then(() => {
      db.collection("review").doc(this.$route.query.docId).get().then((update) => {
        this.BoardContent = update.data();
        const date = this.BoardContent.date.seconds * 1000 + this.BoardContent.date.nanoseconds / 1000000
      const new_date = new Date(date);
      const formattedDate = ('' + new_date.getFullYear()).slice(-2) + '-'
      + ('0' + (new_date.getMonth() + 1)).slice(-2) + '-'
      + ('0' + (new_date.getDate())).slice(-2) + ' '
      + ('0' + (new_date.getHours())).slice(-2) + ':'
      + ('0' + (new_date.getMinutes())).slice(-2) + ':'
      + ('0' + (new_date.getSeconds())).slice(-2) + ''
      return this.dateTime = formattedDate;
      })
    })

  },
  }
</script>
<style lang="">
  
</style>