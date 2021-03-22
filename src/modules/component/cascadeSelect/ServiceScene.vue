<script>
import { isEqual } from 'lodash';
import { getServiceScene } from 'src/dependencies/apis/ticket/selector';
import {
  serviceChannel as serviceChannelField,
  serviceScene
} from 'src/dependencies/fields/ticket/ticket';
import { serviceChannelEnum } from 'src/dependencies/enums/Ticket/ServiceChannel';
import TemplateCascade from 'src/libs/components/ticket-form/selector/TemplateCascade';
import { isEmptyOrBlank } from 'src/libs/utils/params';
import { assertWithMessage } from 'src/modules/utils/params';

export default {
  name: 'ServiceSceneCascade',
  extends: TemplateCascade,
  data() {
    return {
      maxIndex: 3
    };
  },
  watch: {
    'data.service_scene_display'(val, oldVal) {
      if (
        !isEqual(val, oldVal) &&
        (oldVal ||
          serviceChannelEnum.symbols.P_CLOUD_ASP === this.data.service_channel) // 下面asp的short联动，初次也要触发
      )
        this.displayLevelData();
    },
    'data.service_scene_checked'(val) {
      if (!val) {
        this.updateData(val);
      }
    },
    'data.service_scene'(val) {
      if (!val) {
        this.initLevelData();
        this.initData();
      }
    },
    'data.service_channel'() {
      this.initLevelData();
      this.initData();
    },
    // asp根据产品简称默认选中第一级
    'data.product_name'(val, oldVal) {
      // 需求只有建单页面做联动，排除详情页
      if (this.data.ticket_id) {
        return;
      }
      if (
        serviceChannelEnum.symbols.P_CLOUD_ASP === this.data.service_channel &&
        !isEqual(val, oldVal) &&
        this.levelData.length > 0
      ) {
        const target = this.levelData[0].find(item => item.label === val);
        const serviceSceneDisplay = this.data.service_scene_display || [];
        if (
          target &&
          (serviceSceneDisplay.length === 0 ||
            serviceSceneDisplay[0].id !== target.id) // 排除本来就是匹配的情况
        ) {
          this.$set(this.data, 'service_scene_display', [target]);
        }
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.updateData(this.data.service_scene_checked);
      this.displayLevelData();
    });
  },
  methods: {
    updateData(val, level, serviceScene) {
      this.currentIndex = level;
      this.$set(this.data, 'service_scene', val);
      const serviceSceneDisplay = this.data.service_scene_display;
      // 改动level层级时操作display
      if (serviceScene && Array.isArray(serviceSceneDisplay)) {
        while (serviceSceneDisplay.length > level) {
          this.data.service_scene_display.pop();
        }
        this.data.service_scene_display.push(serviceScene);
      }
    },
    displayLevelData() {
      const serviceSceneDisplay = this.data.service_scene_display;
      if (Array.isArray(serviceSceneDisplay)) {
        serviceSceneDisplay.forEach(({ id }, index) => {
          this.$refs.cascadeSelect.setLevel(id, index);
          // 对已选中的列表拉取数据
          this.updateLevelData(id, index + 1);
        });
        const { length } = serviceSceneDisplay;
        this.currentIndex = length - 1;
        // 后续的服务场景需要清空
        for (let index = length; index <= this.maxIndex; index++) {
          this.$refs.cascadeSelect.setLevel('', index);
          this.updateLevelData('', index + 1);
        }
        // 选中对应列
        if (serviceSceneDisplay[this.currentIndex]) {
          this.handleLevelChange(
            serviceSceneDisplay[this.currentIndex].id,
            this.currentIndex
          );
        }
      }
    },
    getLevelData({ val = 0, serviceChannel }) {
      assertWithMessage(
        !isEmptyOrBlank(this.data[serviceChannelField.prop]),
        `${serviceScene.label}必须传入有效的${serviceChannelField.label}`
      );
      // 只过滤有效的
      return getServiceScene({
        query: {
          all: 0,
          service_channel: serviceChannel,
          parent_id: val
        }
      });
    }
  }
};
</script>
