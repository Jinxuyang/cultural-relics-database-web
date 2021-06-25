<template>
<div class="container" style="margin-top: 10%">
  <div>
    <h2 style="text-align: center">电力数据监控平台登录</h2>
  </div>
  <div>
    <el-form ref="loginFormRef" :model="loginForm" :rules="rules" label-width="80px" >
      <el-form-item label="用户名" prop="username">
        <el-input v-model="loginForm.username" placeholder="请输入用户名" type="text"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="loginForm.password" placeholder="请输入密码" type="password"></el-input>
      </el-form-item>
      <el-form-item >
        <el-button type="primary" @click="login" >提交</el-button>
        <el-button type="primary" @click="pushTo" >注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</div>
</template>

<script>
export default {
  name: 'Login.vue',
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 1, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 1, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    transformRequest (data) {
      let ret = ''
      for (const it in data) {
        ret +=
          encodeURIComponent(it) +
          '=' +
          encodeURIComponent(data[it]) +
          '&'
      }
      return ret
    },
    login () {
       this.$refs.loginFormRef.validate(valid => {
         this.$message.success('登陆成功')
         this.$router.push('/dashboard')
        if (!valid) return
        const data = this.transformRequest(this.loginForm)
        this.$http.post('/login', data).then(res => {
          const { code } = res.data
          if (code === 0) {

          } else {
            this.$message.error('登陆失败')
          }
        })
      })
    },
    pushTo(){
      this.$router.push('/register')
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
