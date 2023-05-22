<template>
  <div class="w-full p-[2%] mt-20">
    <div class="max-w-5xl mx-auto">
      <div class="w-full mx-auto">
        <h2 class="mb-10 ml-[1%] text-3xl">여행정보</h2>
        <div class="flex justify-items-center border border-black mb-10 text-center text-xl rounded-lg py-4 ">
          <p class="basis-[49%] cursor-pointer">인기</p>
          <p class="basis-[49%] relative after:absolute after:w-[1px] after:h-[32px] after:bg-gray-900 after:left-0 after:top-2/4 after:-translate-y-2/4 cursor-pointer">지역별</p>
        </div>
        <div class="w-full flex justify-center text-xl py-4 gap-x-[5%]">
          <p v-for="e in Tab" :key="e" class="border border-black/30 py-[1%] px-[7%] rounded-xl cursor-pointer hover:bg-black hover:text-white">{{ e }}</p>
        </div>
        <h1 class="text-center text-lg md:text-xl py-7">각 지역별 여행지와 맛집을 소개합니다 !!</h1>
        <div class=" border-t border-b border-black px-[2%] py-1.5 mb-4">
          <!-- 탭메뉴 -->
          <ul class="flex justify-between ml-0.5">
            <li v-for="e in TabMenu" :key="e" class="shrink-0 text-sm md:text-lg  duration-500 transition-all cursor-pointer">{{ e }}</li>
            <!-- [li]에 라우터 링크? -->
          </ul>
        </div>
      </div>
        <!-- 종류 별 뿌려지는 컨텐츠의 이미지와 간략한 정보 -->
      <div class="mx-auto p-[2%] border">
        <div class="flex flex-nowrap justify-between basis-full">
          <div v-for="(e, index) in 4" :key="e"
            class="h-64 mb-7 rounded-md duration-[600] transition-all basis-[50%] last-of-type:hidden last-of-type:xl:block odd:basis-[25%] first-of-type:basis-[25%] 
            xl:basis-[24%] xl:first-of-type:basis-[24%] xl:last-of-type:basis-[24%] xl:odd:basis-[24%]">
            <img :src="require(`../../assets/images/travelInfo/info${index+1}.gif`)" alt="이미지" class="mx-auto p-2 w-full h-full ">
          </div>
        </div>
        <p class="text-right mr-[1%]"><button>더보기 +</button></p>
      </div>
    </div>
  </div>
</template>
<script>
import Tab from '../../assets/HomeView.json'
export default {
  name:"HomeInfo",
  data() {
    return {
      TabMenu: Tab.TabSub
    }
  },
}
</script>
<style>
  
</style>