<template>
  <div class="container" style="margin-top: 10%">
    <div>
      <h2 style="text-align: center">注册</h2>
    </div>
    <div>
      <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
        <el-form-item label="用户名">
          <el-input v-model="user.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="user.password"></el-input>
        </el-form-item>
        <el-form-item >
          <el-button type="primary" @click="register" >提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data () {
    return {
      labelPosition: 'right',
      user: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    register (){
      console.log(this.user)
      this.$http.post('/user', this.user).then(res => {
        console.log(res)
        const { status } = res.data
        if (status === "success") {
          this.$message.success('注册成功')
          this.$router.push('/login')
        } else {
          this.$message.error('注册失败')
        }
        console.log(res)
      })
    }
  }
}
</script>

<style scoped>
.container{
  margin-left: 30%;
  margin-right: 30%;
}
</style>
