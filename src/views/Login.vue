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
          <a-input-password 
					v-model="user.password" 
					placeholder="请输入密码"
					v-on:keyup.enter="login"
					>
            <a-icon slot="prefix" type="key" />
          </a-input-password>
        </a-form-model-item>
        <a-form-model-item>
          <a-button type="primary" block @click="login">
            登录
          </a-button>
          <a-button block @click="reset">取消</a-button>
        </a-form-model-item>
      </a-form-model>
    </a-row>
  </div>
</template>

<script>
import userService from '@/service/userService'
import storageService from '@/service/storageService'
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
    }
  },
  methods: {
    login() {
      this.$refs.userRef.validate(async valid => {
        if (!valid) return this.$message.error('数据不合法，请重新输入')
        const { data: res} = await userService.login(this.user)
        if (res.status !== 200) return this.$message.error(res.msg)
        storageService.set(storageService.USER_TOKEN, res.data)
        const { data: info} = await userService.info()
			
        storageService.set(storageService.USER_INFO, JSON.stringify(info.data))
        this.$router.replace({ name: 'home'})
      })
    },
    reset() {
      this.$refs.userRef.resetFields()
    },
  }
}
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
