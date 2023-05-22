<template>
  <HomeBanner />
  <HomeInfo />
  <HomeNotice />
  <HomeGallery />
  
</template>

<script>
// json 파일
import Data from '../../assets/NavData.json'
// import HomeView from '../../assets/HomeView.json'
import HomeBanner from '../../page/Home/HomeBanner.vue'
import HomeInfo from '../../page/Home/HomeInfo.vue'
import HomeGallery from '../../page/Home/HomeGallery.vue'
import HomeNotice from '../../page/Home/HomeNotice.vue'
// json 파일
// import 'swiper/css';
// import 'swiper/css/bundle';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';
// import { Swiper, SwiperSlide } from 'swiper/vue';
// import { Navigation, Pagination, Autoplay } from 'swiper';
export default {
  name: "HomeView",
  data() {
    return {
      Data,
      // TabMenu: HomeView.TabSub,
      // Tab:HomeView.Tab,
      // Notice: HomeView.Notice,
      // Modules: [Navigation, Pagination, Autoplay],

      // 스와이퍼 변수
      // SlideLength: 0,
      // RealIndex: 1
    }
  },
  components: {
    // Swiper,
    // SwiperSlide,
    HomeBanner,
    HomeGallery,
    HomeInfo,
    HomeNotice
  },
  // methods: {
  //   // 스와이퍼의 현재 페이지 위치와 전체 개수 값 계산
  //   onSlide(swiper) {
  //     console.log(swiper.slides.length)
  //     this.SlideLength = swiper.slides.length
  //   },
  //   onSlideChange(swiper) {
  //     console.log(swiper)
  //     this.RealIndex = swiper.realIndex + 1
  //   }
  // },

}
</script>

<style>

</style>