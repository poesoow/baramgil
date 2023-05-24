<template lang="">
  <div class="basis-full">
    <div class="max-w-7xl mx-auto">
      <div class="w-full flex flex-wrap justify-between text-xl font-light rounded-sm mb-24">
        <div class="ml-2 flex flex-wrap gap-y-6 py-7 px-6 justify-between gap-x-0 border-t box-border basis-full">
          <div class="flex basis-full gap-x-12 md:gap-x-10">
            <div class="basis-1/12 text-base md:text-lg text-center">
              수정할 제목
            </div>
            <input type="text" v-model="title" placeholder="제목 수정" class="basis-[calc(100%-112px)] px-2 py-0.5 border rounded">
          </div>
          <div class="flex basis-full gap-x-0 md:gap-x-10">
            <div class="basis-1/12 text-base md:text-lg text-center">
              수정할 이름
            </div>
            <input type="text" v-model="name" placeholder="작성자 수정" class="basis-[calc(100%-112px)] px-2 py-0.5 border rounded">
          </div>
          <textarea v-model="content" placeholder="변경할 내용" class="border-t border-b basis-full h-72 px-3 py-2 text-base"></textarea>
        </div>
        <div class="w-full flex justify-end px-6">
          <button class="bg-red-400 hover:bg-red-600 focus:ring-red-400 py-2 px-4 text-white font-semibold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-opacity-75 text-xs sm:text-sm" @click="Modify">완료</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { db } from "../../firebase"
export default {
  name: 'QnaModify',
  data() {
    return {
      BoardContent: [],
      name: this.$store.state.displayName,
      title: "",
      content: "",
      date: new Date(),
    }
  },
  methods: {
    Modify() {
      db.collection("qna").doc(this.$store.state.qnaId).update({
        "name": this.name,
        "title": this.title,
        "content": this.content,
        "date": this.date,
      }).then(() => {
        alert("수정이 완료되었습니다.")
        this.$router.replace("/cs/qna")
      })
    }
  },
  mounted() {
    if(this.$store.state.qnaId == 0){
      this.$router.replace("/cs/qna")
    }
    db.collection("qna").doc(this.$store.state.qnaId).get().then((data) => {
      this.BoardContent = data.data()
      this.name = this.BoardContent.name
      this.title = this.BoardContent.title
      this.content = this.BoardContent.content
    })
  },
}
</script>
<style lang="">
  
</style>