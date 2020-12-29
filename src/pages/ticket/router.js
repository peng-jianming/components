import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

const originalPush = VueRouter.prototype.push;

VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

export const ticketRouters = [
  {
    path: '/',
    redirect: '/list',
    meta: {
      sidebarHidden: true
    }
  },
  {
    path: '/list',
    name: 'list',
    component: () =>
      import(/* webpackChunkName: "ticket/list" */ 'src/pages/ticket/list'),
    meta: {
      sidebarName: '工单查询',
      sidebarIcon: 'el-icon-tickets'
    }
  },
  {
    path: '/create',
    name: 'create',
    component: () =>
      import(/* webpackChunkName: "ticket/create" */ 'src/pages/ticket/create'),
    meta: {
      sidebarName: '创建工单',
      sidebarIcon: 'el-icon-edit-outline'
    }
  },
  {
    path: '/detail',
    name: 'detail',
    component: () =>
      import(/* webpackChunkName: "ticket/detail" */ 'src/pages/ticket/detail'),
    meta: {
      sidebarName: '工单详情',
      sidebarHidden: true
    }
  }
];

const router = new VueRouter({
  routes: ticketRouters
});

export default router;
