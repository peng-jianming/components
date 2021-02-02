<template>
  <el-table
    v-loading="loading"
    :stripe="stripe"
    :border="border"
    :data="datas"
    :height="height"
    :size="size"
    :span-method="spanMethod"
    :max-height="maxHeight"
    @sort-change="handleSortChange"
    @selection-change="handleSelectionChange"
  >
    <el-table-column v-if="showIndex" label="序号" type="index" width="50" />
    <el-table-column
      v-if="selection"
      label="全选"
      type="selection"
      align="left"
    />
    <el-table-column v-if="hasExpandFiled" type="expand" align="left">
      <el-form slot-scope="{ row }" label-width="80px">
        <el-form-item
          v-for="{
            prop,
            label,
            isExpand,
            enums,
            displayProp,
            listComponent,
            isHtml,
            isFull,
            sep
          } in configs"
          v-if="isExpand"
          :key="prop"
          :label="label"
        >
          <component
            :is="listComponent"
            v-if="listComponent"
            :value="isFull ? row : row[prop]"
            v-bind="$attrs"
            :prop="prop"
            :data="isFull ? row : row[prop]"
            @reload="handleReload"
          />
          <span v-else-if="isHtml" v-html="showDetail(row[prop])"></span>
          <!--专用显示字段-->
          <span v-else-if="displayProp">{{
            row[displayProp] | mapArray(sep) | mapDefault
          }}</span>
          <!--使用枚举格式化数组字段信息-->
          <span v-else-if="enums && Array.isArray(row[prop])">{{
            listEnumsValue(enums, row[prop], sep) | mapDefault
          }}</span>
          <!--使用枚举显示字段信息-->
          <span v-else-if="enums">{{
            getEnumsValue(enums, row[prop]) | mapDefault
          }}</span>
          <!--默认显示-->
          <span v-else>{{ row[prop] | mapArray(sep) | mapDefault }}</span>
        </el-form-item>
      </el-form>
    </el-table-column>
    <el-table-column
      v-for="{
        prop,
        label,
        isExpand,
        listComponent,
        enums,
        displayProp,
        isFull,
        isHtml,
        width,
        sortable,
        hideTooltip,
        sep,
        ...arg
      } in configs"
      v-if="!isExpand"
      :key="prop"
      v-bind="arg"
      :show-overflow-tooltip="!hideTooltip"
      :width="width"
      :label="label"
      :sortable="sortable"
      align="left"
    >
      <template slot-scope="{ row }">
        <component
          :is="listComponent"
          v-if="listComponent"
          v-model="isFull ? row : row[prop]"
          v-bind="{
            ...$attrs,
            ...arg
          }"
          :prop="prop"
          :data="isFull ? row : row[prop]"
          @reload="handleReload"
        />
        <span v-else-if="isHtml" v-html="showDetail(row[prop])"></span>
        <!--专用显示字段-->
        <span v-else-if="displayProp">{{
          row[displayProp] | mapArray(sep) | mapDefault
        }}</span>
        <!--使用枚举格式化数组字段信息-->
        <span v-else-if="enums && Array.isArray(row[prop])">{{
          listEnumsValue(enums, row[prop], sep) | mapDefault
        }}</span>
        <!--使用枚举显示字段信息-->
        <span v-else-if="enums">{{
          getEnumsValue(enums, row[prop]) | mapDefault
        }}</span>
        <!--默认显示-->
        <span v-else>{{ row[prop] | mapArray(sep) | mapDefault }}</span>
      </template>
    </el-table-column>
    <!--可以增加额外的列-->
    <slot></slot>
    <template slot="empty">
      <slot name="empty"></slot>
    </template>
    <template slot="append">
      <slot name="append"></slot>
    </template>
  </el-table>
</template>

<script>
import { isNil } from 'lodash';
import { isFullEmpty } from 'src/modules/utils/params';
import GetEnumsValueMixin from 'src/modules/mixins/get-enums-value';

export default {
  name: 'TemplateList',
  filters: {
    mapDefault(val) {
      return isFullEmpty(val) ? '--' : val;
    },
    mapArray(val, sep = ';') {
      return Array.isArray(val) ? val.join(sep) : val;
    }
  },
  mixins: [GetEnumsValueMixin],
  inheritAttrs: false,
  props: {
    configs: {
      type: Array,
      default() {
        return [];
      }
    },
    datas: {
      type: Array,
      default() {
        return [];
      }
    },
    stripe: {
      type: Boolean,
      default: true
    },
    border: {
      type: Boolean,
      default: true
    },
    height: {
      type: [Number, String]
    },
    size: {
      type: String,
      default: 'small'
    },
    selection: {
      type: Boolean,
      default: false
    },
    showIndex: {
      type: Boolean,
      default: false
    },
    spanMethod: {
      type: Function
    },
    loading: {
      type: Boolean,
      default: false
    },
    maxHeight: {
      type: Number
    }
  },
  computed: {
    hasExpandFiled() {
      const config = this.configs || [];
      return config.some(list => list.isExpand);
    }
  },
  methods: {
    // 替换所有标签为空字符串
    showDetail(result = '') {
      return result.replace(/(<(.[^>]*)>)|(&nbsp;)/g, '');
    },
    handleSelectionChange(row) {
      this.$emit('selection-change', row);
    },
    handleSortChange(val) {
      if (isNil(val.column) || isNil(val.order)) return;
      const { column, order } = val;
      const config = this.configs.find(({ label }) => column.label === label);
      this.$emit('sort-change', { prop: config.prop, order });
    },
    handleReload(data) {
      this.$emit('reload', data);
    }
  }
};
</script>
