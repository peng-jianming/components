import { Field } from 'src/dependencies/fields/Field';

export const title = new Field({
  label: '标题',
  prop: 'title',
  required: true
});

export const permissionCode = new Field({
  label: '权限码',
  prop: 'permission_code',
  required: true
});

export const description = new Field({
  label: '描述',
  prop: 'description'
});
