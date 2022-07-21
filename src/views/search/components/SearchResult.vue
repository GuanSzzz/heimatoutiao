<template>
  <div>
    <van-list
      v-model="loading"
      :error="error"
      error-text="请求失败，点击重新加载"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell v-for="(item, index) in resultlist" :key="index">
        <template #title>
          <span>{{ item.title }}</span>
        </template>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
import { getSearchResults } from '@/apis'
export default {
  data () {
    return {
      // 返回结果列表
      resultlist: [],
      // 还包括页数和条数统计
      Results: {},
      loading: false,
      finished: false,
      error: false,
      page: 1
    }
  },
  methods: {
    // 获取第一页
    async getSearchResults () {
      const res = await getSearchResults(this.$store.state.searchvalue)
      this.Results = res.data.data
      this.resultlist = res.data.data.results
      console.log(res)
    },
    // 获取加载页
    async onLoad () {
      try {
        this.page++
        const res1 = await getSearchResults(
          this.$store.state.searchvalue,
          this.page
        )
        console.log(res1.data)
        console.log(this.page)
        this.loading = false
        if (res1.data.data.results.length === 0) {
          // this.page = 1  存疑？？？
          return (this.finished = true)
        }
        this.resultlist.push(...res1.data.data.results)
      } catch (error) {
        this.error = true
      }
    }
  },
  created () {
    // 获取搜索列表
    this.getSearchResults()
  }
}
</script>

<style></style>
