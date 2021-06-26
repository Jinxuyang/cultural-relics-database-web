<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>用户管理</span>
        <el-input v-model="keyword" style="width: 15%;margin-left: 1%" placeholder="请输入内容"></el-input>
        <el-button @click="search" style="margin-left: 1%">检索</el-button>
      </div>
      <div class="text item">
        <template>
          <el-table
            :data="memberData"
            style="width: 100%">
            <el-table-column
              label="id">
              <template slot-scope="scope">
                <span>{{ scope.row.id }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="用户名">
              <template slot-scope="scope">
                <span>{{scope.row.username}}</span>
              </template>
            </el-table-column>
            <el-table-column
                label="权限">
              <template slot-scope="scope">
                <span>{{scope.row.roles}}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="updateToAdmin(scope.row)">修改权限</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </div>
      <div class="block">
        <el-pagination
            @current-change="handlePageChange"
            style="margin-top: 10px"
            background
            layout="prev, pager, next"
            :total="total"
            page-size=10>
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Member',
  data () {
    return {
      imageUrl: '',
      searchContent: '',
      pageCnt: 0,
      memberData: [],
      keyword: '',
      total: 0
    }
  },
  created () {
    this.getMemberList()
  },
  methods: {

    handleDelete (index, row) {
      this.$http.delete('/user',row.id).then(res => {
        if (res.data.code === 200) {
          this.$message.success('删除成功')
          this.getMemberList()
        } else {
          this.$message.error('删除失败')
        }
      })
    },

    getMemberList (size = 10, page = 1) {
        this.$http.get("/user?page=" + page + "&size=" + size).then(res => {
          console.log(res)
          this.memberData = res.data.data.list
          this.total = res.data.data.total
        })
    },

    updateToAdmin(row){
      console.log(row.id)
      let id = row.id

      this.$http.put("/user/"+id ).then(res => {
        console.log(res)
      })
    },
    search(e,size = 10,page = 1){
      console.log(page)
      this.$http.get("/user?page="+ page +"&size=" + size+"&keyword="+this.keyword).then(res =>{
        console.log(res)
        this.memberData = res.data.data.list
        this.total = res.data.data.total
      })
    },
    handlePageChange(page){
      console.log(page)
      this.getMemberList(10,page);
    }

  }

}
</script>

<style scoped>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}

.box-card {
  margin-top: 1.2%;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
