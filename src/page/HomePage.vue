<template>
  <Nav />
  <HomeComp />
  <Footer />
</template>
<script>
import Nav from '@/components/NavComp.vue'
import HomeComp from '@/page/Home/HomeComp.vue'
import Footer from '@/components/FooterComp.vue'
export default {
  name: "HomePage",
  components:{
    Nav,
    HomeComp,
    Footer
  }
}
</script>
<style>
  
</style>