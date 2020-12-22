export default {
  data() {
    return {
      isLoading: false
    };
  },
  methods: {
    beforeLoading() {},
    afterLoading() {},
    loading() {
      this.beforeLoading();
      this.isLoading = true;
    },
    loaded() {
      this.afterLoading();
      this.isLoading = false;
    }
  }
};
