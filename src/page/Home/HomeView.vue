<template>
  <HomeBanner class="md:-mt-7 lg:-mt-0"/>
  <HomeInfo />
  <HomeNotice />
  <HomeGallery />
  
</template>

<script>
import HomeBanner from '../../page/Home/HomeBanner.vue'
import HomeInfo from '../../page/Home/HomeInfo.vue'
import HomeNotice from '../../page/Home/HomeNotice.vue'
import HomeGallery from '../../page/Home/HomeGallery.vue'

export default {
  name: "HomeView",
  components: {
    
    HomeBanner,
    HomeInfo,
    HomeNotice,
    HomeGallery
  }
  

}
</script>

<style>

</style>