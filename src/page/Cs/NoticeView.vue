<template lang="">
  <div class="w-full">
    <div class="max-w-5xl mx-auto">
      <!-- <div class="w-full h-[389px] flex items-center flex-col justify-center gap-y-[13px]">
        <p class="text-6xl tracking-[10%]">바람길</p>
        <p class="text-3xl -tracking-[5%]">공지사항</p>
      </div> -->
      <Title>
        바람길
        <template #subTitle>공지사항</template>
      </Title>
    </div>
  </div>
  <!-- <div class="py-24 text-center basis-full">
    <h3 class="text-3xl font-bold mb-5 relative after:absolute after:w-8 after:h-0.5 after:bg-slate-800 after:-bottom-2 after:left-2/4 after:-translate-x-2/4">{{ title[0] }}</h3>
    <p class="text-gray-400">{{ desc[0] }}</p>
  </div> -->
  <router-view></router-view>
</template>
<script>
import Title from '@/components/TitleComp.vue'

export default {
  name: 'NoticeView',
  // props:{
  //   title: Array,
  //   desc: Array,
  // },
  components: {
    Title,
  }
}
</script>
<style lang="">
  
</style>