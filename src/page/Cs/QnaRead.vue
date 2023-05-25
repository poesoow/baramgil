<template lang="">
  <div class="basis-full">
    <div class="max-w-7xl mx-auto">
      <div class="w-full flex flex-wrap justify-between text-xl font-light rounded-sm mb-4 border-b border-black">
        <div class="ml-2 my-1 flex flex-wrap gap-y-6 py-7 px-6 justify-between gap-x-0 border-t border-b border-black box-border basis-full">
          <div class="flex basis-full gap-x-12 md:gap-x-24">
            <p class="text-base md:text-lg">제목</p>
            <div class="text-sm md:text-base">
              {{ BoardContent.title }}
            </div>
          </div>
          <div class="flex basis-full justify-between">
            <div class="flex basis-4/12 gap-x-10 md:gap-x-20">
              <p class="text-base md:text-lg">작성자</p>
              <div class="text-sm md:text-base">
                {{ BoardContent.name }}
              </div>
            </div>
            <div class="flex basis-4/12 justify-end items-center">
              <div class="flex justify-end gap-x-8 md:gap-x-16 text-xs md:text-sm font-extralight">
                <p>조회수 : {{ BoardContent.hit }}</p>
                <!-- <p @click.once="GoodChk"><font-awesome-icon icon="fa-thumbs-up" class="cursor-pointer" /> {{ BoardContent.good }}</p>
                <p @click.once="noGoodChk"><font-awesome-icon icon="fa-thumbs-down" class="cursor-pointer" /> {{ BoardContent.bad }}</p> -->
                <p>{{ dateTime }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="basis-full px-3 text-sm md:text-base font-light mb-7">
          <div class="w-full mx-4 my-2.5">
            {{ BoardContent.content }}
            <div class="my-7 w-9/12 mx-auto">
              <img v-if="BoardContent.file" :src="BoardContent.file" :alt="BoardContent.title">
            </div>
          </div>
        </div>
        <div class="flex w-full justify-end pb-24 gap-x-5 mt-5">
          <div class="flex">
            <router-link to="/cs/qna/list" class="bg-blue-400 hover:bg-blue-600 focus:ring-blue-400 py-2 px-4  text-white font-semibold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-opacity-75 text-xs sm:text-sm">목록</router-link>
          </div>
          <div v-if="$store.state.uid == BoardContent.uid" class="flex gap-x-5">
            <router-link to="/cs/qna/modify" class="bg-green-400 hover:bg-green-600 focus:ring-green-400 py-2 px-4  text-white font-semibold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-opacity-75 text-xs sm:text-sm">수정</router-link>
            <button class="bg-red-400 hover:bg-red-600 focus:ring-red-400 py-2 px-4  text-white font-semibold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-opacity-75 text-xs sm:text-sm" @click="Delete">삭제</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { db, storage } from "../../firebase"

export default {
  name: "QnaRead",
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
        if(this.BoardContent.file){
          storage.ref().child(`images/${this.FileNameSplit}`).delete()
          db.collection("qna").doc(this.$route.query.docId).delete().then(() => {
            alert("삭제가 완료 되었습니다.")
            this.$router.replace("/cs/qna")
          })
        }else{
          db.collection("qna").doc(this.$route.query.docId).delete().then(() => {
            alert("삭제가 완료 되었습니다.")
            this.$router.replace("/cs/qna")
          })
        }
      }
    },
    // GoodChk() {
    //   if(this.BoardContent.goodChk){
    //     alert("이미 추천 혹은 비추천 하셨습니다.");
    //     return;
    //   }
    //   db.collection("qna").doc(this.$route.query.docId).update({
    //     good: this.BoardContent.good + 1,
    //     goodChk : true
    //   }).then(() => {
    //     db.collection("qna").doc(this.$route.query.docId).get().then((data) => {
    //       this.BoardContent = data.data()
    //     })
    //   })

    // },
    // noGoodChk() {
    //   if(this.BoardContent.bad){
    //     alert("이미 추천 혹은 비추천 하셨습니다.");
    //     return;
    //   }
    //   db.collection("qna").doc(this.$route.query.docId).update({
    //     bad: this.BoardContent.bad + 1,
    //     badChk : true
    //   }).then(() => {
    //     db.collection("qna").doc(this.$route.query.docId).get().then((data) => {
    //       this.BoardContent = data.data()
    //     })
    //   })

    // },
  },
  mounted() {
    if(this.$store.state.qnaId == null){
      this.$router.replace("/cs/qna")
    }
    db.collection("qna").doc(this.$route.query.docId).get().then((data) => {
      this.BoardContent = data.data()
      if(data.data().isUpdate){
        return;
      }
      db.collection("qna").doc(this.$route.query.docId).update({
        hit: data.data().hit + 1,
      })
    }).then(() => {
      db.collection("qna").doc(this.$route.query.docId).get().then((update) => {
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
  computed: {
    FileNameSplit(){
      const parts = this.BoardContent.file.split("%2F");
      let fileName = "";
      if(this.BoardContent.file){
        fileName = parts[parts.length - 1].split('?')[0]
      }
      return fileName
    }
  }
  }
</script>
<style lang="">
  
</style>