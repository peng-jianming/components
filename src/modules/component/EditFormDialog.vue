<template>
  <edit-dialog-component
    v-bind="$attrs"
    :width="width"
    @submit="submit"
    @open="open"
    @opened="opened"
    @close="close"
  >
    <slot name="header"></slot>
    <form-component
      ref="form"
      v-loading="loading"
      v-bind="$attrs"
      :configs="configs"
      :params="params"
      :data="data"
    >
      <slot></slot>
    </form-component>
  </edit-dialog-component>
</template>

<script>
import EditDialogComponent from 'src/modules/component/EditDialog';
import FormComponent from 'src/modules/component/template/Form';
import EditDataMixin from 'src/modules/mixins/edit-data';
import { filterNotInConfigs } from 'src/modules/utils/params';

export default {
  components: {
    EditDialogComponent,
    FormComponent
  },
  mixins: [EditDataMixin],
  inheritAttrs: false,
  props: {
    configs: {
      type: Array,
      default() {
        return [];
      }
    },
    isResetParams: {
      type: Boolean,
      default: true
    },
    width: {
      type: String,
      default: '55%'
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    submit(callback) {
      const params = this.$refs.form.submit();
      filterNotInConfigs(this.configs, params);
      this.$emit('submit', { params, callback });
    },
    close() {
      this.$emit('close');
    },
    open() {
      this.$nextTick(() => {
        this.$emit('open');
      });
      if (this.isResetParams) {
        this.resetParams();
      }
    },
    opened() {
      this.$nextTick(() => {
        this.$emit('opened');
      });
    }
  }
};
</script>
