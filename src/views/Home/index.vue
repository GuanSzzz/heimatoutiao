<template>
  <div>
    <!-- 头部搜素框 -->
    <van-nav-bar class="navbar">
      <template #title>
        <van-button round>
          <van-icon name="search" />
          搜索
        </van-button>
      </template>
    </van-nav-bar>
    <!-- tabs选项卡 -->
    <van-tabs v-model="active" :swipeable="true">
      <van-tab :title="item.name" v-for="item in myChannels" :key="item.id">
        <!-- 文章列表 -->
        <ArticleList :id="item.id"></ArticleList>
      </van-tab>

      <!-- 更多按钮 -->
      <span class="toutiao toutiao-gengduo" @click="showPopup"></span>

      <!-- 弹层 -->
      <EditChannelPopup
        ref="popup"
        :myChannels="myChannels"
        @delMyChannels="delMyChannelF"
        @changeActive="changeActive"
        @addMyChannels="addMyChannel"
      ></EditChannelPopup>
    </van-tabs>
  </div>
</template>

<script>
import {
  getMyChannels,
  setMyChannelToLocal,
  getMyChannelByLocal,
  delMyChannel,
  addMyChannel
} from '@/apis'
import ArticleList from './component/ArticleList.vue'
import EditChannelPopup from './component/EditChannelPopup.vue'

export default {
  name: 'Home',
  data () {
    return {
      active: 0,
      myChannels: []
    }
  },
  computed: {
    // 是否登录
    isLogin () {
      return !!this.$store.state.user.token
    }
  },
  methods: {
    // 弹出遮罩层
    showPopup () {
      // this.isShow = true
      this.$refs.popup.isShow = true
    },
    // 获取频道列表
    async getMyChannels () {
      try {
        // 如果是离线状态,分两种情况
        // 如果本地有数据,取本地
        // 如果本地没数据,发请求
        if (!this.isLogin) {
          const myChannels = getMyChannelByLocal()
          if (myChannels) {
            this.myChannels = myChannels
          } else {
            const { data } = await getMyChannels()
            this.myChannels = data.data.channels
            console.log(data)
          }
        } else {
          // 如果是登录状态，获取数据
          const { data } = await getMyChannels()
          this.myChannels = data.data.channels
        }
      } catch (e) {
        this.$toast.fail('重新获取')
      }
    },
    // 删除我的频道
    async delMyChannelF (id) {
      this.myChannels = this.myChannels.filter((ele) => ele.id !== id)
      // 先判断是否登录状态,
      // 如果是未登录状态,修改结果存储在本地
      if (!this.isLogin) {
        setMyChannelToLocal(this.myChannels)
      } else {
        try {
          await delMyChannel(id)
        } catch (error) {
          return this.$toast.fail('删除用户频道失败')
        }
      }
      this.$toast.success('删除用户频道成功')
    },
    // 跳转到页面相对的模块
    changeActive (index) {
      this.active = index
    },
    // 添加频道
    async addMyChannel (item) {
      this.myChannels.push(item)
      // 先判断登录状态,
      // 如果是未登录状态,修改结果存储在本地
      if (!this.isLogin) {
        setMyChannelToLocal(this.myChannels)
      } else {
        try {
          await addMyChannel(item.id, this.myChannels.length)
        } catch (error) {
          return this.$toast.fail('添加失败')
        }
      }
      this.$toast.success('添加成功')
    }
  },
  created () {
    // 获取频道列表
    this.getMyChannels()
  },
  components: {
    ArticleList,
    EditChannelPopup
  }
}
</script>

<style scoped lang="less">
.van-button--default {
  background-color: #7cb6ef;
}
.navbar {
  background-color: #3296fa;
  color: #fff;
  .van-button {
    width: 555px;
    height: 64px;
  }
  :deep(.van-nav-bar__title) {
    max-width: unset;
  }
  .van-button__text {
    color: #fff;
  }
  .van-icon-search {
    color: #fff;
  }
  .van-button--default {
    border: 0.02667rem solid #5babfb;
  }
}

//tabs选项卡
:deep(.van-tabs__wrap) {
  padding-right: 66px;

  .van-tabs__nav {
    padding-left: 0;
    padding-right: 0;

    /* tab标签 */
    .van-tab {
      border: 1px solid #eee;
      width: 200px;
      height: 82px;
    }

    /* tab标签下划线 */
    .van-tabs__line {
      width: 31px;
      height: 6px;
      background-color: #3296fa;
      bottom: 40px;
    }
  }
}

/* 字体图标 */
.toutiao-gengduo {
  position: absolute;
  top: 0;
  right: 0;
  width: 66px;
  height: 82px;
  font-size: 40px;
  line-height: 82px;
  text-align: center;
  z-index: 99;
  opacity: 0.6;
  border-bottom: 1px solid #eee;
  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    height: 70%;
    width: 1px;
    background-image: url('~@/assets/images/gradient-gray-line.png');
  }
}

// 头部固定的样式
.navbar {
  position: sticky;
  top: 0;
  left: 0;
}
:deep(.van-tabs__wrap) {
  position: sticky;
  top: 92px;
  left: 0;
  z-index: 99;
}
.toutiao-gengduo {
  position: fixed;
  top: 92px;
}

:deep(.van-tabs__content) {
  max-height: calc(100vh - 92px - 82px - 100px);
  overflow: auto;
}
</style>
