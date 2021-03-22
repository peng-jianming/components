<template>
  <div class="page-header">
    <div class="page-logo"><button @click="ceshi">ceshi1</button></div>
    <ul class="page-menu clearfloat">
      <li v-for="item in menus" :key="item.id" class="menu-item">
        <a :href="item.link">{{ item.name }}</a>
      </li>
    </ul>

    <user-message-component />
  </div>
</template>

<script>
import axios from 'axios';
import wx from 'weixin-js-sdk';
import UserMessageComponent from './UserMessage';
export default {
  components: {
    UserMessageComponent
  },
  data() {
    return {
      menus: [
        {
          id: '1',
          name: '与我相关',
          link: '/workbench/'
        },
        {
          id: '2',
          name: '客服工单',
          link: '/ticket/'
        },
        {
          id: '3',
          name: '系统设置',
          link: '/admin/'
        }
      ]
    };
  },
  methods: {
    async ceshi() {
      const { data } = await axios.get(
        `/weixin/ticket?url=${location.href.split('#')[0]}`
      );
      if (data.code === 0) {
        wx.config({
          debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: 'wxc8d13d9f65978ad8', // 必填，公众号的唯一标识
          jsApiList: [], // 必填，需要使用的JS接口列表
          ...data.data
        });
        wx.ready(function() {
          console.log('连接成功');
        });
        wx.error(function(res) {
          console.log('连接失败');
        });
      }
    }
  }
};
</script>

<style lang="less" scoped>
.page-header {
  position: relative;
  min-height: 50px;
  background-color: #409eff;
  .page-logo {
    box-sizing: border-box;
    position: absolute;
    left: 0;
    top: 0;
    width: 200px;
    height: 50px;
    text-align: center;
    padding: 5px 0;
    background-color: #409eff;
    background: url('src/modules/img/logo.png');
    background-position: center center;
    background-size: 80px 70px;
    background-repeat: no-repeat;
  }
  .page-menu {
    padding-left: 200px;
    font-size: 18px;
    text-align: center;
    .menu-item {
      width: 100px;
      height: 50px;
      line-height: 50px;
      float: left;
      a {
        color: white;
        &:hover {
          color: #1168ef;
        }
      }
    }
  }
}
</style>
