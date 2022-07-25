<template>
  <div>
    <!-- 获取评论的评论 渲染列表 -->
    <!-- 弹出层 -->
    <van-popup
      v-model="show"
      close-icon-position="top-left"
      closeable
      position="bottom"
      :style="{ height: '100%' }"
    >
      <van-nav-bar
        :title="
          comlist.reply_count ? `${comlist.reply_count}条回复` : `暂无回复`
        "
      />
      <!-- 第一个主评论 -->
      <ComItemVue :Obj="comlist"></ComItemVue>
      <van-cell>全部评论</van-cell>
      <!-- 评论的评论 -->
      <van-list
        v-model="loading"
        :error="error"
        error-text="请刷新啦~~"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <ComItemVue
          v-for="(item, index) in comComlist"
          :key="index"
          :Obj="item"
        ></ComItemVue>
      </van-list>
      <!-- 底部评论按钮 -->
      <div class="footer-btn">
        <van-button round class="sendbtn" @click="sendBtn">评论</van-button>
      </div>
      <!-- 评论弹窗 -->
      <van-popup
        v-model="isShow"
        position="bottom"
        :style="{ height: '15%' }"
        class="popup-box"
      >
        <!-- 弹出文本域 -->
        <van-field
          v-model="message"
          rows="2"
          autosize
          type="textarea"
          maxlength="50"
          placeholder="请输入留言"
          show-word-limit
          class="popup-txt"
        />
        <van-button class="popup-btn" @click="sendMsg">发布</van-button>
      </van-popup>
    </van-popup>
  </div>
</template>

<script>
// 引入组件
import ComItemVue from '@/components/ComItem.vue'
// 引入api
import { getComComentsList, setComentsText } from '@/apis/comments.js'
export default {
  props: {
    artId: {
      type: String
    }
  },
  data () {
    return {
      comlist: {},
      show: false,
      comComlist: [],
      loading: false,
      finished: false,
      error: false,
      comlastId: '',
      isShow: false,
      message: ''
    }
  },
  components: {
    ComItemVue
  },
  methods: {
    // 获取评论的评论
    async getComComentsList () {
      const res = await getComComentsList(this.comlist.com_id)
      this.comComlist = res.data.data.results
      this.comlastId = res.data.data.last_id

      console.log(res)
    },
    // 获取下一页的评论
    async onLoad () {
      try {
        const res = await getComComentsList(this.comlist.com_id, this.comlastId)
        this.comlastId = res.data.data.last_id
        this.loading = false
        // console.log(res)
        if (this.comlastId === res.data.data.end_id) {
          return (this.finished = true)
        }
        this.comComlist.push(...res.data.data.results)
      } catch (error) {
        console.log(error)
        this.error = true
      }
    },
    sendBtn () {
      this.isShow = true
    },
    async sendMsg () {
      if (this.message.trim().length === 0) {
        return this.$toast.fail('内容不能为空')
      }
      const res = await setComentsText(
        this.comlist.com_id,
        this.message,
        this.artId
      )
      console.log(res)
      this.comComlist.unshift(res.data.data.new_obj)
      this.isShow = false
      this.message = ''
    }
  },
  watch: {
    comlist: {
      deep: true,
      handler () {
        this.getComComentsList()
      }
    }
  }
}
</script>

<style scoped lang="less">
.footer-btn {
  width: 100%;
  height: 100px;
  position: fixed;
  bottom: 0;
  border-top: 0.01333rem solid #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ff69b4;
  line-height: 100px;
  .sendbtn {
    width: 640px;
    height: 80px;
  }
}
// 评论弹框
.popup-box {
  display: flex;
  align-items: center;
  padding: 0.42667rem 0 0.42667rem 0.42667rem;
  .popup-txt {
    background-color: #f5f7f9;
    box-sizing: border-box;
    width: 78%;
    padding: 0.26667rem 0.42667rem;
    overflow: hidden;
    color: #323233;
    font-size: 0.37333rem;
    line-height: 0.64rem;
  }
  .popup-btn {
    border: none;
    color: #6ba3d8;
    line-height: 1.2;
    text-align: center;
    font-size: 0.37333rem;
  }
}
</style>
