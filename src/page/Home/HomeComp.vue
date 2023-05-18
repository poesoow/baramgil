<template>
  <!-- 상단 배너 슬라이드 영역 -->
  <div class="w-full ">
    <!-- :pagination="{ clickable: true, type:'fraction' }" -->
    <div class="border">
      <swiper :slides-per-view="1" @swiper="onSwiper" @slideChange="onSlideChange" :scrollbar="{ draggable: true }"
        :modules="Modules" :autoplay="true && { delay: 3000 }" :loop="true" :navigation="true"
        class="w-full text-center banner-slide">
        <swiper-slide v-for="e in 11" :key="e" class="w-full cursor-pointer">
          <img :src="require(`../../assets/images/slide/banner_top.jpg`)" alt="" class="w-full">
        </swiper-slide>
      </swiper>
    </div>
  </div>
  <!-- 상단 배너 슬라이드 영역 -->
  <div class="w-full p-[2%]">
    <!-- 종류 별 뿌려지는 컨텐츠 이미지와 간략한 정보 -->
    <div class="max-w-7xl mx-auto mt-44 border p-[2%]">
      <div class=" flex flex-wrap justify-between basis-[49%]">
        <div v-for="e in 6" :key="e"
          class="border-3 rounded-md lg:basis-[32.5%] sm:basis-[30%] duration-[600] transition-all mb-4">
          <img src="https://via.placeholder.com/200x100" alt="이미지" class="mx-auto p-2 w-full">
          <div class="pl-2.5 text-lg">
            <p class="mb-2 mt-1">제목 :</p>
            <p class="mb-2 ">주소</p>
            <p class="mb-2 ">교통편</p>
            <p class="mb-2 ">주변 시설</p>
            <p class="mb-2 ">상세보기?</p>
          </div>
        </div>
      </div>
    </div>
    <!-- 종류 별 뿌려지는 컨텐츠 이미지와 간략한 정보 -->
    <!-- 페이지 리스트 -->
    <div class="w-full text-center py-2 border-t ">
      <p class="my-2 text-2xl tracking-wider">페이지 리스트 ?</p>
      <ul class="flex justify-center gap-x-5 text-xl ">
        <li v-for="e in 10" :key="e" class="text-center hover:text-blue-600/80 hover:font-bold">{{ e }}</li>
      </ul>
    </div>
    <!-- 페이지 리스트 -->

    <!-- 후기 게시판으로 링크되는 슬라이드 / 1회에 4장 슬라이딩 -->
    <div class="w-full bg-[#333]/10 mt-4 px-10 pt-2">
      <!-- :space-between="5" -->
      <swiper :slides-per-view="4" :space-between="20" slides-per-group="3" @swiper="onSlide" @slideChange="onSlideChange"
        :pagination="{ clickable: true, type: 'progressbar' }" :modules="Modules" :autoplay="true && { delay: 3000 }"
        :loop="true" :navigation="true" class="w-full text-center pb-16 rounded-xl ">
        <swiper-slide v-for="(e, index) in 12" :key="e"
          class="cursor-pointer rounded-2xl mt-8 h-auto hover:-mt-10 duration-500 transition-all  w-full ">
          <div class="w-full h-auto ">
            <img :src="require(`../../assets/images/slide/slide${index + 1}.jpg`)" alt="이미지"
              class="w-full h-[450px] mx-auto rounded-2xl  ">
            <p class="tracking-wide mt-1">제목 : 얘! 뭐가 잘 안되니 ?</p>
          </div>
        </swiper-slide>
        <p class="absolute sm:right-6 md:right-[5%] sm:bottom-[34px] md:bottom-[5.8%] lg:bottom-[2%]">{{ RealIndex }} / {{
          SlideLength }}</p>
      </swiper>
    </div>
  </div>
</template>

<script>
import Data from '../../assets/NavData.json'
import 'swiper/css';
import 'swiper/css/bundle';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Pagination, Autoplay } from 'swiper';
export default {
  name: "HomeComp",
  data() {
    return {
      Data,
      Modules: [Navigation, Pagination, Autoplay],

      // 스와이퍼 변수
      SlideLength: 0,
      RealIndex: 1
    }
  },
  components: {
    Swiper,
    SwiperSlide,
  },
  methods: {
    // 스와이퍼의 현재 페이지 위치와 전체 개수 값 계산
    onSlide(swiper) {
      console.log(swiper.slides.length)
      this.SlideLength = swiper.slides.length
    },
    onSlideChange(swiper) {
      console.log(swiper)
      this.RealIndex = swiper.realIndex + 1
    }
  },

}
</script>
<!-- rgba(255, 255, 255, 0.8) url(./../images/common/ico/arrowL.png) center/9px 13px scroll no-repeat; -->
<style>
.swiper-button-next::after,
.swiper-button-prev::after {
  display: none;
}


/* 하단 */
.swiper-button-next {
  background: url(../../assets/images/button/arrowLeft.png) no-repeat;
  background-size: 65% auto;
  position: absolute;
  top: 50%;
  right: 30px;
  transform: scaleX(-1);
}

.swiper-button-prev {
  background: url(../../assets/images/button/arrowLeft.png) no-repeat;
  background-size: 65% auto;
  position: absolute;
  top: 50%;
  left: 30px;
}

.swiper-slide {
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* width:60%; */
/* margin-top: 600px; */
.swiper-pagination {
  border-radius: 20px;
  margin-top: 550px;
  width: 30%;
}

.swiper-horizontal>.swiper-pagination-progressbar,
.swiper-pagination-progressbar.swiper-pagination-horizontal {
  margin-left: 1%;
  width: 85%;
}

.swiper-pagination-progressbar .swiper-pagination-progressbar-fill {
  background-color: orange;

}</style>