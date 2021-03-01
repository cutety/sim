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
      <a-form-model-item 
        label="指导教师" 
        prop="mentor_name"
      >
        <div v-if="application.mentor_name">
          <a-input v-model="application.mentor_name" disabled></a-input>
            <a-button type="primary" @click.prevent="mentor_name = application.mentor_name;application.mentor_name = ''"  v-show="flag">修改</a-button>
        </div>
        
        <div v-else>
          <a-select default-value="请选择" style="width:160px;margin-right:16px"  @change="selectMentor">
            <a-select-option value="无">
              无
            </a-select-option>
            <a-select-option v-for="item in mentors" :key="item.user_id">
              {{item.name}} | {{item.research_direction}}
            </a-select-option>
          </a-select>
          <a-button type="primary" @click="recommand">查看推荐的老师</a-button>
          <a-button v-show="mentor_name !== ''" style="margin-left:10px" type="primary" @click="handleCancel">取消</a-button>
        </div>
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
     <a-modal
            width="900px"
            :column="{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }"
            v-model="noteVisible"
            title="申请"
            ok-text="确认" cancel-text="取消"
            @ok="handleOk"
            @cancel="handleCancel"
          >
          <a-textarea 
            placeholder="在这里输入申请内容"
            :auto-size="{ minRows: 3, maxRows: 6 }"
            v-model="application.note"
          >
            
          </a-textarea>
          </a-modal>
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
      mentor_user_id:'',
      mentor_name:'',
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      flag:true,
      user: {
        user_id: "",
      },
      noteVisible:false,
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
        status:0,
        note:'',
      },
      mentors:[]
    }
  },
  created() {
    this.user.user_id = JSON.parse(
      storageService.get(storageService.USER_INFO)
    ).user_id
    this.application.user_id = this.user.user_id
    this.getApplyInfo()
    this.getMentorList()
  },
  methods: {
    async getMentorList() {
      const { data: res } = await userService.getMentors()
      this.mentors = res.data.items
    },
    async getApplyInfo() {
      const { data: res } = await userService.getApplyInfo(this.user)
      this.application = res.data
    },
    recommand() {
      this.$router.push('/mentorMatch')
    },
    selectMentor(user_id) {
      if(user_id == "无") {
        this.application.mentor_user_id = ''
        this.application.status = 0
        this.application.note = ''
        return
      }
      this.mentor_user_id = user_id
      this.noteVisible = true
      this.getApplyInfo()
    },
    handleOk() {
      this.application.mentor_user_id = this.mentor_user_id
      this.application.status = 0
      this.noteVisible = false
    },
    handleCancel() {
      this.application.note = ''
      this.getApplyInfo()
      this.noteVisible = false
    },
    reset() {
      this.flag = true
      this.getApplyInfo()
    },
    async updateApplyInfo() {
      const {data: res} = await userService.updateApplyInfo(this.application)
      if (res.status !== 200) {
        return this.$message.error(res.msg)
      }
      this.getApplyInfo()
      return this.$message.success('提交成功，双选结果可以在申请结果页面查看')
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