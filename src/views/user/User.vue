<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>用户管理</span>
        <el-input v-model="searchContent" style="width: 15%;margin-left: 1%" placeholder="请输入内容"></el-input>
        <el-button @click="handleSearch(searchContent)" style="margin-left: 1%">检索</el-button>
        <el-button style="float: right" @click="showInsertMemberDialog">添加新成员</el-button>
      </div>
      <div class="text item">
        <template>
          <el-table
            :data="memberData"
            style="width: 100%">
            <el-table-column
              label="id"
              width="40">
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
              label="昵称">
              <template slot-scope="scope">
                <span>{{scope.row.nick}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="手机号">
              <template slot-scope="scope">
                <span>{{scope.row.mobile}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="邮箱">
              <template slot-scope="scope">
                <span>{{scope.row.email}}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="showEditDialog(scope.$index, scope.row)">编辑</el-button>
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
          background
          layout="prev, pager, next"
          :page-count="pageCnt"
          @current-change="handleCurrentPageChange">
        </el-pagination>
      </div>
    </el-card>
    <el-dialog title="修改成员信息" :visible.sync="editDialogFormVisible">
      <el-form :model="editMember">
        <el-form-item label="ID" >
          <el-input  v-model="editMember.id" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="姓名" >
          <el-input  v-model="editMember.username"></el-input>
        </el-form-item>
        <el-form-item label="昵称" >
          <el-input  v-model="editMember.nick"></el-input>
        </el-form-item>
        <el-form-item label="手机号" >
          <el-input type="textarea" v-model="editMember.mobile"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" >
          <el-input type="textarea" v-model="editMember.email"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editMemberMe(editMember)">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="添加成员" :visible.sync="addDialogFormVisible">
      <el-form :model="addMember" ref="insertFormRef">
        <el-form :model="addMember">
          <el-form-item label="姓名" >
            <el-input  v-model="addMember.username"></el-input>
          </el-form-item>
          <el-form-item label="昵称" >
            <el-input  v-model="addMember.nick"></el-input>
          </el-form-item>
          <el-form-item label="手机号" >
            <el-input type="textarea" v-model="addMember.mobile"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" >
            <el-input type="textarea" v-model="addMember.email"></el-input>
          </el-form-item>
        </el-form>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addMemberMe(addMember)">确 定</el-button>
      </div>
    </el-dialog>
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
      editMember: {
        id: '', username: '', nick: '', mobile: '', email: ''
      },
      addMember: {
        username: '', nick: '', mobile: '', email: ''
      },
      addDialogFormVisible: false,
      editDialogFormVisible: false
    }
  },
  created () {
    this.getMemberList()
  },
  methods: {
    handleSearch (searchContent) {
      this.getMemberList(searchContent)
    },
    showEditDialog (index, row) {
      this.editDialogFormVisible = !this.editDialogFormVisible
      this.editMember = row
    },
    handleDelete (index, row) {
      this.$http.delete('/user' + row.id).then(res => {
        if (res.data.code === 200) {
          this.$message.success('删除成功')
          this.getMemberList()
        } else {
          this.$message.error('删除失败')
        }
      })
    },
    showInsertMemberDialog () {
      this.addDialogFormVisible = !this.addDialogFormVisible
    },
    editMemberMe (editFormData) {
      const param = JSON.stringify(editFormData)
      this.$http.put('/user' + editFormData.id, param, { headers: { 'Content-Type': 'application/json' } }).then(res => {
        if (res.data.code === 200) {
          this.$message.success('修改成功')
        } else {
          this.$message.error('修改失败')
        }
      })

      this.editDialogFormVisible = false
    },
    addMemberMe (addFormData) {
      const param = JSON.stringify(addFormData)
      this.$http.post('/user', param, { headers: { 'Content-Type': 'application/json' } }).then(res => {
        if (res.data.code === 200) {
          this.getMemberList()
          this.$message.success('修改成功')
        } else {
          this.$message.error('修改失败')
        }
      })
      this.addDialogFormVisible = false
    },
    handleCurrentPageChange (page) {
      this.getMemberList('', page)
    },
    getMemberList (keyword = '', pageNum = 1) {
      if (keyword === '') {
        this.$http.get('/user').then(res => {
          console.log(res)
          const {data,code} = res.data
          if (code === 0) {
            this.memberData = data
          }
        })
      } else {
        this.$http.get('/user').then(res => {
          const cbInfo = res.data.data
          if (res.data.code === 200) {
            const { list } = cbInfo
            const { pageCnt } = cbInfo
            this.memberData = list
            this.pageCnt = pageCnt
          }
        })
      }
    },
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
