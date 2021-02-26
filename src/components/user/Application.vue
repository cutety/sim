<template>
  <div >
    <a-card>
      <a-form-model
      ref="applyRef"
      :model="application"
      :label-col="labelCol" :wrapper-col="wrapperCol"
    >
      <a-form-model-item disabled
        label="学号"
        prop="user_id"
      >
        <a-input v-model="application.user_id"/>
      </a-form-model-item>
      <a-form-model-item
        label="报考专业"
        prop="apply_major"
      >
        <a-input v-model="application.apply_major">
        </a-input>
      </a-form-model-item>
      
      <a-form-model-item
        label="报考院校"
        prop="apply_school"
      >
        <a-input v-if="flag" disabled v-model="application.apply_school"></a-input>
        <SchoolSelector v-on:btnFunc="btnFn" v-else v-on:parentFunc="parentFn"></SchoolSelector>
        <a-button type="primary" @click.prevent="flag=false"  v-show="flag">修改</a-button>
      </a-form-model-item>
      <a-form-model-item label="指导教师" prop="mentor_name">
        <a-input v-model="application.mentor_name"></a-input>
      </a-form-model-item>
      <a-form-model-item
        label="录取专业"
        prop="admission_major"
      >
        <a-input v-model="application.admission_major">
        </a-input>
      </a-form-model-item>
      <a-form-model-item
        label="录取院校"
        prop="admission_shcool"
      >
        <a-input v-model="application.admission_shcool">
        </a-input>
      </a-form-model-item>
      <a-form-model-item
        label="初试成绩"
        prop="preliminiary_result"
      >
        <a-input-number
          :min="0"
          v-model="application.preliminiary_result"
        />
      </a-form-model-item>
      <a-form-model-item
        label="复试成绩"
        prop="retrail_result"
      >
        <a-input-number
          :min="0"
          v-model="application.retrail_result"
        />
      </a-form-model-item>
      <a-form-model-item
        label="是否录取"
        prop="is_admitted"
      >
        <a-switch
          v-model="application.is_admitted"
          checked="application.is_admitted"
        ></a-switch>
      </a-form-model-item>
        <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
       <a-button type="primary" @click="updateApplyInfo" >修改</a-button>
        <a-button style="margin-left: 10px;" @click="reset">取消</a-button>
    </a-form-model-item>
    </a-form-model>
    </a-card>
  </div>
</template>

<script>
import userService from "@/service/userService"
import storageService from "@/service/storageService"
import SchoolSelector from '@/components/common/ShcoolSelector'

export default {
  components:{SchoolSelector},
  data() {
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      flag:true,
      user: {
        user_id: "",
      },
      application: {
        user_id: "",
        apply_major: "",
        apply_school: "",
        mentor_user_id:"",
        mentor_name:"",
        is_admitted: false,
        preliminiary_result: 0,
        retrail_result: 0,
        admission_major: "",
        admission_shcool: "",
      },
    }
  },
  created() {
    this.user.user_id = JSON.parse(
      storageService.get(storageService.USER_INFO)
    ).user_id
    this.application.user_id = this.user.user_id
    this.getApplyInfo()
  },
  methods: {
    async getApplyInfo() {
      const { data: res } = await userService.getApplyInfo(this.user)
      this.application = res.data
    },
    reset() {
      this.flag = true
      this.getApplyInfo()
    },
    async updateApplyInfo() {
      if(this.application.mentor_name === "") {
        this.application.mentor_user_id = ""
      }
      const {data: res} = await userService.updateApplyInfo(this.application)
      if (res.status !== 200) {
        return this.$message.error(res.msg)
      }
      return this.$message.success(res.msg)
    },
    parentFn(payload) {
      this.application.apply_school = payload
      console.log(this.application.apply_school)
    },
    btnFn(payload) {
      this.flag = payload
      this.getApplyInfo()
    }
  },
}
</script>