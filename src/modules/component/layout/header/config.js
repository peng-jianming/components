import {
  email,
  avatar,
  oldPassword,
  newPassword,
  passwordConfirm
} from 'src/dependencies/fields/login';
import AvatarComponent from './Avatar';

export const userConfig = [
  email,
  avatar
    .clone()
    .setIsFull()
    .setEditComponent(AvatarComponent)
];

export const passwordConfig = [
  oldPassword,
  newPassword,
  passwordConfirm.clone().setValidateMethod((params, newData, oldData) => {
    return newData[newPassword.prop] === params || '二次密码输入不一致';
  })
];
