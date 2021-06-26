<template>
  <div>
    <div style="margin-bottom: 10px">
      <el-input v-model="keyword" placeholder="请输入关键字" style="inline-size: auto;margin-right: 10px"></el-input>
      <el-button @click="search">搜索</el-button>
      <el-button @click="export_">导出所选</el-button>
      <el-upload
          :action="uploadUrl"
          style="margin-top: 10px"
          :on-success="handleUpload">
        <el-button>导入文件</el-button>
      </el-upload>
    </div>

    <el-table
      @row-click="openDetails"
      ref="table"
      :data="relicData"
      border
      style="width: 100%">
      <el-table-column
        type="selection"
        width="35">
      </el-table-column>
      <el-table-column
        prop="testNumber"
        label="实验编号">
      </el-table-column>
      <el-table-column
        prop="unearthNumber"
        label="出土编号">
      </el-table-column>
      <el-table-column
        prop="name"
        label="名称">
      </el-table-column>
      <el-table-column
        prop="age"
        label="年代">
      </el-table-column>
      <el-table-column
        prop="times"
        label="时代">
      </el-table-column>
      <el-table-column
        prop="unearthPlace"
        label="出土地点">
      </el-table-column>
    </el-table>
    <el-pagination
      @current-change="handlePageChange"
      style="margin-top: 10px"
      background
      layout="prev, pager, next"
      :total="total"
      page-size=10>
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'Table',
  data () {
    return {
      relicData: {
        id:"",
        testNumber: "",
        unearthNumber: "",
        age: "",
        times: "",
        unearthPlace: ""

      },
      keyword: "",
      uploadUrl: this.$http.defaults.baseURL+"/doc",
      total: 0
    }
  },
  created() {
    this.getFormData()
  },
  methods :{
    getFormData(page = 1,size = 10){
      this.$http.get("/relic?page=" + page + "&size=" + size).then(res =>{
        console.log(res)
        const { status } = res.data
        if (status === 'success'){
          this.relicData = res.data.data.list
          this.total = res.data.data.total
        } else {
          this.$message.error(res.data.data)
        }
      })
    },

    export_(){

      if (this.$refs.table.selection.length <= 0){
        this.$message.error("请勾选要导出数据");
        return
      }

      let res = '';
      for (let i = 0; i < this.$refs.table.selection.length; i++) {
        if (i === 0 ){
          res+=this.$refs.table.selection[i].id
        } else {
          res+=","+this.$refs.table.selection[i].id
        }
      }

      window.open(this.$http.defaults.baseURL+"/doc?ids="+res)
      this.$message.success("导出成功");
      console.log(res)
    },
    handleUpload(response){
      if (response.message === "fail") {
        this.$message.error("导入失败请检查文件")
      } else if (response.data === "ok"){
        this.$message.success("导入成功")
        this.getFormData()
      }
      console.log(response)
    },
    openDetails(row){
      this.$router.push('/detail?id='+row.id)
      console.log(row)
    },
    search(e,size = 10,page = 1){
      console.log(page)
      this.$http.get("/relic?page="+ page +"&size=" + size+"&keyword="+this.keyword).then(res =>{
        console.log(res)
        this.relicData = res.data.data.list
        this.total = res.data.data.total
      })
    },
    handlePageChange(page){
      console.log(page)
      this.getFormData(page,10);
    }
  }

}
</script>

<style scoped>

</style>
