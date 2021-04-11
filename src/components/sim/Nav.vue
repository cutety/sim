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
      <a-sub-menu key="pee" v-show="role == 2 ? true : false">
        <span slot="title"><a-icon type="read"/><span>考研管理</span></span>
        <a-menu-item key="application">
          <a-icon type="form"/>
          报考信息
        </a-menu-item>
        <a-menu-item key="mentorMatch">
          <a-icon type="team"/>
          导师匹配
        </a-menu-item>
        <a-menu-item key="admissionHistory">
          <a-icon type="cloud"/>
          往届录取
        </a-menu-item>
          <a-menu-item key="selectionResult">
          <a-icon type="table"/>
          申请结果
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
      <a-sub-menu key="mentorPanel" v-show="role == 3 ? true : false">
        <span slot="title"><a-icon type="user"/><span>导师操作</span></span>
        <a-menu-item key="mentorStudents">
          <a-icon type="solution"/>
          指导情况
        </a-menu-item>
          <a-menu-item key="instructRequest">
          <a-icon type="pull-request"/>
          指导申请
        </a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="dashboard" v-show="role == 1 ? true : false">
        <span slot="title"><a-icon type="user"/><span>管理员操作</span></span>
        <a-menu-item key="addMentor">
          <a-icon type="user-add"/>
          添加导师
        </a-menu-item>
        <a-menu-item key="batchAddMentors">
          <a-icon type="usergroup-add"/>
          批量添加
        </a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="studentPanel" v-show="role == 1 || role == 3 ? true : false">
        <span slot="title"><a-icon type="user"/><span>学生信息</span></span>
        <a-menu-item key="studentsList">
          <a-icon type="user-add"/>
          学生列表
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
      rootSubmenuKeys: ['application', 'mentorMatch', 'changePassword', 'userInfo', 'addMentor', 'batchAddMentors','mentorStudent', 'instructRequest', 'selectionResult', 'studentsList','admissionHistory'],
      openKeys: ['pee', 'accountManage', 'dashboard', 'mentorPanel', 'studentPanel'],
      username:'',
      role:'',
    }
  },
  created() {
    this.username = JSON.parse(
      storageService.get(storageService.USER_INFO)
    ).username
    this.role = JSON.parse(
      storageService.get(storageService.USER_INFO)
    ).role
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
