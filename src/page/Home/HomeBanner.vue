<template>
  <!-- 상단 배너 슬라이드 영역 -->
  <div class="w-full ">
    <swiper :slides-per-view="1" :space-between="10" :centeredSlides="true" :loopFillGroupWithBlank="true" 
      @swiper="onSwiper" @slideChange="onSlideChange" 
      :modules="Modules" :autoplay="true && { delay: 3000 }" :loop="true" :navigation="true"
      class="h-auto text-center banner-slide px-[10%] rounded-md">
      <swiper-slide v-for="e in 12" :key="e" class=" cursor-pointer w-[30%] ">
        <img :src="require(`../../assets/images/slide/banner_top.jpg`)" alt="상단 배너" class="w-full h-full ">
      </swiper-slide>
    </swiper>
  </div>
  <!-- 상단 배너 슬라이드 영역 -->
</template>
<script>
import 'swiper/css';
import 'swiper/css/bundle';
import 'swiper/css/navigation';
// import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Pagination, Autoplay } from 'swiper';
export default {
  name:"HomeBanner",
  data() {
    return {
      Modules: [Navigation, Pagination, Autoplay]
    }
  },
  components: {
    Swiper,
    SwiperSlide,
  }
}
</script>
<style>
.swiper-slide{
  position:relative;
}  
.swiper-button-next{
  position: absolute;
  top: 50%;
  right: 0px;
  color:white;
  width:20px;
}
.swiper-button-prev {
  position: absolute;
  top: 50%;
  left: 0px;
  color:white;
  width:20px;
  height:30px;
}
</style>