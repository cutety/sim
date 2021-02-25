<template>
  <a-layout-sider
      breakpoint="lg"
      collapsed-width="0"
      @collapse="onCollapse"
      @breakpoint="onBreakpoint"
    >
    <div class="log">
      <span> SIM </span>
    </div>
     <a-menu theme="dark" mode="inline" :open-keys="openKeys" @openChange="onOpenChange" @click="goToPage">
      <a-sub-menu key="getApplyInfo">
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
    </a-menu>
  </a-layout-sider>
</template>

<script>
export default {
  data() {
    return {
      rootSubmenuKeys: ['sub1', 'sub2', 'sub4'],
      openKeys: ['sub1'],
    }
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