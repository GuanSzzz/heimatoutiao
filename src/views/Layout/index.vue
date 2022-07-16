<template>
  <div>
    <van-tabbar route>
      <van-tabbar-item icon="home-o" to="/ ">
        <span>首页</span>
        <template #icon>
          <i class="toutiao toutiao-shouye"></i>
        </template>
      </van-tabbar-item>
      <van-tabbar-item icon="home-o" to="/video">
        <span>视频</span>
        <template #icon>
          <i class="toutiao toutiao-shipin"></i>
        </template>
      </van-tabbar-item>
      <van-tabbar-item icon="home-o" to="/qa">
        <span>问答</span>
        <template #icon>
          <i class="toutiao toutiao-wenda"></i>
        </template>
      </van-tabbar-item>
      <van-tabbar-item icon="home-o" to="/profile">
        <span>{{ !!$store.state.user.token ? '我的' : '未登录' }}</span>
        <template #icon>
          <i class="toutiao toutiao-wode"></i>
        </template>
      </van-tabbar-item>
    </van-tabbar>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  }
}
</script>

<style scoped lang="less">
:deep(.van-tabbar-item) {
  font-size: 0.32rem;
  .toutiao {
    font-size: 0.5333rem;
  }
}
</style>
