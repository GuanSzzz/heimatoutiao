<template>
  <div>
    <img :src="photo" alt="" ref="img" class="img" />
  </div>
</template>

<script>
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'
export default {
  props: ['photo'],
  mounted () {
    const img = this.$refs.img
    this.myCropper = new Cropper(img, {
      // 配置裁剪图片的工具
      viewMode: 3,
      autoCropArea: 1,
      movable: true,
      background: false
    })
  }
}
</script>

<style scoped lang="less">
.img {
  width: 750px;
}
</style>
