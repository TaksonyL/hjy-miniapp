<template>
  <view class="index-container">
    <Navbar title="路灯默科技" :isBlock="false" />

    <map
      v-if="mapShow"
      id="map"
      style="width: 100vw; height: 300vh;"
      :longitude="mapOptions.lon"
      :latitude="mapOptions.lat"
      scale="14"
      :show-location="true"
    />

    <view class="toolbar px bg-color-white rounded safe-b shadow-t">
      <view class="toolbar-wrap text-center flex-between" @click="scan">
        <view class="text-xs">
          <IconFont name="service" />
          <view>在线客服</view>
        </view>
        <nut-button type="primary" color="#3ba0f8" :block="true" style="width: 70%;">
          <template #icon>
            <IconFont name="scan2" />
          </template>
          立即扫码
        </nut-button>
        <view class="text-xs">
          <IconFont name="my" />
          <view>个人中心</view>
        </view>
        <!-- <view class="text-center text-sm text-gray" style="margin-top: 10px;">
          我的订单
        </view> -->
      </view>

      <view class="toolbar-icon px" style="left: 0">
        <view class="toolbar-icon-item bg-color-white rounded-full shadow flex-center"
          @click="getLocationData">
          <IconFont name="location" size="16" />
        </view>
        <view class="toolbar-icon-item bg-color-white rounded-full shadow flex-center"
          @click="getLocationData">
          <IconFont name="order" size="16" />
        </view>
      </view>

      <view class="toolbar-icon px" style="right: 0;">
        <view class="toolbar-icon-item bg-color-white rounded-full shadow flex-center"
          @click="getLocationData">
          <IconFont name="category" size="16" />
        </view>
        <view class="toolbar-icon-item bg-color-white rounded-full shadow flex-center"
          @click="getLocationData">
          <IconFont name="search" size="16" />
        </view>
      </view>

    </view>
  </view>
</template>

<script lang="ts" setup>
import { IconFont } from '@nutui/icons-vue-taro';
import Navbar from '@/components/Navbar/index.vue'
import { getLocation } from '@/utils';
import { reactive, ref, nextTick } from 'vue';
import Taro from '@tarojs/taro';

const mapOptions = reactive({
  lon: 113.324520,
  lat: 23.099994
})

const mapShow = ref(true)
const mapRefresh = () => {
  mapShow.value = false
  nextTick(() => {
    mapShow.value = true
  })
}

const getLocationData = () => {
  getLocation().then(res => {
    mapOptions.lon = res.longitude
    mapOptions.lat = res.latitude
    mapRefresh()
  })
}
getLocationData()


const scan = () => {
  Taro.scanCode({
    success(res) {
      console.log(res)
      Taro.reLaunch({
        url: '/pages/login/index?q=' + encodeURIComponent(res.result)
      })
    }
  })
}
</script>

<style lang="scss">
.toolbar {
  position: fixed;
  bottom: 0;
  left: 0;
  box-sizing: border-box;
  width: 100vw;
  .toolbar-wrap {
    padding: 30px 0 20px;
  }

  .toolbar-icon {
    position: absolute;
    top: -400px;

    .toolbar-icon-item {
      width: 70px;
      height: 70px;
      margin-bottom: 60px;
    }
  }
}
</style>
