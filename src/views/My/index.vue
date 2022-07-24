<template>
  <div class="my">
    <!-- 头部 -->
    <header>
      <!-- 登录状态 -->
      <div class="user-info banner" v-if="isLogin">
        <!-- 占位 -->
        <van-row></van-row>
        <!-- 用户信息 -->
        <van-row class="row-2">
          <van-col span="12">
            <van-row type="flex" align="center" justify="space-around">
              <!-- 头像 -->
              <van-image
                round
                width="1.76rem"
                height="1.76rem"
                :src="userInfo.photo"
              />
              <!-- 手机号 -->
              <span class="mobile">{{ userInfo.name }}</span>
            </van-row>
          </van-col>
          <van-col span="11">
            <!-- 编辑个人信息 -->
            <van-row class="code-row" type="flex" align="center" justify="end">
              <van-button
                class="code-btn"
                size="mini"
                @click="$router.push('/edituser')"
                >编辑资料</van-button
              >
            </van-row>
          </van-col>
        </van-row>
        <van-row>
          <!-- 关注 -->
          <van-grid class="grid" :border="false">
            <van-grid-item text="头条">
              <template #icon> {{ userInfo.art_count }} </template>
            </van-grid-item>
            <van-grid-item text="粉丝">
              <template #icon>{{ userInfo.fans_count }}</template>
            </van-grid-item>
            <van-grid-item text="关注">
              <template #icon>{{ userInfo.follow_count }}</template>
            </van-grid-item>
            <van-grid-item text="获赞">
              <template #icon>{{ userInfo.like_count }}</template>
            </van-grid-item>
          </van-grid>
        </van-row>
      </div>
      <!-- 未登录状态 -->
      <div class="login-register banner" v-else>
        <div class="wrap" @click="goLogin">
          <img src="../../assets/images/mobile.png" alt="" />
          <span>登录/注册</span>
        </div>
      </div>
    </header>
    <!-- 主体 -->
    <main>
      <van-grid class="grid" :clickable="true" column-num="2">
        <van-grid-item text="收藏">
          <template #icon>
            <span class="toutiao toutiao-shoucang"></span>
          </template>
        </van-grid-item>
        <van-grid-item text="历史">
          <template #icon>
            <span class="toutiao toutiao-lishi"></span>
          </template>
        </van-grid-item>
      </van-grid>

      <div class="link">
        <van-cell title="消息通知" is-link />
        <van-cell title="小智同学" is-link />
      </div>
    </main>
    <!-- 按钮 -->
    <van-button v-if="isLogin" block class="login-btn" @click="logout"
      >退出</van-button
    >
  </div>
</template>

<script>
import { userInfo } from '@/apis/user'
export default {
  data () {
    return {
      userInfo: {}
    }
  },
  methods: {
    // 退出
    logout () {
      this.$dialog
        .confirm({
          title: '黑马头条',
          message: '是否确认退出'
        })
        .then(() => {
          // on confirm
          this.$store.commit('userToken', {})
        })
        .catch(() => {
          // on cancel
        })
    },
    // 点击头像登录
    goLogin () {
      this.$router.push('/login')
    },
    // 获取用户信息
    async getUserInfo () {
      if (this.isLogin) {
        try {
          const {
            data: { data }
          } = await userInfo()
          this.userInfo = data
          // console.log(data)
        } catch (e) {
          this.$toast.fail('请重新登录')
        }
      }
    }
  },
  computed: {
    isLogin () {
      return !!this.$store.state.user.token
    }
  },
  created () {
    this.getUserInfo()
  }
}
</script>

<style scoped lang="less">
.my {
  background-color: #f5f7f9;
  height: calc(100vh - 100px);
}
.banner {
  width: 100%;
  height: 400px;
  background: url('../../assets/images/banner.png') no-repeat 0 0 / cover;
}
.user-info {
  display: flex;
  flex-direction: column;
  > .van-row {
    flex: 1;
  }
  .row-2 {
    .van-col {
      height: 100%;
    }
  }
  .mobile {
    font-size: 0.4rem;
    color: #fff;
  }
  .code-btn {
    width: 1.53333rem;
    height: 0.42667rem;
    background: #fff;
    border-radius: 0.21333rem;
    font-size: 0.26667rem;
    color: #666;
    padding: 0;
  }

  .code-row {
    height: 100%;
  }
  .grid {
    :deep(.van-grid-item__content) {
      background-color: unset;
    }
  }
  .van-grid-item {
    color: #fff;
    font-size: 30px;
    :deep(.van-grid-item__text) {
      color: #fff;
    }
  }
}
.login-register {
  display: flex;
  justify-content: center;
  align-items: center;
  .wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #fff;
    font-size: 30px;
    img {
      margin-bottom: 10px;
      width: 126px;
      height: 126px;
    }
  }
}

// 主体区域
main {
  .grid {
    color: #646566;
    // 字体图标
    .toutiao {
      font-size: 0.6rem;

      &.toutiao-lishi {
        color: #ffb31d;
      }
      &.toutiao-shoucang {
        color: #ed5253;
      }
    }
  }
}
.link {
  margin-top: 15px;
}
.login-btn {
  margin-top: 30px;
  /deep/.van-button__text {
    color: red;
  }
}
</style>
