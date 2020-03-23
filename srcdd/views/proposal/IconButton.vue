<template>
  <div class="bt" @click="$emit('click',id)">
    <!-- ICON 在右侧的按钮 -->
    <span>{{label}}</span><md-icon :name="iconName" size="sm" class="icon"/>
  </div>
</template>

<script>
  import {Icon} from 'mand-mobile'
  export default {
    name: "IconButton",
    components: {
      [Icon.name]: Icon,
    },
    props:{
      id:{type:String, default: ''},// click事件会返回本字段值
      label:{type:String, default:''},// 按钮标签
      iconName:{type:String, default: 'arrow-right'}// 默认：右箭头
    }
  }
</script>

<style scoped lang="less">
  .bt{
    display:inline-block;
    height: 50px;line-height: 50px;
    background-color: #61A0EF19;color: #61A0EF;
    border: 1px solid #61A0EF; border-radius: 30px;
    font-family: PingFangSC-Regular; font-size: 26px;
    span{padding: 12px 12px 12px 28px}
    .icon{padding-right: 14px;}
  }
</style>