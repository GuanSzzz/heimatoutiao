<template>
  <div class="body">
    <!-- 头部 -->
    <HeaderVue title="个人信息"></HeaderVue>
    <!-- 内容 -->
    <!-- 头像 -->
    <form>
      <input type="file" ref="files" hidden accept=".jpg,.png,.gif" />
      <van-cell title="头像" is-link @click="updataPhoto">
        <van-image round width="1rem" height="1rem" :src="imgUrl" />
      </van-cell>
      <van-popup v-model="show" v-if="show" class="popup">
        <updataPhoto :photo="photo" ref="upPhoto"></updataPhoto>
        <button class="left" @click="show = false">取消</button>
        <button class="right" @click="confirm">确认</button>
      </van-popup>
    </form>
    <!-- 昵称 -->
    <van-cell
      title="昵称"
      is-link
      :value="message_name"
      @click="show_name = true"
    />
    <!-- 昵称/弹窗 -->
    <van-popup
      v-model="show_name"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <van-nav-bar
        title="更新昵称"
        left-text="取消"
        right-text="保存"
        left-arrow
        @click-left="show_name = false"
        @click-right="onClickRight"
      />
      <van-field
        v-model="message_name"
        rows="2"
        autosize
        type="textarea"
        maxlength="7"
        show-word-limit
      />
    </van-popup>
    <!-- 性别 -->
    <van-cell
      title="性别"
      is-link
      :value="message_sex ? '女' : '男'"
      @click="show_sex = true"
    />
    <!-- 性别/弹窗 -->
    <van-popup v-model="show_sex" position="bottom" :style="{ height: '40%' }">
      <van-picker
        title="标题"
        show-toolbar
        :columns="sexcolumns"
        @confirm="onConfirm_sex"
        @cancel="show_sex = false"
      />
    </van-popup>
    <!-- 年纪 -->
    <van-cell
      title="生日"
      is-link
      :value="message_age"
      @click="show_age = true"
    />
    <!-- 年龄/弹窗 -->
    <van-popup v-model="show_age" position="bottom" :style="{ height: '40%' }">
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        title="选择年月日"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="selectAge"
        @cancel="show_age = false"
      />
    </van-popup>
  </div>
</template>

<script>
import dayjs from '@/utils/dayjs'
import HeaderVue from '@/components/Header.vue'
import updataPhoto from './UpdataPhoto'
import { uploadPhoto, getuserinfo, setUserInfo } from '@/apis/UpPhoto'
export default {
  components: {
    HeaderVue,
    updataPhoto
  },
  data () {
    return {
      photo: '',
      show: false,
      userInfoList: '',
      imgUrl: '',
      show_name: false,
      message_name: '',
      show_sex: false,
      sexcolumns: ['男', '女'],
      message_sex: '',
      show_age: false,
      message_age: '',
      minDate: new Date(1900, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date()
    }
  },
  methods: {
    // 获取个人信息
    async getuserinfo () {
      const res = await getuserinfo()
      console.log(res)
      this.userInfoList = res.data.data
      this.imgUrl = res.data.data.photo
      this.message_name = res.data.data.name
      this.message_sex = res.data.data.gender
      this.message_age = res.data.data.birthday
    },
    // 模拟点击事件，弹出文件选择框
    updataPhoto () {
      this.$refs.files.click()
    },
    // 确认按钮，上传照片
    confirm () {
      try {
        this.$toast.loading({
          message: '加载中...',
          forbidClick: true,
          duration: 0
        })
        const fm = new FormData()
        this.$refs.upPhoto.myCropper.getCroppedCanvas().toBlob(async (blob) => {
          fm.append('photo', blob)
          const res = await uploadPhoto(fm)
          this.imgUrl = res.data.data.photo
          this.$toast.success('上传成功')
        })
        this.show = false
      } catch (error) {}
    },

    // 确认按钮，昵称
    async onClickRight () {
      //   console.log('发请求')
      if (this.message_name.trim().length === 0) {
        return this.$toast.fail('内容不能为空')
      }
      try {
        await setUserInfo({ name: this.message_name })
        this.show_name = false
        this.$toast.success('修改成功')
      } catch (error) {
        this.$toast.fail('修改失败')
      }
    },
    // 确认按钮，性别
    async onConfirm_sex (value, index) {
      //   console.log(`当前值：${value}, 当前索引：${index}`)
      try {
        await setUserInfo({ gender: index })
        this.message_sex = value
        this.show_sex = false
        this.$toast.success('修改成功')
      } catch (error) {
        this.$toast.fail('修改失败')
      }
    },
    // 确定按钮,生日
    async selectAge (value) {
      //   console.log(value)
      try {
        const data = dayjs(value).format('YYYY - MM - DD')
        this.message_age = data
        await setUserInfo({ birthday: data })
        this.$toast.success('修改成功')
        this.show_age = false
      } catch (error) {
        this.$toast.fail('修改失败')
      }
    }
  },
  created () {
    this.getuserinfo()
  },
  mounted () {
    this.$refs.files.addEventListener('change', (e) => {
      // e.target 触发事件的元素
      const file = e.target.files[0]
      //   console.log(photo)
      //   图片阅读器
      const fr = new FileReader()
      //   读取破译地址
      fr.readAsDataURL(file)
      //   破译过程中的方法，可以等到破译完成，读取到地址
      fr.onload = (e) => {
        this.photo = e.target.result
        this.show = true
      }
    })
  }
}
</script>

<style scoped lang="less">
.body {
  padding-top: 92px;
}
.popup {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  background-color: #000;
}
.left {
  position: fixed;
  bottom: 0;
  left: 0;
}
.right {
  position: fixed;
  bottom: 0;
  right: 0;
}
</style>
