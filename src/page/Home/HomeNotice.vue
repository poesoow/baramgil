<template lang="">
  <!-- 공지 / Q&A 게시판 -->
  <div class="w-full mt-20 mx-auto p-[2%]">
      <div class="max-w-5xl">
        <h2 class="mb-8 text-3xl">공지사항 / 
          <span class="tracking-widest">Q<span class="text-gray-400">&</span>A</span>
        </h2>
        <div class="w-full border p-[1%] relative">
          <div class="flex ml-[3%] text-lg gap-x-8 rounded-md">
            <p class="px-[3%] py-[1%] border rounded-md cursor-pointer hover:bg-[skyblue] hover:text-white">공지사항</p>
            <p class="px-[3%] py-[1%] border rounded-md cursor-pointer hover:bg-[skyblue] hover:text-white">자주 묻는 질문</p>
          </div>
          <p class="absolute right-8 top-[50px]"><button>더 보기 +</button></p>
          <div class="flex justify-between border rounded-md w-full mt-2 p-[2%] tracking-widest text-lg md:text-xl">
            <ul class="basis-[60%]">
              <li v-for="e in Notice[0]" :key="e" class="w-full border-b mb-1.5">{{ e }}</li>
            </ul>
            <ul class="basis-[30%]">
              <li v-for="e in Notice[1]" :key="e" class="w-full border-b mb-1.5">{{ e }}</li>
            </ul>
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
<style lang="">
  
</style>