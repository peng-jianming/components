import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    {
      path: '/',
      redirect: '/staff'
    },
    {
      path: '/staff',
      name: 'staff',
      component: () =>
        import(/* webpackChunkName: "staffComponent" */ 'src/pages/admin/staff')
    },
    {
      path: '/notice',
      name: 'notice',
      component: () =>
        import(
          /* webpackChunkName: "noticeComponent" */ 'src/pages/admin/notice'
        ),
      meta: { permission: 'AVB' }
    },
    {
      path: '/permission',
      name: 'permission',
      component: () =>
        import(
          /* webpackChunkName: "permissionComponent" */ 'src/pages/admin/permission'
        )
    }
  ]
});

router.beforeEach((to, form, next) => {
  console.log('beforeEach', to.matched);
  next();
});

router.afterEach((to, form, next) => {
  console.log('afterEach', to, form);
  // next();
});

export default router;
