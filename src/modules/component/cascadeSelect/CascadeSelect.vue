<template>
  <div flex="dir:left cross:center">
    <template v-for="(item, index) in levelData">
      <el-select
        :ref="'levelDom' + index + (name || '')"
        :key="index"
        v-model="levels[index]"
        filterable
        collapse-tags
        class="collapse-tags toolbar-input"
        placeholder="请选择"
        :disabled="disabled || disable[index]"
        :loading="loadings[index]"
        @change="handleLevelChange(...arguments, index)"
      >
        <el-option
          v-for="(_item, _index) in levelData[index]"
          :key="_index"
          :label="_item.label"
          :value="_item.id"
        ></el-option>
      </el-select>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    currentIndex: Number,
    levelData: {
      type: Array,
      default() {
        return [];
      }
    },
    loadings: {
      type: Array,
      default() {
        return [];
      }
    },
    name: String,
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      levels: []
    };
  },
  computed: {
    disable() {
      return this.levelData.map((data, index) => index > this.currentIndex + 1);
    },
    maxLevel() {
      return this.levelData.length;
    }
  },
  created() {
    this.reset();
  },
  methods: {
    handleLevelChange(val, level) {
      this.$emit('change', val, level);
      let nextLevel = level;
      while (nextLevel < this.maxLevel) {
        nextLevel = nextLevel + 1;
        this.$set(this.levels, nextLevel, '');
      }
    },
    reset() {
      this.levelData.forEach((data, index) => {
        this.$set(this.levels, index, '');
      });
    },
    setFocus(level) {
      this.$refs[
        `levelDom${level}${this.name || ''}`
      ][0].menuVisibleOnFocus = false;
      this.$nextTick(() => {
        this.$refs[`levelDom${level}${this.name || ''}`][0].toggleMenu();
      });
    },
    setLevel(val, index) {
      this.levels[index] = val;
    }
  }
};
</script>

<style lang="less" scoped>
.el-select.collapse-tags + .el-select {
  margin-left: 4px;
}
.toolbar-input {
  width: auto;
  max-width: 199px;
}
</style>
