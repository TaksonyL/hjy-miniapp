<template>
  <nut-tag :type="tag.type" :plain="plain">{{ tag.label }}</nut-tag>
</template>

<script lang="ts" setup>
import { TagType } from '@nutui/nutui-taro/dist/types/__VUE/tag/types';
import { computed } from 'vue';

interface Props {
  options: { label: string, value: string | number, type: string }[]
  value: string | number | undefined,
  plain?: boolean,
  clickable?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  plain: false,
  clickable: false
})

const tag = computed((): { label: string, type: TagType } => {
  for (const item of props.options) {
    if (item.value === props.value) return { label: item.label, type: item.type as TagType }
  }
  //@ts-ignore
  return { label: '未知', type: 'info' }
})

// const tagTypeClass = (type: string) => {
//   switch (type) {
//     case 'success':
//       return 'bg-color-success'
//     case 'warning':
//       return 'bg-color-warning'
//     case 'danger':
//       return 'bg-color-danger'
//     case 'info':
//       return 'bg-color-info'
//     default:
//       return 'bg-color-main'
//   }
// }
</script>

<style lang="scss">
</style>
