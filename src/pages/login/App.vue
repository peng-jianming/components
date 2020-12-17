<template>
  <div class="login-layout">
    <div class="login">
      <h1>用户登录</h1>
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        label-width="100px"
        class="demo-ruleForm"
        label-position="top"
      >
        <el-form-item label="用户名:" prop="username">
          <el-input v-model="ruleForm.username" type="text"></el-input>
        </el-form-item>
        <el-form-item label="密码:" prop="password">
          <el-input
            v-model="ruleForm.password"
            type="password"
            @keydown.enter.native="submitForm"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width: 100%;" @click="submitForm"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        //  表单输入内容
        username: '',
        password: ''
      },
      rules: {
        // 验证规则
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    };
  },
  methods: {
    submitForm() {
      //  判断登录是否成功
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.$http.post('login', this.ruleForm).then(res => {
            if (res.data.meta.status === 200) {
              this.$message({
                message: '登录成功!',
                type: 'success'
              });
              localStorage.setItem('token', res.data.data.token);
              this.$router.push('/home'); // 登录成功跳转主页
            } else {
              this.$message.error(res.data.meta.msg);
            }
          });
        } else {
          this.$message.error('密码或账号不能为空');
        }
      });
    }
  }
};
</script>

<style scoped>
.login-layout {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #324152;
}
.login-layout .login {
  width: 520px;
  padding: 30px;
  border-radius: 10px;
  background-color: #fff;
}
</style>
