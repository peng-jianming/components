import VueRouter from 'vue-router';

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
        meta: {
          sidebarName: '客服权限(single-spa应用)',
          sidebarPermissionCode: 'ADMIN_PERMISSION_MANAGE_VIEW'
        }
      },
      {
        path: 'settingManage',
        name: 'settingManage',
        component: () =>
          import(
            /* webpackChunkName: "admin/permission/settingManage" */ 'src/pages/admin/permission/settingManage'
          ),
        meta: {
          sidebarName: '权限设置',
          sidebarPermissionCode: 'ADMIN_PERMISSION_SETTING_VIEW'
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
      sidebarIcon: 'el-icon-service',
      sidebarPermissionCode: 'ADMIN_STAFF_VIEW'
    }
  }
];

const router = new VueRouter({
  routes: []
});

export default router;
