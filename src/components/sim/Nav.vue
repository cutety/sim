<template>
  <a-layout-sider
      breakpoint="lg"
      collapsed-width="0"
      @collapse="onCollapse"
      @breakpoint="onBreakpoint"
    >
    <div class="log">
      <span> {{username}} </span>
    </div>
     <a-menu 
      theme="dark" 
      mode="inline" 
      :open-keys="openKeys"
      :default-selected-keys="['application']"
      :default-open-keys="['application']"
      @openChange="onOpenChange"
      @click="goToPage">
      <a-sub-menu key="pee">
        <span slot="title"><a-icon type="read"/><span>考研管理</span></span>
        <a-menu-item key="application">
          <a-icon type="form"/>
          报考信息
        </a-menu-item>
        <a-menu-item key="mentorMatch">
          <a-icon type="team"/>
          导师匹配
        </a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="accountManage">
        <span slot="title"><a-icon type="user"/><span>账号管理</span></span>
        <a-menu-item key="changePassword">
          <a-icon type="key"/>
          修改密码
        </a-menu-item>
        <a-menu-item key="userInfo">
          <a-icon type="info"/>
          个人信息
        </a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="dashboard">
        <span slot="title"><a-icon type="user"/><span>管理员操作</span></span>
        <a-menu-item key="addMentor">
          <a-icon type="key"/>
          添加导师
        </a-menu-item>
        <a-menu-item key="batchAddMentors">
          <a-icon type="info"/>
          批量添加
        </a-menu-item>
      </a-sub-menu>
    </a-menu>
  </a-layout-sider>
</template>

<script>

import storageService from "@/service/storageService"
export default {
  data() {
    return {
      rootSubmenuKeys: ['application', 'mentorMatch', 'changePassword', 'userInfo', 'addMentor', 'batchAddMentors'],
      openKeys: ['pee', 'accountManage', 'dashboard'],
      username:'',
    }
  },
  created() {
    this.username = JSON.parse(
      storageService.get(storageService.USER_INFO)
    ).username
  },
  methods: {
    onOpenChange(openKeys) {
      const latestOpenKey = openKeys.find(key => this.openKeys.indexOf(key) === -1)
      if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
        this.openKeys = openKeys
      } else {
        this.openKeys = latestOpenKey ? [latestOpenKey] : []
      }
    },
    onCollapse(collapsed, type) {
      
    },
    onBreakpoint(broken) {
      
    },
    getApplyInfo() {
      
    },
    goToPage(item) {
      this.$router.push('/' + item.key).catch((err) => err)
    }
  },
}
</script>

<style scoped>
.log {
  height: 32px;
  margin: 16px;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 17px;
}
</style>