<template>
  <Title>여행정보</Title>
  <div class="max-w-5xl mx-auto text-center">
    <div v-for="data in dataList" :key="data" >
      <div class="my-5 text-left">
        <h3 class="text-3xl">{{ data.title }}</h3>
        <div>{{ data.addr1 }}{{ data.addr2 }}</div>
      </div>
      <div class="my-16 flex gap-10 h-64">
        <img :src="data.firstimage" :alt="data.title">
        <div class="text-left">
          <h3 class="text-2xl my-6">{{ data.title }}</h3>
          <div class="my-3">{{ data.overview }}</div>
          <div v-if="data.homepage" v-html="data.homepage"></div>
          <div class="mt-4 text-right">{{ data.telname }} : {{ data.tel }}</div>
        </div>
      </div>
    </div>
    <div 
      v-for="content in detailList" :key="content"
      class="text-left my-5">
      <h3 class="text-[1.3em]">{{ content.infoname }}</h3>
      <div v-html="content.infotext"></div>
    </div>
  </div>
</template>

<script>
  import Title from '@/components/TitleComp.vue'
  import axios from 'axios'

  export default {
    name: 'TourdetailView',
    components: {
      Title
    },
    data() {
      return {
        mapX: '',
        mapY: '',
        contentid: this.$route.query.contentid,
        contentTypeid: this.$route.query.contentTypeid,
        dataList: null,
        detailList: null,
      }
    },
    mounted() {


      const baseURL = 'https://apis.data.go.kr/B551011/KorService1/'
      const serviceKey = 'vZqohu%2F1a1mKILW%2BslUEpMtWGBv0IvvlkE7zB28hKgPXkvzNMi9%2F2sawykKToWPc%2F%2FNeUM9rnQykkPu%2FLdPlpQ%3D%3D'

      const commonUrlDetail = baseURL + 'detailCommon1' + '?serviceKey=' + serviceKey + '&MobileOS=ETC' + '&MobileApp=AppTest&_type=json'
      const commonUrlInfo = baseURL + 'detailInfo1' + '?serviceKey=' + serviceKey + '&MobileOS=ETC' + '&MobileApp=AppTest&_type=json'


      // detailInfo1
      // 세부 api별 필수 parameter

      // 세부 api별 옵션 parameter
      const contentTypeInfo = '&contentTypeId=' + this.contentTypeid
      const contentIdInfo = '&contentId=' + this.contentid
      // axios get 요청으로 사용할 변수 선언
      let DetailendpointGet;
      let InfoendpoidGet;

      DetailendpointGet = axios.get(commonUrlDetail + contentTypeInfo + contentIdInfo + `&defaultYN=Y&firstImageYN=Y&areacodeYN=Y&catcodeYN=Y&addrinfoYN=Y&mapinfoYN=Y&overviewYN=Y`)
      InfoendpoidGet = axios.get(commonUrlInfo + contentTypeInfo + contentIdInfo)
      
      DetailendpointGet.then(
        (res) => {
          this.dataList = res.data.response.body.items.item
          this.mapX = res.data.response.body.items.item[0].mapx
          this.mapY = res.data.response.body.items.item[0].mapy
          console.log(this.dataList)
          console.log('mapX', this.mapX, 'mapY', this.mapY)
        }
      ).catch((err) => {
        console.log(err)
      })

      InfoendpoidGet.then(
        (res) => {
          this.detailList = res.data.response.body.items.item
        }
      ).catch((err) => {
        console.log(err)
      })



    },
  }
</script>

<style lang="scss" scoped>

</style>