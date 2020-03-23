<template>
  <!-- 条款列表弹层 -->
  <md-popup v-model="clauseCfg.show" position="bottom" :mask-closable="true">
    <div class="clause-popup">
      <div class="clause-popup-title">
        <span>条款须知</span>
        <md-icon class="bt-close" name="close" @click="clauseCfg.show = false"></md-icon>
      </div>
      <div class="clause-popup-body" v-for="(risk,riskIdx) in clauseCfg.riskList" :key="riskIdx">
        <div class="clause-popup-risk-name">{{risk.name}}</div>
        <ul class="clause-popup-body-list">
          <li v-for="(clause,clauseIdx) in risk.clauseList" :key="clauseIdx" @click="showClause(riskIdx,clauseIdx,clause)">{{clause.name}}</li>
        </ul>
      </div>
    </div>
  </md-popup>
</template>

<script>
  import {Icon,Popup} from 'mand-mobile'
  export default {
    name: "PopupClauseList",
    components: {
      [Icon.name]: Icon,
      [Popup.name]: Popup,
    },
    props:{
      autoClose:{type:Boolean, default:true},// 点击某条款后是否自动关闭本弹层
      immediate:{type:Boolean, default:true},// true:(默认)点击条款项，会立即页面跳转; false:点击条款项，仅派发事件，由上层组件处理。
      clauseCfg:{// 条款数据
        type:Object,
        required:true,
        default:()=>{
          return{// 外部传入clauseCfg对象的格式：
            show:true,// 是否显示本弹层
            riskList:[// 多险种，每个险种下包含一组条款
              {
                name:'',// 险种名称
                clauseList:[// 该险种下的条款列表
                  {
                    name:'',// 条款名称
                    url:'',// 条款连接
                  }
                ]
              }
            ]
          }
        }
      }
    },
    methods:{
      /**
       * 跳转页面，展示条款
       * @param riskIdx 条款所属险种-数组的下标
       * @param clauseIdx 条款列表-数组的下标
       * @param clause 条款项
       */
      showClause(riskIdx,clauseIdx,clause){
        this.$emit('click',{riskIdx:riskIdx,clauseIdx:clauseIdx,clause:clause});
        if(this.immediate && clause.url)
          window.open(clause.url);
        if(this.autoClose)
          this.clauseCfg.show = false;
      }
    }
  }
</script>

<style scoped lang="less">
  .clause-popup{
    background-color: white;
    .clause-popup-title{
      position: relative;
      text-align: center;
      span{
        font-family: PingFangSC-Regular; font-weight: bold; font-size: 32px;
        display: block; padding-top: 30px; padding-bottom: 30px;
      }
      .bt-close{
        position: absolute;
        top: 33px; right: 30px;
      }
    }
    .clause-popup-title:after{
      content: "";
      pointer-events: none; /* 防止点击触发 */
      box-sizing: border-box;
      position: absolute;
      top: -50%;
      left: -50%;
      right: -50%;
      bottom: -50%;
      transform: scale(0.5);
      border-bottom: 1px solid #EEEEEE;
    }
    .clause-popup-body{
      .clause-popup-risk-name{
        position: relative;
        font-family: PingFangSC-Regular; font-weight: bold; font-size: 28px;
        padding: 30px 0 30px 30px;
      }
      .clause-popup-risk-name:after{
        content: "";
        pointer-events: none; /* 防止点击触发 */
        box-sizing: border-box;
        position: absolute;
        top: -50%;
        left: -50%;
        right: -50%;
        bottom: -50%;
        transform: scale(0.5);
        border-bottom: 1px solid #EEEEEE;
      }
      .clause-popup-body-list{
        li{
          position: relative;
          font-family: PingFangSC-Regular; font-size: 28px;
          color:#61A0EF;
          padding: 30px 0 30px 0; margin-left: 30px;
        }
        li:after{
          content: "";
          pointer-events: none; /* 防止点击触发 */
          box-sizing: border-box;
          position: absolute;
          top: -50%;
          left: -50%;
          right: -50%;
          bottom: -50%;
          transform: scale(0.5);
          border-bottom: 1px solid #EEEEEE;
        }
      }
    }
  }
</style>