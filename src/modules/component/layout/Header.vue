<template>
  <div class="page-header">
    <div class="page-logo">
      <!-- <img :src="logo" /> -->
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
export default {
  data() {
    return {
      menus: [
        {
          id: '1',
          name: '与我相关',
          link: '/workbench'
        },
        {
          id: '2',
          name: '客服工单',
          link: '/ticket'
        },
        {
          id: '3',
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
  background-color: #409eff;
  .page-logo {
    position: absolute;
    left: 0;
    top: 0;
    width: 160px;
    height: 50px;
    text-align: center;
    padding: 5px 0;
    background-color: #409eff;
    img {
      width: 80%;
    }
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
