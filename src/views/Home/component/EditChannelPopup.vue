<template>
  <van-popup
    v-model="isShow"
    position="bottom"
    closeable
    :style="{
      height: '98%'
    }"
    close-icon-position="top-left"
  >
    <div class="popupMain">
      <!-- 我的频道 -->
      <div class="my-channel">
        <!-- 我的频道标题 -->
        <van-cell title="我的频道">
          <van-button
            size="small"
            round
            class="edit-btn"
            @click="isEdit = !isEdit"
            >{{ isEdit ? '完成' : '编辑' }}</van-button
          >
        </van-cell>
        <!-- 我的频道  -->
        <van-grid :border="false" gutter="10px">
          <van-grid-item
            :text="item.name"
            v-for="(item, index) in myChannels"
            :key="item.id"
            :class="{ 'active-channel': item.name === '推荐' }"
            @click="onClickChannels(item, index)"
          >
            <template #icon>
              <van-icon name="cross" v-show="isEdit && item.name !== '推荐'" />
            </template>
          </van-grid-item>
        </van-grid>
      </div>

      <div class="recommend-channel">
        <!-- 频道推荐 -->
        <van-cell title="频道推荐"> </van-cell>

        <van-grid :border="false" gutter="10px">
          <van-grid-item
            :text="item.name"
            icon="plus"
            v-for="item in recommendChannels"
            :key="item.id"
            @click="addMyChannel(item)"
          >
          </van-grid-item>
        </van-grid>
      </div>
    </div>
  </van-popup>
</template>

<script>
import { getAllChannels } from '@/apis/channel'
export default {
  props: {
    myChannels: {
      type: Array,
      require: true
    }
  },
  data () {
    return {
      isShow: false,
      allChannels: [],
      isEdit: false
    }
  },
  methods: {
    // 获取所有频道列表
    async getAllChannels () {
      const { data } = await getAllChannels()
      console.log(data)
      this.allChannels = data.data.channels
    },
    // 删除我的频道
    onClickChannels (item, index) {
      // 判断情况
      if (this.isEdit && item.name !== '推荐') {
        return this.$emit('delMyChannels', item.id)
      }

      if (!this.isEdit) {
        this.isShow = false
        this.$emit('changeActive', index)
      }
    },
    // 添加频道
    addMyChannel (item) {
      // 浅克隆一下  不要把对象传来传去
      this.$emit('addMyChannels', { ...item })
    }
  },
  created () {
    this.getAllChannels()
  },
  computed: {
    recommendChannels () {
      // 推荐频道=全部频道-我的频道
      return this.allChannels.filter((item) => {
        // const result = this.myChannels.find((ele) => ele.id === item.id)
        // if (result) {
        //   return false
        // } else {
        //   return true
        // }
        // console.log(this.myChannels)
        // 兼容处理
        return !this.myChannels?.find((ele) => ele.id === item.id)
      })
    }
  }
}
</script>

<style scoped lang="less">
// 高亮
.active-channel {
  :deep(.van-grid-item__text) {
    color: red;
  }
}
// 按钮
.popupMain {
  padding-top: 100px;
  .edit-btn {
    color: red;
    padding: 0 30px;
    height: 48px;
    border: 0.02667rem solid red;
  }
  //   宫格
  .my-channel {
    :deep(.van-grid-item__content) {
      background-color: #eee;
      position: relative;

      .van-grid-item__icon-wrapper {
        position: absolute;
        top: 0;
        right: 0;

        .van-icon-cross {
          position: absolute;
          top: 0;
          right: 0;
          transform: translate(20%, -35%);
          border: 0.02667rem solid #000;
          border-radius: 50%;
          text-align: center;
          font-size: 32px;
        }
      }
    }
  }
}
// 推荐频道的样式
.recommend-channel {
  // 推荐频道加号样式
  :deep(.van-grid-item__content) {
    flex-direction: row;
    background-color: #eee;

    .van-grid-item__icon {
      font-size: 0.5rem;
    }

    .van-grid-item__text {
      margin-top: 0;
    }
  }
}
</style>
