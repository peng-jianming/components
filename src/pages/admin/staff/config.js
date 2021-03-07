import { Field } from 'src/dependencies/fields/Field';
import { userName, email } from 'src/dependencies/fields/login';
import { post } from 'src/dependencies/fields/ticket/list/list';
import { activate } from 'src/dependencies/fields/admin/staff';
import EditComponent from './Edit';

const handle = new Field({
  prop: 'handle',
  label: '操作'
});

export const queryConfigs = [
  userName
    .clone()
    .setType('user')
    .setFormItemWidth('30%')
    .setFormItemInline(),
  post
    .clone()
    .setType('select')
    .setFormItemWidth('30%')
    .setFormItemInline(),
  activate
    .clone()
    .setFormItemWidth('30%')
    .setFormItemInline()
];

export const listConfigs = [
  userName,
  email,
  post,
  activate,
  handle
    .clone()
    .setWidth(200)
    .setIsFull()
    .setListComponent(EditComponent)
];

export const editConfigs = [userName, email, post, activate];
