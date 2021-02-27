<template>
  <a-form-model ref="user" :model="user" :rules="rules" v-bind="layout">
     <a-form-model-item has-feedback label="旧密码" prop="password">
      <a-input v-model="user.password" type="password" autocomplete="off" />
    </a-form-model-item>
    <a-form-model-item has-feedback label="新密码" prop="new_password">
      <a-input v-model="user.new_password" type="password" autocomplete="off" />
    </a-form-model-item>
    <a-form-model-item has-feedback label="确认密码" prop="check_password">
      <a-input v-model="user.check_password" type="password" autocomplete="off" />
    </a-form-model-item>
    <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary" @click="submitForm('user')">
        确定
      </a-button>
      <a-button style="margin-left: 10px" @click="resetForm('user')">
        重置
      </a-button>
    </a-form-model-item>
  </a-form-model>
</template>
<script>
import userService from '@/service/userService'
import storageService from '@/service/storageService'
export default {
  data() {
    let checkPendin
    let validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.user.check_password !== '') {
          this.$refs.user.validateField('checkPass')
        }
        callback()
      }
    }
    let validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.user.new_password) {
        callback(new Error("两次密码不匹配"))
      } else {
        callback()
      }
    }
    return {
      user: {
        user_id: '',
        password: '',
        new_password: '',
        check_password: '',
      },
      rules: {
        new_password: [{ validator: validatePass, trigger: 'change' }],
        check_password: [{ validator: validatePass2, trigger: 'change' }],
      },
      layout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 },
      },
    }
  },
  created() {
    this.user.user_id = JSON.parse(
      storageService.get(storageService.USER_INFO)
    ).user_id
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.changePassword()
        } else {
          return this.$message.error('数据不合法，请重新输入')
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    async changePassword() {
      console.log("pass")
      const {data: res} = await userService.changePassword(this.user)
      if (res.status !== 200) {
        return this.$message.error(res.msg)
      }
      return this.$message.success(res.msg)
    }
  },
}
</script>
