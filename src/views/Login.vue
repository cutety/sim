<template>
  <div class="container">
    <a-row class="login">
      <a-form-model ref="userRef" :rules=rules :model="user" class="loginForm">
        <span class="formTitle">
          <h3>用户登录</h3>
        </span>
        <a-form-model-item prop="user_id">
          <a-input v-model="user.user_id" placeholder="请输入学号/工号">
            <a-icon slot="prefix" type="user" />
          </a-input>
         </a-form-model-item>
        <a-form-model-item prop="password">
          <a-input-password v-model="user.password" placeholder="请输入密码">
            <a-icon slot="prefix" type="lock" />
          </a-input-password>
        </a-form-model-item>
        <a-form-model-item>
          <a-button type="primary" block @click="register">
            登录
          </a-button>
          <a-button block @click="reset">取消</a-button>
        </a-form-model-item>
      </a-form-model>
    </a-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        user_id: "",
        password: ""
      },
      rules: {
        user_id: [
          { required: true, message: '学工号不能为空', trigger: 'blur' },
        ]
      }
    };
  },
  methods: {
    register() {
      const { data: res} = this.$http.post('user/login', this.user);
      if (res.status !== 200) return this.$message.error(res.message);
    },
    reset() {
      console.log(this.$refs);
      this.$refs.userRef.resetFields();
    },
  }
};
</script>

<style scoped>
.container {
  height: 100%;
  width: 100%;
  background-color: #116597;
  background-size: cover;
  position: fixed;
  left: 0px;
  top: 0px;
  padding-top: 30px;
}

.login {
  position: absolute;
  width: 25%;
  min-width: 300px;
  height: 300px;
  border-radius: 10px;
  top: 50%;
  left: 50%;
  margin: 0 auto;
  transform: translateY(-50%) translateX(-50%);
  padding: 30px 30px 15px 30px;
  background-color: rgba(255, 255, 255, 0.8);
  box-shadow: 5px 3px 10px rgba(0, 0, 0, 0.9);
}

.loginButton {
  display: flex;
  justify-content: flex-end;
}

.formTitle {
  text-align: center;
  display: block;
}
</style>
