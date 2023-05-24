<template>
  <Title>여행정보</Title>
  <div class="max-w-5xl mx-auto text-center">
    <div v-for="data in dataList" :key="data" >
      <div class="my-5 text-left">
        <h3 class="text-3xl">{{ data.title }}</h3>
        <div>{{ data.addr1 }}{{ data.addr2 }}</div>
      </div>
      <div class="my-16 flex gap-10">
        <img :src="data.firstimage" :alt="data.title" class="h-72 self-center">
        <div class="text-left">
          <h3 class="text-2xl my-6">{{ data.title }}<div v-if="data.homepage" v-html="data.homepage" class="text-base"></div></h3>
          <div v-html="data.overview" class="my-3"></div>
          <div class="mt-4 text-right">{{ data.telname }} : {{ data.tel }}</div>
        </div>
      </div>
    </div>
    <div 
      v-for="content in detailList" :key="content"
      class="text-left my-5">
      <h3 class="text-[1.3em]">{{ content.infoname }}</h3>
      <div v-html="content.infotext" class="text-gray-900 pl-4"></div>
    </div>
   <!-- infotext 가 어떤것은 \n 으로 <br> 으로 되어있어서 일괄적으로 적용하기가 어려움
      <div 
      v-for="content in detailList2" :key="content"
      class="text-left my-5">
      <h3 class="text-[1.3em]">{{ content.infoname }}</h3>
      <div v-if="typeof content.infotext == 'string'">{{ content.infotext }}</div>
      <div v-else-if="(typeof content.infotext == 'object')">
        111111
      </div>
      <div v-else v-html="content.infotext"></div>
    </div> -->
    <div class="my-12 flex gap-6">
      <div id="map" class="w-full lg:w-[1000px] h-[500px]"></div>
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
        detailList2: null,
        kakaomykey: '2c48253f67eaa4f8aa65098574b666ac',
      }
    },
    mounted() {
      this.fetchData()
    },
    methods: {
      initMap() {
        const container = document.getElementById("map");
        const options = { //지도를 생성할 때 필요한 기본 옵션
          center: new kakao.maps.LatLng(this.mapY, this.mapX),
          level: 3, //지도의 레벨(확대, 축소 정도)
        };
        //지도 객체를 등록합니다.
        //지도 객체는 반응형 관리 대상이 아니므로 initMap에서 선언합니다.
        this.map = new kakao.maps.Map(container, options);

        var markerPosition = new kakao.maps.LatLng(this.mapY, this.mapX);
        // 마커를 생성합니다
        var marker = new kakao.maps.Marker({
          position: markerPosition
        });
        // 마커가 지도 위에 표시되도록 설정합니다
        marker.setMap(this.map);

      },
      fetchData() {
        const baseURL = 'https://apis.data.go.kr/B551011/KorService1/'
        const serviceKey = 'vZqohu%2F1a1mKILW%2BslUEpMtWGBv0IvvlkE7zB28hKgPXkvzNMi9%2F2sawykKToWPc%2F%2FNeUM9rnQykkPu%2FLdPlpQ%3D%3D'

        const commonUrlDetail = baseURL + 'detailCommon1' + '?serviceKey=' + serviceKey + '&MobileOS=ETC' + '&MobileApp=AppTest&_type=json'
        const commonUrlInfo = baseURL + 'detailInfo1' + '?serviceKey=' + serviceKey + '&MobileOS=ETC' + '&MobileApp=AppTest&_type=json'

        // 세부 api별 옵션 parameter
        const contentTypeInfo = '&contentTypeId=' + this.contentTypeid
        const contentIdInfo = '&contentId=' + this.contentid
        let DetailendpointGet;
        let InfoendpoidGet;

        DetailendpointGet = axios.get(commonUrlDetail + contentTypeInfo + contentIdInfo + `&defaultYN=Y&firstImageYN=Y&areacodeYN=Y&catcodeYN=Y&addrinfoYN=Y&mapinfoYN=Y&overviewYN=Y`)
        InfoendpoidGet = axios.get(commonUrlInfo + contentTypeInfo + contentIdInfo)

        DetailendpointGet.then((res) => {
          this.dataList = res.data.response.body.items.item
          this.mapX = res.data.response.body.items.item[0].mapx
          this.mapY = res.data.response.body.items.item[0].mapy

          // 카카오맵 api
          if (window.kakao && window.kakao.maps) {
              this.initMap();
          } else {
            const script = document.createElement("script");
            /* global kakao */
            script.onload = () => kakao.maps.load(this.initMap);
            script.src =
              `//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${this.kakaomykey}`;
            document.head.appendChild(script);
          }
        }).catch((err) => {
          console.log(err)
        })
        InfoendpoidGet.then((res) => {
          this.detailList = res.data.response.body.items.item

          let detailList2 = []
          this.detailList.forEach(content => {
            let testlist
            if(content.infotext.includes(`\n`)){
              testlist = content.infotext.split(`\n`)
            } else {
              testlist = content.infotext
            }
            detailList2.push({
              infoname: content.infoname,
              infotext: testlist
            })
          });
          this.detailList2 = detailList2

        }).catch((err) => {
          console.log(err)
        })
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>