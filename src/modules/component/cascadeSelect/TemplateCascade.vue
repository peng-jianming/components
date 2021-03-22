<template>
  <cascade-select
    ref="cascadeSelect"
    :level-data="levelData"
    :current-index="currentIndex"
    :loadings="loadings"
    :disabled="disabled"
    @change="handleLevelChange"
  />
</template>
<script>
import CascadeSelect from 'src/libs/components/layout/CascadeSelect';
const FIRST_INDEX = -1;

export default {
  components: {
    CascadeSelect
  },
  props: {
    data: {
      type: Object,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      levelData: [],
      loadings: [],
      maxIndex: 2,
      currentIndex: FIRST_INDEX
    };
  },
  created() {
    this.initLevelData();
    this.initData();
  },
  methods: {
    initData() {
      this.updateLevelData(0, 0);
      this.currentIndex = FIRST_INDEX;
      this.$refs.cascadeSelect && this.$refs.cascadeSelect.reset();
    },
    initLevelData() {
      this.levelData = [];
      let index = 0;
      while (index <= this.maxIndex) {
        index = index + 1;
        this.levelData.push([]);
      }
    },
    async updateLevelData(val, level) {
      if (!val && val !== 0) return;
      if (level > this.maxIndex) return;
      this.$set(this.levelData, level, []);
      this.loadings[level] = true;
      const { data } = await this.getLevelData({
        val,
        init: level === 0,
        level,
        serviceChannel: this.data.service_channel
      });
      if (data && data.code === 0 && Array.isArray(data.data)) {
        this.$set(
          this.levelData,
          level,
          data.data.map(item => ({
            id: item.id,
            label: item.name,
            name: item.name
          }))
        );
      }
      this.loadings[level] = false;
    },
    handleLevelChange(val, level) {
      const data =
        Array.isArray(this.levelData[level]) &&
        this.levelData[level].find(data => data.id === val);
      this.updateData(val, level, data);
      if (level < this.maxIndex) {
        const nextLevel = level + 1;
        this.updateLevelData(val, nextLevel);
        focus && this.$refs.cascadeSelect.setFocus(nextLevel);
      }
      this.$emit('change', val, level);
      if (level === this.maxIndex) {
        this.$emit('max', val);
      }
    },
    /**
     * 获取层级数据
     * @param val 当前数据
     * @param init 是否初始化数据
     * @param level 目前在第几级
     * @param serviceChannel 工单通道
     * @returns {Promise<void>}
     */
    getLevelData() {
      return Promise.resolve();
    },
    /**
     * 更新字段值
     * @param val 当前数据，只有id
     * @param level 目前在第几级
     * @param data 完整对象数据
     * @returns {Promise<void>}
     */
    updateData() {}
  }
};
</script>
