<template>
  <div>
    <form action="/">
      <van-search
        v-model="keywords"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="backPrege"
        @focus="visibleSearchSuggestion"
        background="#3296fa"
        class="search"
      />
    </form>

    <!-- 历史、结果、推荐 -->
    <component :is="comName" :keywords="keywords"></component>
    <!-- <SearchHistory></SearchHistory>
    <SearchResult></SearchResult>
    <SearchSuggestion></SearchSuggestion> -->
  </div>
</template>

<script>
import SearchHistory from './components/SearchHistory.vue'
import SearchResult from './components/SearchResult.vue'
import SearchSuggestion from './components/SearchSuggestion.vue'
export default {
  data () {
    return {
      keywords: '',
      showResults: false
    }
  },
  computed: {
    comName () {
      // 如果没有输入内容，显示历史
      if (this.keywords.trim() === '') {
        return 'SearchHistory'
      }
      // 如果有搜索结果，显示搜索结果
      if (this.showResults) {
        return 'SearchResult'
      }

      return 'SearchSuggestion'
    }
  },
  methods: {
    // 获得焦点时 不能显示搜索结果，而是显示搜索建议
    visibleSearchSuggestion () {
      this.showResults = false
    },
    // 按下搜索
    onSearch () {
      this.showResults = true
      this.$store.commit('searchValue', this.keywords)
      // console.log(11)
    },
    // 返回上一页
    backPrege () {
      this.$router.go(-1)
    }
  },
  components: {
    SearchHistory,
    SearchResult,
    SearchSuggestion
  }
}
</script>

<style scoped lang="less">
.search {
  [role='button'] {
    color: #fff;
  }
}
</style>
