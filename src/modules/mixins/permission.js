export default {
  data() {
    return {
      sidebarRoutes: []
    };
  },
  methods: {
    // 递归遍历路由,没有权限的去除
    handlRouter(route, permission) {
      return route.filter(item => {
        if (item.children) {
          item.children = this.handlRouter(item.children, permission);
          return item.children.length;
        } else {
          return (
            // 侧边栏路由没设置权限码默认显示
            !item.meta.sidebarPermissionCode ||
            permission.includes(item.meta.sidebarPermissionCode)
          );
        }
      });
    }
  }
};
