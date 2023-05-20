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
</template>
<script>
export default {
  name:"HomeBanner"
}
</script>
<style>
  
</style>