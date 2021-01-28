<template>
  <el-upload
    ref="imgUpload"
    action=""
    class="avatar-uploader"
    :show-file-list="false"
    :auto-upload="false"
    :on-change="onchange"
  >
    <img :src="data[avatar.prop]" class="avatar" />
    <i class="el-icon-plus avatar-uploader-icon"></i>
  </el-upload>
</template>

<script>
import { postUserAvatar } from 'src/dependencies/api/user';
import { avatar } from 'src/dependencies/fields/login';
export default {
  props: {
    data: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      avatar
    };
  },
  methods: {
    async onchange(file) {
      // element组件会多次上传,需要清除已上传文件目录,来阻止
      this.$refs.imgUpload.clearFiles();
      const form = new FormData();
      form.append('file', file.raw);
      const { data } = await postUserAvatar({
        data: form
      });
      if (data && data.code === 0) {
        this.data[avatar.prop] = data.data.url;
      }
    }
  }
};
</script>
<style lang="less">
.avatar-uploader .el-upload {
  position: relative;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader .el-upload:hover .avatar-uploader-icon {
  display: block;
}
.avatar-uploader-icon {
  display: none;
  position: absolute;
  z-index: 9999;
  left: 0;
  top: 0;
  font-size: 28px;
  color: #8c939d;
  width: 150px;
  height: 150px;
  line-height: 150px;
  text-align: center;
}
.avatar {
  width: 150px;
  height: 150px;
  display: block;
}
</style>
