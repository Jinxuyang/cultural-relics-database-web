<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>基本信息</span>
      </div>
      <div class="text item">
        {{'名称： ' + this.relicDetail.name }}
      </div>
      <div class="text item">
        {{'出土编号： ' + this.relicDetail.unearthNumber}}
      </div>
      <div class="text item">
        {{'实验编号： ' + this.relicDetail.testNumber }}
      </div>
      <div class="text item">
        {{'时代： ' + this.relicDetail.times }}
      </div>
      <div class="text item">
        {{'年代： ' + this.relicDetail.age }}
      </div>
      <div class="text item">
        {{'出土地点： ' + this.relicDetail.unearthPlace }}
      </div>
    </el-card>

    <div style="margin-bottom: 10px"></div>

    <el-row :gutter="20">
      <el-col :span="8" v-for="relic in this.relicDetail.testResult" :key="index" >
        <el-card class="box-card" style="width: 100%">
          <div slot="header" class="clearfix">
            <span>元素组成</span>
          </div>
          <span v-for="(value, key) in relic" class="text item">
          {{key+": "+value}}
          <br>
          </span>
        </el-card>
      </el-col>
    </el-row>

  </div>
</template>

<script>
export default {
  name: "Detail",
  data () {
    return {
      relicDetail: {
        id:"",
        testNumber: "",
        unearthNumber: "",
        age: "",
        times: "",
        unearthPlace: "",
        name,
        testResult: []
      },
    }
  },
  created() {
    this.getDetail()
  },
  methods: {
    getDetail(){
      let id = this.$route.query.id
      this.$http.get("/relic/detail?id="+id).then(res =>{
        this.relicDetail = res.data.data
        console.log(res)
      })

      console.log(id)
    }
  }
}
</script>

<style scoped>
.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}

.box-card {
  width: 480px;
}
</style>
