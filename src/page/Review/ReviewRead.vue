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
                <p>{{ dateTime }}</p>
              </div>
            </div>
          </div>
        </div>
          <!-- <div class="mr-2 my-1 flex flex-wrap justify-between gap-x-0 border box-border basis-[45%]">
          </div> -->
        <div class="basis-full px-3 text-sm md:text-base font-light mb-7">
          <div class="w-full mx-4 my-2.5">
            {{ BoardContent.content }}
            <div class="my-7 w-9/12 mx-auto">
              <img v-if="BoardContent.file" :src="BoardContent.file" :alt="BoardContent.title">
            </div>
          </div>
        </div>
        <div class="mt-6 flex basis-full mx-auto gap-y-2 flex-wrap justify-center my-6">
          <p class="basis-full text-center text-base">{{ BoardContent.good }}</p>
          <font-awesome-icon @click="GoodChk(0)" icon="fa-thumbs-up" class="basis-full cursor-pointer" />
          <p @click="GoodChk(0)" class="basis-full text-sm text-center cursor-pointer">추천하기</p>
        </div>
      </div>
      <!-- <div class="basis-9/12 mx-auto flex justify-end gap-x-5 text-sm font-extralight mb-3">
        <p>조회수 : {{ BoardContent.hit }}</p>
        <p @click.once="GoodChk"><font-awesome-icon icon="fa-thumbs-up" class="cursor-pointer" /> {{ BoardContent.good }}</p>
        <p>{{ dateTime }}</p>
      </div> -->
    </div>
  </div>
  <div class="basis-full">
    <div class="max-w-7xl mx-auto">
      <div class="flex w-full justify-between pb-24 mt-3.5 px-4">
        <div class="mt-[5px]">
          <router-link to="/review/list" class="bg-blue-400 hover:bg-blue-600 focus:ring-blue-400 py-2 px-4 text-white font-semibold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-opacity-75 text-xs sm:text-sm">목록</router-link>
        </div>
        <div class="flex gap-x-5">
          <router-link to="/review/modify" class="bg-green-400 hover:bg-green-600 focus:ring-green-400 py-2 px-4 text-white font-semibold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-opacity-75 text-xs sm:text-sm">수정</router-link>
          <button class="bg-red-400 hover:bg-red-600 focus:ring-red-400 py-2 px-4 text-white font-semibold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-opacity-75 text-xs sm:text-sm" @click="Delete">삭제</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { db, auth } from "../../firebase"

export default {
  name: "ReviewRead",
  data() {
    return {
      BoardContent: [],
      dateTime: '',
    }
  },
  methods: {
    GoodChk(e){
      const user = auth.currentUser;
      db.collection("users").doc(user.uid).get().then(doc => {
        if(!doc.exists){
          db.collection("users").doc(user.uid).set({
            goodChk: {}
          }).then(() => {
            this.GoodChk();
          })
        }else{
          const userData = doc.data();
          if(userData.goodChk && userData.goodChk[this.$route.query.docId]){
            alert("이미 추천 혹은 비추천 하셨습니다.");
            return;
          }
          const updateField = e === 0 ? 'good' : 'bad';
          const updateData = {};
          updateData[updateField] = this.BoardContent[updateField] + 1;
          db.collection("notice").doc(this.$route.query.docId).update(updateData).then(() => {
            userData.goodChk = userData.goodChk || {};
            userData.goodChk[this.$route.query.docId] =  true
            db.collection("users").doc(user.uid).set(userData).then(() => {
              db.collection("notice").doc(this.$route.query.docId).get().then((data) => {
                this.BoardContent = data.data()
              })
            })
          })
        }
      })
    },
    Delete(){
      let msg = confirm("삭제된 데이터는 복구할 수 없습니다. /r/r 삭제하시겠습니까?");
      if(msg){
        console.log("!!")
        db.collection("review").doc(this.$route.query.docId).delete().then(() => {
          alert("삭제가 완료 되었습니다.")
          this.$router.replace("/review")
        })
      }
    },
    // GoodChk() {
    //   if(this.BoardContent.goodChk){
    //     alert("이미 추천 하셨습니다.");
    //     return; 
    //   }
    //   db.collection("review").doc(this.$route.query.docId).update({
    //     good: this.BoardContent.good + 1,
    //     goodChk : true
    //   }).then(() => {
    //     db.collection("review").doc(this.$route.query.docId).get().then((data) => {
    //       this.BoardContent = data.data()
    //     })
    //   })
    // },
  },
  mounted() {
    if(this.$store.state.reviewId == null){
      this.$router.replace("/review")
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