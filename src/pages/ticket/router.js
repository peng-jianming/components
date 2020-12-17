import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    {
      path: '/',
      redirect: '/list'
    },
    {
      path: '/list',
      name: 'list',
      component: () =>
        import(/* webpackChunkName: "listComponent" */ 'src/pages/ticket/list')
    },
    {
      path: '/create',
      name: 'create',
      component: () =>
        import(
          /* webpackChunkName: "createComponent" */ 'src/pages/ticket/create'
        )
    }
  ]
});

export default router;
