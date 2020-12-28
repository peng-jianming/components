import { isEqual } from 'lodash';
export default {
  props: {
    data: {
      type: [Object, Array],
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      params: {}
    };
  },
  watch: {
    data: {
      deep: true,
      handler(data) {
        // 需要有严格变化才会触发更新
        if (!isEqual(this.params, data)) {
          this.updateParams();
        }
      }
    }
  },
  methods: {
    beforeSubmit() {},
    submit(callback) {
      this.beforeSubmit(this.params);
      this.$emit('submit', {
        params: this.params,
        callback
      });
    },
    beforeUpdateParams() {},
    afterUpdateParams() {},
    updateParams() {
      this.beforeUpdateParams(this.params);
      // 增加深拷贝，防止引用到内部属性
      const data = JSON.parse(JSON.stringify(this.data));
      // 设置默认值
      Object.keys(data).forEach(key =>
        this.$set(
          this.params,
          key,
          data[key] === undefined || data[key] === '0000-00-00 00:00:00'
            ? this.params[key]
            : data[key]
        )
      );
      this.afterUpdateParams(this.params);
    },
    resetParams() {
      this.beforeUpdateParams(this.params);
      const data = JSON.parse(JSON.stringify(this.data));
      this.params = data;
      this.afterUpdateParams(data);
    }
  },
  mounted() {
    this.updateParams();
  }
};
