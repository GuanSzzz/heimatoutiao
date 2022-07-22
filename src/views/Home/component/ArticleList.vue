<template>
  <div>
    <van-pull-refresh
      v-model="refreshing"
      @refresh="loadNextPage"
      success-text="刷新成功~"
    >
      <van-list
        @load="loadNextPage"
        offset="1"
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了~~"
        :error.sync="error"
        error-text="出错了，刷新~"
      >
        <ArticleItem
          v-for="item in articles"
          :key="item.art_id"
          :articleInfo="item"
          :id="item.art_id"
        ></ArticleItem>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import ArticleItem from './ArticleItem.vue'
import { getArticleList } from '@/apis'
export default {
  name: 'ArticleList',
  components: {
    ArticleItem
  },
  props: {
    id: {
      type: [String, Number],
      require: true
    }
  },
  data () {
    return {
      articles: [],
      pre_timestamp: '',
      loading: false,
      finished: false,
      error: false,
      refreshing: false
    }
  },
  methods: {
    // 获取第一页列表
    async getArticleList () {
      try {
        const { data } = await getArticleList(this.id, Date.now())
        // console.log(data)
        // 保存时间戳
        this.pre_timestamp = data.data.pre_timestamp
        this.articles = data.data.results
      } catch (e) {
        const status = e.response.status
        if (status === 400) {
          // 自己new一个错误，可以再控制台看到，提示前端人员
          throw new Error(e.response.data.message)
        } else {
          console.log('请刷新重试')
        }
      }
    },
    // 加载下一页列表
    async loadNextPage () {
      try {
        // if (Math.random() < 0.7) {
        //   throw new Error('错啦')
        // }

        const { data } = await getArticleList(this.id, this.pre_timestamp)
        console.log(data)
        if (!data.data.pre_timestamp) {
          this.finished = true
        }
        // 更新时间戳
        this.pre_timestamp = data.data.pre_timestamp
        // 添加数据
        if (this.refreshing) {
          this.articles.unshift(...data.data.results)
        } else {
          this.articles.push(...data.data.results)
        }
      } catch (e) {
        // console.log(e)
        this.error = true
      } finally {
        this.loading = false
        this.refreshing = false
      }
    }
  },

  created () {
    this.getArticleList()
  }
}
</script>

<style></style>
