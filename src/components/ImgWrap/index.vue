<template>
  <image v-if="!isError" :src="imgSrc" style="width: 100%; height: 100%;" :mode="mode" :show-menu-by-longpress="showMenuByLongpress" @error="onError"></image>
  <image v-else :src="default" style="width: 100%; height: 100%;" :mode="mode" @error="onError"></image>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue';
import settings from '@/settings';
import defaultImg from '@/assets/product.png'

export interface Props {
  src: string
  isPrefix?: boolean
  mode?: 'widthFix' | 'heightFix' | 'scaleToFill' | 'aspectFit' | 'aspectFill'
  default?: string,
  showMenuByLongpress?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  isPrefix: true,
  mode: 'aspectFit',
  default: defaultImg,
  showMenuByLongpress: false
})

const isError = ref(false)
const onError = () => {
  isError.value = true
}

watch(
  () => props.src,
  () => {
    isError.value = false
  },
  { immediate: true }
)

const imgSrc = computed(() => {
  if (props.isPrefix) {
    return settings.baseUrl + props.src.replace('\\', '/')
  } else {
    return props.src
  }
})
</script>
