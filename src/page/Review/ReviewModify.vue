<template lang="">
  <div class="basis-full">
    <div class="max-w-7xl mx-auto">
      <div class="w-full flex flex-wrap justify-between text-xl font-light rounded-sm mb-24">
        <div class="ml-2 my-1 flex flex-wrap gap-y-6 py-7 px-6 justify-between gap-x-0 border-t box-border basis-full">
          <div class="flex basis-full gap-x-12 md:gap-x-10">
            <div class="basis-1/12 text-base md:text-lg text-center">
              제목
            </div>
            <input type="text" v-model="title" placeholder="제목 수정" class="basis-[calc(100%-112px)] px-2 py-0.5 border rounded">
          </div>
          <div class="flex basis-full gap-x-0 md:gap-x-10">
            <div class="basis-1/12 text-base md:text-lg text-center">
              작성자
            </div>
            <input type="text" v-model="name" placeholder="작성자 수정" class="basis-[calc(100%-112px)] px-2 py-0.5 border rounded">
          </div>
          <input type="file" class="shadow appearance-none border rounded-sm w-full py-2 px-3 text-sm text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="image">
        </div>
        <textarea v-model="content" placeholder="변경할 내용" class="border-t border-b basis-full h-72 mb-4 px-3 py-2 text-base"></textarea>
        <div class="flex justify-between border rounded w-full py-2 px-3">
          <input type="file" id="image" ref="fileInput" @change="NameChange" class="hidden">
          <div class="flex gap-x-5 text-sm items-center">
            <button class="border bg-gray-700 p-1 px-2 text-white" id="openFile" @click="clickTrigger">파일선택</button>
            <p>{{ fileInfo }}</p>
            <p></p>
          </div>
          <span><input type="checkbox" v-model="fileDel"> {{ FileNameSplit }}</span>
        </div>
        <div class="w-full flex justify-between">
          <router-link to="/review/list"><button class="bg-blue-400 hover:bg-blue-600 focus:ring-blue-400 py-2 px-6 text-white font-semibold rounded shadow-md focus:outline-none focus:right-2 focus:ring-opacity-75 text-xs sm:text-sm">목록</button></router-link>
          <button class="bg-red-400 hover:bg-red-600 focus:ring-red-400 py-2 px-6 text-white font-semibold rounded shadow-md focus:outline-none focus:right-2 focus:ring-opacity-75 text-xs sm:text-sm" @click="Modify">수정</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { db,storage } from "../../firebase"
export default {
  name: 'ReviewModify',
  data() {
    return {
      BoardContent: [],
      name: this.$store.state.displayName,
      title: "",
      content: "",
      date: new Date(),
      file: "",
    }
  },
  methods: {
    NameChange(e) {
      if(e.target.files[0]){
        this.fileInfo = e.target.files[0].name;
      }else{
        this.fileInfo = "선택된 파일 없음"
      }
    },
    clickTrigger() {
      this.$refs.fileInput.click()
    },
    Modify() {
      if(this.fileDel){
        storage.ref().child(`images/${this.FileNameSplit}`).delete()
        this.file = ""
      }
      db.collection("review").doc(this.$store.state.reviewId).update({
        "name": this.name,
        "title": this.title,
        "content": this.content,
        "date": this.date,
        "file": this.file,
      }).then(() => {
        alert("수정이 완료되었습니다.")
        this.$router.replace("/review")
      })
    }
  },
  mounted() {
    if(this.$store.state.reviewId == 0){
      this.$router.replace("/review")
    }
    db.collection("review").doc(this.$store.state.reviewId).get().then((data) => {
      this.BoardContent = data.data()
      this.name = this.BoardContent.name
      this.title = this.BoardContent.title
      this.content = this.BoardContent.content
      this.file = this.BoardContent.file
    })
  },
  computed: {
    FileNameSplit(){
      const parts = this.file.split("%2F");
      const fileName = parts[parts.length - 1].split('?')[0]
      return fileName
    }
  }
}
</script>
<style lang="">
  
</style>