<template>
  <div>
    <el-input
      v-model="data[captchaCode.prop]"
      placeholder="请输入验证码"
      class="login-captcha-input"
    ></el-input>
    <el-button
      v-if="isRegister"
      type="primary"
      :disabled="disable"
      @click="sendCaptcha"
      >{{ btnText }}</el-button
    >
    <span
      v-else
      class="login-captcha"
      @click="getCaptcha"
      v-html="captchaHtml"
    ></span>
  </div>
</template>
<script>
import { captchaCode, email } from 'src/dependencies/fields/login';
import { getCaptcha, postSendCaptchaEmail } from 'src/dependencies/api/login';
import { validateWithMessage } from 'src/modules/utils/params';
export default {
  props: {
    data: {
      type: Object,
      default() {
        return {};
      }
    },
    loginCaptchaUuid: {
      type: String,
      default: ''
    },
    registerCaptchaUuid: {
      type: String,
      default: ''
    },
    isRegister: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      captchaCode,
      captchaHtml: '',
      btnText: '发送验证码',
      disable: false
    };
  },
  created() {
    !this.isRegister && this.getCaptcha();
  },
  methods: {
    async getCaptcha() {
      const { data } = await getCaptcha({
        query: {
          uuid: this.loginCaptchaUuid
        }
      });
      if (data && data.code === 0) {
        this.captchaHtml = data.data;
      }
    },
    async sendCaptcha() {
      validateWithMessage([email], this.data);
      const { data } = await postSendCaptchaEmail({
        data: {
          email: this.data[email.prop],
          uuid: this.registerCaptchaUuid
        }
      });
      if (data && data.code === 0) {
        this.disable = true;
        this.time(60);
      }
    },
    time(time) {
      if (time === 0) {
        this.disable = false;
        this.btnText = '获取验证码';
      } else {
        time--;
        this.btnText = `${time}秒后重试`;
        setTimeout(() => {
          this.time(time);
        }, 1000);
      }
    }
  }
};
</script>
<style scoped>
.login-captcha {
  width: 220px;
  display: inline-block;
  height: 40px;
  vertical-align: bottom;
  background-color: #f2f2f2;
}
.login-captcha-input {
  width: 200px;
}
</style>
