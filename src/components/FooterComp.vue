<template>
  <div class="w-full mx-auto h-auto px-[2%] border-t pt-8 transition-all duration-700 ">
    <div class="max-w-5xl mx-auto">
      <!-- 배너 이미지 -->
      <div class="lg:flex justify-center border-b px-2 pb-8">
        <ul class="flex justify-center gap-x-3 sm:gap-x-4 md:gap-x-[2%] lg:gap-x-[68px] xl:gap-x-[78px] transition-all duration-500 pt-2 ">
          <li v-for="(e, index) in 5" :key="e" class=" transition-all duration-500 cursor-pointer">
            <img :src="require(`../assets/images/footer/ft_banner${index+1}.png`)" alt="푸터 배너" class="lg:w-[180px] md:w-[150px] sm:w-[140px] w-[100px]  transition-all duration-500">
          </li>
        </ul>
      </div>
      <!-- 배너 이미지 -->
      
      <!-- SNS 아이콘 -->
      <div class="static pb-3 mt-6 transition-all duration-500 md:hidden md:right-0 md:mr-[2%] lg:mr-[4%] md:mt-[3%] xl:mr-[13%] 2xl:mr-[19%] ">
        <ul class="flex justify-center ml-3 gap-x-7 sm:gap-x-6 md:gap-x-1 lg:gap-x-9 ">
          <li v-for="(e, index) in ImgDesc" :key="e" class="flex gap-x-5 cursor-pointer">
            <img :src="require(`../assets/images/footer/icon${index+1}.png`)" alt="SNS 아이콘"
            class="lg:w-8 lg:h-8 w-7 h-7 transition-all duration-300 rounded-xl mr-3">
          </li>
        </ul>
      </div>
      <!-- SNS 아이콘 -->

      <!-- 텍스트 -->
      <div class="pb-8 sm:gap-x-5  lg:gap-x-10 mt-4 px-2 transition-all duration-500 tracking-tighter lg:tracking-widest  md:tracking-tight text-xs md:text-sm text-slate-700 md:relative">
        <ul class="flex flex-wrap justify-center mb-5 md:justify-start md:gap-x-6 gap-x-10">
          <li v-for="e in FooterTxt[0]" :key="e" class="shrink-0 cursor-pointer">{{ e }}</li>
        </ul>
        <ul class="flex flex-wrap justify-center md:py-2 md:pb-4 md:mb-5 md:justify-start gap-x-4 md:gap-x-6">
          <li v-for="e in FooterTxt[1]" :key="e" class="sm:mb-3 md:mb-0 shrink-0">{{ e }}</li>
        </ul> 
        <!-- 텍스트 -->

        <!-- SNS 아이콘 -->
        <ul class="hidden md:flex justify-center md:gap-x-1 sm:gap-x-6 md:absolute md:top-[1%] md:right-[1%] md:justify-end">
          <li v-for="(e, index) in ImgDesc" :key="e" class="cursor-pointer">
            <img :src="require(`../assets/images/footer/icon${index+1}.png`)" alt="SNS 아이콘"
            class="lg:w-8 lg:h-8 w-7 h-7 transition-all duration-300 rounded-xl mr-3">
          </li>
        </ul>
        <p class="text-center text-xs mt-[21px] sm:mt-2 md:-mt-3 md:text-sm md:text-left">CopyRight © 2023 Baramgil. All Rights Reserved.</p>
      </div>
      

      

      <!-- 저작권 관련 로고 이미지 / 한국관광공사, 투어API, 문화체육관광부 -->
      <!-- <div class="flex justify-center py-6">
        <ul class="flex gap-x-6 ">
          <li class="pt-1">© 한국관광공사</li>
          <li v-for="(e, index) in 3" :key="e" class="">
            <img :src="require(`../assets/images/footer/copyright/copyright${index+1}.png`)" alt="" class="">
          </li>
        </ul>
      </div> -->
    </div>
    <!-- <div class="text-center text-lg">
      <p class="">Copyright © 박성부, 송우섭 구민정, 김근휘. All Rights Reserved.</p>
    </div> -->
    <button @click="scrollTop()"
    class="z-40 fixed bottom-32 right-4 cursor-pointer transition-all duration-1000"
    :class="TopBtnChk ? 'visible opacity-100' : 'invisible opacity-0'">
      <img src="../assets/images/button/btn_top.png" alt="상단버튼" class="w-12 lg:w-14 transition-all duration-500">
    </button>
  </div>
</template>
<script>
import Data from '../assets/NavData.json'
export default {
  name: "FooterComp",
  data() {
    return {
      TopBtnChk: false,
      FooterSns: Data.FooterSns,
      FooterTxt: Data.FooterTxt,
      ImgDesc: Data.FooterImgDesc
    }
  },
  mounted(){
      window.addEventListener("scroll", this.updateScroll)
  },
  methods:{
    scrollTop(){
      window.scrollTo({top: 0, behavior: "smooth"})
    },
    updateScroll(){
      this.windowScroll = window.scrollY;
      // console.log(this.windowScroll)
      if(this.windowScroll > 700){
        // 700 -  높이 값은 나중에 조정
        this.TopBtnChk = true
      }else{
        this.TopBtnChk = false
      }
    }
  }
}
</script>
<style>

</style>