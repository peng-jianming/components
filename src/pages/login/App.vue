<template>
  <div class="login-layout">
    <div class="login">
      <form-component
        ref="form"
        label-width="70px"
        label-position="left"
        :configs="loginConfigs"
        :login-captcha-uuid="loginCaptchaUuid"
      >
        <div class="login-process">
          <edit-form-dialog-component
            ref="formDialog"
            btn-type="text"
            btn-text="立即注册"
            label-width="80px"
            label-position="left"
            width="600px"
            title="注册"
            is-register
            :register-captcha-uuid="registerCaptchaUuid"
            :configs="registerConfigs"
            @submit="registerSubmit"
          />
          <edit-form-dialog-component
            btn-type="text"
            btn-text="找回密码"
            label-width="80px"
            label-position="left"
            title="找回密码"
            width="600px"
            :configs="retrieveConfigs"
            @submit="retrieveSubmit"
          />
        </div>
        <el-button class="login-btn" type="primary" @click="submit"
          >登录</el-button
        >
      </form-component>
    </div>
  </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid';
import FormComponent from 'src/modules/component/template/Form';
import EditFormDialogComponent from 'src/modules/component/EditFormDialog';
import loginConfigs from './config/loginConfig';
import registerConfigs from './config/registerConfig';
import retrieveConfigs from './config/retrieveConfig';
import {
  postRegister,
  postLogin,
  postRetrieve
} from 'src/dependencies/api/login/index';
import storage from 'src/modules/utils/storage';
import { getURIParams } from 'src/modules/utils/uri';

const { save: setToken } = storage('token');

export default {
  components: {
    FormComponent,
    EditFormDialogComponent
  },
  data() {
    return {
      loginConfigs,
      registerConfigs,
      retrieveConfigs,
      loginCaptchaUuid: '',
      registerCaptchaUuid: ''
    };
  },
  created() {
    this.loginCaptchaUuid = uuidv4();
    this.registerCaptchaUuid = uuidv4();
  },
  methods: {
    async submit() {
      const params = this.$refs.form.submit();
      const { data } = await postLogin({
        data: {
          ...params,
          uuid: this.loginCaptchaUuid
        }
      });
      if (data && data.code === 0) {
        setToken(data.data.token);
        location.href = getURIParams().redirect
          ? `${getURIParams().redirect}${location.hash}`
          : '/';
      } else {
        this.$refs.form.$refs.captcha_code[0].getCaptcha();
      }
    },
    async registerSubmit({ params, callback }) {
      const { data } = await postRegister({
        data: {
          ...params,
          uuid: this.uuid
        }
      });
      if (data && data.code === 0) {
        this.$notify({
          title: '提示',
          message: '恭喜您,注册成功啦~',
          type: 'success'
        });
        callback && callback();
      }
    },
    async retrieveSubmit({ params, callback }) {
      const { data } = await postRetrieve({
        data: params
      });
      if (data && data.code === 0) {
        this.$notify({
          title: '提交成功',
          message: '密码已发送至邮箱',
          type: 'success'
        });
        callback && callback();
      }
    }
  }
};
</script>

<style lang="less" scoped>
.login-layout {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url(//www.bing.com//th?id=OHR.RSOakTree_ZH-CN6371993573_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&pid=hp);
}
.login-layout .login {
  width: 520px;
  padding: 30px;
  border-radius: 10px;
  background: hsla(0, 0%, 96.1%, 0.6);
  box-shadow: inset 0 0 11px 0 #fff;
  &-btn {
    width: 100%;
  }
}
.login-process {
  display: flex;
  justify-content: space-around;
  margin-top: -10px;
}
</style>
