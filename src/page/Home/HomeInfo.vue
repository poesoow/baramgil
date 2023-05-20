<template>
  <div class="max-w-5xl">
    <div class="w-full mx-auto">
      <h2 class="mb-10 text-3xl">여행정보</h2>
      <div class="flex justify-items-center border border-black mb-10 text-center text-xl rounded-lg py-4 ">
        <p class="basis-[49%] relative after:absolute after:h-[50%] after:right-2 after:">인기</p>
        <p class="basis-[49%]">지역별</p>
      </div>
      <div class="w-full flex justify-center text-xl py-4 gap-x-[5%] ">
        <p v-for="e in Tab" :key="e" class="border border-black/30 py-[1%] px-[7%] rounded-xl ">{{ e }}</p>
      </div>
      <h1 class="text-center text-lg md:text-xl py-7">각 지역별 여행지와 맛집을 소개합니다 !!</h1>
      <div class=" border-t border-b border-black px-[2%] py-1.5 mb-4">
        <!-- 탭메뉴 -->
        <ul class="flex justify-between ml-0.5">
          <li v-for="e in TabMenu" :key="e" class="shrink-0 text-sm md:text-lg  duration-500 transition-all">{{ e }}</li>
          <!-- [li]에 라우터 링크? -->
        </ul>
      </div>
    </div>
    <div></div>
      <!-- 종류 별 뿌려지는 컨텐츠의 이미지와 간략한 정보 -->
    <div class="mx-auto p-[2%]">
      <div class="flex flex-wrap justify-between basis-[49%] ">
        <div v-for="e in 4" :key="e"
          class="h-64 border-[2px] rounded-md  basis-[24%] duration-[600] transition-all mb-7">
          <img src="https://via.placeholder.com/200x250" alt="이미지" class="mx-auto p-2 w-full h-full">
        </div>
      </div>
      <p class="text-right mr-[1%]"><button>더보기 +</button></p>
    </div>
  </div>
</template>
<script>
export default {
  name:"HomeInfo"
}
</script>
<style>
  
</style>