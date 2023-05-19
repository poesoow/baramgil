<template>
  <!-- 햄버거 아이콘 -->
  <font-awesome-icon icon="bars"
  class="lg:hidden cursor-pointer h-8 fixed right-7 top-10 md:top-[90px] z-50"
  @click="btnMenu == true ? btnMenu = false : btnMenu = true" />
  <!-- 햄버거 아이콘 -->

  <!-- 전체 네비게이션 시작 -->
  <div class="w-full min-w-[640px] h-28 z-10 lg:sticky top-0 bg-white/80 lg:mb-0 sm:mb-44 md:mb-38 mb-32 duration-300 transition-all">

    <!-- @click="btnMenu == true ? btnMenu = false : btnMenu = true" -->
    <div class="max-w-7xl min-w-[640px] mx-auto ">
      <div class="w-full  mr-[2%] flex justify-end ">
        <!-- 사이트 로고 -->
        <a href="" class="lg:hidden"><img src="https://via.placeholder.com/200x60" alt="사이트 로고"
          class="pt-4 sm:-ml-[95%] md:ml-[70%]  duration-300 transition-all">
        </a>
        <!-- 네비게이션 Lnb -->
        <div class="md:ml-[30%] lg:mr-[2%] sm:absolute top-[65px] left-[3%] md:top-0 md:static duration-500 transition-all">
          <ul class="flex text-xl gap-x-7 pt-5 pr-2  ">
            <li v-if="logIn == false" class="hover:underline hover:underline-offset-4 font-semibold">로그인</li>
            <li v-if="logIn == false" class="hover:underline hover:underline-offset-4 font-semibold">회원가입</li>
            <li v-if="logIn == true" class="hover:underline hover:underline-offset-4 font-semibold">마이 페이지</li>
            <li v-if="logIn == true" class="hover:underline hover:underline-offset-4 font-semibold">로그 아웃</li>
          </ul>
        </div>
        <!-- <div class="w-full mr-[2%] flex justify-end ">
          <a href="" class="lg:hidden"><img src="https://via.placeholder.com/120x30" alt="사이트 로고"
            class="pt-4 sm:ml-[85%] md:ml-[60%] duration-300 transition-all">
          </a>
          <div class="ml-[30%]">
            <ul class="flex text-xl gap-x-7 pt-5 pr-2 justify-end">
              <li v-if="logIn == false" class="hover:underline hover:underline-offset-4 font-semibold">로그인</li>
              <li v-if="logIn == false" class="hover:underline hover:underline-offset-4 font-semibold">회원가입</li>
              <li v-if="logIn == true" class="hover:underline hover:underline-offset-4 font-semibold">마이 페이지</li>
              <li v-if="logIn == true" class="hover:underline hover:underline-offset-4 font-semibold">로그 아웃</li>
            </ul>
          </div>
        </div> -->
      </div>

      <!-- 네비게이션 Gnb -->
      <div class="w-full flex justify-between sm:mt-10 lg:mt-0 duration-300 transition-all">
        <a href="" class="hidden md:block duration-700 transition-all border -mt-1">
          <img src="http://via.placeholder.com/170x50" alt="로고" title="로고 이미지" class="hidden lg:block">
        </a>
        <div class="max-w-3xl mx-auto ">
          <div class="text-center w-full">
            <!-- 검색상자 + 돋보기 icon 모바일 화면 -->
            <div class="lg:hidden flex justify-between relative sm:ml-[20%] w-[70%] md:mb-20 md:mt-3">
              <input type="text" class="basis-full border-b border-black pl-2 py-1 h-7 focus:outline-none ml-8 text-lg bg-white bg-opacity-0 duration-500 transition-all">
              <font-awesome-icon icon="search" class="absolute -right-10 sm:right-0 text-[14px] border border-black px-[4.5px] py-[4.5px] rounded-full"/>
            </div>
            <!-- 오버시 서브 메뉴 -->
            <ul class="flex justify-center gap-x-7 ml-[6%] font-bold text-xl md:gap-x-16 w-full mt-10 lg:mt-0 md:mt-14 sm:mt-20 duration-500 transition-all">
              <li class="sm:w-34 sm:px-10 md:px-0 transition-all duration-500 text-xl leading-9 "
                v-for="(e, index) in Gnb" :key="e" :class="SubMenuIndex == index"
                @mouseout="SubMenuIndex = null"
                @mouseover="SubMenuIndex = index; Subfunction(index)">
                <a href="#">{{ e }}</a>
                <!-- ul 태그 rounded-br-2xl rounded-bl-2xl -->
                <ul class="absolute z-20 mt-[4.4px] ml-[2%] rounded-b-md bg-white transition-all duration-700 h-0 overflow-hidden opacity-80" :style="SubMenuIndex == index && isSubMenu">
                <template v-for="el in SubList[index-2]" :key="el">
                  <!-- 오버시 나타나는 submenu li들 -->
                    <li v-if="index != 0" class="text-[15px] text-center first-of-type:mt-0 mt-3 px-1 py-0.5 w-24 rounded-md hover:bg-purple-500 hover:text-white text-lg">
                    <!-- li들의 너비/높이 값은 아래 메소드 - Subfunction에서 조정.
                        주의! - html과 스트립트 쪽의 높이 값이 서로 다르면 같은 요소를
                        연속 클릭 시 높이 값이 다르게 표현됨 -->
                    {{ el }}
                    </li>
                  </template>
                </ul>
              </li>
            </ul>
          </div>
        </div>
        <!-- 태블릿부터 나타나는 검색상자 -->
        <div class="mt-1 hidden lg:block">
          <div class="flex justify-between">
            <input type="text"
            class="border-b border-black pl-2 sm:mt-1 lg:mt-[2px] py-1  h-7 focus:outline-none text-lg  bg-white bg-opacity-0 duration-500 transition-all">
            <font-awesome-icon icon="search" class="mr-7 ml-1 pt-1 sm:text-lg lg:border-none sm:rounded-full sm:border opacity-80 sm:border-black sm:px-[4.5px] sm:py-[4.5px] cursor-pointer lg:-ml-7 lg:text-xl duration-500 transition-all"/>
          </div>
        </div>
        <!-- sm:hidden lg:block 모바일화면에서 영역 유지여부 -->
        <!-- <div class="mr-[2%] sm:absolute sm:right-0 lg:static">
          <ul class="flex justify-between text-xl gap-x-7 pt-5 pr-2">
            <li v-if="logIn == false" class="hover:underline hover:underline-offset-2 font-semibold">로그인</li>
            <li v-if="logIn == false" class="hover:underline hover:underline-offset-2 font-semibold">회원가입</li>
            <li v-if="logIn == true" class="hover:underline hover:underline-offset-2 font-semibold">로그아웃</li>
            <li v-if="logIn == true" class="hover:underline hover:underline-offset-2 font-semibold">회원정보 수정</li>
          </ul>
        </div> -->
      </div>
    </div>
  </div>

  <!-- 모바일 버튼 클릭 시 사이드 메뉴-->
  <!-- @mouseover="SubMenu = true ? SubMenu = true : SubMenu = false" -->
  <div class="h-full lg:hidden fixed w-60 -right-60 top-0 p-10 bg-slate-400 duration-500 transition-all z-40" v-if="!isMobile" :class="btnMenu && '!right-0'">
    <div class="mt-10 h-[250px] ml-8">
      <ul class="pt-2 text-center absolute tracking-wider">
        <li v-for="(e, index) in Gnb" :key="e" class="mb-5 cursor-pointer"
         @click="SubMenuIndex = index; Subfunction(index)"
         @mouseover="SubMenuIndex = index; Subfunction(index)"
         @mouseout="SubMenuIndex = null ">{{ e }}
         <!-- @mouseout="SubMenu = false ? SubMenu = true : SubMenu = false" -->
         <template v-for="(e, i) in SubList" :key="e">
          <!-- 클릭 시 나오는 서브 메뉴들, [ul태그 높이값]추가 조정 필요 -->
          <ul v-if="index === i+1" class="h-0 overflow-hidden mt-2 text-center duration-500 transition-all sub_list" :style="SubMenuIndex === index && 'height:270px'">
            <li v-for="el in e" :key="el" class="mb-3 last-of-type:mb-0 py-1 hover:bg-orange-500 hover:text-white duration-500 transition-all rounded-md">{{ el }}</li>
            </ul>
          </template>
        </li>
      </ul>
    </div>
    <div class="mt-52 -ml-5 border border-black p-[1%] font-semibold">
      <!-- 텍스트 영역 -->
      <div class="">
        <p v-for="e in 5" :key="e">텍스트 내용</p>
      </div>
      <!-- img 소스에 require / 로컬 파일 가져오기 -->
      <p><img src="" alt="로고이미지?"></p>
    </div>
  </div>
  <!-- 모바일 메뉴-->
</template>
<script>
import Gnb from '@/assets/NavData.json'
export default {
  name: "NavComp",
  data() {
    return {
      windowWidth:0,
      SubMenuIndex: null,
      Gnb: Gnb.Gnb,
      SubList: Gnb.Lnb,
      SubMenu:false,
      btnMenu: false,
      isSubMenu: '',
      logIn: false
    }
  },
  methods:{
    updateWindowWidth(){
      this.windowWidth = window.innerWidth;
    },
    Subfunction(e){
      if(e != 0){
          const list = document.querySelectorAll(".sub_list")[e-1];
          const length = list.querySelectorAll("li").length;
          // console.log(length)
          this.isSubMenu = `height:${length*40}px`
          // 52 = 각각의 li들의 세로 길이 값

            if(list.style.height === '0px'){
              list.style.height = '270px';
              // 220px 모바일 해상도 - 사이드 메뉴의 ul 높이값
            }else{
              list.style.height = '0px';
            }
        }
    }
  },
  // computed:{
  //   isMobile(){
  //     return this.windowWidth <= 1024
  //   }
  // },
  // mounted(){
  //   this.updateWindowWidth();
  //   window.addEventListener('resize', this.updateWindowWidth);
  //   }
}

</script>
<style>

</style>