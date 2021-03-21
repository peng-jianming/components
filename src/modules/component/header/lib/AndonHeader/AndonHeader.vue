<template>
  <div class="andon-header">
    <header-pc v-if="!showMobile" :user="user" :menus="innerMenu"></header-pc>
    <header-mobile v-else :user="user" :menus="innerMenu"></header-mobile>
  </div>
</template>

<script>
import axios from 'axios';
import { orderBy, debounce } from 'lodash';

import HeaderPc from './HeaderPc';
import HeaderMobile from './HeaderMobile';

const RESPONSE_WIDTH = 1140;
export default {
  name: 'AndonHeader',
  components: { HeaderPc, HeaderMobile },
  props: {
    user: {
      type: Object,
      default: () => {
        return {
          user_name: '',
          company: {
            short_name: ''
          }
        };
      }
    },
    menus: {
      type: Array,
      default: () => []
    }
    // loading: { type: Boolean, default: false }
  },
  data() {
    return {
      innerMenu: [],
      showMobile: false,
      onResize: undefined
    };
  },
  created() {
    if (this.menus && this.menus.length > 0) {
      this.innerMenu = this.menus;
      return;
    }
    this.getCacheMenu();
    const isOa = this.isOa();
    this.getNavigate({ config: { debounce: false } }).then(({ data }) => {
      let list = data.data;
      let tree = [];
      list = list.filter(o => o.enable === 1);
      if (isOa) {
        // oa域名下，过滤出display为1、2的
        list = list.filter(o => [1, 2].includes(o.display));
      } else {
        // 外网下，过滤出display为1、3的
        list = list.filter(o => [1, 3].includes(o.display));
      }
      if (list && list.length > 0) {
        list.forEach(o => {
          if (o.parent_id === 0) {
            tree.push(o);
          }
        });
        // 一级菜单排序
        tree = orderBy(tree, ['weights', 'asc']);
        const childs = list.filter(o => o.parent_id !== 0);
        tree.forEach(o => {
          // 二级菜单排序
          o.children = orderBy(
            childs.filter(child => child.parent_id === o.id),
            ['weights', 'asc']
          );
        });
      }
      this.setCacheMenu(tree);
    });
  },
  mounted() {
    this.showMobile = document.body.clientWidth < RESPONSE_WIDTH;
    this.onResize = debounce(() => {
      this.showMobile = document.body.clientWidth < RESPONSE_WIDTH;
    }, 300);
    window.addEventListener('resize', this.onResize, false);
  },
  methods: {
    isOa() {
      const urlWithoutProtocol = location.href.substring(
        location.protocol.length + 2
      );
      return [
        'dev.andon.oa.com',
        'test.andon.oa.com',
        'huidu.andon.oa.com',
        'andon.oa.com'
      ].some(url => urlWithoutProtocol.indexOf(url) === 0);
    },
    getNavigate({ config = { loading: true } } = {}) {
      return axios.request({
        method: 'get',
        url: '/admin/api/navigation-management',
        ...config,
        debounce: false
      });
    },
    getCacheMenu() {
      if (typeof localStorage === 'undefined') {
        const menus = localStorage.getItem('_NAVIGATE_CACHE');
        if (menus) {
          this.innerMenu = JSON.parse(menus);
        }
      }
    },
    setCacheMenu(menus) {
      if (menus) {
        if (typeof localStorage === 'undefined') {
          localStorage.setItem('_NAVIGATE_CACHE', JSON.stringify(menus));
        }
        this.innerMenu = menus;
      }
    }
  }
};
</script>

<style scoped lang="less">
.andon-header {
  min-height: 50px;
}
</style>
