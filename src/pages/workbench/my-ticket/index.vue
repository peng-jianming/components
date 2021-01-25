<template>
  <div>
    <div>
      我的工单
    </div>
    <el-button type="primary" @click="getRandomImage">获取随机图片</el-button>
    <el-image :src="img"></el-image>
  </div>
</template>
<script>
import { getTest } from 'src/dependencies/api/workbench/my-ticket';
export default {
  data() {
    return {
      imgs: [
        'https://tva1.sinaimg.cn/large/0072Vf1pgy1foxkd7odddj31hc0u0dyi.jpg',
        'https://tva1.sinaimg.cn/large/0072Vf1pgy1fodqnyvneij31hc0u01kx.jpg',
        'https://tva3.sinaimg.cn/large/0072Vf1pgy1foxkiak921j31kw0w0nnl.jpg',
        'https://tva1.sinaimg.cn/large/0072Vf1pgy1fodqiop9awj31kw0vynpd.jpg',
        'https://tva2.sinaimg.cn/large/0072Vf1pgy1foxk3shjrpj31hc0u0k3d.jpg',
        'https://tva3.sinaimg.cn/large/0072Vf1pgy1foxkf8h7q7j31hc0u0k55.jpg',
        'https://tva4.sinaimg.cn/large/0072Vf1pgy1foxkj4ucdkj31kw0w0e6w.jpg',
        'https://tva1.sinaimg.cn/large/0072Vf1pgy1foxkd3ae0mj31hc0u0tsr.jpg',
        'https://tva4.sinaimg.cn/large/0072Vf1pgy1foxkexoreoj31hc0u0qn0.jpg',
        'https://tva3.sinaimg.cn/large/0072Vf1pgy1foxk78xqdoj31kw0w0dzz.jpg'
      ],
      img: ''
    };
  },
  async mounted() {
    this.getRandomImage();
    await getTest();
  },
  methods: {
    getRandomImage() {
      this.img = this.imgs[Math.floor(Math.random() * this.imgs.length)];
    }
  }
};
</script>
