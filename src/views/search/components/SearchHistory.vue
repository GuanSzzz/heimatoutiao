<template>
  <div>
    <van-cell-group>
      <van-cell title="搜索历史">
        <template #right-icon>
          <van-icon name="delete-o" v-if="isTrue" @click="changeF" />
          <div v-else>
            <span @click="removeAll">全部清除&nbsp;</span>
            <span @click="changeT">完成</span>
          </div>
        </template>
      </van-cell>
    </van-cell-group>

    <!-- 渲染列表 -->
    <van-cell v-for="(item, index) in historylist" :key="index">
      <template #title>
        <span @click="sandPost(item)">{{ item }}</span>
      </template>
      <template #right-icon v-if="!isTrue">
        <van-icon name="cross" @click="removeOne(index)" />
      </template>
    </van-cell>
  </div>
</template>

<script>
export default {
  data () {
    return {
      historylist: this.$store.state.historylist,
      isTrue: true
    }
  },
  methods: {
    changeF () {
      this.isTrue = false
    },
    changeT () {
      this.isTrue = true
    },
    removeAll () {
      localStorage.removeItem('historylist')
      this.historylist = []
    },
    removeOne (index) {
      this.historylist.splice(index, 1)
      localStorage.setItem('historylist', JSON.stringify(this.historylist))
    },
    sandPost (item) {
      this.$parent.keywords = item
      this.$store.commit('searchValue', item)
      this.$parent.onSearch()
    }
  }
}
</script>

<style></style>
