<template>
  <view class="charge-rent-container">
    <Navbar theme="transparent" />
    
    <view class="text-center" style="padding-top: 5vh;">
      <image style="width: 60vw;" src="@/assets/charge.png" mode="widthFix" />
    </view>

    <view class="rent-wrap bg-color-white px shadow-t">
      <view class="safe-b">
        <view v-if="rule" class="text-sm" style="padding-bottom: 20px;padding-top: 10px;">
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
            <view>{{ Number(rule.overdue_amount) }}元/{{ rule.overdue_cycle }}小时，每{{ rule.cycle *24 }}小时封顶{{ Number(rule.charge_limit) }}元，总封顶{{ Number(rule.charge_limit_continuous) }}元</view>
          </view>
        </view>
        <view class="shadow text-color-white text-center shadow"
          style="padding: 5px; border-radius: 24px; line-height: 35px;background-color: #07c160;" @click="rent">
          <!-- <view></view> -->
          免押金租借
          <!-- <view class="text-xs">(微信支付分550分及以上有经济会免押金)</view> -->
        </view>
        <view class="pay-score-wrap flex-center">
          <image src="@/assets/pay-score-icon.png"></image>
          <text>微信支付分|550分及以上优享</text>
        </view>
        <view class="text-center text-sm" style="color: #666;padding-top: 5px;">申请租借代表您已同意<text style="color: #07c160;">《委托扣款授权书》</text></view>
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
import { useCommonStore } from '@/store/common';

const commonStore = useCommonStore()
const rent = () => {
  createOrder({}).then(res => {
    commonStore.orderId = res.data.pbo_id
    payScoreOrder({}).then(res => {
      console.log('test ===', res)
      const { payScore } = res.data
      Taro.openBusinessView({
        businessType: 'wxpayScoreUse',
        extraData: {
          mch_id: payScore.extraData.mch_id,
          package: payScore.package,
          timestamp: payScore.extraData.timestamp.toString(),
          nonce_str: payScore.extraData.nonce_str,
          sign_type: payScore.extraData.sign_type,
          sign: payScore.extraData.sign
        },
        fail(err) {
          Taro.showToast({
            title: err.errMsg,
            icon: 'none'
          })
        }
      })
    })
    // Taro.redirectTo({
    //   url: '/pages/charge_loading/index'
    // })
  })
}

const rule = ref<GetLeaseRule.Response | null>(null)
const getRule = () => {
  getLeaseRule({}).then(res => {
    rule.value = res.data
  })
}
getRule()

// const queryOrderStatus = () => {
//   listenScoreOrder({ pbo_id: orderId }).then(res => {
//     console.log('order result ===', res)
//   })
// }

// useDidShow((res) => {
//   console.log('show ===', res)
//   if (res?.scene === 1038) {
//     queryOrderStatus();
//   }
// })
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

.pay-score-wrap {
  font-size: 24px;
  color: #666;
  padding-top: 10px;
  image {
    height: 40px;
    width: 40px;
    margin-right: 10px;
  }
}
</style>
