<template>
  <div>
    <t-button v-if="test == 1">{{ test }}按钮</t-button>
    <div class="text-lg">lg</div>
    <div class="text-sm">sm</div>
    <div class="text-[20px]">20px</div>
    <div class="text-[1rem]">1rem</div>
    <AirbudsLineDuotoneIcon height="1em" />
  </div>
</template>

<script setup>
import AirbudsLineDuotoneIcon from '@iconify-vue/solar/airbuds-line-duotone'

const test = ref('测试')
</script>

<style lang="scss" scoped>

</style>
