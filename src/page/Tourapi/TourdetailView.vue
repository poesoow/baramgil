<template>
  <div>
    {{ data }}
  </div>
</template>

<script>
  export default {
    name: 'TourdetailView',
    data() {
      return {
        data: this.$store.state.data
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>