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
      import(/* webpackChunkName: "listComponent" */ 'src/pages/ticket/list'),
    meta: {
      sidebarName: '工单查询',
      sidebarIcon: 'el-icon-tickets'
    }
  },
  {
    path: '/create',
    name: 'create',
    component: () =>
      import(
        /* webpackChunkName: "createComponent" */ 'src/pages/ticket/create'
      ),
    meta: {
      sidebarName: '创建工单',
      sidebarIcon: 'el-icon-edit-outline'
    }
  }
];

const router = new VueRouter({
  routes: ticketRouters
});

export default router;
