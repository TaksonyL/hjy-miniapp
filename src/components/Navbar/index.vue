<template>
  <view class="navbar-container">
    <view class="navbar-wrap" :class="themeStyles" :style="{ paddingTop: statusHeight + 'px' }">
      <view class="navbar-content text-center text-lg">{{ title }}</view>
      <view v-if="(pages.length > 1) && isBack" class="navbar-back px flex-center">
        <IconFont name="rect-left" color="#666" @click="goBack"></IconFont>
      </view>
    </view>

    <view class="navbar-block" :style="{ paddingTop: statusHeight + 'px' }"></view>
  </view>
</template>

<script lang="ts" setup>
import Taro from '@tarojs/taro';
import { IconFont } from '@nutui/icons-vue-taro';
import { computed } from 'vue';

export interface Props {
  title: string,
  theme: 'base' | 'transparent',
  isBack: boolean
}

const props = withDefaults(defineProps<Props>(), {
  title: "",
  theme: 'base',
  isBack: true
})

// 主题
const themeStyles = computed(() => {
  let styles = {
    bgColor: 'bg-color-white',
    textColor: '',
    shadow: 'shadow'
  }
  switch (props.theme) {
    case 'transparent':
      styles.bgColor = ''
      styles.shadow = ''
      break;
  }
  console.log('styles ===', styles)

  let stylesText = ''
  for (const key in styles) {
    stylesText += ' ' + styles[key]
  }
  return stylesText
})

// 返回逻辑
const pages = Taro.getCurrentPages()
const goBack = () => {
  Taro.navigateBack({
    fail() {
      Taro.redirectTo({ url: '/pages/index/index' })
    }
  })
}
console.log('page ===', pages)

const statusHeight = Taro.getSystemInfoSync().statusBarHeight
</script>

<style lang="scss">
$navbar-height: 90px;

.navbar-container {
  .navbar-wrap {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    box-sizing: border-box;

    .navbar-back {
      position: absolute;
      bottom: 0;
      left: 0;
      height: $navbar-height;
    }
  }

  .navbar-block {
    height: $navbar-height;
  }

  .navbar-content {
    height: $navbar-height;
    line-height: $navbar-height;
  }
}
</style>
