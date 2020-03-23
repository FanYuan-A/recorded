<template>
  <div class="pages" id="pages">
    <v-table
      :width="screemWidth"
      :height="screemHeight"
      :columns="columns"
      :table-data="tableData"
      even-bg-color="#f4f4f4"
      row-hover-color="#eee"
      row-click-color="#edf7ff"
    ></v-table>
  </div>
</template>
<script>
// 引入样式
import 'vue-easytable/libs/themes-base/index.css'
// 导入 table 和 分页组件
import {VTable} from 'vue-easytable'
import CommonUtils from '@/utils/common.js'
export default {
  components:{
    [VTable.name]: VTable // 注册到
  },
  data() {
    return {
      screemWidth: window.innerWidth, // 屏幕宽度
      screemHeight: window.innerHeight, // 屏幕高度
      benefitTable: CommonUtils.getSessionStore('benefitTable'), // beneData数组数据
      beneTables: CommonUtils.getSessionStore('beneTables'), // 利益表的头部title
    }
  },
  created(){
    CommonUtils.closeGlobalMask() // 全局加载中的样式
  },
  computed:{
    columns(){
      let columnsArr = []
      columnsArr.push({field: 'insuredAge', title:'年末年龄', width: 42, titleAlign: 'center',columnAlign:'center',isFrozen: true})
      columnsArr.push({field: 'currYear', title:'保费年度', width: 42, titleAlign: 'center',columnAlign:'center', isFrozen: true})
      console.log('this.beneTables',this.beneTables)
      this.beneTables.map(item =>{
        columnsArr.push({field: item.code, title: item.label, width: 84, titleAlign: 'center',columnAlign:'center'})
      })
      return columnsArr
    },
    tableData(){
      return this.benefitTable
    }
  },
  mounted() {
  },
  methods: {
  },
  watch: {
  }
}
</script>
<style lang="less" scoped>
.pages{
  overflow-x: auto;
  overflow: scroll;
  width: 100%;
  height: 100%;
  font-size: 28px;
}
</style>