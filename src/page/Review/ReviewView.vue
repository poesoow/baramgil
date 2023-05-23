<template lang="">
  <div class="w-full">
    <div class="max-w-5xl mx-auto">
      <!-- <div class="w-full h-[389px] flex items-center flex-col justify-center gap-y-[13px]">
        <p class="text-6xl tracking-[10%]">바람길</p>
        <p class="text-3xl -tracking-[5%]">여행후기</p>
      </div> -->
      <Title>
        바람길
        <template #subTitle>여행후기</template>
      </Title>
    </div>
  </div>
  <router-view></router-view>
</template>
<script>
import Title from '@/components/TitleComp.vue'

export default {
  name: 'ReviewView',
  components: {
    Title,
  }
}
</script>
<style lang="">
  
</style>