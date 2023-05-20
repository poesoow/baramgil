<template>
  <!-- 후게 게시판 / 1회에 4장 슬라이딩 -->
  <div class="w-full mt-4 px-10 pt-2 pb-14">
      <!-- bg-[#333]/10 -->
      <!-- :space-between="5" -->
      <swiper :slides-per-view="4" :space-between="20" slides-per-group="3" @swiper="onSlide" @slideChange="onSlideChange"
        :pagination="{ clickable: true, type: 'progressbar' }" :modules="Modules" :autoplay="true && { delay: 3000 }"
        :loop="true" :navigation="true" class="w-full text-center pb-16 rounded-xl ">
        <swiper-slide v-for="(e, index) in 12" :key="e"
          class="cursor-pointer rounded-2xl mt-8 h-auto hover:-mt-10 duration-500 transition-all  w-full ">
          <div class="w-full h-auto ">
            <img :src="require(`../../assets/images/slide/slide${index + 1}.jpg`)" alt="이미지"
              class="w-full h-[450px] mx-auto rounded-2xl duration-500 transitail">
            <p class="tracking-wide mt-1">제목 : 얘! 뭐가 잘 안되니 ?</p>
          </div>
        </swiper-slide>
        <p id="slide_index" class="absolute right-[2%] bottom-[6%] sm:right-6 md:right-[1%] md:bottom-[2%] sm:bottom-[34px] lg:bottom-[2%] duration-500 transition-all slide_index">{{ RealIndex }} / {{ SlideLength }}</p>
        <!-- md:right-[1%] -->
      </swiper>
    </div>
    <!-- 후게 게시판 / 1회에 4장 슬라이딩 -->
</template>
<script>
import 'swiper/css';
import 'swiper/css/bundle';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Pagination, Autoplay } from 'swiper';
export default {
  name: "HomeView",
  data() {
    return {
     
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
<style>
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

}

@media all and (min-width:1024px)  { 
  .swiper-horizontal>.swiper-pagination-progressbar,
  .swiper-pagination-progressbar.swiper-pagination-horizontal {
    margin-left: 1%;
    width: 89%;
  }
}
</style>