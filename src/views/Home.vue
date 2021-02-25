<template>
     <a-layout id="components-layout-demo-responsive" class ="container">
        <Nav></Nav>
      <a-layout>
        <a-layout-header class="headerBtn">
          <Header></Header>
        </a-layout-header>
        <a-layout-content :style="{ margin: '24px 16px 0', overflow: 'initial' }">
        <div :style="{ padding: '24px', background: '#fff'}">
          <router-view :key="$route.fullPath"></router-view>
        </div>
        </a-layout-content> 
      <a-layout-footer :style="{ textAlign: 'center' }">SIM ©2021 Created by cutety</a-layout-footer>
      </a-layout>
    </a-layout>
</template>

<script>
import Nav from '../components/sim/Nav'
//import Footer from '../components/sim/Footer'
import Header from '../components/sim/Header'
export default {
  components: {Nav, Header},
}
</script>

<style scoped>
.container {
  height: 100%;
}
.headerBtn {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
#components-layout-demo-responsive .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
</style>