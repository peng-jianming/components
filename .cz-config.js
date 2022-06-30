// https://github.com/leoforfree/cz-customizable/blob/master/cz-config-EXAMPLE.js

module.exports = {
  types: [
    { value: '✨新增', name: '新增:    新的内容' },
    { value: '⬆️  更新', name: '更新:    更新已有功能' },
    { value: '🐛修复', name: '修复:    修复一个Bug' },
    { value: '🔀 合并', name: '合并:    合并分支代码' },
    { value: '🔥 删除', name: '删除:     删除代码或文件' },
    { value: '🎨 格式', name: '格式:    代码, 空格, 分号等格式修复' },
    { value: '✅测试', name: '测试:    添加一个测试' },
    { value: '♻️重构', name: '重构:    代码重构' },
    { value: '📝文档', name: '文档:    变更的只有文档' },
    { value: '⚡️性能', name: '性能:    提升性能' },
    { value: '🚀 工程', name: '工程:    开发工具变动(构建、脚手架工具、部署等)' },
    { value: '⏪回滚', name: '回滚:    代码回退' }
  ],
  // 对话内容
  messages: {
    type: '选择一种你的提交类型:',
    subject: '提交说明:\n',
    confirmCommit: '确定提交?(y:确定/n:退出/e:编辑说明)'
  },
  skipQuestions: ['scope', 'body', 'breaking', 'footer'] // 忽略某些询问
};
