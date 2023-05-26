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
                <!-- <p @click.once="GoodChk"><font-awesome-icon icon="fa-thumbs-up" class="cursor-pointer" /> {{ BoardContent.good }}</p> -->
                <!-- <p @click.once="noGoodChk"><font-awesome-icon icon="fa-thumbs-down" class="cursor-pointer" /> {{ BoardContent.bad }}</p> -->
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
      </div>
    </div>
  </div>
  <div class="basis-full">
    <div class="max-w-7xl mx-auto">
      <div class="flex w-full justify-between pb-24 mt-3.5 px-4">
        <div class="flex">
          <router-link to="/cs/notice/list" class="bg-blue-400 hover:bg-blue-600 focus:ring-blue-400 py-2 px-4  text-white font-semibold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-opacity-75 text-xs sm:text-sm">목록</router-link>
        </div>
        <div v-if="($store.state.uid == BoardContent.uid) && ($store.state.adminUid !== '')" class="flex gap-x-5">
          <router-link to="/cs/notice/modify" class="bg-green-400 hover:bg-green-600 focus:ring-green-400 py-2 px-4  text-white font-semibold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-opacity-75 text-xs sm:text-sm">수정</router-link>
          <button class="bg-red-400 hover:bg-red-600 focus:ring-red-400 py-2 px-4  text-white font-semibold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-opacity-75 text-xs sm:text-sm" @click="Delete">삭제</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { db, auth, storage } from "../../firebase"

export default {
  name: "NoticeRead",
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
          db.collection("notice").doc(this.$route.query.docId).delete().then(() => {
            alert("삭제가 완료 되었습니다.")
            this.$router.replace("/cs/notice")
          })
        }else{
          db.collection("notice").doc(this.$route.query.docId).delete().then(() => {
            alert("삭제가 완료 되었습니다.")
            this.$router.replace("/cs/notice")
          })
        }
      }
    },
    hitUpdate() {
      let user;
      if(user){
        user = auth.currentUser;
        db.collection("users").doc(user.uid).get().then(doc => {
          // exists - 해당 정보를 가지고 있는지 여부를 체크
          if(!doc.exists){
            db.collection("users").doc(user.uid).set({
              hitChk: {}
            }).then(() => {
              this.updateHit();
            })
          }else{
            this.updateHit();
          }
        })
      } else {
        const updateData = this.BoardContent.hit + 1;
        db.collection("notice").doc(this.$route.query.docId).update({hit : updateData})
      }
    },
    updateHit() {
      const user = auth.currentUser;
      db.collection("users").doc(user.uid).get().then(doc => {
        const userData = doc.data();
          if(userData.hitChk && userData.hitChk[this.$route.query.docId]){
            return;
          }
          const updateData = this.BoardContent.hit + 1;
          db.collection("notice").doc(this.$route.query.docId).update({hit : updateData}).then(() => {
            // 사용자가 추천 혹은 비추천을 눌렀다면 해당 문서에 해당 데이터를 업데이트를 기록
            userData.hitChk = userData.hitChk || {};
            // userData.GoodChk 값을 저장한다. 만약 userData.goodChk 값이 있다면 이전에 값을 유지하고 없다면 {} 빈 객체를 할당
            userData.hitChk[this.$route.query.docId] =  true
            db.collection("users").doc(user.uid).set(userData).then(() => {
              db.collection("notice").doc(this.$route.query.docId).get().then((data) => {
                this.BoardContent = data.data();
              })
            })
          })
      })
    },
    // GoodChk() {
    //   if(this.BoardContent.goodChk){
    //     alert("이미 추천 혹은 비추천 하셨습니다.");
    //     return;
    //   }
    //   db.collection("notice").doc(this.$route.query.docId).update({
    //     good: this.BoardContent.good + 1,
    //     goodChk : true
    //   }).then(() => {
    //     db.collection("notice").doc(this.$route.query.docId).get().then((data) => {
    //       this.BoardContent = data.data()
    //     })
    //   })

    // },
    // noGoodChk() {
    //   if(this.BoardContent.bad){
    //     alert("이미 추천 혹은 비추천 하셨습니다.");
    //     return;
    //   }
    //   db.collection("notice").doc(this.$route.query.docId).update({
    //     bad: this.BoardContent.bad + 1,
    //     badChk : true
    //   }).then(() => {
    //     db.collection("notice").doc(this.$route.query.docId).get().then((data) => {
    //       this.BoardContent = data.data()
    //     })
    //   })

    // },
  },
  mounted() {
    if(this.$store.state.noticeId == null){
      this.$router.replace("/cs/notice")
    }
    db.collection("notice").doc(this.$route.query.docId).get().then((data) => {
      this.BoardContent = data.data()
      this.hitUpdate()
      
    }).then(() => {
      db.collection("notice").doc(this.$route.query.docId).get().then((update) => {
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