<template>
  <view class="">
    <Navbar title="关注公众号" />

    <view class="text-wrap text-lg text-center">
      <view>分享公众号文章至朋友圈</view>
      <view>获取免费领取额度</view>
    </view>

    <view class="px" style="padding-top: 10px;">

      <nut-empty v-if="articlesList.length === 0" description="暂无商品信息"></nut-empty>

      <view v-for="(list, index) in articlesList" :key="index"
       class="article-list bg-color-white rounded-sm overflow-hidden shadow">
        <view v-for="(item, i) in list.content.news_item" :key="i"
         class="article-item"
         :class="list.content.news_item.length === 1?'article-item-only':'flex flex-between'"
         @click="goArticleDetail(item, list.article_id)">
          <image v-if="list.content.news_item.length === 1" :src="item.thumb_url"></image>
          <view class="article-item-text">
            <view>{{ item.title }}</view>
          </view>
          <image v-if="list.content.news_item.length > 1" :src="item.thumb_url"></image>
        </view>
      </view>
      
    </view>

    <!-- <view style="padding-top: 20vh;" class="text-center">
      <nut-button type="primary" @click="subscribe">关注公众号</nut-button>
    </view> -->
  </view>
</template>

<script lang="ts" setup>
import { getOfficialArticles } from '@/api/official';
import { getFreeQuota } from '@/api/order';
import Navbar from '@/components/Navbar/index.vue'
import { OfficialArticle, OfficialArticleItem } from '@/types';
import Taro, { useDidShow } from '@tarojs/taro';
import { ref } from 'vue';

const articlesList = ref<OfficialArticle[]>([])
const getArticles = () => {
  getOfficialArticles({
    pageNum: 10,
    start: 0
  }).then(res => {
    articlesList.value = res.data.item
  })
}

getArticles()

const goArticleDetail = (item: OfficialArticleItem, id: string) => {
  const url = item.url.replace('http://', 'https://')
  const title = item.title
  const img = encodeURIComponent(item.thumb_url)
  Taro.navigateTo({
    url: `/pages/official_article/index?id=${id}&title=${title}&img=${img}&url=${encodeURIComponent(url)}`
  })
}

useDidShow(() => {
  // 进入时检查免费领取额度
  getFreeQuota({}).then(res => {
    console.log('quota ===', res)
  })
})
</script>

<style lang="scss">
.text-wrap {
  padding: 30px 0;
}

.article-list {
  .article-item {
    &:nth-child(1) {
      position: relative;
      .article-item-text {
        position: absolute;
        color: $color-white;
        position: absolute;
        bottom: 0;
        left: 0;
        padding: 30px;
        box-sizing: border-box;
      }
      image {
        width: 100%;
        height: 300px;
      }
    }
  }

  .article-item-only {
    .article-item-text {
      position: relative!important;
      color: #333!important;
    }
  }

  .article-item~.article-item {
    border-top: 1px solid #eee;
    padding: 30px;
    .article-item-text {
      width: 480px;
    }
    image {
      width: 120px;
      height: 120px;
    }
  }
  margin-bottom: 30px;
}
</style>
