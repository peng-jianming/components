<template>
  <div class="page-header">
    <div class="page-logo"></div>
    <ul class="page-menu clearfloat">
      <li v-for="item in menus" :key="item.id" class="menu-item">
        <a :href="item.link">{{ item.name }}</a>
      </li>
    </ul>

    <user-message-component />
  </div>
</template>

<script>
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
