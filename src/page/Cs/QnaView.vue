<template lang="">
  <!-- <div class="py-24 text-center basis-full">
    <h3 class="text-3xl font-bold mb-5 relative after:absolute after:w-8 after:h-0.5 after:bg-slate-800 after:-bottom-2 after:left-2/4 after:-translate-x-2/4">{{ title[1] }}</h3>
    <p class="text-gray-400">{{ desc[1] }}</p>
  </div> -->
  <div class="w-full">
    <div class="max-w-5xl mx-auto">
      <!-- <div class="w-full h-[427px] mr-1.5 flex items-center flex-col justify-center gap-y-[13px]">
        <p class="text-6xl tracking-[10%]">바람길</p>
        <p class="text-3xl -tracking-[5%]">질문게시판</p>
      </div> -->
      <Title>
        바람길
        <template #subTitle>질문게시판</template>
      </Title>
    </div>
  </div>
  <router-view></router-view>
</template>
<script>
import Title from '@/components/TitleComp.vue'

export default {
  name: 'QnaView',
  components: {
    Title
  },
  // props:{
  //   title: Array,
  //   desc: Array
  // },
}
</script>
<style lang="">

</style>