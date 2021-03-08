import VueRouter from 'vue-router';

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
      sidebarIcon: 'el-icon-tickets',
      sidebarPermissionCode: 'LIST_TICKET_VIEW'
    }
  },
  {
    path: '/create',
    name: 'create',
    meta: {
      sidebarName: '创建工单(qiankun应用)',
      sidebarIcon: 'el-icon-edit-outline',
      sidebarPermissionCode: 'CREATE_TICKET_VIEW'
    }
  },
  {
    path: '/detail',
    name: 'detail',
    component: () =>
      import(/* webpackPrefetch: true */ 'src/pages/ticket/detail'),
    meta: {
      sidebarName: '工单详情',
      sidebarHidden: true
    }
  }
];

const router = new VueRouter({
  mode: 'history',
  base: '/ticket',
  routes: []
});

export default router;
