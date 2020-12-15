<template>
  <div class="page-header">
    <div class="page-logo">
      <img :src="logo" />
    </div>
    <ul class="page-menu clearfloat">
      <li v-for="item in menus" :key="item.id" class="menu-item">
        <a :href="item.link">{{ item.name }}</a>
      </li>
    </ul>
    <div class="user-item">
      pengjianming
    </div>
  </div>
</template>

<script>
import logo from 'src/modules/img/andon-logo-2.png';
export default {
  data() {
    return {
      logo,
      menus: [
        {
          id: '1',
          name: '工单',
          link: '/ticket'
        },
        {
          id: '2',
          name: '系统设置',
          link: '/admin'
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
  background-color: #2d2f33;
  .page-logo {
    position: absolute;
    left: 0;
    top: 0;
    width: 160px;
    height: 50px;
    text-align: center;
    padding: 5px 0;
    background-color: #2d2f33;
    &:hover {
      background-color: #262626;
    }
    img {
      width: 80%;
    }
  }
  .page-menu {
    padding-left: 200px;
    font-size: 18px;
    text-align: left;
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
  .user-item {
    position: absolute;
    top: 0;
    right: 0;
    padding: 0 20px;
    max-width: 200px;
    height: 50px;
    line-height: 50px;
    font-size: 14px;
    color: #fff;
  }
}
</style>
