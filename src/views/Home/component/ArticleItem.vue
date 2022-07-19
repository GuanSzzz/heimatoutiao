<template>
  <div>
    <!-- 没有图片 -->
    <van-cell
      :title="articleInfo.title"
      :label="articleDesc"
      v-if="articleInfo.cover.type === 0"
    />
    <!-- 一张 -->
    <van-cell
      :title="articleInfo.title"
      :label="articleDesc"
      v-if="articleInfo.cover.type === 1"
    >
      <van-image
        width="3rem"
        height="2rem"
        :src="articleInfo.cover.images[0]"
      />
    </van-cell>

    <!-- 三张 -->
    <van-cell :title="articleInfo.title" v-if="articleInfo.cover.type === 3">
      <template #label>
        <van-image
          width="3rem"
          height="2rem"
          v-for="(item, index) in articleInfo.cover.images"
          :key="index"
          :src="item"
        />
      </template>
    </van-cell>
  </div>
</template>

<script>
import dayjs from '@/utils/dayjs'
export default {
  name: 'ArticleItem',
  props: {
    articleInfo: {
      type: Object,
      require: true
    }
  },
  computed: {
    articleDesc () {
      const times = dayjs(this.articleInfo.pubdate).fromNow()
      return `${this.articleInfo.aut_name} ${this.articleInfo.comm_count}评论 ${times}`
    }
  }
}
</script>

<style scoped lang="less"></style>
