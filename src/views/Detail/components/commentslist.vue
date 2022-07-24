<template>
  <div>
    评论列表
    <van-list
      v-model="loading"
      :error="error"
      error-text="请刷新啦~~"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell
        class="comments_cell"
        v-for="(item, index) in commentsList"
        :key="index"
      >
        <van-image class="comments_img" round :src="item.aut_photo" />

        <div class="comments_text">
          <div class="comments_one">
            <span class="comment_name">{{ item.aut_name }}</span>
            <span class="comment_zan"
              ><van-icon
                name="good-job-o"
                @click="changeGood(item)"
                :class="{ active: item.is_liking }"
              />{{ item.like_count ? item.like_count : '赞' }}</span
            >
          </div>
          <div class="comments_two">
            <p class="comment_content">{{ item.content }}</p>
          </div>
          <div class="comments_three">
            <span class="comment_time">{{
              dayjs(item.pubdate).fromNow()
            }}</span>
            <van-button class="comments_btn" @click="showPopup(item)"
              >回复 {{ item.reply_count ? item.reply_count : '' }}</van-button
            >
          </div>
        </div>
      </van-cell>
    </van-list>
    <!-- 弹出层 -->
    <comComment ref="childCom" :artId="artID"></comComment>
  </div>
</template>

<script>
import { getCommentsList, comNotGood, comGood } from '@/apis'
import dayjs from '@/utils/dayjs'
import comComment from './comComment.vue'
export default {
  props: {
    artID: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      dayjs,
      commentsList: [],
      lastId: '',
      loading: false,
      finished: false,
      error: false
    }
  },
  methods: {
    // 获取文章评论
    async getCommentsList () {
      try {
        const res = await getCommentsList(this.artID)
        // console.log(res)
        this.commentsList = res.data.data.results
        this.lastId = res.data.data.last_id
      } catch (error) {
        console.log(error)
      }
    },
    // 下一页数据请求
    async onLoad () {
      try {
        const res = await getCommentsList(this.artID, this.lastId)
        this.lastId = res.data.data.last_id
        this.loading = false
        // console.log(res)
        if (this.lastId === res.data.data.end_id) {
          return (this.finished = true)
        }
        this.commentsList.push(...res.data.data.results)
      } catch (error) {
        console.log(error)
        this.error = true
      }
    },
    // 展示弹框  获取评论的评论
    showPopup (item) {
      this.$refs.childCom.show = true
      this.$refs.childCom.comlist = item
    },
    // 点赞
    async changeGood (item) {
      if (item.is_liking) {
        try {
          // 发送取消请求
          item.is_liking = false
          item.like_count--
          await comNotGood(item.com_id)
        } catch (error) {
          console.log(error)
        }
      } else {
        try {
          // 发送点赞请求
          item.is_liking = true
          item.like_count++
          await comGood(item.com_id)
        } catch (error) {
          console.log(error)
        }
      }
    }
  },
  created () {
    console.log(this.artID)
    this.getCommentsList()
  },
  components: {
    comComment
  }
}
</script>

<style scoped lang="less">
.active {
  color: red;
}
.comments_cell {
  box-sizing: border-box;
  width: 100%;
  padding: 0.26667rem 0.42667rem;
  overflow: hidden;
  color: #323233;
  font-size: 0.37333rem;
  line-height: 0.64rem;
  background-color: #fff;
  .van-cell__value {
    display: flex;

    .comments_img {
      display: inline-block;
      width: 1rem;
      height: 1rem;
      margin-right: 0.33333rem;
    }

    .comments_text {
      flex: 1;
      color: #323233;
      font-size: 0.37333rem;
      line-height: 0.64rem;
      .comments_one {
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #323233;
        font-size: 0.37333rem;
        line-height: 0.64rem;
        .comment_name {
          color: #406599;
          font-size: 0.34667rem;
        }
      }
      .comments_three {
        display: flex;
        align-items: center;

        .comment_time {
          line-height: 0.48rem;
          font-size: 0.25333rem;
          color: #222;
          margin-right: 0.33333rem;
        }
        .comments_btn {
          width: 1.8rem;
          height: 0.64rem;
          line-height: 0.64rem;
          font-size: 0.28rem;
          color: #222;
          border-radius: 26.64rem;
          padding: 0 0.4rem;
          background-color: #fff;
          border: 0.02667rem solid #ebedf0;
        }
      }
    }
  }
}
</style>
