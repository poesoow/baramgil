<template>
 <!-- 후기 게시판 / 1회에 4장 슬라이딩 -->
 <div class="w-full bg-gray-100 ">
    <div class="max-w-5xl mx-auto mt-4 px-10 pt-2 pb-8 rounded-lg">
      <p class="text-3xl ml-[3%] mt-4 cursor-pointer">
        <router-link to="/review/list">
          여행 후기
        </router-link>
      </p>
      <swiper :slides-per-view="3" :space-between="20" slides-per-group="3" @swiper="onSlide" @slideChange="onSlideChange"
        :pagination="{ clickable: true, type: 'progressbar' }" :modules="Modules" :autoplay="true && { delay: 3000 }"
        :loop="true" :navigation="true" class="hidden sm:block px-5 text-center pb-16 rounded-xl ">
        <swiper-slide v-for="(e, index) in 12" :key="e"
          class="cursor-pointer rounded-2xl mt-8 h-auto hover:-mt-10 duration-500 transition-all  w-full ">
          <div class="w-full h-auto ">
            <img :src="require(`../../assets/images/slide/slide${index + 1}.jpg`)" alt="여행후기 사진"
              class="w-full h-[250px] md:h-[300px] lg:h-[350px] xl:h-[400px] mx-auto rounded-2xl duration-500 transition-all">
            <p class="tracking-wide mt-1 truncate">제목 : 얘! 뭐가 잘 안되니 ?</p>
          </div>
        </swiper-slide>
        <p id="slide_index" class="absolute right-[2%] bottom-[6%] sm:right-6 sm:bottom-3 md:right-[1%] md:bottom-[2%] lg:bottom-[2%] xl:mr-6 slide_index">{{ RealIndex }} / {{ SlideLength }}</p>
        <!-- md:right-[1%] -->
      </swiper>
      <div v-for="(e, index) in 4" :key="e" class="sm:hidden px-5 text-center pb-16 rounded-xl">
         <img :src="require(`../../assets/images/slide/slide${index + 1}.jpg`)" alt="여행후기 사진" class="w-[80%] h-[300px] mx-auto ">
         <p class="mt-6">최저 해상도일 때 떨어지게</p>
      </div>
    </div>
  </div>
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
      this.SlideLength = swiper.slides.length
    },
    onSlideChange(swiper) {
      this.RealIndex = swiper.realIndex + 1
    }
  },

}
</script>
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
  right: -2px;
  transform: scaleX(-1);
}

.swiper-button-prev {
  background: url(../../assets/images/button/arrowLeft.png) no-repeat;
  background-size: 65% auto;
  position: absolute;
  top: 50%;
  left: -2px;
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
  border-radius: 40px;
  margin-top: 550px;
  width: 30%;
}
/* 후기 게시판 슬라이드 페이지네이션 - 프로그레스 바 기본 값 */
.swiper-horizontal>.swiper-pagination-progressbar,
.swiper-pagination-progressbar.swiper-pagination-horizontal {
  margin-left: 1%;
  width: 85%;
  border-radius: 40px;
}
/* 프로그레스 바 게이지 색상 */
.swiper-pagination-progressbar .swiper-pagination-progressbar-fill {
  background-color: orange;
  border-radius: 40px;

}

/* 각 해상도 별 프로그레스 바 CSS 값 */
/* 모바일 최소 너비 500px */
@media all and (min-width:500px) and (max-width:639px) { 
  .swiper-horizontal>.swiper-pagination-progressbar,
  .swiper-pagination-progressbar.swiper-pagination-horizontal {
    margin-left: 1%;
    margin-top: 338px;
    width: 83%;
  }
}

/* 모바일 */
@media all and (min-width:640px) and (max-width:767px) { 
  .swiper-horizontal>.swiper-pagination-progressbar,
  .swiper-pagination-progressbar.swiper-pagination-horizontal {
    margin-left: 1%;
    margin-top: 348px;
    width: 85%;
  }
}

/* 태블릿 */
@media all and (min-width:768px) and (max-width:1023px) { 
  .swiper-horizontal>.swiper-pagination-progressbar,
  .swiper-pagination-progressbar.swiper-pagination-horizontal {
    margin-left: 2.5%;
    margin-top: 402px;
    width: 89%;
  }
}
/* PC  */
@media all and (min-width:1024px) and (max-width:1279px) { 
  .swiper-horizontal>.swiper-pagination-progressbar,
  .swiper-pagination-progressbar.swiper-pagination-horizontal {
    margin-left: 2.5%;
    margin-top: 450px;
    width: 90%;
    transition-duration: 0.5;
  }
}

/* 너비가 1280 이상일 때 */
@media all and (min-width:1280px) and (max-width:1919px) { 
  .swiper-horizontal>.swiper-pagination-progressbar,
  .swiper-pagination-progressbar.swiper-pagination-horizontal {
    margin-left: 2%;
    margin-top: 500px;
    width: 88%;
    transition-duration: 0.5;
  }
}
</style>