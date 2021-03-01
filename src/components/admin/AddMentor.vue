<template>
  <div>
    <a-form-model
      ref="addMentorForm"
      :model="addMentorForm"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-form-model-item  label="工号" prop="user_id">
        <a-input v-model="mentor.user_id"></a-input>
      </a-form-model-item>
      <a-form-model-item  label="姓名" prop="name">
        <a-input v-model="mentor.name"></a-input>
      </a-form-model-item>
      <a-form-model-item  label="性别" prop="gender">
        <a-select defaultValue=1 @change="selectGender">
      <a-select-option value=1 >
        男
      </a-select-option>
      <a-select-option value=0 >
        女
      </a-select-option>
    </a-select>
      </a-form-model-item>
      <a-form-model-item  label="电话" prop="phone">
        <a-input v-model="mentor.phone" type="number"></a-input>
      </a-form-model-item>
      <a-form-model-item  label="邮箱" prop="email">
        <a-input v-model="mentor.email"></a-input>
      </a-form-model-item>
      <a-form-model-item  label="微信" prop="wechat">
        <a-input v-model="mentor.wechat"></a-input>
      </a-form-model-item>
      <a-form-model-item  label="QQ" prop="qq">
        <a-input v-model="mentor.qq"></a-input>
      </a-form-model-item>
      <a-form-model-item  label="学位" prop="degree">
        <a-select default-value="0" v-model="mentor.degree">
      <a-select-option value="学士" :key="0">
        学士
      </a-select-option>
      <a-select-option value="硕士" :key="1">
        硕士
      </a-select-option>
      <a-select-option value="博士" :key="2">
        博士
      </a-select-option>
    </a-select>
      </a-form-model-item>
      <a-form-model-item  label="研究方向" prop="research_direction">
        <a-input v-model="mentor.research_direction"></a-input>
      </a-form-model-item>
        <!-- <a-form-model-item
      v-for="(domain, index) in addMentorForm.schools"
      :key="domain.info.key"
      v-bind="index === 0 ? formItemLayout : formItemLayout"
      :label="index === 0 ? '本科院校' : domain.info.school"
      :prop="index ===0 ? 'undergraduate_university' : domain.info.prop"
    >
      <SchoolSelector v-on:parentFunc="index === 0 ? 'undergraduateFunc' : domain.info.fn"></SchoolSelector>
    </a-form-model-item>
     <a-form-model-item
      v-for="(domain, index) in addMentorForm.schools"
      :key="domain.info.key"
      v-bind="index === 0 ? formItemLayout : formItemLayout"
      :label="index === 0 ? '本科专业' : domain.info.major"
      :prop="index === 0 ? 'undergraduate_major' : domain.info.propMajor"
    >
      <a-input v-model="mentor.undergraduate_major"></a-input>
      
      <a-icon
        v-if="addMentorForm.schools.length > 1"
        class="dynamic-delete-button"
        type="minus-circle-o"
        :disabled="addMentorForm.schools.length === 1"
        @click="removeDomain(domain)"
      />
    </a-form-model-item>
    <a-form-model-item  v-bind="formItemLayoutWithOutLabel">
      <a-button type="dashed" style="width: 60%" @click="addSchool">
        <a-icon type="plus" /> Add field
      </a-button>
    </a-form-model-item> --> 
    <a-form-model-item
        label="本科院校"
        prop="undergraduate_university"
      >
         <a-input v-if="undergraduate_flag" disabled v-model="mentor.undergraduate_university"></a-input>
        <SchoolSelector v-on:btnFunc="btnFn" v-else v-on:parentFunc="undergraduateFunc"></SchoolSelector>
        <a-button type="primary" @click.prevent="undergraduate_flag=false"  v-show="undergraduate_flag">添加</a-button>
      </a-form-model-item>
      <a-form-model-item  label="本科专业" prop="undergraduate_major">
        <a-input v-model="mentor.undergraduate_major"></a-input>
      </a-form-model-item>
      <a-form-model-item
        label="研究生院校"
        prop="graduate_school"
      >
         <a-input v-if="graduate_flag" disabled v-model="mentor.graduate_school"></a-input>
        <SchoolSelector v-on:btnFunc="btnFn" v-else v-on:parentFunc="graduateFunc"></SchoolSelector>
        <a-button type="primary" @click.prevent="graduate_flag=false"  v-show="graduate_flag">添加</a-button>
      </a-form-model-item>
      <a-form-model-item  label="研究生专业" prop="graduate_major">
        <a-input v-model="mentor.graduate_major"></a-input>
      </a-form-model-item>
      <a-form-model-item
        label="博士院校"
        prop="phd_school"
      >
         <a-input v-if="phd_flag" disabled v-model="mentor.phd_school"></a-input>
        <SchoolSelector v-on:btnFunc="btnFn" v-else v-on:parentFunc="phd_Func"></SchoolSelector>
        <a-button type="primary" @click.prevent="phd_flag=false"  v-show="phd_flag">添加</a-button>
      </a-form-model-item>
      <a-form-model-item  label="博士专业" prop="phd_major">
        <a-input v-model="mentor.phd_major"></a-input>
      </a-form-model-item>
        <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
       <a-button type="primary" @click="addMentor" >添加导师</a-button>
        <a-button style="margin-left: 10px;" @click="reset">取消</a-button>
    </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>

import SchoolSelector from '@/components/common/ShcoolSelectorDual'
import adminService from '@/service/adminService'
export default {
  components:{SchoolSelector},
  data() {
    return {
      formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 4 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 20 },
        },
      },
      formItemLayoutWithOutLabel: {
        wrapperCol: {
          xs: { span: 24, offset: 0 },
          sm: { span: 20, offset: 4 },
        },
      },
      undergraduate_flag:true,
      graduate_flag:true,
      phd_flag:true,
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      mentor:{
        user_id:'',
        name:'',
        gender:1,
        phone:'',
        email:'',
        wechat:'',
        qq:'',
        degree:'',
        research_direction:'',
        undergraduate_university:'',
        undergraduate_major:'',
        graduate_school:'',
        graduate_major:'',
        phd_school:'',
        phd_major:'',
      },
      addMentorForm:{
        schools:[],
      },
      count:0,
      fieldsGroup:[
        {
          info:{
            school: '本科学校',
            major: '本科专业',
            fn: 'undergraduateFunc',
            prop:'undergraduate_university',
            propMajor:'undergraduate_major',
            model:'undergraduate_major',
          
          }
        },
        {
          info: {
            school: '研究生学校', 
            major: '研究生专业',     
            fn: 'graduateFunc',
            prop:'graduate_school',
            propMajor:'graduate_major',
            model:'graduate_major',
            
          }
        },
        {
          info:{
            school: '博士学校',
            major: '博士专业',
            fn: 'phdFunc',
            prop:'phd_school',
            propMajor:'phd_major',
            model:'phd_majorl',
        
          }
        }
      ]
    }
  },
  methods: {
    selectGender(value) {
      this.mentor.gender = parseInt(value)
    },
    undergraduateFunc(payload) {
      this.mentor.undergraduate_university = payload
    },
    graduateFunc(payload) {
      this.mentor.graduate_school = payload
    },
    phdFunc(payload) {
      this.mentor.phd_school = payload
    },
    reset(){
      this.$refs.addMentorForm.resetFields()
    },
    async addMentor(){
      const {data: res} = await adminService.addMentor(this.mentor)
      if (res.status !== 200) return this.$message.error(res.msg)
      this.$message.info(res.msg)
    },
    addSchool() {
      if(this.count == 3) {
        return
      }
      this.fieldsGroup[this.count].key = Date.now()
      this.addMentorForm.schools.push(
        this.fieldsGroup[this.count]
      )
      this.count++
    },
    removeDomain(item) {
      let index = this.addMentorForm.schools.indexOf(item)
      if (index !== -1) {
        this.addMentorForm.schools.splice(index, 1)
      }
    },
    btnFn(payload) {
      this.undergraduate_flag = payload
      this.graduate_flag = payload
      this.phd_flag = payload
    }
  }
}
</script>
<style scoped>
.dynamic-delete-button {
  cursor: pointer;
  position: relative;
  top: 4px;
  font-size: 24px;
  color: #999;
  transition: all 0.3s;
}
.dynamic-delete-button:hover {
  color: #777;
}
.dynamic-delete-button[disabled] {
  cursor: not-allowed;
  opacity: 0.5;
}
</style>