<template>
  <div>
    모달 test
    {{ openModal }}
    모달 창 닫기
    <button @click="$emit('closeModal')">모달 창 닫기</button>
  </div>
</template>

<script>
  export default {
    name: 'ModalCourse',
    props: {
      openModal: Boolean
    }
  }
</script>

<style lang="scss" scoped>

</style>