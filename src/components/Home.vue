<template>
  <div>
    <el-container>
      <el-aside width="200px">
        <el-menu
            default-active="2"
            :router="true">
          <el-menu-item index="/table">
            <i class="el-icon-s-flag"></i>
            <span slot="title">文物科技数据库</span>
          </el-menu-item>
          <el-menu-item index="/user">
            <i class="el-icon-s-flag"></i>
            <span slot="title">用户管理</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <el-menu mode="horizontal" >
            <el-button @click="logout" style="float: right;margin-bottom: 5px">登出</el-button>
          </el-menu>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'Home',
  methods: {
    logout(){
      this.$http.post("/logout").then(res => {
        console.log(res)
        this.$message.success(res.data.data)
        this.$router.push("/")
      })
    }
  }
}
</script>

<style scoped>

</style>
