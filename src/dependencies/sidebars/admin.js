export default [
  {
    id: '1',
    name: '权限控制',
    icon: 'el-icon-view',
    opened: true,
    children: [
      {
        id: '1-1',
        name: '客服权限',
        href: '/permission'
      }
    ]
  },
  {
    id: '2',
    name: '账号管理',
    icon: 'el-icon-service',
    opened: false,
    children: [
      {
        id: '2-1',
        name: '客服管理',
        href: '/staff'
      }
    ]
  },
  {
    id: '3',
    name: '客服公告',
    icon: 'el-icon-bell',
    href: '/notice'
  }
];
