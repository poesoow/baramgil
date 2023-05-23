<template>
  <!-- 햄버거 아이콘 -->
  <font-awesome-icon icon="bars"
  class=" lg:hidden cursor-pointer h-8 fixed right-2 top-7 md:top-14 z-50"
  @click="btnMenu == true ? btnMenu = false : btnMenu = true" />
  <!-- 햄버거 아이콘 -->

  <!-- 전체 네비게이션 시작 -->
  <div class="w-full h-full z-10 lg:sticky top-0 bg-white/80  duration-300 transition-all">
    <!-- @click="btnMenu == true ? btnMenu = false : btnMenu = true" -->
    <div class="max-w-5xl mx-auto">
      <div class="w-full  mr-[2%] flex justify-end ">
        <!-- 사이트 로고 -->
        <router-link to="" class="mx-auto sm:mx-0 md:hidden">
          <img src="https://via.placeholder.com/200x60" alt="사이트 로고"
          class="pt-4 sm:-ml-[95%] md:ml-[60%] duration-300 transition-all ">
        </router-link>
        <!-- 네비게이션 Lnb -->
        <div class="md:ml-[30%] lg:mr-[2%] absolute top-[65px] left-[3%] md:top-0 md:static duration-500 transition-all py-4 mt-4">
          <ul class="flex gap-x-10 pb-3 pr-2  ">
            <li v-if="logIn == false" class="hover:underline hover:underline-offset-4 font-semibold relative">로그인
            </li>
            <li v-if="logIn == false" class="hover:underline hover:underline-offset-4 font-semibold">회원가입</li>
            <li v-if="logIn == true" class="hover:underline hover:underline-offset-4 font-semibold">마이 페이지</li>
            <li v-if="logIn == true" class="hover:underline hover:underline-offset-4 font-semibold">로그 아웃</li>
          </ul>
        </div>
      </div>

      <!-- 네비게이션 Gnb -->
      <div class="w-full flex justify-between sm:mt-10 md:mt-0 lg:mt-0 duration-300 transition-all mt-4">
        <router-link to="/" class="hidden md:block duration-700 transition-all md:-mt-1 pl-4">
          <img src="http://via.placeholder.com/200x70" alt="로고" title="로고 이미지" class="-mt-5">
        </router-link>
        <div class="max-w-3xl mx-auto md:mr-[20%] lg:mr-[5%] lg:pr-0">
          <div class="text-center w-full md:mb-8">
            <!-- 검색상자 + 돋보기 icon 모바일 화면 -->
            <div class="lg:hidden w-[70%] flex justify-between relative -mt-6 my-10 ml-[5.5%] sm:ml-[20%] md:ml-20 lg:ml-0 md:-mt-0 duration-500 transition-all ">
              <input type="text" 
              class="basis-full border-b border-black pl-2 py-1 h-7 outline-none ml-5 md:ml-0 text-lg bg-white bg-opacity-0 duration-500 transition-all">
              <font-awesome-icon icon="search" class="absolute -right-16 bottom-1.5 md:right-2 text-[20px]  cursor-pointer"/>
            </div>
            <!-- 오버시 서브 메뉴 -->
            <ul class="hidden md:flex justify-center gap-x-16 sm:gap-x-4 font-bold text-xl md:gap-x-16 w-full mt-10 lg:mt-0 md:mt-14 sm:mt-10 duration-500 transition-all">
              <li class="sm:px-10 md:px-0 transition-all duration-500 text-xl leading-9 shrink-0"
                v-for="(e, index) in Gnb" :key="e" :class="SubMenuIndex == index"
                @mouseout="SubMenuIndex = null"
                @mouseover="SubMenuIndex = index; Subfunction(index)">
                <router-link :to="SubMenuLink[index].link">{{ e }}</router-link>
                <!-- ul 태그 rounded-br-2xl rounded-bl-2xl -->
                <ul class="absolute h-0 overflow-hidden z-20 mt-[1px] -ml-[9px] rounded-b-md bg-white transition-all duration-700  opacity-80 sub_list" :style="SubMenuIndex == index && isSubMenu">
                <template v-for="(el, index2) in SubList[index]" :key="index2">
                  <!-- 오버시 나타나는 submenu li들 -->
                    <li v-if="true" class="text-[15px] text-center first-of-type:mt-0 mt-3 px-1 py-0.5 w-24 hover:bg-purple-500 hover:text-white text-lg">
                      <!-- h-0 overflow-hidden -->
                    <router-link :to="SubMenuLink[index].sublink[index2]">{{ el }}</router-link>
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
            class="border-b border-black pl-2 sm:mt-1 lg:mt-[2px] py-1  h-7 outline-none focus:outline- text-lg  bg-white bg-opacity-0 duration-500 transition-all">
            <font-awesome-icon icon="search" class="mr-7 ml-1 pt-1 sm:text-lg lg:border-none sm:rounded-full sm:border opacity-80 sm:border-black sm:px-[4.5px] sm:py-[4.5px] cursor-pointer lg:-ml-7 lg:text-xl duration-500 transition-all"/>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- 모바일 버튼 클릭 시 사이드 메뉴-->
  <!-- @mouseover="SubMenu = true ? SubMenu = true : SubMenu = false" -->
  <div class="h-full lg:hidden fixed w-60 -right-60 top-0 p-10 bg-purple-200 duration-500 transition-all z-40"  :class="btnMenu && '!right-0'">
    <div class="mt-10 h-[250px] ml-9">
      <ul class="lg:hidden w-full mt-10 lg:mt-0 md:mt-14 sm:mt-10 duration-500 transition-all text-center">
        <li class="-tracking-widest transition-all duration-500 text-xl leading-9 mt-5"
          v-for="(e, index) in Gnb" :key="e" :class="SubMenuIndex2 == index"
          @mouseout="SubMenuIndex2 = null"
          @mouseover="SubMenuIndex2 = index; Subfunction2(index)">
          <router-link :to="SubMenuLink[index].link">{{ e }}</router-link>
          <!-- 서브메뉴 ul 리스트 -->
          <ul class="h-0 overflow-hidden mt-3 ml-[3px] rounded-b-md transition-all duration-700 m_sub_list" :style="SubMenuIndex == index && isSubMenu">
            <template v-for="(el, index2) in SubList[index]" :key="index2">
            <!-- 오버시 나타나는 submenu li들 -->
              <li v-if="true" class="text-[15px] text-center first-of-type:mt-0 mt-3 px-1 py-0.5 w-full text-lg">
                <!-- h-0 overflow-hidden -->
                <router-link :to="SubMenuLink[index].sublink[index2]">{{ el }}</router-link>
              </li>
            </template>
          </ul>
        </li>
      </ul>
    </div>
  </div>
  <!-- <ul class="pt-2 text-center absolute tracking-wider">
    <li v-for="(e, index) in Gnb" :key="e" class="mb-5 cursor-pointer"
     @click="SubMenuIndex = index; Subfunction(index)"
     @mouseover="SubMenuIndex = index; Subfunction(index)"
     @mouseout="SubMenuIndex = null ">{{ e }}
     <template v-for="(e, i) in SubList" :key="e">
      <ul v-if="index === i" class="h-0 overflow-hidden mt-2 rounded-b-md text-center duration-500 transition-all sub_list" :style="((SubMenuIndex === index) && (index == 1 || index == 3)) && 'height:90px'">
        <li v-for="el in e" :key="el" class="mb-3 last-of-type:mb-0 py-1 hover:bg-orange-500 hover:text-white duration-500 transition-all rounded-md">{{ el }}</li>
        </ul>
      </template>
    </li>
  </ul> -->
  <!-- 모바일 메뉴-->
</template>
<script>
import Gnb from '@/assets/NavData.json'
export default {
  name: "NavComp",
  data() {
    return {
      SubMenuIndex2: null,
      SubMenuLink2: Gnb.MenuLink,
      isSubMenu2: '',
      windowWidth:0,
      SubMenuIndex: null,
      Gnb: Gnb.Gnb,
      SubList: Gnb.Lnb,
      SubMenu:false,
      btnMenu: true,
      isSubMenu: '',
      logIn: false,
      SubMenuLink: Gnb.MenuLink

    }
  },
  methods:{
    updateWindowWidth(){
      this.windowWidth = window.innerWidth;
    },
    Subfunction(e){
      if(e != 0){
          const list = document.querySelectorAll(".sub_list")[e];
          console.log(list)
          const length = list.querySelectorAll("li").length;
          // console.log(length)
          this.isSubMenu = `height:${length*40}px`
          // 52 = 각각의 li들의 세로 길이 값

            if(list.style.height === '0px'){
              list.style.height = '90px';
              // 220px 모바일 해상도 - 사이드 메뉴의 ul 높이값
            }else{
              list.style.height = '0px';
            }
        }
    },
    Subfunction2(e){
      if(e != 0){
          const list = document.querySelectorAll(".m_sub_list")[e];
          console.log(list)
          const length = list.querySelectorAll("li").length;
          // console.log(length)
          this.isSubMenu = `height:${length*40}px`
          // 52 = 각각의 li들의 세로 길이 값

            if(list.style.height === '0px'){
              list.style.height = '90px';
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