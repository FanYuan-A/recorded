<template>
  <div id="plan-book-list">
    <md-scroll-view v-if="isReady"  ref="scrollView" :auto-reflow='true' :scrolling-x="false" @end-reached="$_onEndReached" class="scroll-view">
      <template v-if="proposalListData.proposalDTOs && proposalListData.proposalDTOs.length > 0">
        <div>
          <div class="plan-book-total">共<span>&nbsp;{{records}}&nbsp;</span>份计划书</div>
          <div class="border" v-for="(item,index) of dataList" :key="index" @click="toDetail(item.proposalNo)">
            <md-field>
              <md-detail-item :title="item.itemName">
                <div>
                  <md-button type="primary" size="small" inline @click.stop="toSend(item.proposalNo)">发给客户</md-button>
                </div>
              </md-detail-item>
              <md-detail-item title="被保险人" :content="item.insured" />
              <md-detail-item title="敬呈客户" :content="item.customer" v-if="item.customerName"/>
              <md-detail-item title="创建日期" :content="item.makeDate" />
            </md-field>
          </div>
        </div>
      </template>
      <div v-else class="no-data">暂无计划书</div>
      <md-scroll-view-more
              slot="more"
              v-show="!isFinished"
              :is-finished="isFinished"
              loading-text = "加载中"
              finished-text = "已经到底啦"
      >
      </md-scroll-view-more>
    </md-scroll-view>
  </div>
</template>

<script>
  import {ScrollView, ScrollViewMore, Field, DetailItem,Button, Toast} from 'mand-mobile'
  import plan from '@/api/plan.js'
  import commonUtils from '@/utils/common'
  import weixin from '../../utils/weixin'
  import CommonUtils from "../../utils/common";
  export default {
    name: 'proposalList',
    components: {
      [Field.name]: Field,
      [DetailItem.name]: DetailItem,
      [Button.name]: Button,
      [ScrollView.name]: ScrollView,
      [ScrollViewMore.name]: ScrollViewMore,
      [Toast.name]: Toast,
    },
    data() {
      return {
        isFinished: false,
        isReady:false,
        dataList: [],
        currentPage: 1,
        total: null,
        records:null,
        proposalListData:''
      }
    },
    methods: {
      $_onEndReached() {
        if(this.isFinished === false) {
          this.getProposal(this.currentPage,false)
        }
      },
      toDetail(proposalNo) {
        this.$router.push({name:'proposalDetail',query:{proposalNo,viewMode:'agent'}})
      },
      toSend(proposalNo) {
        localStorage.setItem('proposalDetailRefreshed','false');// ios分享问题，详情页进入后需要强制刷新一次
        this.$router.push({name:'proposalDetail',query:{proposalNo,viewMode:'agent',shareLayer:'true'}})// shareLayer初始进入是否显示分享引导弹层
      },
      /**
       *  获取计划书列表数据
       *  currentPage 当前页  String类型
       *  isFirst 是否是第一页  Boolean类型
       */
      async getProposal(currentPage,isFirst) {
        let params = {
          platformType: 'ESP',
          platformSubType: 'LXB',
          pageSize: '10',
          currentPage:currentPage
        }
        Toast.loading();
        let res = await plan.getQueryList(params);
        this.isReady = true;
        Toast.hide();
        if(res) {
          if(res.result === '0') {
            this.records = res.records //总条数
            this.total = res.total //总页数
            this.proposalListData = res
            let proposalDTOList = res.proposalDTOs
            for(let i of proposalDTOList) {
              console.log('i',i)
              let sharingParams = JSON.parse(i.sharingParams)

              let insuredSexLabel = sharingParams.insuredSex === '0'? '男':'女'
              let obj = sharingParams
              obj.itemName = i.proposalName
              obj.insured = `${sharingParams.insuredAge}岁     ${insuredSexLabel}`
              if(sharingParams.customerName !== '') {
                obj.customer = `${sharingParams.customerName}`
                obj.customerName = sharingParams.customerName
              }
              obj.makeDate = i.makeDate
              obj.proposalNo = i.proposalNo
              this.dataList.push(obj)
            }
            // this.$refs.scrollView.reflowScroller()
            if(this.isFinished === false) {
              // 判断是否可以再次加载
              this.currentPage++
              console.log('当前页————'+this.currentPage)
              if(this.currentPage > Number(this.total)) {
                this.isFinished = true
              }
            }
            if(!isFirst) {
              this.$refs.scrollView.finishLoadMore()
            }
          }else {
            Toast.failed(res.resultMessage)
            if(!isFirst) {
              this.$refs.scrollView.finishLoadMore()
            }
          }
        }
      }
    },
    async mounted() {
      await this.getProposal('1',true);
      setTimeout(()=>{CommonUtils.closeGlobalMask();},300);

    },
    created(){
      //隐藏菜单
      // weixin.hideMenu()
    }
  }
</script>

<style lang="less" scoped>
  #plan-book-list {
    height: 100%;
    background:#FFFFFF;
    .plan-book-total{
      margin:30px 40px;
      font-size:28px;
      font-family:PingFangSC-Regular,PingFang SC;
      font-weight:400;
      color:rgba(51,51,51,1);
      line-height:40px;
      span{
        color:#61A1ED;
      }
    }
    .border{
      margin:35px 30px;
      .md-field {
        background:rgba(255,255,255,1);
        box-shadow:0px 0px 12px 0px rgba(2,2,2,0.06);
        border-radius:12px;
        padding:10px 30px;
        .md-detail-item {
          padding:20px 0;
          /deep/ .md-detail-title {
            height:28px;
            font-size:28px;
            font-family:PingFangSC-Regular,PingFang SC;
            font-weight:400;
            color:rgba(153,153,153,1);
            line-height:28px;
          }
          /deep/ .md-detail-content {
            height:28px;
            font-size:28px;
            font-family:PingFangSC-Regular,PingFang SC;
            font-weight:400;
            color:rgba(153,153,153,1);
            line-height:28px;
          }
        }
        .md-detail-item:nth-child(1){
          border-bottom:1px solid rgba(238,238,238,1);
          padding-bottom: 30px;
          /deep/ .md-detail-title{
            display: flex;
            align-items: center;
            flex: auto;
            font-size:30px;
            font-family:PingFangSC-Medium,PingFang SC;
            font-weight:500;
            color:#333333 !important;
            line-height:30px;
          }
        }
        .md-detail-item:nth-child(2){
          padding-top: 30px;
        }
        .md-button {
          height:56px;
          background:rgba(110,160,239,1);
          border-radius:8px;
          /deep/ .md-button-content {
            height:26px;
            font-size:26px;
            font-family:PingFangSC-Regular,PingFang SC;
            font-weight:400;
            color:rgba(255,255,255,1);
            line-height:26px;
          }
        }
        .md-button.primary:after{
          border:none;
        }
      }
    }
    .scroll-view{
      height: calc(100vh - 30px);
    }
    /deep/ .scroll-view-more {
      height: 150px;
    }
    .no-data {
      font-size: 28px;
      color: #666666;
      text-align: center;
      height: 80px;
      line-height: 80px;
      padding-top: 40px;
    }
  }
</style>
