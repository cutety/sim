<template>
<div>
   <a-button type="danger" @click="logout">
     退出  
   </a-button>
</div>
</template>

<script>
import storageService from '@/service/storageService'
export default {
  methods: {
    logout() {
      storageService.clear(storageService.USER_TOKEN)
      this.$router.replace({name:'login'})
    }
  }
}
</script>

<style scoped>

</style>