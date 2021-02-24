<template>
  <el-autocomplete
    v-model="queryString"
    v-loading="isLoading"
    :fetch-suggestions="querySearch"
    placeholder="请输入用户名"
    value-key="user_name"
    highlight-first-item
    :debounce="800"
    :disabled="disabled"
    @focus="focus"
    @blur="blur"
    @select="handleSelect"
    @input="handleChange"
    @keyup.delete.native="handleDelete"
  />
</template>

<script>
import { uniq } from 'lodash';
import { getSearchUser } from 'src/dependencies/api/ticket/list';
import londingMixins from 'src/modules/mixins/loading';
export default {
  mixins: [londingMixins],
  props: {
    value: {
      type: String,
      default: ''
    },
    singleton: {
      type: Boolean,
      default: true
    },
    delimiter: {
      type: String,
      default: ';'
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      queryString: this.value,
      cacheNameList: []
    };
  },
  watch: {
    value(val) {
      this.queryString = val;
    }
  },
  methods: {
    handleDelete(e) {
      // 删除时删除整个名字
      const names = e.srcElement.value.split(this.delimiter);
      const lastName = names.pop();
      const value = names.filter(name => this.cacheNameList.includes(name));
      this.queryString = [...value, lastName].join(this.delimiter);
    },
    handleChange(val) {
      this.queryString = val;
      this.$emit('input', val);
    },
    handleSelect(val) {
      // 原本功能选中会将整体删除,替换成选中内容
      // 当选中时,会触发blur再进入这里,但是此时取到的queryString为当前输入内容,并不一定完整
      // 需要通过这里拿到选择的内容,再通过blur后value的内容拼接,才是完整的
      // 有可能输入完整才选择内容,那么,就会重复,所以需要去重
      const values = this.singleton ? [] : this.value.split(this.delimiter);
      values.push(val.user_name);
      this.handleChange(uniq(values.filter(name => name)).join(this.delimiter));
    },
    async querySearch(q, cb) {
      // 当点击获取焦点时,自动搜索当前输入人名并缓存结果
      if (this.singleton) {
        this.getUser(q, cb);
      } else {
        // 当多人模式时,需要将所有人名查询缓存
        const names = q.split(this.delimiter);
        await Promise.all(names.map(name => this.getUser(name)));
        const lastName = names.pop();
        this.getUser(lastName, cb);
      }
    },
    async getUser(q, cb = () => {}) {
      this.loading();
      const defaulValue = [];
      // 当查询数据为空时返回空数组不展开查询列表
      if (!q || !q.trim()) {
        cb(defaulValue);
        this.loaded();
      } else if (this.cacheNameList.includes(q)) {
        // 当查询数据在缓存里面,则直接取缓存里面的(防止已经填写完成的名字多次请求)
        cb(
          this.cacheNameList
            .filter(name => name.indexOf(q) !== -1)
            .map(name => {
              return { user_name: name };
            })
        );
        this.loaded();
      } else {
        const { data } = await getSearchUser({
          query: { q }
        });
        if (data && data.code === 0) {
          // 缓存已搜索的人名
          this.cacheNameList = uniq([
            ...this.cacheNameList,
            ...data.data.map(item => item.user_name)
          ]);
          cb(data.data);
          this.loaded();
        }
      }
    },
    focus() {
      // 多人模式且当前内容不为空且末尾不是分隔符,就在获取焦点时添加分隔符
      !this.singleton &&
        this.queryString.trim() &&
        !this.queryString.endsWith(this.delimiter) &&
        (this.queryString += this.delimiter);
    },
    async blur() {
      // 当失去焦点时,所有人名都需要查询缓存,并丢弃查询不到的人
      if (this.queryString.trim()) {
        const names = this.singleton
          ? [this.queryString]
          : this.queryString.split(this.delimiter);
        const value = uniq(
          names.filter(name => name && this.cacheNameList.includes(name))
        ).join(this.delimiter);
        this.handleChange(value);
      }
    }
  }
};
</script>
