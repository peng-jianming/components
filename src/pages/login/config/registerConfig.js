import {
  userName,
  password,
  captchaCode,
  email,
  passwordConfirm
} from 'src/dependencies/fields/login';
import CaptchaComponent from '../Captcha';

export default [
  userName,
  email,
  password,
  passwordConfirm.clone().setValidateMethod((params, newData, oldData) => {
    return newData[password.prop] === params || '二次密码输入不一致';
  }),
  captchaCode.clone().setIsFull().setEditComponent(CaptchaComponent)
];
