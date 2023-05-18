<template lang="">
  <div class="w-full px-[5%]">
    <div class="xl:w-full h-[389px] flex items-center flex-col justify-center gap-y-[13px]">
      <p class="text-6xl tracking-[10%]">바람길</p>
      <p class="text-3xl -tracking-[5%]">공지사항</p>
    </div>
    <div class="w-full">
      <div class="xl:w-full h-11 mx-1.5 box-border flex justify-end gap-x-[15px]">
        <input type="text" placeholder="검색어를 입력하세요" class="w-[271px] h-full py-[9px] pl-2 border border-[#555555] box-border rounded-[10px]">
        <button class="w-[72px] h-full border rounded-[10px] text-center bg-[#d9d9d9] shadow">버튼</button>
      </div>
    </div>
  </div>
  <!-- <div class="py-24 text-center basis-full">
    <h3 class="text-3xl font-bold mb-5 relative after:absolute after:w-8 after:h-0.5 after:bg-slate-800 after:-bottom-2 after:left-2/4 after:-translate-x-2/4">{{ title[0] }}</h3>
    <p class="text-gray-400">{{ desc[0] }}</p>
  </div> -->
  <router-view></router-view>
</template>
<script>

export default {
  name: 'NoticeView',
  // props:{
  //   title: Array,
  //   desc: Array,
  // },
}
</script>
<style lang="">
  
</style>