<template>
  <van-cell>
    <template #icon>
      <van-image
        class="avatar"
        round
        width="36"
        height="36"
        fit="cover"
        :src="Obj.aut_photo"
      />
    </template>
    <template #title>
      <div class="title-wrap">
        <div class="user-name">{{ Obj.aut_name }}</div>
        <span class="comment_zan"
          ><van-icon
            name="good-job-o"
            @click="changeGood"
            :class="{ active: Obj.is_liking }"
          />{{ Obj.like_count ? Obj.like_count : '赞' }}</span
        >
      </div>
    </template>
    <template #label>
      <div>
        <p class="comment-content">{{ Obj.content }}</p>
        <div class="bottom-info">
          <span class="comment-pubdate">{{
            dayjs(Obj.pubdate).fromNow()
          }}</span>
          <van-button round size="mini" class="reply-btn"
            >回复 {{ Obj.reply_count ? Obj.reply_count : '' }}</van-button
          >
        </div>
      </div>
    </template>
  </van-cell>
</template>

<script>
import { comNotGood, comGood } from '@/apis'

import dayjs from '@/utils/dayjs'
export default {
  props: {
    Obj: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      dayjs
    }
  },
  methods: {
    // 点赞
    async changeGood () {
      if (this.Obj.is_liking) {
        try {
          // 发送取消请求
          const obj = this.Obj
          obj.is_liking = false
          obj.like_count--
          await comNotGood(obj.com_id)
        } catch (error) {
          console.log(error)
        }
      } else {
        try {
          // 发送点赞请求
          const obj = this.Obj
          obj.is_liking = true
          obj.like_count++
          await comGood(obj.com_id)
        } catch (error) {
          console.log(error)
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
.active {
  color: red;
}
.title-wrap {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .user-name {
    color: #406599;
    font-size: 0.34667rem;
  }
}

/deep/.van-cell {
  padding: 20px 16px;
}
.avatar {
  width: 0.96rem;
  height: 0.96rem;
  margin-right: 0.33333rem;
}

/deep/.van-cell__label {
  margin-top: 0.10667rem;
  color: #969799;
  font-size: 0.32rem;
  line-height: 0.48rem;
  .comment-content {
    font-size: 0.42667rem;
    color: #222;
    word-break: break-all;
    text-align: justify;
  }
  .bottom-info {
    display: flex;
    align-items: center;
    .comment-pubdate {
      font-size: 0.25333rem;
      color: #222;
      margin-right: 0.33333rem;
    }
    .reply-btn {
      width: 1.8rem;
      height: 0.64rem;
      line-height: 0.64rem;
      font-size: 0.28rem;
      color: #222;
    }
  }
}
</style>
