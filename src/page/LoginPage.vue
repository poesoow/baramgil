<template lang="">
  <div class="w-full">
    <div class="max-w-5xl mx-auto px-[2%]">
      <div class="py-24 pt-45 text-center basis-full">
        <h3 class="text-3xl font-bold mb-5">바람길</h3>
        <h3 class="text-xl font-bold mb-5">로그인</h3>
      </div>
      <div class="w-full pb-24 ">
        <div class="sm:max-w-md mx-auto py-4">
          <form v-on:submit.prevent="submitForm" class="basis-full px-10">
            <div>
              <input class="w-full p-2.5 border block rounded-lg" type="email" v-model="email" placeholder="이메일을 입력해주세요" required="" />
            </div>
            <div class="mt-5">
              <input class="w-full p-2.5 border block rounded-lg" type="password" v-model="password" @keyup.enter="login()" placeholder="비밀번호를 입력해주세요" />
            </div>
            <button @click="login()" class="border my-3 w-full text-white/90 bg-slate-300 hover:bg-slate-500  rounded-lg p-2.5 text-center" type="submit">로그인</button>
            <p class="text-sm text-slate-500 py-2">회원정보가 없다면 ? <router-link to="/member" class="text-slate-800 hover:underline">회원가입</router-link> 하러가기</p>
          </form>
          {{ email }}
          {{ password }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { auth } from '@/firebase';

export default {
  name:"LoginView",
  data() {
    return {
      email:"",
      password:"",
      errorMsg:"",
      message:"",
    }
  },
  methods:{
    login(){
      if(!this.email){
        alert("이메일을 입력해주세요");
        return false
      }
      if(!this.password){
        alert("비밀번호를 입력해주세요");
        return false
      }
      auth.signInWithEmailAndPassword(this.email, this.password).then(((user)=>{
        console.log(user.user)
        sessionStorage.setItem("refreshToken",user.user.refreshToken);
        sessionStorage.setItem("displayName",user.user.displayName)
        // this.$store.commit("loginToken",user.user.refreshToken)
        this.$store.commit("loginToken", { refreshToken: user.user.refreshToken, uid: user.user.uid });
        this.$router.replace('/')
      }),
      ((error)=>{
        this.errorMsg=error.message
      })
      )
    }
  }
}
</script>
<style lang="">
  
</style>