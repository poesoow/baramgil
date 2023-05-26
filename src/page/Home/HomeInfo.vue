<template>
  <div class="w-full p-[2%] mt-20">
    <div class="max-w-5xl mx-auto">
      <div class="w-full mx-auto">
        <h2 class="mb-10 ml-[1%] text-3xl">여행정보</h2>
        <div class="flex justify-items-center border border-black mb-10 text-center text-xl rounded-lg py-4 ">
          <p class="basis-[49%] cursor-pointer"><router-link to="/tour/info" class="block h-full">대표 여행지</router-link></p>
          <p class="basis-[49%] relative after:absolute after:w-[1px] after:h-[32px] after:bg-gray-900 after:left-0 after:top-2/4 after:-translate-y-2/4 cursor-pointer"><router-link to="/tour/course" class="block h-full">지역 추천 코스</router-link></p>
        </div>
        <div class="w-full flex justify-center text-xl py-4 gap-x-[5%]">
          <p v-for="e in Tab" :key="e" class="border border-black/30 py-[1%] px-[7%] rounded-xl cursor-pointer hover:bg-black hover:text-white shrink-0">{{ e }}</p>
        </div>
        <h1 class="text-center text-lg md:text-xl py-7">각 지역별 여행지와 맛집을 소개합니다 !!</h1>
        <div class=" border-t border-b border-black px-[2%] py-1.5 mb-4">
          <!-- 탭메뉴 -->
          <ul class="flex justify-between ml-0.5">
            <li @click="selectAreaCode = e.code; selectAreaName = e.name; fetchData()" v-for="e in data.area" :key="e" 
              :class="e.name == selectAreaName && 'bg-[#B799FF] px-1 text-white rounded-md'"
              class="shrink-0 text-sm md:text-lg  duration-500 transition-all cursor-pointer">{{ e.name2 }}</li>
          </ul>
        </div>
      </div>
      <div class="mx-auto p-[2%] border">
        <div class="flex flex-nowrap justify-between basis-full">
          <div v-for="(e) in dataList" :key="e"
            class="h-64 mb-7 rounded-md duration-[600] transition-all basis-[50%] last-of-type:hidden last-of-type:xl:block odd:basis-[25%] first-of-type:basis-[25%] 
            xl:basis-[24%] xl:first-of-type:basis-[24%] xl:last-of-type:basis-[24%] xl:odd:basis-[24%]">
            <router-link :to="{ name: 'TourdetailView', query: { contentid: e.contentid, contentTypeid: e.contenttypeid } }">
              <img :src="e.firstimage" :alt="e.title" class="mx-auto p-2 w-full h-full">
            </router-link>
          </div>
        </div>
        <p class="text-right mr-[1%]"><router-link to="/tour" class="block h-full pl-3 pr-2 pb-2 pt-3 text-xl">더보기 +</router-link></p>
      </div>
    </div>
  </div>
</template>
<script>
import Tab from '../../assets/HomeView.json'
import area from '../../assets/tourData.json'
import axios from 'axios'
export default {
  name:"HomeInfo",
  data() {
    return {
      TabMenu: Tab.TabSub,
      data: area,
      areaCode: '',
      baseURL: 'https://apis.data.go.kr/B551011/KorService1/',
      serviceKey: 'vZqohu%2F1a1mKILW%2BslUEpMtWGBv0IvvlkE7zB28hKgPXkvzNMi9%2F2sawykKToWPc%2F%2FNeUM9rnQykkPu%2FLdPlpQ%3D%3D',
      dataList: null,
      bodyInfo: null,
      selectAreaCode: '',
      selectAreaName: '',
      // (12: 관광지, 14: 문화시설, 15: 축제공연행사, 25: 여행코스, 28: 레포츠, 32: 숙박, 38: 쇼핑, 39: 음식점)
      selectContentTypeCode: '15',
      selectContentTypeName: '축제공연행사',
      arrange: 'R', 
      selectArrange: 'R', // 정렬구분 (A=제목순, C=수정일순, D=생성일순) 대표이미지가반드시있는정렬(O=제목순, Q=수정일순, R=생성일순)
      /* 공통 */
      Mobileos: 'ETC', // OS 구분 : IOS (아이폰), AND (안드로이드), WIN (윈도우폰), ETC(기타)
      contentTypeId: '', // 관광타입(12:관광지, 14:문화시설, 15:축제공연행사, 25:여행코스, 28:레포츠, 32:숙박, 38:쇼핑, 39:음식점)
      cateType: '', // 서비스 분류 코드
    }
  },
  mounted() {
    this.fetchData()
  },
  methods:{
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
      const commonUrl = this.baseURL + 'areaBasedList1' + '?serviceKey=' + this.serviceKey + '&MobileOS=' + this.Mobileos + '&MobileApp=AppTest&_type=json'

      // 세부 api별 옵션 parameter
      const contentTypeInfo = '&contentTypeId=' + this.selectContentTypeCode
      const areaCodeInfo = '&areaCode=' + this.selectAreaCode
      const arrangeInfo = '&arrange=' + this.selectArrange      
      // 총 개수 가져오기
      // 조건문으로 아래 페이지 번호를 눌렀을 때는 코드 실행 안하도록 함
      
      let travelInfo;
      travelInfo = axios.get(commonUrl + contentTypeInfo + areaCodeInfo + arrangeInfo + `&numOfRows=4`)
      travelInfo.then(
        (res) => {
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
<style>
  
</style>