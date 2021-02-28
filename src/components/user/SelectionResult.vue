<template>
  <div>
      <a-alert
      :message="status == 0 ? '待审核' : (status == 1 ? '通过' : '被拒绝')"
      :description="status == 0 ? '待审核' : (status == 1 ? '通过' : '老师留言：'+note)"
      :type="status == 0 ? 'info' : (status == 1 ? 'success' : 'error')"
      show-icon
    />
  </div>
</template>

<script>
import userService from '@/service/userService'
import storageService from '@/service/storageService'
export default {
  data () {
    return {
      status:'',
      note:'',
      user:{
        user_id:''
      }
    }
  },
  created() {
    this.user.user_id = JSON.parse(
      storageService.get(storageService.USER_INFO)
    ).user_id
    this.getSelectionResult()
  },
  methods: {
    async getSelectionResult() {
      const{data: res} = await userService.getApplyInfo(this.user)
      this.status = res.data.status
      this.note = res.data.note
    }
  }
}
</script>