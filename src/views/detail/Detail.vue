<template>
  <div>

    <div style="margin-bottom: 10px"></div>

    <el-row :gutter="20">
      <el-col :span="8" v-for="(relic, paramName) in this.relicDetail.chemicalComposition" :key="index" >
        <el-card class="box-card" style="width: 100%">
          <div slot="header" class="clearfix">
            <span>{{paramName}}</span>
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
        chemicalComposition:''
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
