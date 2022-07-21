<template>
  <div>
    <van-cell
      v-for="(item, index) in highlightData"
      :key="index"
      @click="backSearchValue(index)"
    >
      <template #icon>
        <van-icon name="search" class="search-icon" />
      </template>
      <template #title>
        <span v-html="item"></span>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestion } from '@/apis'
export default {
  props: {
    keywords: {
      type: String
    }
  },
  data () {
    return {
      suggestion: []
    }
  },
  watch: {
    // 监视keywords的变化，如果是methods里的方法，可以直接调用，如下
    keywords: {
      immediate: true,
      handler () {
        this.getSearchSuggestion()
      }
    }
  },
  methods: {
    // 请求推荐列表
    async getSearchSuggestion () {
      try {
        const res = await getSearchSuggestion(this.keywords)
        if (res.data.data.options.length === 0) {
          this.$toast.fail('没有提示信息')
        }
        // 小技巧：利用filter(Boolean)可以去除数组的假值
        this.suggestion = res.data.data.options.filter(Boolean)

        console.log(res)
      } catch (error) {}
    },
    // 点击获取搜索关建字 存
    backSearchValue (index) {
      const valuename = this.suggestion[index]
      this.$store.commit('searchValue', valuename)
      this.$parent.showResults = true
      this.$parent.keywords = valuename
    }
  },
  computed: {
    highlightData () {
      // 先New一个正则，里面可以直接传变量,第二个参数是ig
      const reg = new RegExp(this.keywords, 'ig')
      //   数组map遍历，映射关系，第二个参数，是符合函数条件的
      return this.suggestion.map((str) =>
        str.replace(reg, (match) => `<span style="color:red">${match}</span>`)
      )
    }
  }
}
</script>

<style scoped lang="less">
.search-icon {
  padding-top: 10px;
}
</style>
