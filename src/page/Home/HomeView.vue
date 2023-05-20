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
  <div class="w-full p-[2%] mt-20">
   
    <div class="max-w-5xl">
      <div class="w-full mx-auto">
        <h2 class="mb-10 text-3xl">여행정보</h2>
        <div class="flex justify-items-center border border-black mb-10 text-center text-xl rounded-lg py-4 ">
          <p class="basis-[49%] relative after:absolute after:h-[50%] after:right-2 after:">인기</p>
          <p class="basis-[49%]">지역별</p>
        </div>
        <div class="w-full flex justify-center text-xl py-4 gap-x-[5%] ">
          <p v-for="e in Tab" :key="e" class="border border-black/30 py-[1%] px-[7%] rounded-xl ">{{ e }}</p>
        </div>
        <h1 class="text-center text-lg md:text-xl py-7">각 지역별 여행지와 맛집을 소개합니다 !!</h1>
        <div class=" border-t border-b border-black px-[2%] py-1.5 mb-4">
          <!-- 탭메뉴 -->
          <ul class="flex justify-between ml-0.5">
            <li v-for="e in TabMenu" :key="e" class="shrink-0 text-sm md:text-lg  duration-500 transition-all">{{ e }}</li>
            <!-- [li]에 라우터 링크? -->
          </ul>
        </div>
      </div>
      <div></div>
       <!-- 종류 별 뿌려지는 컨텐츠의 이미지와 간략한 정보 -->
      <div class="mx-auto p-[2%]">
        <div class="flex flex-wrap justify-between basis-[49%] ">
          <div v-for="e in 4" :key="e"
            class="h-64 border-[2px] rounded-md  basis-[24%] duration-[600] transition-all mb-7">
            <img src="https://via.placeholder.com/200x250" alt="이미지" class="mx-auto p-2 w-full h-full">
          </div>
        </div>
        <p class="text-right mr-[1%]"><button>더보기 +</button></p>
      </div>
    </div>
    <!-- 종류 별 뿌려지는 컨텐츠 이미지와 간략한 정보 -->

    <!-- 공지 / Q&A 게시판 -->
    <div class="w-full mt-20 mx-auto p-[2%]">
      <div class="max-w-5xl">
        <h2 class="mb-8 text-3xl">공지사항 / 
          <span class="tracking-widest">Q<span class="text-gray-400">&</span>A</span>
        </h2>
        <div class="w-full border p-[1%] relative">
          <div class="flex ml-[3%] text-lg gap-x-8 rounded-md">
            <p class="px-[3%] py-[1%] border rounded-md cursor-pointer hover:bg-[skyblue] hover:text-white">공지사항</p>
            <p class="px-[3%] py-[1%] border rounded-md cursor-pointer hover:bg-[skyblue] hover:text-white">자주 묻는 질문</p>
          </div>
          <p class="absolute right-8 top-[50px]"><button>더 보기 +</button></p>
          <div class="flex justify-between border rounded-md w-full mt-2 p-[2%] tracking-widest text-lg md:text-xl">
            <ul class="basis-[60%]">
              <li v-for="e in Notice[0]" :key="e" class="w-full border-b mb-1.5">{{ e }}</li>
            </ul>
            <ul class="basis-[30%]">
              <li v-for="e in Notice[1]" :key="e" class="w-full border-b mb-1.5">{{ e }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <!-- 공지 / Q&A 게시판 -->

    

    <!-- 후게 게시판 / 1회에 4장 슬라이딩 -->
    <div class="w-full  mt-4 px-10 pt-2 pb-8">
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
    
  </div>
</template>

<script>
// json 파일
import Data from '../../assets/NavData.json'
import HomeView from '../../assets/HomeView.json'
// json 파일
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
      Data,
      TabMenu: HomeView.TabSub,
      Tab:HomeView.Tab,
      Notice: HomeView.Notice,
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

}

@media all and (min-width:1024px)  { 
  .swiper-horizontal>.swiper-pagination-progressbar,
  .swiper-pagination-progressbar.swiper-pagination-horizontal {
    margin-left: 1%;
    width: 89%;
  }
}

/* 해당 너비 구간에서 하단 배너 슬라이드의 프랙션 위치 값이 비틀림 */
/* @media all and (min-width:905px) and (max-witdh:1023px) { 
  #slide_index{
    bottom: 1%;
    border:solid red 1px;
  }
  .swiper-horizontal>.swiper-pagination-progressbar,
  .swiper-pagination-progressbar.swiper-pagination-horizontal {
    margin-left: 1%;
    width: 80%;
  }
} */
</style>