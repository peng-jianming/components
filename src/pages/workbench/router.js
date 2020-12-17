import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    {
      path: '/',
      redirect: '/my-ticket'
    },
    {
      path: '/my-ticket',
      name: 'my-ticket',
      component: () =>
        import(
          /* webpackChunkName: "myTicketComponent" */ 'src/pages/workbench/my-ticket'
        )
    }
  ]
});

export default router;
