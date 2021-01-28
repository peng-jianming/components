<template>
  <span>
    <el-button
      :type="btnType"
      :style="btnStyle"
      :icon="icon"
      :disabled="btnDisabled"
      :size="btnSize"
      :title="btnTitle"
      @click.stop.prevent="validRender"
      >{{ btnText }}</el-button
    >
    <el-dialog
      ref="dialog"
      v-bind="$attrs"
      :width="width"
      :top="dialogTop"
      :visible.sync="isShow"
      custom-class="edit-dialog"
      :append-to-body="appendToBody"
      :lock-scroll="true"
      :title="title"
      @open="opened"
      @close="close"
    >
      <template slot="title">
        <slot name="title"></slot>
      </template>
      <Water-mark-component v-if="isWaterMark">
        <slot></slot>
      </Water-mark-component>
      <template v-else>
        <slot></slot>
      </template>
      <div v-if="isHandleButton" slot="footer" :flex="footerFlex">
        <slot name="extra-button"></slot>
        <el-button type="primary" class="submit-btn" @click="submit">{{
          submitText
        }}</el-button>
        <el-button @click="closeDialog">关闭</el-button>
      </div>
    </el-dialog>
  </span>
</template>

<script>
import WaterMarkComponent from 'src/modules/component/layout/WaterMark';
import ShowSwitchMixin from 'src/modules/mixins/show-switch';
import { isFunction } from 'lodash';

export default {
  components: {
    WaterMarkComponent
  },
  mixins: [ShowSwitchMixin],
  inheritAttrs: false,
  props: {
    btnTitle: {
      type: String
    },
    width: {
      type: String,
      default: '800px'
    },
    isHandleButton: {
      type: Boolean,
      default: true
    },
    isWaterMark: {
      type: Boolean,
      default: true
    },
    submitText: {
      type: String,
      default: '提交'
    },
    footerFlex: {
      type: String,
      default: 'main:right'
    },
    appendToBody: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String
    },
    title: {
      type: String
    },
    btnDisabled: {
      type: Boolean,
      default: false
    },
    btnClass: {
      type: String
    },
    btnText: {
      type: [String, Number],
      default: ''
    },
    btnType: {
      type: String
    },
    btnStyle: {
      type: Object
    },
    btnSize: {
      type: String,
      default: 'medium'
    },
    dialogTop: {
      type: String,
      default: '35px'
    },
    isValidRender: {
      type: Boolean,
      default: false
    },
    validRenderFun: {
      type: Function
    }
  },
  methods: {
    validRender() {
      if (this.isValidRender) {
        const { validRenderFun } = this;
        isFunction(validRenderFun) &&
          validRenderFun().then(() => {
            this.open();
          });
      } else {
        this.open();
      }
    },
    open() {
      this.show();
      this.$emit('open');
    },
    submit() {
      this.$emit('submit', this.closeDialog);
    },
    close() {
      this.$emit('close');
    },
    closeDialog() {
      this.$refs.dialog.handleClose();
      this.close();
    },
    opened() {
      this.$nextTick(() => {
        this.$emit('opened');
      });
    }
  }
};
</script>
