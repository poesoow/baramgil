<template lang="">
  <div class="basis-full">
    <div class="max-w-7xl mx-auto">
      <div class="w-full flex flex-wrap justify-between text-xl font-light rounded-sm mb-2">
        <div class="mx-2 flex flex-wrap gap-y-6 py-7 px-6 justify-between gap-x-0 border-t box-border basis-full">
          <div class="flex basis-full gap-x-12 md:gap-x-10">
            <div class="basis-1/12 text-base md:text-lg text-center">
              작성자
            </div>
            <input v-model="name" type="text" class="basis-[calc(100%-112px)] px-2 py-0.5 border rounded" placeholder="이름">
          </div>
          <div class="flex basis-full gap-x-12 md:gap-x-10">
            <div class="basis-1/12 text-base md:text-lg text-center">
              제목
            </div>
            <input v-model="title" type="text" class="basis-[calc(100%-112px)] px-2 py-0.5 border rounded" placeholder="제목">
          </div>
          <input type="file" class="shadow appearance-none border rounded-sm w-full py-2 px-3 text-sm text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="image">
        </div>
        <div class="flex px-10 mb-4">
          <input type="checkbox" v-model="isChecked" name="fixed" id="fixed"><label for="fixed" class="px-1"><span class="text-base">상단고정</span></label>
        </div>
        <textarea v-model="content" class="border-t border-b basis-full h-72 mb-4 px-3 py-2 text-base"></textarea>
      </div>
      <div class="w-full flex justify-end">
        <button class="bg-slate-400 hover:bg-slate-600 focus:ring-indigo-400 mb-20 py-2 px-6 text-white font-semibold rounded shadow-md focus:outline-none focus:right-2 focus:ring-opacity-75 text-xs sm:text-sm" @click="Write()">완료</button>
      </div>
      <!-- {{ isChecked }} -->
    </div>
  </div>
</template>
<script>
import { db, storage } from "../../firebase"

export default {
  name: "NoticeWrite",
  data() {
    return {
      title: "",
      content: "",
      name: this.$store.state.displayName,
      file: "",
      date: new Date(),
      fileRandom: null,
      isChecked : false,
      fixed : false,
    }
  },
  mounted(){
    const formattedDate = this.GetDate();
    this.fileRandom = formattedDate
  },
  methods: {
    GetDate(){
      const date = new Date();
      const RandNum = Math.floor(Math.random() * 999) + 100;
      const formattedDate = ('' + date.getFullYear()) + '' 
        + ('0' + (date.getMonth() + 1)).slice(-2) + ''
        + ('0' + (date.getDate())).slice(-2) + '_' 
        + ('0' + date.getHours()).slice(-2) + ''
        + ('0' + date.getMinutes()).slice(-2) + ''
        + ('0' + date.getSeconds()).slice(-2) + '' + RandNum
          return formattedDate;
    },
    Write(){
      if(this.isChecked){
        this.fixed = true
      }else{
        this.fixed = false
      }
      this.file = document.querySelector("#image").files[0];
      if(this.file){
        storage.ref().child("images/" + this.fileRandom).put(this.file).then(() => {
          storage.ref().child("images/" + this.fileRandom).getDownloadURL().then((url) => {
            db.collection("notice").add({
            "name": this.name,
            "title": this.title,
            "content": this.content,
            "date": this.date,
            "hit" : 1,
            "good" : 0,
            "bad" : 0,
            "uid" : this.$store.state.uid,
            "file" : url,
            "fixed" : this.fixed
          })
        this.$router.replace("/cs/notice")
          })
        })
      }else{
        db.collection("notice").add({
          "name": this.name,
          "title": this.title,
          "content": this.content,
          "date": this.date,
          "hit" : 1,
          "good" : 0,
          "bad" : 0,
          "uid" : this.$store.state.uid,
          "fixed" : this.fixed
        })
        this.$router.replace("/cs/notice")
      }

    }
  }
}
</script>
<style lang="">
  
</style>