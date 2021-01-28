import { Field } from 'src/dependencies/fields/Field';

export const userName = new Field({
  prop: 'user_name',
  label: '用户名',
  required: true
});

export const email = new Field({
  prop: 'email',
  label: '邮箱',
  required: true,
  validateMethod(params, newData, oldData) {
    return (
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        params
      ) || '邮箱格式不正确'
    );
  }
});

export const oldPassword = new Field({
  prop: 'old_password',
  label: '原密码',
  type: 'password',
  required: true
});

export const newPassword = new Field({
  prop: 'new_password',
  label: '新密码',
  type: 'password',
  required: true
});

export const password = new Field({
  prop: 'password',
  label: '密码',
  type: 'password',
  required: true
});

export const passwordConfirm = new Field({
  prop: 'password_confirm',
  label: '确认密码',
  type: 'password',
  required: true
});

export const captchaCode = new Field({
  prop: 'captcha_code',
  label: '验证码',
  required: true
});

export const avatar = new Field({
  prop: 'avatar',
  label: '头像',
  required: true
});
