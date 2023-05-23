<!-- eslint-disable vue/no-parsing-error -->
<template>
  <Title class="my-14 lg:my-0">여행정보</Title>

  <div class="w-full">
    <p class="my-12 text-lg lg:text-xl mx-auto">
      <ul class="flex flex-wrap gap-5 max-w-5xl mx-auto justify-center">
        <li v-for="(area) in areaList" :key="area" @click="selectArea(area.code, area.name); fetchData()"
          :class="selectAreaCode == area.code && 'bg-[#B799FF] p-1 text-white rounded-md'">
          <div>{{ area.name2 }}</div>
        </li>
      </ul>
    </p>
    <div class="max-w-5xl mx-auto text-center pb-4 animate-fade-up animate-once animate-duration-[1000ms] animate-delay-[1ms] animate-ease-linear animate-normal animate-fill-forwards">
      <!-- 서브타이틀 애니메이션 
            tailwind.config.js 파일에서 클래스 값 수정 -->
      <p class="my-7 text-4xl">지역 숨은 명소</p>
      <p class="text-2xl mt-2">지역주민이 추천하는 숨은 명소입니다 !!</p>
    </div>
    <p class="text-3xl font-bold max-w-5xl mx-auto mt-6 text-center">
      <span class=""> <span class="text-blue-500">{{ selectAreaName ? selectAreaName : '지역' }}</span><span> 주민 추천 여행지</span></span>
    </p>
            
    <p class="mt-3 mb-6">

      <div v-for="data in dataList" :key="data" class="basis-full border rounded-md mb-20 relative flex flex-wrap items-center group animate-fade-up animate-infinite animate-duration-[2000ms] animate-delay-[1ms] animate-ease-linear animate-normal animate-fill-forwards">
        <div class="basis-full md:basis-2/4 group-odd:order-1 md:group-odd:order-1 md:group-even:order-2">
          <img :src="`http://placeholder.com/300x200`" :alt="data.title" class="w-full p-2.5 h-[70%]">
        </div>
        <div class="basis-full md:basis-2/4 md:group-even:left-14 md:group-odd:-left-14 group-odd:order-2 group-even:text-right group-even:order-1 relative  px-7 sm:px-16 py-5 box-border">
          <!-- z-10 / 인덱스 값 삭제 - 헤더를 덮어버림 -->
          <div>
            <h3 class="mb-8 text-xl">{{ data.crsKorNm }}</h3>
            <!-- <p class="mb-3">{{ data.crsCycle }}</p> -->
            <p class=" leading-8" v-html="data.crsContents"></p>
            <!-- <p class="mb-3" v-html="data.crsTourInfo"></p>
            <p class="mb-3" v-html="data.travelerinfo"></p> -->
            <!-- <p class="mb-3"> 경로 파일 {{ data.gpxpath }}</p> -->
          </div>
          <!-- <p class="mb-3 leading-7" v-html="data.crsContents"></p> -->
          <!-- <button @click="openModal(index)">자세히 보기</button>
          <Teleport to="body">
            <div v-if="isModal && (Number(index) == selectIndex)" class="fixed z-[100] top-[30%] left-[10%] w-4/5 bg-white">
              <p class="text-2xl">{{ data.crsKorNm }}</p>
              <hr>
              <p class="mb-3" v-html="data.crsTourInfo"></p>
              <p class="mb-3">{{ data.crsTourInfo }}</p>
              <hr>
              <p class="mb-3" v-html="data.travelerinfo"></p>
              <p class="mb-3">{{ data.travelerinfo }}</p>
              <button @click="closeModal">닫기</button>
            </div>
          </Teleport> -->
        </div>
      </div>

    </p>
    <div class="text-center my-3">
      <button @click="fetchMore()">더보기</button>
    </div>
  </div>

  


</template>

<script>
  import tourData from '@/assets/tourData.json'
  import axios from 'axios'
  import Title from '@/components/TitleComp.vue'

  export default {
    name: 'TourerviceView',
    components: {
      Title,
    },
    data() { 
      return {
        baseURL: 'https://apis.data.go.kr/B551011/Durunubi/',
        serviceKey: 'vZqohu%2F1a1mKILW%2BslUEpMtWGBv0IvvlkE7zB28hKgPXkvzNMi9%2F2sawykKToWPc%2F%2FNeUM9rnQykkPu%2FLdPlpQ%3D%3D',
        areaCode: '',
        dataList: null,
        bodyInfo: null,
        areaList: tourData.area,
        selectAreaCode: '',
        selectAreaName: '',
        isModal: false,
        selectIndex: -1,
        /* 공통 */
        numOfrows: 3, // 한페이지 결과 수
        pageNo: 1, // 페이지 번호
        Mobileos: 'ETC', // OS 구분 : IOS (아이폰), AND (안드로이드), WIN (윈도우폰), ETC(기타)
        listYN: 'Y', // 목록구분(Y=목록, N=개수)
        contentTypeId: '15', // 관광타입(12:관광지, 14:문화시설, 15:축제공연행사, 25:여행코스, 28:레포츠, 32:숙박, 38:쇼핑, 39:음식점)
        cateType: '', // 서비스 분류 코드
      }
    },
    mounted() {
      this.fetchData()
    },
    methods: {
      openModal(index) {
        this.isModal = true
        this.selectIndex = Number(index)
        const body = document.querySelector('body')
        body.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';  
      },
      closeModal() {
        this.isModal = false
        this.selectIndex = -1
        const body = document.querySelector('body')
        body.style.backgroundColor = '';
      },
      fetchMore() {
        alert('작업필요')
      },
      selectArea(code, name) {
        this.selectAreaCode = code
        this.selectAreaName = name
        this.areaCode = code
      },
      fetchData() {

        // 모든 api에 공통으로 들어가는 부분 수정할 필요없음
        const commonUrl = this.baseURL + 'courseList' + '?serviceKey=' + this.serviceKey + '&MobileOS=' + this.Mobileos + '&MobileApp=AppTest&_type=json'

        // 세부 api별 옵션 parameter
        const pageInfo = '&numOfRows=' + this.numOfrows + '&pageNo=' + this.pageNo
        let endpointGet;

        endpointGet = axios.get(commonUrl + pageInfo)

        endpointGet.then(
          (res) => {
            // console.log(res.data.response.body)
            this.dataList = res.data.response.body.items.item
            this.bodyInfo = res.data.response.body
          }
        ).catch((err) => {
          console.log(err)
        })
      }
    },
  }
</script>

<style scoped>
.modal {
  position: fixed;
  z-index: 999;
  top: 20%;
  left: 50%;
  width: 300px;
  margin-left: -150px;
}

</style>