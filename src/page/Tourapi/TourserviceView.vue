<template>
  <Title>여행정보</Title>
  <div>
    <p class="my-12 text-2xl max-w-5xl mx-auto">
      <ul class="flex gap-4 mx-auto justify-center">
        <li v-for="contentType in filterContentTypeList" :key="contentType"
          @click="selectContentType(contentType.code, contentType.name); fetchData()"
          :class="selectContentTypeCode == contentType.code && 'bg-slate-500 text-white rounded-md'"
          >
          {{ contentType.name }}
        </li>
      </ul>
    </p>

    <p class="my-12 text-1xl">
      <ul class="flex flex-wrap gap-5 max-w-5xl mx-auto justify-center">
        <li v-for="(area) in areaList" :key="area" @click="selectArea(area.code, area.name); fetchData()"
          :class="selectAreaCode == area.code && 'bg-slate-500 text-white rounded-md'">
          <div>{{ area.name2 }}</div>
        </li>
      </ul>
    </p>
    <p class="text-3xl font-bold max-w-5xl mx-auto px-3 mt-6 flex justify-between">
      <span><span class=" text-blue-500">{{ selectAreaName }}</span><span> 인기 {{ selectContentTypeName }}</span></span>
     
    </p>

    <p class="mt-3 mb-14">
      <ul class="flex gap-[30px] flex-wrap justify-center">
        <li v-for="data in dataList" :key="data" class="md:basis-1/4">
          <router-link to="/tour/detail" @click="$store.commit('detailInfo', data)">
              <img :src="data.firstimage" :alt="data.title" class="block w-full rounded-xl h-96">
              <div>{{ data.title }}</div>
              <div>{{ simpleAddress(data.addr1) }}</div>
          </router-link>
        </li>
      </ul>
    </p>



    <div class="flex justify-center basis-full gap-3 my-24">
      <button @click="prevPage" :disabled="currentPage <= 1"><font-awesome-icon icon="angles-left" /></button>
      <button @click="goToPage(e)" v-for="e in pageCount.pagination" :key="e" class="" :class="pageNo == e && 'font-bold text-orange-500'">{{ e }}</button>
      <button @click="nextPage" :disabled="currentPage > pageCount.totalPage / block"><font-awesome-icon icon="angles-right" /></button>
    </div>
     
     
    


  </div>
</template>

<script>
import tourData from '@/assets/tourData.json'
import axios from 'axios'
import Title from '@/components/TitleComp.vue'

export default {
  name: 'TourserviceView',
  components: {
    Title
  },
  data() {
    return {
      // api axios 요청관련
      baseURL: 'https://apis.data.go.kr/B551011/KorService1/',
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
      totalCount: null,
      /* 공통 */
      numOfrows: '12', // 한페이지 결과 수
      pageNo: 1, // 페이지 번호
      Mobileos: 'ETC', // OS 구분 : IOS (아이폰), AND (안드로이드), WIN (윈도우폰), ETC(기타)
      listYN: 'Y', // 목록구분(Y=목록, N=개수)
      contentTypeId: '15', // 관광타입(12:관광지, 14:문화시설, 15:축제공연행사, 25:여행코스, 28:레포츠, 32:숙박, 38:쇼핑, 39:음식점)
      cateType: '', // 서비스 분류 코드
      // 페이지네이션
      perPage: 10,
      lastVisible: null,
      block: 10,
      currentPage: 1,
    }
  },
  computed: {
    filterContentTypeList() {
      return this.contentTypeList.filter(contentType => contentType.use == 'Y')
    },
    pageCount() {
      // 전체 페이지 수 계산 (전체 게시물 / 페이지 당 게시물 수)
      const totalPage = Math.ceil(this.totalCount / this.perPage)
      // 현재 페이지에 보여질 게시물 시작 인덱스
      const start = (this.currentPage - 1) * this.perPage
      // 현재 페이지에 보여질 게시물 마지막 인덱스
      const end = start + this.block
      const pagination = []
      for (let i = start + 1; i <= end && i <= totalPage; i++) {
        pagination.push(i)
      }
      // 만약 페이지 번호 배열이 비어있고 전체 페이지 수가 0보다 크다면 마지막 페이지 번호만 배열에 추가
      if (pagination.length === 0 && totalPage > 0) {
        pagination.push(totalPage)
      }
      return { totalPage, start, end, pagination }
    },
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    simpleAddress(addr) {
      
      if(!addr.indexOf('경기도')){
        return addr.slice(0, 8)
      }

      if (!addr.indexOf('강원도')) {
        return addr.slice(0, 7)
      }

      if (!addr.indexOf('세종특별') || !addr.indexOf('제주특별')) {
        return addr.slice(0, 7)
      }

      return addr.slice(0, 9)
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
    fetchData(e) {
      // 모든 api에 공통으로 들어가는 부분 수정할 필요없음
      const commonUrl = this.baseURL + 'areaBasedList1' + '?serviceKey=' + this.serviceKey + '&MobileOS=' + this.Mobileos + '&MobileApp=AppTest&_type=json'

      // 세부 api별 옵션 parameter
      const pageInfo = '&numOfRows=' + this.numOfrows + '&pageNo=' + this.pageNo
      const listInfo = '&listYN=' + this.listYN
      const arrangeInfo = '&arrange=' + this.selectArrange
      const contentTypeInfo = '&contentTypeId=' + this.contentTypeId
      const areaCodeInfo = '&areaCode=' + this.areaCode
      
      // 총 개수 가져오기
      // 조건문으로 아래 페이지 번호를 눌렀을 때는 코드 실행 안하도록 함
      if(!e){
        if(this.pageNo == 1){
          axios.get(commonUrl + pageInfo + '&listYN=N' + arrangeInfo + contentTypeInfo + areaCodeInfo).then((res)=>{
            this.totalCount = res.data.response.body.items.item[0].totalCnt
          })
        }
      }

      // axios get 요청으로 사용할 변수 선언
      let endpointGet;

      endpointGet = axios.get(commonUrl + pageInfo + listInfo + arrangeInfo + contentTypeInfo + areaCodeInfo)

      endpointGet.then(
        (res) => {
          // console.log(res.data.response.body)
          this.dataList = res.data.response.body.items.item
          this.bodyInfo = res.data.response.body
        }
      ).catch((err) => {
        console.log(err)
      })
    },
    calculateNumber(total, per, p, index) {
      // 현재 페이지 이전 게시물 수
      const totalPages = per * (p - 1)
      // 게시물 인덱스 계산
      const postIndex = total - (totalPages + index)
      // 계산된 게시물 인덱스가 0보다 작거나 같으면 종료 
      if (postIndex <= 0) { return }
      return postIndex
    },
    goToPage(e) {
      this.pageNo = e
      this.fetchData(e)
    },
    prevPage() {
      this.currentPage = this.currentPage - 1
      this.pageNo = this.pageCount.pagination[0]
      this.fetchData(this.pageNo)
    },
    nextPage() {

      // 현재 블록 페이지 번호를 1 증감 시킴
      this.currentPage = this.currentPage + 1
      // 배열에 추가된 첫번째 번호 페이지 이동
      this.pageNo = this.pageCount.pagination[0]
      /* // 위코드 대신 아래 코드로 사용하면 한페이지씩 다음이동 됨
      this.page++ */
      // 이동된 페이지의 게시글을 다시 호출
      this.fetchData(this.pageNo)
    }
  },
}
</script>

<style lang="scss" scoped></style>