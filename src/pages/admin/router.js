import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

const originalPush = VueRouter.prototype.push;

VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

export const adminRouters = [
  {
    path: '/',
    redirect: '/staff',
    meta: {
      sidebarHidden: true
    }
  },
  {
    path: '/permission',
    name: 'permission',
    component: { render: e => e('router-view') },
    meta: {
      sidebarName: '权限控制',
      sidebarIcon: 'el-icon-view',
      sidebarOpend: true
    },
    children: [
      {
        path: 'manage',
        name: 'manage',
        component: () =>
          import(
            /* webpackChunkName: "admin/manage" */ 'src/pages/admin/permission/manage'
          ),
        meta: {
          sidebarName: '客服权限'
        }
      }
    ]
  },
  {
    path: '/staff',
    name: 'staff',
    component: () =>
      import(/* webpackChunkName: "admin/staff" */ 'src/pages/admin/staff'),
    meta: {
      sidebarName: '客服管理',
      sidebarIcon: 'el-icon-service'
    }
  },
  {
    path: '/notice',
    name: 'notice',
    component: () =>
      import(/* webpackChunkName: "admin/notice" */ 'src/pages/admin/notice'),
    meta: {
      sidebarName: '客服公告',
      sidebarIcon: 'el-icon-bell'
    }
  }
];

const router = new VueRouter({
  routes: adminRouters
});

export default router;
