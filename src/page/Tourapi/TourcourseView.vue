<template>
   <div>
    <p class="my-12 text-1xl">
      <ul class="flex gap-5 max-w-6xl mx-auto justify-center">
        <li v-for="(area) in areaList" :key="area" @click="selectArea(area.code, area.name); fetchData()"
          :class="selectAreaCode == area.code && 'bg-slate-500 text-white rounded-md'">
          <div>{{ area.name2 }}</div>
        </li>
      </ul>
    </p>
    <p class="text-3xl font-bold max-w-6xl mx-auto px-3 mt-6 flex justify-center">
      <span><span class=" text-blue-500">{{ selectAreaName }}</span><span> 숨은 여행지</span></span>
    </p>
    <p class="text-center my-4">지역 주민 추천 여행지</p>
    <!-- even 짝tn odd 홀tn -->
    <p class="mt-3 mb-6">
      <ul class="flex flex-wrap basis-full">
        <li v-for="(data, index) in dataList" :key="index" class="basis-full group justify-start odd:justify-end odd:text-left rounded-md mb-20 relative flex flex-wrap">
          <div class="basis-[47%]  text-center mx-2">
            <img src="https://via.placeholder.com/400x300" alt="임시 이미지" class="mx-auto w-[70%] py-4">
          </div>
          <div class="basis-[47%]">
            <h3 class="my-3">{{ data.crsKorNm }}</h3>
            <p class="mb-3">{{ data.crsCycle }}</p>
            <p class="mb-3" v-html="data.crsContents"></p>
            <p class="mb-3" v-html="data.crsTourInfo"></p>
            <p class="mb-3" v-html="data.travelerinfo"></p>
            <!-- <p class="mb-3"> 경로 파일 {{ data.gpxpath }}</p> -->
          </div>
        </li>
      </ul>
      <template v-if="true">
        <div class="text-center my-3">
          <button @click="fetchMore()">더보기</button>
        </div>
      </template>
    </p>
  </div>
</template>

<script>
  import tourData from '@/assets/tourData.json'
  import axios from 'axios'

  export default {
    name: 'TourerviceView',
     data() {
    return {
      img: "https://via.placeholder.com/300x200",
      
      baseURL: 'https://apis.data.go.kr/B551011/Durunubi/',
      serviceKey: 'vZqohu%2F1a1mKILW%2BslUEpMtWGBv0IvvlkE7zB28hKgPXkvzNMi9%2F2sawykKToWPc%2F%2FNeUM9rnQykkPu%2FLdPlpQ%3D%3D',
      areaCode: '',
      dataList: null,
      bodyInfo: null,
      areaList: tourData.area,
      selectAreaCode: '',
      selectAreaName: '',
      // (12: 관광지, 14: 문화시설, 15: 축제공연행사, 25: 여행코스, 28: 레포츠, 32: 숙박, 38: 쇼핑, 39: 음식점)
      contentTypeList: tourData.contentTypelist,
      selectContentTypeCode: '',
      selectContentTypeName: '',
      arrange: 'R',
      selectArrange: 'R', // 정렬구분 (A=제목순, C=수정일순, D=생성일순) 대표이미지가반드시있는정렬(O=제목순, Q=수정일순, R=생성일순)
      /* 공통 */
      numOfrows: 3, // 한페이지 결과 수
      pageNo: 1, // 페이지 번호
      Mobileos: 'ETC', // OS 구분 : IOS (아이폰), AND (안드로이드), WIN (윈도우폰), ETC(기타)
      listYN: 'Y', // 목록구분(Y=목록, N=개수)
      contentTypeId: '15', // 관광타입(12:관광지, 14:문화시설, 15:축제공연행사, 25:여행코스, 28:레포츠, 32:숙박, 38:쇼핑, 39:음식점)
      cateType: '', // 서비스 분류 코드
    }
  },
  computed: {
    filterContentTypeList() {
      return this.contentTypeList.filter(contentType => contentType.use == 'Y')
    },
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    selectarrange(arrange) {
      this.selectArrange = arrange
    },
    fetchMore() {
      alert('작업필요')
    },
    selectArea(code, name) {
      this.selectAreaCode = code
      this.selectAreaName = name
      this.areaCode = code
    },
    selectContentType(code, name) {
      this.selectContentTypeCode = code
      this.selectContentTypeName = name
      this.contentTypeId = code
    },
    fetchData() {

      // 모든 api에 공통으로 들어가는 부분 수정할 필요없음
      const commonUrl = this.baseURL + 'courseList' + '?serviceKey=' + this.serviceKey + '&MobileOS=' + this.Mobileos + '&MobileApp=AppTest&_type=json'

      // 세부 api별 옵션 parameter
      const pageInfo = '&numOfRows=' + this.numOfrows + '&pageNo=' + this.pageNo
      let endpointGet;

      endpointGet = axios.get(commonUrl + pageInfo)
      console.log(commonUrl + pageInfo)

      endpointGet.then(
        (res) => {
          console.log(res.data.response.body)
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

<style lang="scss" scoped>

</style>