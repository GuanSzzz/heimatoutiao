<template>
  <div>
    <!-- 头部 -->
    <Header title="黑马头条"></Header>
    <!-- 内容部分 -->
    <main>
      <h1 class="title">{{ aeticleList.title }}</h1>
      <van-row class="article-user">
        <van-col span="12">
          <van-row class="user-row" type="flex">
            <van-col>
              <van-image
                width="35"
                height="35"
                round
                :src="aeticleList.aut_photo"
              />
            </van-col>
            <van-col>
              <van-row type="flex">
                <van-col>{{ aeticleList.aut_name }}</van-col>

                <van-col style="color: #b7b7b7">{{
                  dayjs(aeticleList.pubdate).fromNow()
                }}</van-col>
              </van-row>
            </van-col>
          </van-row>
        </van-col>
        <van-col span="12" style="text-align: right">
          <van-button
            round
            type="info"
            class="btn"
            v-if="isFollow"
            @click="userNotFollowed"
            >已关注</van-button
          >
          <van-button round type="info" class="btn" v-else @click="userFollowed"
            >+关注</van-button
          >
        </van-col>
      </van-row>
      <div
        class="article-content markdown-body"
        v-html="aeticleList.content"
      ></div>
      <van-divider>正文结束</van-divider>
      <!-- 评论列表 -->
      <commentsList :artID="artId" ref="commentsList"></commentsList>
    </main>
    <!-- 底部 -->
    <footer>
      <van-tabbar class="footer">
        <van-tabbar-item class="item-btnnn">
          <template>
            <van-button plain hairline round class="btn" @click="showPopup"
              >写评论</van-button
            >
            <!-- 评论弹窗 -->
            <van-popup
              v-model="show"
              position="bottom"
              :style="{ height: '15%' }"
              class="popup-box"
            >
              <!-- 弹出文本域 -->
              <van-field
                v-model="message"
                rows="2"
                autosize
                type="textarea"
                maxlength="50"
                placeholder="请输入留言"
                show-word-limit
                class="popup-txt"
              />
              <van-button class="popup-btn" @click="sendMsg">发布</van-button>
            </van-popup>
          </template>
        </van-tabbar-item>
        <van-tabbar-item
          icon="comment-o"
          :badge="aeticleList.comm_count"
        ></van-tabbar-item>
        <!-- 收藏状态 ,点击取消-->
        <van-tabbar-item
          icon="star"
          class="star"
          v-if="isStar"
          @click="userNOtLike"
        ></van-tabbar-item>
        <!-- 取消收藏状态，点击收藏 -->
        <van-tabbar-item
          icon="star-o"
          v-else
          @click="userLike"
        ></van-tabbar-item>

        <van-tabbar-item
          icon="good-job-o"
          :badge="aeticleList.like_count"
        ></van-tabbar-item>
        <van-tabbar-item icon="share-o"></van-tabbar-item>
      </van-tabbar>
    </footer>
  </div>
</template>

<script>
import {
  getArticle,
  userLike,
  userNotLike,
  userFollowed,
  userNotFollowed,
  setComentsText
} from '@/apis'
// 引入组件
import commentsList from './components/commentslist.vue'
import Header from '@/components/Header.vue'
import dayjs from '@/utils/dayjs'
import '@/assets/css/news.css'

export default {
  data () {
    return {
      aeticleList: {},
      dayjs,
      show: false,
      message: '',
      isStar: false,
      isFollow: '',
      artId: this.$route.query.id
    }
  },
  components: {
    Header,
    commentsList
  },
  methods: {
    showPopup () {
      this.show = true
    },
    // 获取数据渲染列表
    async getArticle () {
      try {
        // const id=this.$router
        console.dir(this.$route)
        const id = this.$route.query.id
        const res = await getArticle(id)
        this.aeticleList = res.data.data
        this.isStar = this.aeticleList.is_collected
        this.isFollow = this.aeticleList.is_followed
        // console.log(res)
      } catch (error) {}
    },
    // 收藏
    async userLike () {
      try {
        this.isStar = true
        await userLike(this.aeticleList.art_id)

        this.$toast('收藏成功')
      } catch (error) {
        console.log(error)
        console.log('收藏失败')
      }
    },
    // 取消收藏
    async userNOtLike () {
      try {
        this.isStar = false
        await userNotLike(this.aeticleList.art_id)

        this.$toast('取消收藏成功')
      } catch (error) {
        this.$toast('取消收藏失败')
      }
    },
    // 关注
    async userFollowed () {
      await userFollowed(this.aeticleList.aut_id)
      this.isFollow = true
      this.$toast('关注成功')
    },
    // 取关
    async userNotFollowed () {
      await userNotFollowed(this.aeticleList.aut_id)
      this.isFollow = false
      this.$toast('取消关注')
    },
    // 发布评论
    async sendMsg () {
      try {
        const res = await setComentsText(this.artId, this.message)
        console.log(res)
        this.$refs.commentsList.getCommentsList()
        this.message = ''
        this.show = false
      } catch (error) {
        console.log(error)
      }
    }
  },
  created () {
    this.getArticle()
  }
}
</script>

<style scoped lang="less">
.star {
  color: #3296fa;
}
main {
  padding: 92px 32px 100px;
  // 标题
  .title {
    font-size: 0.53333rem;
    padding: 0.66667rem 0.42667rem;
    margin: 0;
    color: #3a3a3a;
  }
  // 头像部分
  .article-user {
    height: 84px;
    .user-row {
      align-items: center;
      .van-row {
        flex-direction: column;
        font-size: 14px;
        justify-content: center;
      }
      > .van-col:first-child {
        line-height: 42px;
        .van-image {
          margin-right: 20px;
        }
      }
      > .van-col:last-child {
        .van-col:first-child {
          margin-bottom: 10px;
        }
      }
    }
    > .van-col:last-child {
      line-height: 44px;
      /deep/.van-button--normal {
        width: 170px !important;
        height: 60px !important;
      }
    }
  }
  .article-content {
    margin: 55px 0;
  }
}
.footer {
  box-sizing: border-box;
  border-top: 1px solid #ccc;
  padding: 0 32px;
  width: 750px;
  .item-btnnn {
    flex: 3.2;
    .btn {
      width: 280px;
      height: 46px;
    }
  }
}
.popup-box {
  display: flex;
  align-items: center;
  padding: 0.42667rem 0 0.42667rem 0.42667rem;
  .popup-txt {
    background-color: #f5f7f9;
    box-sizing: border-box;
    width: 78%;
    padding: 0.26667rem 0.42667rem;
    overflow: hidden;
    color: #323233;
    font-size: 0.37333rem;
    line-height: 0.64rem;
  }
  .popup-btn {
    border: none;
    color: #6ba3d8;
    line-height: 1.2;
    text-align: center;
    font-size: 0.37333rem;
  }
}
</style>
