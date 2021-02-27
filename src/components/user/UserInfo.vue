<template>
  <a-form-model ref="user" :model="user" :rules="rules" v-bind="layout">
     <a-form-model-item has-feedback label="电话" prop="phone">
      <a-input v-model="user.phone" type="number" autocomplete="off" />
    </a-form-model-item>
    <a-form-model-item has-feedback label="邮箱" prop="email">
      <a-input v-model="user.email" type="text" autocomplete="off" />
    </a-form-model-item>
    <a-form-model-item has-feedback label="微信" prop="wechat">
      <a-input v-model="user.wechat" type="text" autocomplete="off" />
    </a-form-model-item>
    <a-form-model-item has-feedback label="QQ" prop="qq">
      <a-input v-model="user.qq" type="text" autocomplete="off" />
    </a-form-model-item>
     <a-form-model-item v-show="role == 2 ? false : true" 
        label="本科院校"
        prop="undergraduate_university"
      >
         <a-input v-if="undergraduate_flag" disabled v-model="user.undergraduate_university"></a-input>
        <SchoolSelector v-on:btnFunc="btnFn" v-else v-on:parentFunc="undergraduateFunc"></SchoolSelector>
        <a-button type="primary" @click.prevent="undergraduate_flag=false"  v-show="undergraduate_flag">添加</a-button>
      </a-form-model-item>
      <a-form-model-item v-show="role == 2 ? false : true"   label="本科专业" prop="undergraduate_major">
        <a-input v-model="user.undergraduate_major"></a-input>
      </a-form-model-item>
      <a-form-model-item v-show="role == 2 ? false : true" 
        label="研究生院校"
        prop="graduate_school"
      >
         <a-input v-if="graduate_flag" disabled v-model="user.graduate_school"></a-input>
        <SchoolSelector v-on:btnFunc="btnFn" v-else v-on:parentFunc="graduateFunc"></SchoolSelector>
        <a-button type="primary" @click.prevent="graduate_flag=false"  v-show="graduate_flag">添加</a-button>
      </a-form-model-item>
      <a-form-model-item v-show="role == 2 ? false : true"   label="研究生专业" prop="graduate_major">
        <a-input v-model="user.graduate_major"></a-input>
      </a-form-model-item>
      <a-form-model-item v-show="role == 2 ? false : true" 
        label="博士院校"
        prop="phd_school"
      >
         <a-input v-if="phd_flag" disabled v-model="user.phd_school"></a-input>
        <SchoolSelector v-on:btnFunc="btnFn" v-else v-on:parentFunc="phd_Func"></SchoolSelector>
        <a-button type="primary" @click.prevent="phd_flag=false"  v-show="phd_flag">添加</a-button>
      </a-form-model-item>
      <a-form-model-item v-show="role == 2 ? false : true"   label="博士专业" prop="phd_major">
        <a-input v-model="user.phd_major"></a-input>
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
import SchoolSelector from '@/components/common/ShcoolSelectorDual'
import userService from '@/service/userService'
import storageService from '@/service/storageService'
import mentorService from '@/service/mentorService'
export default {
  components:{SchoolSelector},
  data() {
    return {
      undergraduate_flag:true,
      graduate_flag:true,
      phd_flag:true,
      student:{

      },
      user_id:'',
      user: {
        phone: '',
        wechat: '',
        email: '',
        qq: '',
        degree:'',
        research_direction:'',
        undergraduate_university:'',
        undergraduate_major:'',
        graduate_school:'',
        graduate_major:'',
        phd_school:'',
        phd_major:'',
      },
      role:0,
      rules: {
         
      },
      layout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 },
      },
    }
  },
  created() {
    this.user_id = JSON.parse(
      storageService.get(storageService.USER_INFO)
    ).user_id
    this.role = JSON.parse(
      storageService.get(storageService.USER_INFO)
    ).role
    this.getUserInfo()
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.updateUserInfo()
        } else {
          return this.$message.error('数据不合法，请重新输入')
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    async getUserInfo() {
      if(this.role === 2){
        const {data: res} = await userService.getStudentInfo(this.user_id)
        this.user = res.data 
      } else {
        const {data: res} = await userService.getMentorInfo(this.user_id)
        this.user = res.data 
      }
    },
    async updateUserInfo() {
      if(this.role === 2) {
        const {data: res} = await userService.updateStudentInfo(this.user)
        this.getUserInfo()
        if (res.status !== 200) return this.$message.error(res.msg)
        return this.$message.info(res.msg)
      } else {
        const {data: res} = await mentorService.updateMentorInfo(this.user)
        this.getUserInfo()
        if (res.status !== 200) return this.$message.error(res.msg)
        return this.$message.info(res.msg)
      }
      
      
    },
    undergraduateFunc(payload) {
      this.user.undergraduate_university = payload
    },
    graduateFunc(payload) {
      this.user.graduate_school = payload
    },
    phdFunc(payload) {
      this.user.phd_school = payload
    },
    btnFn(payload) {
      this.undergraduate_flag = payload
      this.graduate_flag = payload
      this.phd_flag = payload
    }
  }
}
</script>