<template lang="">
  <div class="w-full">
    <div class="max-w-5xl mx-auto flex flex-wrap px-[2%]">
      <div class="py-24 pt-45 text-center basis-full">
        <h3 class="text-3xl font-bold mb-5">바람길</h3>
        <h2 class="text-xl font-bold mb-5">내정보</h2>
      </div>
      <div class="basis-full pb-24">
        <div class="sm:max-w-md mx-auto py-4">
          <div class="basis-full px-10 text-center">
            <div class="mt-3">
              <div class="flex justify-between items-center border-b mb-5">
                <span class="mr-2 w-20 text-left">이메일</span>
                <span class="text-left p-2 w-full">{{email}}</span>
              </div>
              <div class="flex justify-between items-center border-b mb-5">
                <label class="mr-2 w-20 text-left">비밀번호</label>
                <input v-model="password" type="password" placeholder="비밀번호를 입력해주세요" class="text-left p-2 w-full">
              </div>
              <div class="flex justify-between items-center border-b mb-5">
                <label class="mr-2 w-20 text-left">비밀번호</label>
                <input v-model="password" type="password" placeholder="비밀번호 재확인" class="text-left p-2 w-full">
              </div>
              <div class="flex justify-between items-center border-b mb-5">
                <label class="mr-2 w-20 text-left">닉네임</label>
                <input v-model="nickname" type="text" placeholder="닉네임을 입력해주세요" class="text-left p-2 w-full">
              </div>
            <button class="border my-5 w-full text-white/90 bg-slate-300 hover:bg-slate-500  rounded-lg p-2.5 text-center" type="submit">회원 정보 수정</button>
          </div>
        </div>
      </div>
    </div>
   </div>
  </div>
</template>
<script>
import { auth } from '@/firebase';

export default {
    name:"MemberPage",
    data() {
      return {
        name:"",
        email:"",
        nickname:""
      }
    },
    mounted() {
      const user = auth.currentUser;
      if (user) {
        this.nickname = user.displayName
        this.email = user.email
      }
    },
}
</script>
<style>

</style>