<template>
  <div>
    <p class="my-12 text-2xl">
      <ul class="flex gap-5 max-w-6xl mx-auto justify-center">
        <li 
          v-for="(area) in areaList" :key="area"
          @click="selectArea(area.code, area.name)"
          :class="selectAreaCode == area.code && 'bg-slate-500 text-white rounded-md'">
          {{ area.name2 }}
        </li>
      </ul>
    </p>
    <p class="text-3xl font-bold max-w-6xl mx-auto px-3 my-6"><span class="border-b">{{ selectAreaName }}</span></p>
    <p class="text-xl max-w-6xl mx-auto">
      <ul class="flex gap-4 mx-auto">
        <li 
          v-for="contentType in filterContentTypeList" :key="contentType"
          @click="selectContentType(contentType.code, contentType.name)"
          :class="selectContentTypeCode == contentType.code && 'bg-slate-500 text-white rounded-md'">
          {{ contentType.name }}
        </li>
      </ul>
    </p>
  </div>
</template>

<script>
  import { area, contentTypelist } from '@/assets/tourData.json'
  import axios from 'axios'

  export default {
    name: 'TourapiView',
    data() {
      return {
        baseURL: 'https://apis.data.go.kr/B551011/KorService1/',
        serviceKey: 'vZqohu%2F1a1mKILW%2BslUEpMtWGBv0IvvlkE7zB28hKgPXkvzNMi9%2F2sawykKToWPc%2F%2FNeUM9rnQykkPu%2FLdPlpQ%3D%3D',
        areaCode: '',
        dataList: null,
        bodyInfo: null,
        areaList: area,
        selectAreaCode: '1',
        selectAreaName: '서울',
        // (12: 관광지, 14: 문화시설, 15: 축제공연행사, 25: 여행코스, 28: 레포츠, 32: 숙박, 38: 쇼핑, 39: 음식점)
        contentTypeList: contentTypelist,
        selectContentTypeCode: null,
        selectContentTypeName: null,
        /* 공통 */
        numOfrows: 10, // 한페이지 결과 수
        pageNo: 1, // 페이지 번호
        Mobileos: 'ETC', // OS 구분 : IOS (아이폰), AND (안드로이드), WIN (윈도우폰), ETC(기타)
        listYN: 'Y', // 목록구분(Y=목록, N=개수)
        arrange: 'A', // 정렬구분 (A=제목순, C=수정일순, D=생성일순) 대표이미지가반드시있는정렬(O=제목순, Q=수정일순, R=생성일순)
        contentTypeId: '15', // 관광타입(12:관광지, 14:문화시설, 15:축제공연행사, 25:여행코스, 28:레포츠, 32:숙박, 38:쇼핑, 39:음식점)
        cateType: '', // 서비스 분류 코드

        // /* 위치기반 관광정보조회 */
        // mapX: this.userLoc.loc, // GPS X좌표(WGS84 경도좌표)
        // mapY: this.userLoc.lat, // GPS X좌표(WGS84 위도좌표)
        // radius: '1000', // 거리반경(단위:m) , Max값 20000m=20Km
      }
    },
    computed: {
      filterContentTypeList() {
        return this.contentTypeList.filter( contentType => contentType.use == 'Y' )
      }
    },
    mounted() {
      axios
        .get(`${this.baseURL}categoryCode1?serviceKey=${this.serviceKey}&MobileOS=${this.Mobileos}&MobileApp=AppTest&_type=json`)
        .then(
          (res)=>{
            console.log(res)
            this.cateList = res.data.response.body.items.item
          }
        ).catch((err)=>{
          console.log(err)
        })
    },
    methods: {
      selectArea(code, name) {
        this.selectAreaCode  = code
        this.selectAreaName  = name 
      },
      selectContentType(code, name) {
        this.selectContentTypeCode = code
        this.selectContentTypeName = name
      },
       fetchData() {
        // 세부적으로 선택한 api
        const api = this.selectAPI.api

        // 모든 api에 공통으로 들어가는 부분 수정할 필요없음
        const commonUrl = this.baseURL + api + '?serviceKey=' + this.serviceKey + '&MobileOS=' + this.Mobileos + '&MobileApp=AppTest&_type=json'

        // 세부 api별 필수 parameter
        /* 사용된 api
        locationBasedList1  위치기반 관광정보조회
        */
        const UserParamLoc = '&mapX=' + this.mapX + '&mapY=' + this.mapY + '&radius=' + this.radius
        /* 사용된 api
        searchKeyword1 키워드 검색 조회
        */
        const keywordInfo = '&keyword=' + encodeURI(this.keyword)


        // 세부 api별 옵션 parameter
        const pageInfo = '&numOfRows=' + this.numOfrows + '&pageNo=' + this.pageNo
        const listInfo = '&listYN=' + this.listYN
        const arrangeInfo = '&arrange=' + this.arrange
        const contentTypeInfo = '&contentTypeId=' + this.contentTypeId
        // const contentIdInfo = '&contentId=' + this.contentId
        // axios get 요청으로 사용할 변수 선언
        let endpointGet;

        if (this.selectAPI.api == 'locationBasedList1') {
          endpointGet = axios.get(commonUrl + pageInfo + listInfo + arrangeInfo + contentTypeInfo + UserParamLoc)
          console.log(commonUrl + pageInfo + listInfo + arrangeInfo + contentTypeInfo + UserParamLoc)
        } else if (this.selectAPI.api == 'searchKeyword1') {
          endpointGet = axios.get(commonUrl + pageInfo + listInfo + arrangeInfo + contentTypeInfo + keywordInfo)
        } else if (this.selectAPI.api == 'searchFestival1') {
          endpointGet = axios.get(commonUrl + pageInfo + listInfo + arrangeInfo + `&eventStartDate=${this.eventStartDate}`)
        } else if (this.selectAPI.api == 'searchStay1') {
          endpointGet = axios.get(commonUrl + pageInfo + listInfo + arrangeInfo)
        } else if (this.selectAPI.api == 'detailCommon1') {
          endpointGet = axios.get(commonUrl + pageInfo + contentTypeInfo + `&contentId=${this.contentId}&defaultYN=Y&firstImageYN=Y&areacodeYN=Y&catcodeYN=Y&addrinfoYN=Y&mapinfoYN=Y&overviewYN=Y`)
        } else if (this.selectAPI.api == 'detailIntro1') {
          endpointGet = axios.get(commonUrl + pageInfo + contentTypeInfo + `&contentId=${this.contentId}`)
        } else if (this.selectAPI.api == 'detailInfo1') {
          endpointGet = axios.get(commonUrl + pageInfo + contentTypeInfo + `&contentId=${this.contentId}`)
        } else if (this.selectAPI.api == 'detailImage1') {
          endpointGet = axios.get(commonUrl + pageInfo + `&contentId=${this.contentId}` + `&imageYN=Y&subImageYN=Y`)
        } else if (this.selectAPI.api == 'areaBasedSyncList1') {
          endpointGet = axios.get(commonUrl + pageInfo + `&showflag=1&areaCode=${this.areaCode}`)
        } else if (this.selectAPI.api == 'areaCode1') {
          endpointGet = axios.get(commonUrl + pageInfo + `&areaCode=${this.areaCode}`)
        } else if (this.selectAPI.api == 'categoryCode1') {
          endpointGet = axios.get(commonUrl + pageInfo + `&cat1=${this.cateType}&contentTypeId=${this.contentTypeId}`)
        } else if ((this.selectAPI.api == 'detailPetTour1') || (this.selectAPI.api == 'areaBasedList1')) {
          endpointGet = axios.get(commonUrl + pageInfo)
        }

        console.log('api', this.selectAPI.api)

        if ((this.selectAPI.api == null)) {
          console.log('api가 없다고 함')
          return false
        } else {
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
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>