import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const originalPush = VueRouter.prototype.push;

VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

export const workbenchRouters = [
  {
    path: '/',
    redirect: '/my-ticket',
    meta: {
      sidebarHidden: true
    }
  },
  {
    path: '/my-ticket',
    name: 'my-ticket',
    component: () =>
      import(
        /* webpackChunkName: "workbench/myTicketComponent" */ 'src/pages/workbench/my-ticket'
      ),
    meta: {
      sidebarName: '我的工单',
      sidebarIcon: 'el-icon-s-order'
    }
  }
];

const router = new VueRouter({
  routes: []
});

export default router;
