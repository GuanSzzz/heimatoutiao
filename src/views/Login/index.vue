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
    <van-form @submit="login" class="form" ref="form">
      <van-field
        v-model="mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="mobileRules"
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
        :rules="codeRules"
      >
        <template #left-icon>
          <span class="toutiao toutiao-yanzhengma"></span>
        </template>
        <template #right-icon>
          <van-count-down
            :time="3 * 1000"
            v-if="isCountdown"
            @finish="isCountdown = false"
          />
          <van-button
            round
            size="mini"
            class="code-btn"
            v-else
            @click.prevent="getCode"
            >发送验证码</van-button
          >
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
import { login, sendCode } from '@/apis/user'
// 引入正则
import { mobileRules, codeRules } from '@/views/Login/rules.js'
export default {
  name: 'Login',
  data () {
    return {
      mobile: '',
      code: '',
      codeRules,
      mobileRules,
      isCountdown: false
    }
  },
  methods: {
    backToPrePage () {
      this.$router.back()
    },
    // 登录按钮
    async login () {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true
      })
      try {
        const res = await login(this.mobile, this.code)
        console.log(res)
        // 存储token
        this.$store.commit('userToken', res.data.data)
        this.$toast.success('登录成功')
        this.$router.push('/profile')
      } catch (error) {
        console.log(error)
        this.$toast.fail('登录失败')
        // 二次验证
        const status = error.response.status
        let message = '登录错误，请刷新'
        if (status === 400) {
          message = error.response.data.message
        }
        this.$toast.fail(message)
        // 二次验证
        // switch (status) {
        //   case 400:
        //     this.$toast.fail(error.response.data.message)
        //     break
        //   case 507:
        //     this.$toast.fail('登录错误，请刷新')
        //     break
        //   default:
        //     this.$toast.fail('登录错误，请刷新')
        //     break
        // }
      }
    },
    // 发送验证码
    async getCode () {
      try {
        // 验证手机号(根据input的name)
        await this.$refs.form.validate('moble')
        // 发送请求,获取验证码
        await sendCode(this.mobile)
        // 显示倒计时
        this.isCountdown = true
      } catch (error) {
        // 手机号校验正则规则不通过导致错误
        if (!error.response) {
          this.$toast.fail('手机号不正确')
        } else {
          // 过于频繁(429) 手机号不正确(404)后端校验
          const status = error.response.data.status
          if (status === 404 || status === 429) {
            this.$toast.fail(error.response.data.message)
          }
        }
      }
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
