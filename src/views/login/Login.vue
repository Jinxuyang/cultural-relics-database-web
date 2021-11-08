<template>
  <div class="site-wrapper site-page--login">
    <div class="site-content__wrapper">
      <div class="site-content">
        <div class="brand-info">
          <h2 class="brand-info__text">面向科学研究的文物大数据分析平台</h2>
          <p class="brand-info__intro">面向科学研究的文物大数据分析平台基于vue、element-ui构建开发，使用MongoDB作为数据库。</p>
        </div>
        <div class="login-main">
          <h3 class="login-title">管理员登录</h3>
          <el-form :model="loginForm" ref="loginFormRef" @keyup.enter.native="login()" status-icon>
            <el-form-item prop="userName">
              <el-input v-model="loginForm.username" placeholder="帐号"></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input v-model="loginForm.password" type="password" placeholder="密码"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button class="login-btn-submit" type="primary" @click="login()">登录</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
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

        if (!valid) return
        const data = this.transformRequest(this.loginForm)
        this.$http.post('/user/login', data).then(res => {
          const { status } = res.data
          console.log(res)
          if (status === "success") {
            this.$message.success('登陆成功')
            this.$router.push('/table')
          } else {
            const { data } = res.data
            this.$message.error('登陆失败,'+data)
          }
        })
      })
    },
  }
}
</script>

<style scoped lang="scss">
.site-wrapper.site-page--login {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(38, 50, 56, .6);
  overflow: hidden;
&:before {
   position: fixed;
   top: 0;
   left: 0;
   z-index: -1;
   width: 100%;
   height: 100%;
   content: "";
   background-image: url(~@/assets/bg.png);
   background-size: cover;
 }
.site-content__wrapper {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  padding: 0;
  margin: 0;
  overflow-x: hidden;
  overflow-y: auto;
  background-color: transparent;
}
.site-content {
  min-height: 100%;
  padding: 30px 500px 30px 30px;
}
.brand-info {
  margin: 220px 100px 0 90px;
  color: #fff;
}
.brand-info__text {
  margin:  0 0 22px 0;
  font-size: 48px;
  font-weight: 400;
  text-transform : uppercase;
}
.brand-info__intro {
  margin: 10px 0;
  font-size: 16px;
  line-height: 1.58;
  opacity: .6;
}
.login-main {
  position: absolute;
  top: 0;
  right: 0;
  padding: 150px 60px 180px;
  width: 470px;
  min-height: 100%;
  background-color: #fff;
}
.login-title {
  font-size: 16px;
}
.login-captcha {
  overflow: hidden;
> img {
  width: 100%;
  cursor: pointer;
}
}
.login-btn-submit {
  width: 100%;
  margin-top: 38px;
}
}

</style>
