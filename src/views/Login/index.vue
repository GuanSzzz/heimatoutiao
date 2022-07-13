<template>
  <div>
    <!-- 1.导航 -->
    <van-nav-bar
      title="登录"
      left-arrow
      @click-left="backToPrePage"
      class="nav-bar"
    >
      <template #left>
        <van-icon name="cross" />
      </template>
    </van-nav-bar>
    <!-- 2.表单 -->
    <van-form @submit="login" class="form">
      <van-field
        v-model="mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="[{ required: true, message: '请输入手机号' }]"
      >
        <template #left-icon>
          <span class="toutiao toutiao-shouji"></span>
          <!-- 方法2 -->
          <!-- <i class="toutiao toutiao-yanzhengma" slot="left-icon"></i> -->
        </template>
      </van-field>
      <van-field
        v-model="code"
        name="code"
        placeholder="请输入验证码"
        :rules="[{ required: true, message: '请输入验证码' }]"
      >
        <template #left-icon>
          <span class="toutiao toutiao-yanzhengma"></span>
        </template>
        <template #right-icon>
          <van-button round size="mini" class="code-btn">发送验证码</van-button>
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
    <!-- 3.提交按钮 -->
  </div>
</template>

<script>
import { login } from '@/apis/user'
export default {
  name: 'Login',
  data () {
    return {
      mobile: '',
      code: ''
    }
  },
  methods: {
    backToPrePage () {
      this.$router.back()
    },
    async login () {
      const res = await login(this.mobile, this.code)
      console.log(res)
    }
  }
}
</script>

<style scoped lang="less">
// 导航栏样式
.nav-bar {
  background-color: #3296fa;
  :deep(.van-nav-bar__title) {
    color: #fff;
  }
  .van-icon {
    color: #fff;
  }
}
// 表单样式
.form {
  .toutiao {
    font-size: 0.49333rem;
  }
  .code-btn {
    background-color: #eee;
    padding: 0 20px;
    color: #666;
  }
}
</style>
