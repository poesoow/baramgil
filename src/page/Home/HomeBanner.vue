<template>
  <!-- 상단 배너 슬라이드 영역 -->
  <div class="w-full ">

    <!-- 근휘님 25일 작업 내용 -->
    <swiper :slides-per-view="1" :space-between="10" :centeredSlides="true" :loopFillGroupWithBlank="true" 
      @swiper="onSwiper" @slideChange="onSlideChange" 
      :modules="Modules" :autoplay="true && { delay: 3000 }" :loop="true" :navigation="true"
      class="h-auto text-center banner-slide px-[10%] rounded-md">
      <swiper-slide v-for="e in 12" :key="e" class=" cursor-pointer w-[30%] ">
        <img :src="require(`../../assets/images/slide/banner_top.jpg`)" alt="상단 배너" class="w-full h-full ">
      </swiper-slide>
    </swiper>

    <!-- 우섭님 데이터 연결 -->
    <swiper :slides-per-view="swiperView" @swiper="onSwiper" @slideChange="onSlideChange" :scrollbar="{ draggable: true }"
      :modules="Modules" :autoplay="true && { delay: 3000 }" :loop="true" :navigation="true"
      class="w-full text-center banner-slide">
      <swiper-slide v-for="e in dataList" :key="e" class="w-full cursor-pointer">
        <img :src="e.firstimage" alt="e.title" class="w-[840px] h-[770px]">
      </swiper-slide>
    </swiper>



  </div>
  <!-- 상단 배너 슬라이드 영역 -->
</template>

<script>
import axios from 'axios'
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
      Modules: [Navigation, Pagination, Autoplay],
      // api axios 요청관련
      baseURL: 'https://apis.data.go.kr/B551011/KorService1/',
      serviceKey: 'vZqohu%2F1a1mKILW%2BslUEpMtWGBv0IvvlkE7zB28hKgPXkvzNMi9%2F2sawykKToWPc%2F%2FNeUM9rnQykkPu%2FLdPlpQ%3D%3D',
      areaCode: '',
      dataList: null,
      contentTypeId: '15',
      visual: null,
    }
  },
  computed: {
    swiperView() {
      let count;
      if (this.visual > 1200 ) {
        count = 3
      } else {
        count = 1
      }
      return count
    },
  },
  methods: {
    handleResize() {
      this.visual = visualViewport.width
    },
  },  
  components: {
    Swiper,
    SwiperSlide,
  },
  mounted() {
      // 모든 api에 공통으로 들어가는 부분 수정할 필요없음
      const commonUrl = this.baseURL + 'areaBasedList1' + '?serviceKey=' + this.serviceKey + '&MobileOS=ETC' + '&MobileApp=AppTest&_type=json'

      // 세부 api별 옵션 parameter
      const pageInfo = '&numOfRows=' + this.numOfrows + '&pageNo=' + this.pageNo
      const listInfo = '&listYN=Y'
      const arrangeInfo = '&arrange=R'
      const contentTypeInfo = '&contentTypeId=' + this.contentTypeId
      const areaCodeInfo = '&areaCode=' + this.areaCode

      // axios get 요청으로 사용할 변수 선언
      let endpointGet;

      endpointGet = axios.get(commonUrl + pageInfo + listInfo + arrangeInfo + contentTypeInfo + areaCodeInfo)

      endpointGet.then(
        (res) => {
          this.dataList = res.data.response.body.items.item
        }
      ).catch((err) => {
        console.log(err)
      })

      this.handleResize()
      window.addEventListener('resize', this.handleResize);
  },
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