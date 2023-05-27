<template>
  <!-- 햄버거 아이콘 -->
  <font-awesome-icon icon="bars"
  class="lg:hidden cursor-pointer h-7 sm:h-8 fixed right-2 sm:right-8 top-20 sm:top-[40px] md:top-[60px] z-50 px-2 py-1.5 rounded-full hover:bg-purple-500 hover:text-white duration-50 transition-all"
  @click="btnMenu == true ? btnMenu = false : btnMenu = true" />
  <!-- 햄버거 아이콘 -->


  <!-- 전체 네비게이션 시작 -->
  <div class="w-full h-full z-10 lg:sticky top-0 bg-white"
    :class="!scroll && ' pt-[50px]'">
    <div class="max-w-5xl mx-auto   duration-300 transition-all">
      <div class="mr-[2%] flex justify-end">
        <!-- 사이트 로고 -->
        <router-link to="/" class="block mx-auto ml-[44%] sm:ml-[46%] md:hidden ">
          <img :src="require(`../assets/images/logo.png`)" alt="사이트 로고"
          class="block w-[200px] h-[90px] -ml-[25%] sm:-ml-[11%] mt-4 duration-300 transition-all">
        </router-link>
        <!-- 사이트 로고 -->

        <!-- 네비게이션 Lnb -->
         <div v-show="scroll" class="md:ml-[30%] lg:mr-[2%] absolute top-[65px] left-[3%] md:top-0 md:static duration-500 transition-all py-4 mt-4">
              <ul class="flex gap-x-10 pb-3 pr-2  ">
                <li v-if="!$store.state.loginChk" class="hover:underline hover:underline-offset-4 font-semibold relative">
                  <router-link to="/login" class="h-full block"><font-awesome-icon icon="lock" /> 로그인</router-link>
                </li>
                <li v-else @click="logOut()" class="hover:underline hover:underline-offset-4 font-semibold relative">
                  <router-link to="/" class="h-full block"><font-awesome-icon icon="arrow-right-from-bracket" /> 로그아웃</router-link>
                </li>
                <li v-if="!$store.state.loginChk" class="hover:underline hover:underline-offset-4 font-semibold">
                  <router-link to="/signup"  class="h-full block"><font-awesome-icon icon="user" /> 회원가입</router-link>
                </li>
                <li v-else class="hover:underline hover:underline-offset-4 font-semibold cursor-pointer">
                  <router-link to="/member" class="h-full block"><font-awesome-icon icon="user-gear" /> 마이 페이지</router-link>
                </li>
              </ul>
            </div>
        <!-- <div class="py-4 mt-4">
          글자크기
          <span>+</span><span>-</span>
        </div> -->
      </div>

      <!-- 네비게이션 Gnb -->
      <div class="w-full flex justify-between sm:mt-10 md:mt-0 lg:mt-0 duration-300 transition-all mt-4 ">
        <router-link to="/" class="hidden md:block duration-700 transition-all md:-mt-1 pl-4">
          <img :src="require(`../assets/images/logo.png`)" alt="로고" title="로고 이미지"
          class="md:-mt-[54px] lg:-mt-14 w-[200px] md:w-[220px] h-[120px]">
        </router-link>
        <div class="max-w-3xl mx-auto md:mr-[20%] lg:mr-[5%] lg:pr-0">
          <div class="text-center md:mb-8 ">
            <!-- 검색상자 + 돋보기 icon 모바일 화면 -->
            <div class="lg:hidden w-[40%] md:w-[60%] flex justify-between relative my-10 sm:mt-3 ml-[35%] sm:ml-[37%] md:ml-[30%] lg:ml-0 md:-mt-0 duration-500 transition-all  text-xl">
              <input type="text" maxlength=20 placeholder="Search" style="font-size: 16pt;"
              class="basis-full border-b border-black pl-2 pt-2 h-7 outline-none ml-5 md:ml-0 bg-white bg-opacity-0 duration-500 transition-all">
              <font-awesome-icon icon="search" class="absolute bottom-1 -right-3 sm:right-1 md:right-2 text-[20px] cursor-pointer"/>
            </div>
            <!-- 오버시 서브 메뉴 -->
             <ul class="hidden md:flex justify-center gap-x-16 sm:gap-x-4 font-bold text-xl md:gap-x-16 w-full mt-10 lg:mt-0 md:mt-14 sm:mt-10 duration-500 transition-all">
                <li class="sm:px-10 md:px-0 transition-all duration-500 text-xl leading-9 shrink-0 cursor-pointer"
                  v-for="(e, index) in Gnb" :key="e" :class="SubMenuIndex == index"
                  @mouseout="SubMenuIndex = null"
                  @mouseover="SubMenuIndex = index; Subfunction(index)">
                  <router-link :to="SubMenuLink[index].link" class="h-full block">{{ e }}</router-link>
                  <!-- ul 태그 rounded-br-2xl rounded-bl-2xl -->
                  <ul class="absolute h-0 overflow-hidden z-20 mt-[1px] -ml-[9px] rounded-b-md bg-white transition-all duration-700 sub_list" :style="SubMenuIndex == index && isSubMenu">
                  <template v-for="(el, index2) in SubList[index]" :key="index2">
                    <!-- 오버시 나타나는 submenu li들 -->
                      <li v-if="(index == 1) || (index == 3)" class="text-[15px] text-center first-of-type:mt-0 mt-3 px-1 py-0.5 w-24 hover:bg-purple-500 hover:text-white text-lg cursor-pointer">
                        <!-- h-0 overflow-hidden -->
                      <router-link :to="SubMenuLink[index].sublink[index2]"  class="h-full block">{{ el }}</router-link>
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
            <input type="text" maxlength=16 placeholder="검색어" style="font-size: 16pt;" v-model="number"
            class="border-b border-black pl-2.5 sm:mt-1 lg:mt-[2px] pt-2 h-7 outline-none focus:outline- text-lg bg-white bg-opacity-0 duration-500 transition-all">
            <font-awesome-icon icon="search" class="mr-7 ml-0.5 mt-0.5 sm:text-lg lg:border-none sm:rounded-full sm:border sm:border-black sm:px-[4.5px] sm:py-[4.5px] lg:-ml-7 lg:text-xl cursor-pointer duration-500 transition-all"/>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- 모바일 버튼 클릭 시 사이드 메뉴-->
 <div class="h-full lg:hidden fixed w-60 -right-60 top-0 py-10 bg-purple-200 duration-500 transition-all z-40"  :class="btnMenu && '!right-0'">
      <div class="mt-10 h-[250px] ml-9">
        <ul class="lg:hidden w-full mt-10 lg:mt-0 md:mt-14 sm:mt-10 duration-500 transition-all">
          <li class="-tracking-widest transition-all duration-500 text-xl leading-9 mt-5"
            v-for="(e, index) in Gnb" :key="e"
            @mouseout="SubMenuIndex2 = null"
            @mouseover="SubMenuIndex2 = index; Subfunction2(index)"
            >
            <!-- @click="SubMenuIndex2 = index; Subfunction2(index)" -->
            <router-link :to="SubMenuLink[index].link" class="h-full block">{{ e }}</router-link>
            <!-- 서브메뉴 ul 리스트 -->
            <ul class="h-0 overflow-hidden mt-3 rounded-b-md transition-all duration-700 m_sub_list" :style="SubMenuIndex2 == index && isSubMenu2">
              <!-- 오버시 나타나는 submenu li들 -->
                <li  v-for="(el, index2) in SubList[index]" :key="index2" class="text-[15px] first-of-type:mt-0 mt-3 py-0.5 w-full text-lg">
                  <!-- h-0 overflow-hidden -->
                  <router-link :to="SubMenuLink[index].sublink[index2]"  class="h-full block">{{ el }}</router-link>
                </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
</template>
<script>
import{auth} from '../firebase'
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
      btnMenu: false,
      isSubMenu: '',
      logIn: false,
      SubMenuLink: Gnb.MenuLink,
      number : "",
      text: "",
      scroll: true,
    }
  },

  methods:{
    logOut(){
      auth.signOut()
      this.$store.commit('logOutToken')
    },
    updateWindowWidth(){
      this.windowWidth = window.innerWidth;
    },
    Subfunction(e){
      if(e != 0){
          const list = document.querySelectorAll(".sub_list")[e];
          const length = list.querySelectorAll("li").length;
          this.isSubMenu = `height:${length*40}px`

            if(list.style.height === '0px'){
              list.style.height = '100px';
            }else{
              list.style.height = '0px';
            }
        }
    },
    Subfunction2(e){
      const list = document.querySelectorAll(".m_sub_list")[e];
      const length = list.querySelectorAll("li").length;
      if((e == 1) || (e == 3)) {
        this.isSubMenu2 = `height:${length*42}px`
      } else {
        this.isSubMenu2 = `height: 0px`
      }
    },
    hideLogin(){
      const body = document.querySelector('body').getBoundingClientRect().top;
      if(body == 0){
        this.scroll = true
      } else {
        this.scroll = false
      }
    }
  },
  mounted() {
     window.addEventListener("scroll", this.hideLogin)
    this.hideLogin()
  },
}

</script>
<style>

</style>