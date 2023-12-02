<template>
  <view class="flex flex-col" style="height: 100vh;">
    <Navbar :title="machineInfo?.machine_name || '设备名称'" />

    <view class="flex-center flex-col" style="height: 100%;padding-bottom: 10vh;">
      <view class="btn-item text-color-white bg-color-main flex-center flex-col shadow" style="margin-bottom: 20px;"
        @click="goPage('/pages/charge_rent/index')">
        <image src="@/assets/icon-charge-pal.png" mode="heightFix" />
        <view>充电宝租借</view>
      </view>
      <view class="btn-item text-color-white bg-color-main flex-center flex-col shadow"
        @click="goPage('/pages/official_subscribe/index')">
        <image src="@/assets/icon-gift.png" mode="heightFix" />
        <view>免费领取礼品</view>
      </view>  
    </view>
  </view>
</template>

<script setup lang="ts">
import { checkLocation, getMachine } from '@/api/machine';
import Navbar from '@/components/Navbar/index.vue'
import { useUserStore } from '@/store/user';
import { MachineInfo } from '@/types';
import { showModel } from '@/utils';
import Taro from '@tarojs/taro';
import { ref } from 'vue';

const userStore = useUserStore()

const goPage = async (url: string) => {
  Taro.navigateTo({
    url
  })
}

const machineInfo = ref<MachineInfo | null>(null)
const getMachineData = () => {
  getMachine({}).then(res => {
    machineInfo.value = res.data
    getLocation()
  })
}


userStore.login().then(() => {
  getMachineData()
})

let location = { lon: 0, lat: 0 }
const maxDistance = 200000
const getLocation = async () => {
  Taro.getLocation({
    type: 'wgs84',
    success: async (res) => {
      location.lon = res.longitude
      location.lat = res.latitude

      const result = await checkLocation({ lat: location.lat, lng: location.lon })
      if (result.data > maxDistance) {
        showModel({
          title: '提示',
          content: '超出设备限制距离',
          showCancel: false,
          success() {
            Taro.exitMiniProgram()
          }
        })
      }
      console.log('check location ===', result)
    },
    fail(err) {
      console.log('location err ===', err)
      showModel({
        content: '请先授予位置权限，用于核实是否位于设备附近！',
        success() {
          Taro.openSetting()
        }
      })
    }
  })
}
</script>

<style lang="scss">
.btn-item {
  width: 300px;
  height: 300px;
  text-align: center;
  border-radius: 16px;
  image {
    height: 120px;
    width: 120px;
    margin-bottom: 10px;
  }
}
</style>
