<template lang="">
  <!-- <div class="w-full">
    <div class="w-full h-11 my-1.5 box-border justify-end gap-x-[15px]">
      <input type="text" placeholder="검색어를 입력하세요" class="w-[271px] h-full py-[9px] pl-2 border border-[#555555] box-border rounded-[10px]">
      <button class="w-[72px] h-full border rounded-[10px] text-center bg-[#d9d9d9]">버튼</button>
    </div>
  </div> -->
  <div class="w-full mb-[97px]">
    <p class="text-2xl mb-2.5">자주 묻는 질문</p>
    <div class="w-full border-t border-b border-black">
      <div v-for="(e, index) in QuestionData" :key="e" class="w-full">
        <div @click="isClick = !isClick; num = index" class="w-full py-[26px] flex items-center justify-between px-[2%] cursor-pointer border-b border-[#d9d9d9]">
          <div class="flex justify-between items-center gap-x-5">
            <font-awesome-icon icon="q" class="w-5 h-5 " />
            <p class="text-lg">{{ e }}</p>
          </div>
          <font-awesome-icon :icon="(isClick === true) && (num === index) ? 'chevron-up' : 'chevron-down'" />
        </div>
        <template v-for="(el, i) in AnswerData" :key="el">
          <div v-if="(num === i) && (isClick === true) && (i === index)" class="w-full py-[26px] flex items-center gap-x-5 px-[2%] border-b border-[#d9d9d9]">
            <font-awesome-icon icon="a" class="w-5 h-5" />
            <p class="text-sm">{{ el[0] }}</p>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
import FaqDataList from "@/assets/FaqData.json"

export default {
  name: 'FaqView',
  data() {
    return {
      QuestionData : FaqDataList.Question,
      AnswerData : FaqDataList.Answer,
      isClick : false,
      num : 0
    }
  },
}
</script>
<style lang="">
  
</style>