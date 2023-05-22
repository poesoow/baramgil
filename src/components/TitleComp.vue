<template>
  <div class="w-full px-[5%]">
    <div class="xl:w-full h-[389px] flex items-center flex-col justify-center gap-y-[13px]">
      <p class="text-6xl tracking-[10%]">
        <slot></slot>
      </p>
      <!-- <p class="text-3xl -tracking-[5%]">공지사항</p> -->
    </div>
  </div>
</template>

<script>
  export default {
    name: 'TitleView'
  }
</script>

<style lang="scss" scoped>

</style>