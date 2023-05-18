<template>
  <Nav />
  <router-view/>
  <Footer />
</template>

<script>
  import Nav from '@/components/NavComp.vue'
  import Footer from '@/components/FooterComp.vue'

  export default{
    name: 'App',
    components: {
    Nav,
    Footer
  }
  }
</script>