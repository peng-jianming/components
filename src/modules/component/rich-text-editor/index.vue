<template>
  <Quill-editor
    ref="myQuillEditor"
    :value="value"
    :options="editorOption"
    @input="handleInput"
  />
</template>
<script>
import QuillEditor from './vue-quill-editor';

export default {
  components: {
    QuillEditor
  },
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      editorOption: {
        placeholder: '',
        theme: 'snow',
        modules: {
          toolbar: {
            container: [
              ['bold', 'italic', 'underline', 'strike'], // 加粗，斜体，下划线，删除线
              ['blockquote', 'code-block'], // 引用，代码块
              [{ header: 1 }, { header: 2 }], // 标题，键值对的形式；1、2表示字体大小
              [{ list: 'ordered' }, { list: 'bullet' }], // 列表
              [{ script: 'sub' }, { script: 'super' }], // 上下标
              [{ indent: '-1' }, { indent: '+1' }], // 缩进
              [{ direction: 'rtl' }], // 文本方向
              [{ header: [1, 2, 3, 4, 5, 6, false] }], // 几级标题
              [{ color: [] }, { background: [] }], // 字体颜色，字体背景颜色
              [{ align: [] }], // 对齐方式
              ['clean'], // 清除字体样式
              ['image', 'video'] // 上传图片、上传视频
            ]
          }
        }
      }
    };
  },
  methods: {
    handleInput(val) {
      this.$emit('input', val);
    }
  }
};
</script>
