import { email, password, captchaCode } from 'src/dependencies/fields/login';
import CaptchaComponent from '../Captcha';

export default [
  email,
  password,
  captchaCode.clone().setIsFull().setEditComponent(CaptchaComponent)
];
