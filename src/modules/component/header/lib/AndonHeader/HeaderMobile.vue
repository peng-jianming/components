<template>
  <div class="mobile-header">
    <div class="page-logo">
      <img
        src="https://tool-1253841380.file.myqcloud.com/assets/images/andon-logo-2.png"
        @click="handleRedirect('/')"
      />
      <nav-menu-btn v-model="expandMenu" class="nav-menu-btn"></nav-menu-btn>
    </div>
    <ul v-if="expandMenu" role="menubar" class="page-menu">
      <!-- 顶部菜单 -->
      <template v-for="item in menuData">
        <li
          v-if="!item.parent || (item.parent && item.parent.expand)"
          :key="item.id"
          v-report:click="item.name"
          :style="{ background: item.parent ? '#3f4248' : '' }"
          class="menu-item"
        >
          <a
            :href="item.link"
            :target="item.opening_way === 1 ? '' : '_blank'"
            >{{ item.name }}</a
          >
          <span
            v-if="item.children && item.children.length > 0"
            class="arrow"
            :class="{
              'arrow-up': item.expand
            }"
            @click.stop="expand(item)"
          >
            <img :src="arrowPng" />
          </span>
        </li>
      </template>
    </ul>
  </div>
</template>

<script>
import NavMenuBtn from '../NavMenuBtn/NavMenuBtn.vue';
import arrowPng from '../imgs/arrow.png';
export default {
  components: { NavMenuBtn },
  props: {
    user: Object,
    menus: Array
  },
  data() {
    return {
      arrowPng,
      dialogVisible: false,
      expandMenu: false,
      submitUrl: '',
      historyUrl: '',
      menuData: []
    };
  },
  watch: {
    menus() {
      this.handleMenu();
    }
  },
  mounted() {
    this.handleMenu();
  },
  methods: {
    handleMenu() {
      if (this.menus && this.menus.length > 0) {
        let menus = [];
        for (const i in this.menus) {
          const item = this.menus[i];
          if (item.children && item.children.length > 0) {
            // console.log(item.child.map(o => (o.parent = item)));
            menus.push(item);
            menus = menus.concat(
              item.children.map(o => {
                this.$set(o, 'parent', item);
                // o.parent = item;
                return o;
              })
            );
          } else {
            menus.push(item);
          }
        }
        this.menuData = menus;
        // console.log(this.menuData);
      }
    },
    expand(item) {
      this.$set(item, 'expand', !item.expand);
    },
    handleRedirect(path) {
      if (window.location.pathname !== path) {
        window.location.href = path;
      }
    }
  }
};
</script>

<style scoped lang="less">
a {
  text-decoration: none;
}
.child-menu {
  margin: 0;
  padding: 0;
  list-style: none;
  > li {
    height: 25px;
    line-height: 25px;
    margin-bottom: 5px;
    cursor: pointer;
    > a {
      padding: 0 10px;
      color: #141414;
      line-height: 20px;
    }
  }
}

.el-menu-item {
  padding: 0;
}
a {
  display: inline-block;
  padding: 0 20px;
  line-height: 49px;
}
a:hover {
  text-decoration: none;
}
.page-logo {
  background: #222733;
  width: 100%;
  height: 50px;
  position: relative;

  .nav-menu-btn {
    cursor: pointer;
    position: absolute;
    right: 30px;
    top: 14px;
    color: white;
    font-size: 30px;
    font-weight: 600;
  }
  > img {
    width: 128px;
    padding: 5px 0 0 10px;
  }
}
.mobile-header {
  text-align: left;
  position: relative;
  background-color: #262626;
  .center {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 0;
  }
  .el-menu-item.page-logo {
    position: absolute;
    left: 0;
    top: 0;
    display: inline-block;
    width: 160px;
    height: 49px;
    z-index: 2;
    line-height: 49px;
    text-align: center;
    font-size: 0; // 解决logo图片不居中

    &:active,
    &:focus,
    &:hover {
      background-color: #262626;
    }
  }
  .page-menu {
    width: 100%;
    display: block;
    position: absolute;
    left: 0;
    top: 50px;
    margin: 0;
    padding: 0;
    z-index: 100;
    .menu-item {
      background-color: #2b303b;
      padding-left: 10px;
      list-style: none;
      display: block;
      width: 100%;
      border-bottom: 1px solid #1a1a1a;
      position: relative;
      &:hover a {
        color: #1168ef;
      }
      .arrow {
        position: absolute;
        width: 50px;
        height: 40px;
        padding-top: 5px;
        right: 50px;
        top: 0;
        text-align: center;
        font-size: 20px;
        font-weight: 600;
        color: #999999;
        cursor: pointer;
        > img {
          margin-top: 5px;
          width: 25px;
          height: 25px;
        }
      }
      .arrow.arrow-up {
        transform: rotate(180deg);
      }
      a {
        width: 100%;
        font-size: 16px;
        color: white;
        transition: all 0.2s;
      }
    }
  }
}
.dialog .feedback-content {
  border: 0;
  height: 425px;
}
.andon-know {
  position: relative;
  z-index: 9;
  padding-right: 10px;
  span {
    display: inline-block;
    padding: 0 20px;
    line-height: 49px;
  }
  &:after {
    content: 'new';
    position: absolute;
    top: -8px;
    right: 4px;
    font-size: 12px;
    color: #f8e71c;
    font-style: italic;
    font-weight: bold;
  }
}
</style>
