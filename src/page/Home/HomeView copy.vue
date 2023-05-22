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
    <div class="max-w-5xl mx-auto">
      <div class="w-full mx-auto">
        <h2 class="mb-10 text-3xl">여행정보</h2>
        <div class="flex justify-items-center border border-black mb-10 text-center text-xl rounded-lg py-4 ">
          <p class="basis-[49%] cursor-pointer">인기</p>
          <p class="basis-[49%] relative after:absolute after:w-[1px] after:h-[32px] after:bg-gray-900 after:left-0 after:top-2/4 after:-translate-y-2/4 cursor-pointer">지역별</p>
        </div>
        <div class="w-full flex justify-center text-xl py-4 gap-x-[5%]">
          <p v-for="e in Tab" :key="e" class="border border-black/30 py-[1%] px-[7%] rounded-xl cursor-pointer hover:bg-black hover:text-white">{{ e }}</p>
        </div>
        <h1 class="text-center text-lg md:text-xl py-7">각 지역별 여행지와 맛집을 소개합니다 !!</h1>
        <div class=" border-t border-b border-black px-[2%] py-1.5 mb-4">
          <!-- 탭메뉴 -->
          <ul class="flex justify-between ml-0.5">
            <li v-for="e in TabMenu" :key="e" class="shrink-0 text-sm md:text-lg  duration-500 transition-all cursor-pointer">{{ e }}</li>
            <!-- [li]에 라우터 링크? -->
          </ul>
        </div>
      </div>
       <!-- 종류 별 뿌려지는 컨텐츠의 이미지와 간략한 정보 -->
      <div class="mx-auto p-[2%] border">
        <div class="flex flex-nowrap justify-between basis-[49%]">
          <div v-for="(e, index) in 3" :key="e"
            class="h-64 mb-7 rounded-md basis-[55%] duration-[600] transition-all first-of-type:basis-[20%] last-of-type:basis-[20%]">
            <img :src="require(`../../assets/images/travelInfo/info${index+1}.png`)" alt="이미지" class="mx-auto p-2 w-full h-full">
          </div>
        </div>
        <p class="text-right mr-[1%]"><button>더보기 +</button></p>
      </div>
    </div>
    <!-- 종류 별 뿌려지는 컨텐츠 이미지와 간략한 정보 -->

    <!-- 공지 / Q&A 게시판 -->
    <div class="w-full mt-20 mx-auto p-[2%] ">
      <div class="max-w-5xl mx-auto relative">
        <div class="flex flex-nowrap justify-between">
          <h2 class="mb-8 text-3xl">공지사항  
            <span class="ml-6 tracking-widest relative after:absolute after:w-[1px] after:h-[22px] after:bg-gray-900 after:-left-4 after:top-2/4 after:-translate-y-2/4">Q<span class="text-gray-400">&</span>A</span>
          </h2>
          <p class="text-lg font-light">더 보기 +</p>
        </div>
        <div class="max-w-5xl md:w-full md:flex md:flex-nowrap md:justify-between duration-500 transition-all">
          <div class="md:w-[48%] xl:w-[30%] border border-black/30 shadow-md shadow-gray-400 rounded-3xl mx-auto px-[15%] md:px-10 xl:px-[2%] py-[5%] mb-10 drop-shadow-xl md:h-[220px] xl:h-[180px]">
            <p class="mb-4">제목</p>
            <p class="truncate break-all">아주 그냥 입만 벌리면 그짓말이 자동으로 나와</p>
          </div>
          <div class="hidden xl:block md:w-[48%] xl:w-[30%] border border-black/30 shadow-md shadow-gray-400 rounded-3xl md:mx-8 xl:mx-10 px-[15%] md:px-10 xl:px-[2%] pt-[5%] drop-shadow-xl md:h-[220px] xl:h-[180px]">
            <p class="mb-4">제목</p>
            <p class="truncate break-all ">이 편지는 영국에서 시작되어 어쩌고 저쩌고..fdasfdsafsdalfkhj sdalfjlksdajflksdajflksdajflkjdsafdafdsfdasfdsafsadfdsaa</p>
          </div>
          <div class="md:w-[48%]  xl:w-[30%]  border border-black/30 shadow-md shadow-gray-400 rounded-3xl  px-[15%] md:px-10 py-[5%] mb-10 xl:px-[2%] drop-shadow-xl xl:h-[180px]">
            <p class="mb-4">제목</p>
            <p class="truncate break-all">ㅇ러ㅣㅇ마ㅓ라ㅣㅁㄴ어라ㅣ넘이ㅏ러나이</p>
          </div>
        </div>
      </div>
    </div>
    <!-- 공지 / Q&A 게시판 -->
  </div>
    

    <!-- 후기 게시판 / 1회에 4장 슬라이딩 -->
    <div class="w-full bg-gray-100 ">
      <div class="max-w-5xl mx-auto mt-4 px-10 pt-2 pb-8 rounded-lg">
        <p class="text-3xl ml-[3%] mt-4">여행 후기</p>
        <swiper :slides-per-view="3" :space-between="20" slides-per-group="3" @swiper="onSlide" @slideChange="onSlideChange"
          :pagination="{ clickable: true, type: 'progressbar' }" :modules="Modules" :autoplay="true && { delay: 3000 }"
          :loop="true" :navigation="true" class="px-5 text-center pb-16 rounded-xl ">
          <swiper-slide v-for="(e, index) in 12" :key="e"
            class="cursor-pointer rounded-2xl mt-8 h-auto hover:-mt-10 duration-500 transition-all  w-full ">
            <div class="w-full h-auto ">
              <img :src="require(`../../assets/images/slide/slide${index + 1}.jpg`)" alt="이미지"
                class="w-full h-[250px] md:h-[300px] lg:h-[350px] xl:h-[400px] mx-auto rounded-2xl duration-500 transition-all">
              <p class="tracking-wide mt-1 truncate">제목 : 얘! 뭐가 잘 안되니 ?</p>
            </div>
          </swiper-slide>
          <p id="slide_index" class="absolute right-[2%] bottom-[6%] sm:right-6 sm:bottom-3 md:right-[1%] md:bottom-[2%] lg:bottom-[2%] xl:mr-6 slide_index">{{ RealIndex }} / {{ SlideLength }}</p>
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