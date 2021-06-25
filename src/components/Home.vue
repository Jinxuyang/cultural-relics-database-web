<template>
  <div>
    <el-container>
      <el-header>

      </el-header>
<!--      <el-aside width="200px">
        <el-menu
          default-active="2"
          :router="true">
          <el-menu-item index="/dashboard">
            <i class="el-icon-user"></i>
            <span slot="title">DashBoard</span>
          </el-menu-item>
          <el-menu-item index="/user">
            <i class="el-icon-s-flag"></i>
            <span slot="title">用户管理</span>
          </el-menu-item>
          <el-menu-item index="/alert">
            <i class="el-icon-s-claim"></i>
            <span slot="title">预警信息</span>
          </el-menu-item>
        </el-menu>
      </el-aside>-->
      <el-container>
        <el-main>
          <router-view></router-view>
        </el-main>
        <el-footer>

        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'Home',
  methods: {
  }
}
</script>

<style scoped>

</style>
