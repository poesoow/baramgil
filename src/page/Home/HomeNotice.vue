<template lang="">
  <!-- 공지 / Q&A 게시판 -->
  <div class="w-full mt-20 mx-auto p-[2%] ">
    <div class="max-w-5xl mx-auto relative">
      <div class="flex flex-nowrap justify-between">
        <h2 class="ml-[3%] mb-8 text-3xl">공지사항  
          <span class="ml-6 tracking-widest relative after:absolute after:w-[1px] after:h-[22px] after:bg-gray-900 after:-left-4 after:top-1/3 after:-translate-y-2/4">Q<span class="text-gray-400">&</span>A</span>
        </h2>
        <p class="text-lg font-light mr-[2%]">
          <router-link to="/cs/notice/list" class="block pl-3 pr-2 pb-1 pt-2">
            더 보기 +
          </router-link>
        </p>
      </div>
      <div class="max-w-5xl md:w-full md:flex md:flex-nowrap md:justify-between duration-500 transition-all">
        <div v-for="e in 3" :key="e" class="last-of-type:hidden last-of-type:xl:block xl:odd:mx-8  w-full md:w-[48%] xl:w-[30%] border border-black/30 hover:shadow-md hover:shadow-gray-400 duration-500 transition-all rounded-3xl mx-auto px-[15%] md:px-10 xl:px-[2%] py-[5%] md:py-[8%] lg:py-[7%] xl:py-[5%] mb-10 drop-shadow-xl md:h-[220px] xl:h-[180px]">
          <p class="mb-4">제목</p>
          <p class="truncate break-all">아주 그냥 입만 벌리면 그짓말이 자동으로 나와</p>
        </div>
      </div>
    </div>
  </div>
  <!-- 공지 / Q&A 게시판 -->
</template>
<script>
export default {
  name:"HomeNotice"
}
</script>
<style>
  
</style>