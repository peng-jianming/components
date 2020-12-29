<template>
  <div :class="{ 'template-form--inline': inline, clearfloat: inline }">
    <el-form
      v-if="!isLoading"
      :label-width="labelWidth"
      :label-position="labelPosition"
      @submit.native.prevent
    >
      <template
        v-for="{
          prop,
          label,
          type,
          enums,
          props,
          required,
          editComponent,
          pickerOptions,
          valueFormat,
          isFull,
          disabled,
          placeholder,
          inputClass,
          rows,
          maxlength,
          border,
          min,
          max,
          step,
          width,
          displayProp,
          formItemWidth,
          formItemInline,
          ...arg
        } in configs"
      >
        <el-form-item
          :key="prop"
          :required="required && !isQuery"
          :label="label"
          :label-width="width"
          :style="{ width: formItemWidth }"
          :class="{ 'template-form--inline-block': formItemInline }"
        >
          <slot :name="prop">
            <component
              :is="editComponent"
              v-if="editComponent"
              :ref="prop"
              v-model="isFull ? params : params[prop]"
              :prop="prop"
              :props="props"
              :class="inputClass"
              :data="isFull ? params : params[prop]"
              :value-display="params[displayProp]"
              :disabled="disabled"
              :placeholder="placeholder"
              v-bind="{
                ...$attrs,
                ...arg
              }"
              @input="handleInput(prop, $event, isFull)"
              @update:data="handleInput(prop, $event, isFull)"
            />
            <el-select
              v-else-if="
                (type === 'multiple-select' || type === 'select') && enums
              "
              v-model="params[prop]"
              filterable
              class="select"
              :class="inputClass"
              :multiple="type === 'multiple-select'"
              :collapse-tags="!arg.notCollapseTags"
              :disabled="disabled"
              :placeholder="placeholder"
            >
              <el-option v-if="isQuery" value="" label="全部" />
              <el-option
                v-for="{ id, value } in enums"
                :key="id"
                :value="id"
                :label="value"
              />
            </el-select>
            <el-checkbox-group
              v-else-if="type === 'checkbox' && enums"
              v-model="params[prop]"
              :class="inputClass"
              :disabled="disabled"
            >
              <el-checkbox
                v-for="{ id, value } in enums"
                :key="id"
                :label="id"
                :border="border"
                >{{ value }}</el-checkbox
              >
            </el-checkbox-group>
            <el-radio-group
              v-else-if="type === 'radio' && enums"
              v-model="params[prop]"
              :class="inputClass"
              :disabled="disabled"
              :placeholder="placeholder"
            >
              <el-radio
                v-for="{ id, value } in enums"
                :key="id"
                :label="id"
                :border="border"
                >{{ value }}</el-radio
              >
            </el-radio-group>
            <el-date-picker
              v-else-if="type === 'datetimerange'"
              :class="inputClass"
              :value="params[prop]"
              type="datetimerange"
              :default-time="['00:00:00', '23:59:59']"
              :range-separator="arg.rangeSeparator || '-'"
              :start-placeholder="arg.startPlaceholder || '开始日期'"
              :end-placeholder="arg.endPlaceholder || '结束时间'"
              :picker-options="pickerOptions"
              :disabled="disabled"
              @input="handleDateTimeRangePick(prop, props, $event)"
            />
            <el-date-picker
              v-else-if="type === 'date'"
              v-model="params[prop]"
              :class="inputClass"
              type="date"
              :picker-options="pickerOptions"
              :disabled="disabled"
              :value-format="valueFormat"
              :placeholder="placeholder || '选择日期'"
            >
            </el-date-picker>
            <el-date-picker
              v-else-if="type === 'datetime'"
              v-model="params[prop]"
              :class="inputClass"
              type="datetime"
              :picker-options="pickerOptions"
              :disabled="disabled"
              :value-format="valueFormat"
              :placeholder="placeholder || '选择日期时间'"
            >
            </el-date-picker>
            <el-input-number
              v-else-if="type === 'number'"
              v-model="params[prop]"
              v-bind="arg"
              :min="min"
              :max="max"
              :placeholder="placeholder || `请输入${label}`"
              :step="step || 1"
              controls-position="right"
              :disabled="disabled"
            ></el-input-number>
            <el-input
              v-else-if="type === 'textarea'"
              v-model="params[prop]"
              v-bind="arg"
              type="textarea"
              :rows="rows"
              :maxlength="maxlength"
              :class="inputClass"
              :placeholder="placeholder || `请输入${label}`"
              :disabled="disabled"
            />
            <el-input
              v-else
              v-model="params[prop]"
              :class="inputClass"
              :placeholder="placeholder || `请输入${label}`"
              :disabled="disabled"
            />
          </slot>
        </el-form-item>
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
import LoadingMixin from 'src/modules/mixins/loading';
import moment from 'moment';
import { isFunction } from 'lodash';
import {
  isFullEmpty,
  filterEmpty,
  validateWithMessage
} from 'src/modules/utils/params';

const DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';

export default {
  name: 'TemplateForm',
  mixins: [LoadingMixin],
  inheritAttrs: false,
  props: {
    isQuery: {
      type: Boolean,
      default: false
    },
    isFilterEmpty: {
      type: Boolean,
      default: true
    },
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
    params: {
      type: Object,
      default() {
        return {};
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
  created() {
    // 确保数据处理正确后，再渲染组件，避免组件错误使用默认值
    this.loading();
    this.registerParams();
    this.$nextTick(() => {
      this.loaded();
    });
  },
  methods: {
    registerParams() {
      // 为所有没有复合的props的字段注册监听
      this.configs
        .filter(({ props }) => !props)
        .forEach(({ prop }) => {
          this.params[prop] === undefined &&
            this.$set(this.params, prop, undefined);
        });
      // 注册复合props,并添加对应关系
      this.configs
        .filter(({ props }) => props)
        .forEach(({ props }) => {
          props.forEach(prop => {
            this.params[prop] === undefined &&
              this.$set(this.params, prop, undefined);
          });
        });
    },
    resetParams() {
      this.configs.forEach(({ prop, props = [], defaultValue }) => {
        const keys = props.includes(prop) ? props : props.concat(prop);
        keys.forEach((prop, index) => {
          // 优先获取路径参数
          const uriValue = this.$route.query[prop];
          // 复合条件时优先考虑uriValue再挨个赋值defaultValue
          const value = !isFullEmpty(uriValue)
            ? uriValue
            : Array.isArray(defaultValue) && props.length > 0
            ? defaultValue[index]
            : defaultValue;
          // 忽略undefined和null的深拷贝
          this.$set(
            this.params,
            prop,
            value === undefined ? undefined : JSON.parse(JSON.stringify(value))
          );
        });
      });
      this.$emit('reset');
      // 动态组件重置
      const refs = this.$refs || {};
      Object.values(refs)
        .filter(ref => ref && ref[0] && isFunction(ref[0].reset))
        .forEach(ref => {
          ref[0] && ref[0].reset();
        });
    },
    submit() {
      this.$emit('before-submit');
      // 动态组件提交
      const refs = this.$refs || {};
      Object.values(refs)
        .filter(ref => ref && ref[0] && isFunction(ref[0].submit))
        .forEach(ref => {
          ref[0] && ref[0].submit();
        });
      // 查询模式直接返回参数，表单模式需要验证信息
      if (
        this.isQuery ||
        validateWithMessage(this.configs, this.params, this.data)
      ) {
        this.$emit('submit');
        return this.isFilterEmpty ? filterEmpty(this.params) : this.params;
      }
    },
    handleDateTimeRangePick(timeKey, [startTimeKey, endTimeKey], range) {
      let [startTime, endTime] = range || [undefined, undefined];
      // 将date格式转为字符串
      startTime = startTime && moment(startTime).format(DATE_FORMAT);
      endTime = endTime && moment(endTime).format(DATE_FORMAT);
      this.$set(this.params, startTimeKey, startTime);
      this.$set(this.params, endTimeKey, endTime);
      this.$set(this.params, timeKey, [startTime, endTime]);
    },
    handleInput(prop, val, isFull) {
      // 多字段暂不支持自动input
      if (isFull) {
        this.$emit('change');
        return;
      }
      const param = this.params[prop];
      if (Array.isArray(param)) {
        param.splice(0, param.length);
        param.splice(0, 0, ...val);
      } else {
        this.$set(this.params, prop, val);
      }
      this.$emit('change', prop, val);
    }
  }
};
</script>

<style lang="less">
.template-form--inline > .el-form {
  float: left;
}
.template-form--inline-block {
  display: inline-block;
}
.el-form {
  .el-input,
  .el-input__inner,
  .el-select,
  .el-autocomplete {
    width: 100%;
  }
}
</style>
