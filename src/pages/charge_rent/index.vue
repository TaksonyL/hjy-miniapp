<template>
  <view class="charge-rent-container">
    <Navbar theme="transparent" />
    
    <view class="text-center" style="padding-top: 5vh;">
      <image style="width: 60vw;" src="@/assets/charge.png" mode="widthFix" />
    </view>

    <view v-if="rule" class="rent-wrap bg-color-white px shadow-t">
      <view class="safe-b">
        <view class="text-sm px" style="padding-bottom: 20px;padding-top: 10px;">
          <view class="text-justify" style="margin-bottom: 15px;color: #777;">
            {{ rule.desc }}
          </view>
          <view class="rent-text-item">
            <IconFont class="rent-text-icon" name="setting" />
            <view>充电宝三线设计，匹配所有手机型号</view>
          </view>
          <view class="rent-text-item">
            <IconFont class="rent-text-icon" name="clock" />
            <view>每{{ rule.cycle }}天周期内，可获得{{ rule.free_duration }}小时免费时间{{ rule.free_times > 1 ? `（${rule.free_times}次）`:"" }}</view>
          </view>
          <view class="rent-text-item">
            <IconFont class="rent-text-icon" name="date" />
            <view>每{{ rule.overdue_cycle }}小时收费{{ rule.overdue_amount }}元，每{{ rule.cycle }}天内封顶上限{{ rule.charge_limit }}元</view>
          </view>
        </view>
        <view class="shadow bg-color-main text-color-white text-center shadow"
          style="padding: 5px; border-radius: 24px;" @click="rent">
          <view>申请免押金租借</view>
          <view class="text-xs">(微信支付分550分及以上有经济会免押金)</view>
        </view>  
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { getLeaseRule } from '@/api/machine';
import { IconFont } from '@nutui/icons-vue-taro';
import Navbar from '@/components/Navbar/index.vue'
import Taro from '@tarojs/taro';
import { ref } from 'vue';
import { GetLeaseRule } from '@/types/api';
import { createOrder, payScoreOrder } from '@/api/order';

const rent = () => {
  createOrder({}).then(res => {
    console.log('test ===', res)
    // payScoreOrder({}).then(res => {
    //   console.log('test ===', res)
    // })
    Taro.redirectTo({
      url: '/pages/charge_loading/index'
    })
  })
}

const rule = ref<GetLeaseRule.Response | null>(null)
const getRule = () => {
  getLeaseRule({}).then(res => {
    rule.value = res.data
  })
}
getRule()
</script>

<style lang="scss">
.charge-rent-container {
  height: 100vh;
  background: linear-gradient(#162a3a, #0c161e);
}

.rent-wrap {
  position: fixed;
  bottom: 0;
  width: 100vw;
  box-sizing: border-box;
  border-radius: 60px 60px 0 0;
  padding-top: 30px;
  padding-bottom: 60px;

  .rent-text-item {
    display: flex;
    align-items: center;
    line-height: 80px;
    .rent-text-icon {
      padding-right: 30px;
      margin-right: 20px;
      border-right: 1px solid #ccc;
    }
  }
}
</style>
