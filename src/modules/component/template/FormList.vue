<template>
  <div :class="{ 'template-form--inline': inline, clearfloat: inline }">
    <el-form
      :label-width="labelWidth"
      :label-position="labelPosition"
      @submit.native.prevent
    >
      <template
        v-for="{
          prop,
          displayProp,
          label,
          width,
          enums,
          listComponent,
          isFull,
          sep,
          isHtml,
          formItemWidth,
          formItemInline,
          ...arg
        } in configs"
      >
        <el-form-item
          :key="prop"
          :label="label"
          :label-width="width"
          :style="{ width: formItemWidth }"
          :class="{ 'template-form--inline-block': formItemInline }"
        >
          <slot :name="prop">
            <!--优先使用动态组件处理-->
            <component
              :is="listComponent"
              v-if="listComponent"
              v-model="isFull ? data : data[prop]"
              v-bind="{
                ...$attrs,
                ...arg
              }"
              :prop="prop"
              :data="isFull ? data : data[prop]"
              @reload="handleReload"
              @submit="handleSubmit"
            />
            <!--专用显示字段-->
            <span v-else-if="displayProp">{{
              data[displayProp] | mapArray(sep) | mapDefault
            }}</span>
            <!--使用枚举格式化数组字段信息-->
            <span v-else-if="enums && Array.isArray(data[prop])">{{
              listEnumsValue(enums, data[prop], sep) | mapDefault
            }}</span>
            <!--使用枚举显示字段信息-->
            <span v-else-if="enums">{{
              getEnumsValue(enums, data[prop]) | mapDefault
            }}</span>
            <div v-else-if="isHtml" v-html="data[prop]"></div>
            <!--默认显示-->
            <span v-else>{{ data[prop] | mapArray(sep) | mapDefault }}</span>
          </slot>
        </el-form-item>
        <slot></slot>
      </template>
    </el-form>
    <el-form
      :label-width="labelWidth"
      :label-position="labelPosition"
      @submit.native.prevent
    >
      <slot></slot>
    </el-form>
  </div>
</template>

<script>
import GetEnumsValueMixin from 'src/modules/mixins/get-enums-value';
import { isFullEmpty } from 'src/modules/utils/params';

export default {
  name: 'FormList',
  filters: {
    mapDefault(val) {
      return isFullEmpty(val) ? '--' : val;
    },
    mapArray(val, sep = ';') {
      return Array.isArray(val) ? val.join(sep) : val;
    }
  },
  mixins: [GetEnumsValueMixin],
  props: {
    inline: {
      type: Boolean,
      default: false
    },
    configs: {
      type: Array,
      default() {
        return [];
      }
    },
    data: {
      type: Object,
      default() {
        return {};
      }
    },
    labelWidth: {
      type: String,
      default: '100px'
    },
    labelPosition: {
      type: String,
      default: 'right'
    }
  },
  methods: {
    handleReload(data) {
      this.$emit('reload', data);
    },
    handleSubmit(data) {
      this.$emit('submit', data);
    }
  }
};
</script>
<style scoped>
.template-form--inline > .el-form {
  float: left;
}
.template-form--inline-block {
  display: inline-block;
}
</style>
