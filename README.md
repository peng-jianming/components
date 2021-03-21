## 项目说明:

- 线上地址: [https://www.pengjianming.top](https://www.pengjianming.top) (所有项目和数据库都是使用docker部署在同一服务器,可能有点慢)
- 工单状态有:待处理(转单给运维岗位的人则进入处理中) => 处理中(运维可申请结单,客户代表可直接结单) => 申请结单 => 同意/拒绝结单(拒绝返回处理中) => 已结单
- 账号注册后默认是激活状态,通过系统设置-客服管理,可以设置
- 账号注册后默认是运维,只有客户代表能创建工单,所以初始不能创建工单,需要到系统设置-客服管理改变为客户代表
- 权限采用权限码的方式,需要什么权限,直接取对应的目录下创建后,通过前端和后端一起,来达到权限控制
- 头像处可以进行账号设置(头像大小待限制),和消息查看
- 人名输入框,需要输入对应人名,否则自动清空
- 详情聊天处为实时聊天(发图片待优化)
- 工单转单和提交抄送人操作会进行消息通知

## 使用记录文章:
 
- ## [webpack优化](https://juejin.cn/post/6905709040311992328)
- ## [webpack具体配置](https://juejin.cn/post/6844904170298818568)
- ## [CICD持续集成部署使用(github+jenkins+docker+nginx)](https://juejin.cn/post/6916016350490001415)
- ## [axios配置与接口管理](https://juejin.cn/post/6889344390079184903)
- ## [富文本组件quill使用](https://juejin.cn/post/6910119980738560014)
- ## [Jest自动化测试的使用](https://juejin.cn/post/6914261906865946631)
- ## [静态资源自动重试方案](https://juejin.cn/post/6918648841105309709)
- ## [微前端single-spa与qiankun的使用](https://juejin.cn/post/6917245057896710158)
- ## [websocket的使用](https://juejin.cn/post/6926744616419426311)

## 自画的Vue运行流程图

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/632e8ef7f82e4023a3a4367d86db38bf~tplv-k3u1fbpfcp-watermark.image)
