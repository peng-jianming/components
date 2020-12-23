<template>
  <div>
    <Quill-editor
      ref="myQuillEditor"
      :value="value"
      :options="editorOption"
      @input="handleInput"
    />
  </div>
</template>
<script>
import QuillEditor, { Quill } from './vue-quill-editor';
import { PasteFormat } from './utils/PasteFormat';

Quill.register('module/PasteFormat', PasteFormat);
console.log(Quill.register);

export default {
  components: {
    QuillEditor
  },
  props: {
    value: {
      type: String,
      default: ''
    },
    width: {
      type: [String, Number],
      default: '100%'
    },
    height: {
      type: [String, Number],
      default: '300px'
    }
  },
  data() {
    return {
      editorOption: {}
    };
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill;
    }
  },
  mounted() {
    this.editor.container.style.width = this.width;
    this.editor.container.style.height = this.height;
    console.log('this is current quill instance object', this.editor);
  },
  methods: {
    handleInput(val) {
      this.$emit('input', val);
    }
  }
};
</script>
