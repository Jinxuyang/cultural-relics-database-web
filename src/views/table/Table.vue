<template>
  <div style="margin-right: 100px;margin-left: 100px">
    <el-page-header @back="goBack" content="陶瓷文物数据库" style="margin-bottom: 25px">
    </el-page-header>
    <div style="margin-bottom: 10px">
      <el-input v-model="input" placeholder="请输入关键字" style="inline-size: auto;margin-right: 10px"></el-input>
      <el-button>搜索</el-button>
      <el-button @click="resetDateFilter">导出所选</el-button>
      <el-button @click="clearFilter">导入文件</el-button>
    </div>

    <el-table
      :data="data"
      border
      style="width: 100%">
      <el-table-column
        type="selection"
        width="35">
      </el-table-column>
      <el-table-column
        fixed
        prop="id"
        label="编号">
      </el-table-column>
      <el-table-column
        prop="name"
        label="名称">
      </el-table-column>
      <el-table-column
        prop="place"
        label="出土地点">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
          <el-button type="text" size="small">导出</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      style="margin-top: 10px"
      background
      layout="prev, pager, next"
      :total="30">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'Table',
  data () {
    return {
      data:[
        {id:"90BKKM26",name:"玻璃珠残片",place:"新疆拜城克孜尔水库墓地"},
        {id:"XJ05-1",name:"器皿残片",place:"新疆巴楚县吐木秀克遗址"},
        {id:"XJ-9-1",name:"单色珠",place:"新疆策勒县达玛沟遗址"},
        {id:"XJ05-3-4",name:"条纹折叠珠",place:"新疆民丰县尼雅遗址"},
        {id:"XJ05-3-5 ",name:"束腰折叠珠",place:"新疆民丰县尼雅遗址"},
        {id:"XJ-16-10 ",name:"条纹珠模仿马赛克",place:"新疆柯坪县穷梯木遗址"},
        {id:"XJ-40-2 ",name:"马赛克眼珠",place:"新疆洛浦县达玛沟遗址"},
        {id:"XZHM-06-08",name:"铜红珠\n",place:"广西合浦风门岭\n"},
        {id:"XZHM-06-01",name:"六棱柱玻璃珠\n",place:"广西合浦寮尾\n"},
        {id:"XZHM-06-06\n\n",name:"玻璃管\n",place:"江苏无锡鸿山越墓\n"},
      ]
    }
  },
}
</script>

<style scoped>

</style>
