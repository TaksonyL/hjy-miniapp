<template>
  <view class="cell-container px bg-color-white">
    <view class="flex-between" :class="{ 'border-b': border }">
      <view>{{ label }}</view>
      <view>{{ text }}</view>  
    </view>
  </view>
</template>

<script lang="ts" setup>
export interface Props {
  label: string,
  text?: string,
  border?: boolean
}

withDefaults(defineProps<Props>(), {
  label: 'label',
  text: '',
  border: false
})
</script>

<style lang="scss">
.cell-container {
  line-height: 90px;
}
</style>
