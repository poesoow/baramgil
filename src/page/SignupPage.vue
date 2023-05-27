<template lang="">
    <div class="w-full">
      <div class="max-w-5xl mx-auto flex flex-wrap px-[2%]">
        <div class="py-24 pt-45 text-center basis-full">
          <h3 class="text-3xl font-bold mb-5">바람길</h3>
          <h2 class="text-xl font-bold mb-5">회원가입</h2>
        </div>
        <div class="basis-full pb-24">
          <div class="sm:max-w-md mx-auto py-4">
            <div class="basis-full px-10 text-center">
              <div class="mt-3 pb-10">
                <div class="flex justify-between items-center border-b mb-5">
                  <label class="mr-2 w-20 text-left">이메일</label>
                  <input v-model="email" type="email" placeholder="이메일을 입력해주세요" class="focus:outline-opacity-60 text-left p-2 w-full">
                </div>
                <div class="flex justify-between items-center border-b mb-5">
                  <label class="mr-2 w-20 text-left">비밀번호</label>
                  <input v-model="password" type="password" placeholder="비밀번호를 입력해주세요" class="text-left p-2 w-full">
                </div>
                <div class="flex justify-between items-center border-b mb-5">
                  <label class="mr-2 w-20 text-left">비밀번호</label>
                  <input type="password" v-model="password2" placeholder="비밀번호 재확인" class="text-left p-2 w-full">
                </div>
                <div class="flex justify-between items-center border-b mb-5">
                  <label class="mr-2 w-20 text-left">닉네임</label>
                  <input v-model="nickname" type="text" placeholder="닉네임을 입력해주세요" class="text-left p-2 w-full">
                </div>
              </div>
              <button @click="signUp" class="border my-5 w-full text-white/90 bg-slate-300 hover:bg-slate-500  rounded-lg text-center py-2" type="submit">
                  회원가입
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  </template>
  <script>
  import { auth } from '@/firebase';

  export default {
      name:"SignupPage",
      data() {
          return {
              email:"",
              password:"",
              password2:"",
              nickname:""
          }
      },
      methods:{
        signUp(){

          if(this.password != this.password2){
            alert('비밀번호가 다릅니다. 다시 입력해주세요')
            return
          } else {
            auth.createUserWithEmailAndPassword(this.email,this.password).then((result)=>{
              result.user.updateProfile({displayName:this.nickname})
            })
            this.$router.replace('/')
          }

        },
    }

  }
  </script>
  <style>

  </style>