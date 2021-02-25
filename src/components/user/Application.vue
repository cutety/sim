<template>
  <div >
   <a-card style="width:450px">
      <a-form-model
      ref="applyRef"
      :model="application"
    >
      <a-form-model-item
        label="学号"
        prop="user_id"
      >
        <a-input v-model="application.user_id">
        </a-input>
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
        <SchoolSelector></SchoolSelector>
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
      <a-space>
        <a-button type="primary">修改</a-button>
        <a-button @click="reset">取消</a-button>
      </a-space>
    </a-form-model>
   </a-card>
  </div>
</template>

<script>
import userService from "@/service/userService"
import storageService from "@/service/storageService"
import SchoolSelector from '@/components/user/ShcoolSelector'

export default {
  components:{SchoolSelector},
  data() {
    return {
      user: {
        user_id: "",
      },
      application: {
        user_id: "",
        apply_major: "",
        apply_school: "",
        is_admitted: false,
        preliminiary_result: 430,
        retrail_result: 200,
        admission_major: "",
        admission_shcool: "",
      },
    }
  },
  created() {
    this.user.user_id = JSON.parse(
      storageService.get(storageService.USER_INFO)
    ).user_id
    this.getApplyInfo()
  },
  methods: {
    async getApplyInfo() {
      const { data: res } = await userService.getApplyInfo(this.user)
      this.application = res.data
    },
    reset() {
      this.getApplyInfo()
    }
  },
}
</script>