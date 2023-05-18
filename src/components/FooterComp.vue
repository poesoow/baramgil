<template>
  <div class="w-full h-auto bg-white px-[2%]">
    <div class="mx-auto max-w-7xl transition-all duration-700">
      <!-- 푸터 상단 제목 -->
      <h3 class="text-center sm:text-lg md:text-[20px] lg:text-2xl tracking-widest pt-6 transition-all duration-300">
        <font-awesome-icon icon="thumbs-up" class="text-gray-500 mr-1 invisible lg:visible" />SNS에서 만나보세요!
      </h3>
      <!-- 푸터 상단 제목 -->

      <!-- SNS 아이콘 -->
      <div class="border-b pb-6 mt-6 transition-all duration-500">
        <ul class="flex justify-center lg:gap-x-12 ml-3 md:gap-x-8 sm:gap-x-6">
          <li v-for="(e, index) in ImgDesc" :key="e" class="flex gap-x-5 ">
            <img :src="require(`../assets/images/footer/icon${index+1}.png`)" alt="SNS 아이콘"
            class="lg:w-16 lg:h-14 sm:w-6 sm:h-7 sm:pt-1 sm:mt-0.5 transition-all duration-300">
            <span class="sm:pt-1.5 lg:pt-[18px] pl-1.5 -ml-5 mr-7 sm:text-[16px] lg:text-xl transition-all duration-300 tracking-widest">{{ e }}</span>
          </li>
        </ul>
      </div>
      <!-- SNS 아이콘 -->

      <!-- 배너 이미지 -->
      <div class="lg:flex justify-center just my-6 px-2">
        <ul class="flex  justify-center sm:gap-x-4 md:gap-x-[2%] lg:gap-x-[68px] xl:gap-x-[78px] transition-all duration-500">
          <li v-for="(e, index) in 5" :key="e" class=" transition-all duration-500">
            <img :src="require(`../assets/images/footer/ft_banner${index+1}.png`)" alt="푸터 배너" class="lg:w-[180px] md:w-[150px] sm:w-[140px]  transition-all duration-500">
          </li>
        </ul>
      </div>
      <!-- 배너 이미지 -->

      <!-- 텍스트 -->
      <!-- border-b -->
      <div class="pb-8 sm:gap-x-5 md:gap-x-8 lg:gap-x-12 mt-4 px-2 transition-all duration-500 lg:tracking-widest md:tracking-wide ">
        <ul class="flex flex-wrap gap-x-8 text-[16px] mb-3">
          <li v-for="e in FooterTxt[0]" :key="e" class="first-of-type:text-red-500/90">{{ e }}</li>
        </ul>
        <ul class="flex flex-wrap gap-x-10 text-[16px]">
          <li v-for="e in FooterTxt[1]" :key="e" class="sm:mb-3 md:mb-0">{{ e }}</li>
        </ul>
      </div>
      <!-- 텍스트 -->

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
    class="z-40 fixed bottom-32 right-8 cursor-pointer transition-all duration-1000"
    :class="TopBtnChk ? 'visible opacity-100' : 'invisible opacity-0'">
      <img src="../assets/images/button/btn_top.png" alt="상단버튼" class="w-12 lg:w-16 transition-all duration-500">
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