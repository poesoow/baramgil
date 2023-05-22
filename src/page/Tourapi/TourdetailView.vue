<template>
  <div>
    <h3>{{ data.title }}</h3>
    <div>{{ data.addr1 }}{{ data.addr2 }}</div>
    <div>{{ data.tel }}</div>
    <img :src="data.firstimage" :alt="data.title">
  </div>
</template>

<script>
  export default {
    name: 'TourdetailView',
    data() {
      return {
        data: this.$store.state.data,
        mapX: this.$store.state.data.mapx,
        mapY: this.$store.state.data.mapy,
        contentid: this.$store.state.data.contentid,

      }
    },
    mounted() {
      
    },
  }
</script>

<style lang="scss" scoped>

</style>