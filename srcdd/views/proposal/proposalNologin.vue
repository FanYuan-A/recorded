<template>
  <div class="proposal-detail">
    <div class="head">
      <div class="head-bg">
        <img src="@/assets/imgs/proposal/proposal-detail-top.png"/>
        <div class="summary">
          <div class="summary-table">
            <div class="summary-table-item">
              <span>被保人</span><span>{{summary.insuredLabel}}</span>
            </div>
            <div class="summary-table-item" v-if="summary.appntLabel.length > 0">
              <span>投保人</span><span>{{summary.appntLabel}}</span>
            </div>
            <div class="summary-table-item">
              <span>首年保费</span><span>{{summary.totalPremLabel}}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="pro-table">
        <div class="pro-table-title">
          <div style="width: 28%">险种</div><div style="width: 22%">保额</div><div style="width: 28%">保险期/交费期</div><div style="width: 22%">首年保费</div>
        </div>
        <div class="pro-table-row" v-for="risk in this.riskList" :key="risk.name">
          <div>{{risk.name}}</div><div>{{risk.amount}}</div><div>{{risk.ensure}}/{{risk.payInv}}</div><div>{{risk.premium}}</div>
        </div>
      </div>
      <div style="padding-top: 1px;"><!-- 占位 --></div>
    </div>
    <div class="body">
      <!-- 保险责任（循环） -->
      <div class="part" v-for="riskResp in respList" :key="riskResp.typeName">
        <div class="part-title">
          <div><span class="title-flag"></span><span>{{riskResp.typeName}}</span></div>
          <div style="display: none"><icon-button label="病种" icon-name="arrow-right" id="身故保障" @click="showDiseaseList"/></div>
        </div>
        <div class="part-body">
          <template v-for="(respItem,idx) in riskResp.dutyDetails">
            <div v-html="respItem.mainTitle" class="resp-sub-title red-num"></div>
            <div v-html="respItem.detail" class="resp-detail"></div>
          </template>
        </div>
        <div class="part-footer" style="display: none">
          <span><!-- 数据结构问题，永远用不到 --></span>
        </div>

      </div>
      <!-- 保单利益 -->
      <div class="part">
        <div class="part-title">
          <div><span class="title-flag"></span><span>保单利益</span></div>
          <div></div>
        </div>
        <div class="part-body">
          <div class="resp-sub-title">保单利益如下：</div>
          <div class="benefit-items red-num">
            保单年度<span>{{policyYear}}</span>年，被保险人年龄<span>{{sliderRange.selected}}</span>岁时<br>
            <template v-for="(val,_key,idx) in this.benefitTable[policyYear-1]"><!-- 只显示现价 -->
              <p v-if="benefitCodeLabelMap.hasOwnProperty(_key) && _key === 'cashValue'" class="red-num">{{benefitCodeLabelMap[_key]}}:<span>{{val|simpleNum}}</span>元</p>
            </template>

            <div class="triangle"></div>
          </div>

          <div>
            <div class="benefit-slider">
              <div class="bt-icon" @click="changeSliderVal('del')"><img src="@/assets/icon/icon-delete.png" alt=""></div>
              <md-slider class="slider" v-model="sliderRange.selected" :format="sliderLabel" :min= sliderRange.min :max= sliderRange.max></md-slider>
              <div class="bt-icon" @click="changeSliderVal('add')"><img src="@/assets/icon/icon-add.png" alt=""></div>
            </div>
            <p class="benefit-slider-tip">推动按钮查看不同年龄保单利益</p>
          </div>
        </div>
        <div class="part-footer">
          <span class="bt-view-benefit-table" @click="showBenefitTable">查看利益演示表</span>
        </div>
      </div>
      <div class="part bt-view-clause-list">
        <span @click="clauseCfg.show = true">条款详情</span>
      </div>
      <!-- 风险提示 -->
      <div class="part">
        <div class="part-title">
          <div><span class="title-flag"></span><span>风险提示</span></div>
          <div></div>
        </div>
        <div class="part-body">
          <div class="notice-item" v-html="riskWarning"></div>
        </div>
      </div>
      <!-- IOS底部占位 -->
      <div style="height: 35px;"></div>
    </div>
    <div class="footer">
      <div class="bt-icons">
        <img class="icon-agent" src="@/assets/icon/icon-agent.png"/>
        <span class="agent-name">{{agentInfo.name}}</span>
        <span class="agent-phone">{{agentInfo.mobile}}</span>
        <!--<img class="icon-edit" src="@/assets/icon/icon-edit.png"/>-->
      </div>
      <div class="bt-call"  @click="callAgent">
        <div><md-icon name="phone" color="#ffffff" size="md"/> <span>拨打电话</span></div>
      </div>
    </div>
    <!-- 计划书封面 -->
    <md-popup v-model="showCover" :hasMask="false" position="top">
      <div class="cover">
        <div>
          <img src="@/assets/imgs/proposal/envelope-cover.png"/>
          <div class="cover-name">
            <img src="@/assets/imgs/proposal/feather-left.png"/>
            <span>{{customerName}}</span>
            <img src="@/assets/imgs/proposal/feather-right.png"/>
          </div>
          <div class="cover-bt" @click="hideCover"><!--亲启按钮--></div>
        </div>
      </div>
    </md-popup>
    <!-- 条款列表弹层 -->
    <PopupClauseList :clause-cfg="clauseCfg" :immediate="false" @click="showClauseItem"/>
  </div>
</template>

<script>
  import IconButton from "./IconButton";
  import {Icon, Slider, Popup, Toast} from 'mand-mobile'
  import num from "../../filter/num";
  import CommonUtils from "../../utils/common";
  import PopupClauseList from "./PopupClauseList";
  import plan from "../../api/plan";
  import dict from "../../dict/dict";
  import lxb from "../../api/lxb";
  import weixin from "../../utils/weixin";
  export default {
    name: "proposalNologin",
    components: {PopupClauseList, IconButton,[Icon.name]: Icon,[Slider.name]: Slider,[Popup.name]: Popup, [Toast.name]: Toast},
    filters:{simpleNum:num.simpleNum},
    data(){
      return{
        showCover:true,// 是否显示计划书封面
        proposalNo:'',
        isSingle:false,// 当前计划书是 单主险还是多主险。
        isSelectorShow:false,// 年龄选择
        selectorValue:30,
        // 汇总信息
        summary:{
          appntLabel:'',
          insuredLabel:'',
          totalPremLabel:'',
        },
        // 险种列表
        riskList:[],
        // 保险责任列表
        respList:[],
        // 利益项标题映射
        benefitCodeLabelMap:{},
        // 利益表标题列表（查看利益表要用）
        benefitTitleList:[],
        // 利益表数据
        benefitTable:[],
        // 利益项滑块区间
        sliderRange:{selected:0,min:0,max:105},
        // 产品条款及弹层配置
        clauseCfg:{
          show:false,// 是否显示弹层
          riskList:[// 险种列表
            {
              name:'',// 险种名称
              clauseList:[
                {
                  name:'',// 条款名称
                  url:''// 条款连接
                }
              ]
            }
          ],
        },
        // 风险提示
        riskWarning:'',
        // 代理人信息
        agentInfo:{},
        // 敬呈客户名称
        customerName:'',
        // 分享参数
        shareParam:{
          title:'',// 分享标题
          desc:'',// 分享描述
          link:'',// 分享连接
          imgUrl:'',// 分享图标
        },
        /** 调接口所需的基础参数 */
        baseParam: {platformSubType:'LXB',platformType:'ESP'},
      }
    },
    async created(){
      // 逻辑：进入本页，首选尝试从缓存恢复本页数据；若无缓存，则从接口调取数据。
      let hasCachedData = this.reloadCacheData();
      if(!hasCachedData){
        this.proposalNo = this.$route.query.proposalNo;

        try{
          let result = await this.getProposalDetail(this.proposalNo,'share');
          if(result.err)
            Toast.failed(result.err);
          else{
            for(let key in result.data){
              if(result.data.hasOwnProperty(key))
                this.$data[key] = result.data[key];
            }
          }
        }catch (e) {
          console.error(e);
          Toast.failed('系统异常，请刷新重试');
        }finally {
          CommonUtils.closeGlobalMask();
        }
      }else{
        CommonUtils.closeGlobalMask();
      }
    },

    methods:{

      /**
       * 页面离开前，缓存全部数据（保持状态）
       */
      passivateData(){sessionStorage.setItem('allData',JSON.stringify(this.$data))},
      /**
       * 进入页面，如果有缓存数据，恢复$data。否则，应调接口获取数据
       * @return true:已从缓存恢复数据；false:新进入页面，数据应来自接口
       */
      reloadCacheData(){
        let data = sessionStorage.getItem('allData');
        if(data){
          let allData = JSON.parse(data);
          for(let key in allData)
            if(allData.hasOwnProperty(key))
              this.$data[key] = allData[key];
          sessionStorage.removeItem('allData');// 数据只用一次
          return true;
        }
        return false;
      },
      /**
       * 显示“病种”弹框列表
       */
      showDiseaseList(id){
        console.log('......',id);
      },
      /**
       * 加、减滑动条的值
       * @param flag del:左移；add:右移；
       */
      changeSliderVal(flag){
        if(flag === 'del' && this.sliderRange.selected > this.sliderRange.min)
          this.sliderRange.selected --;
        else if(flag === 'add' && this.sliderRange.selected < this.sliderRange.max)
          this.sliderRange.selected ++;
      },
      /**
       * 滑动条上方显示的文字
       * @param val 滑动条当前值
       * @returns {string}
       */
      sliderLabel(val){return val+'岁';},
      /**
       * 显示利益表
       */
      showBenefitTable(){
        this.passivateData();
        CommonUtils.setSessionStore('benefitTable',this.benefitTable);
        CommonUtils.setSessionStore('beneTables',this.benefitTitleList);
        this.$router.push({name:'benefitTable'});
      },
      /**
       * 页面跳转查看单项条款
       * @param data PopupClauseList组件返回参数
       */
      showClauseItem(data){
        if(data && data.clause && data.clause.url){
          this.passivateData();// 跳转前钝化本页数据
          window.location.href = data.clause.url;
        }
      },
      /**
       * 亲启
       */
      hideCover(){this.showCover = false;},

      shareProposal(){
        this.passivateData();
        // todo ....
        console.log('todo share proposal');
      },
      callAgent(){
        this.passivateData();
        window.location.href = 'tel:'+this.agentInfo.mobile;
      },
      ////////////////////////// 调接口相关的方法 ////////////////////////////
      /**
       * 获取计划书详情（入口）
       * @param proposalNo
       * @param viewMode 计划书情查看方式。取值范围：其它值或空:代理人查看；share：客户查看
       * @return {Promise<{err: *}|{err: *}|{data: *}|{err: string}|{err: string}|{data: *}>}
       */
      async getProposalDetail(proposalNo, viewMode){
        // 貌似没必要调代理人计划书
        let result = viewMode === 'share' ? await this.getProposalDetailForShare(proposalNo) : await this.getProposalDetailForAgent(proposalNo);
        if(result.err)// 中途有误，立即返回，不再继续
          return result;
        // 收集页面所需参数，填充Vue里的data
        let $data = {
          summary:{},
          riskList:[],
          respList:[],
          benefitCodeLabelMap:{},
          benefitTitleList:[],
          sliderRange:{selected:0,min:0,max:105},
          clauseCfg:{
            show:false,// 是否显示弹层
            riskList:[// 险种列表
              {
                name:'',// 险种名称
                clauseList:[
                  {
                    name:'',// 条款名称
                    url:''// 条款连接
                  }
                ]
              }
            ],
          },
          riskWarning:'',
          agentInfo:{},
          customerName:'',
        };
        let res = result.data;
        $data.isSingle = res.proposalDTO.planDTOs.length > 1 ? false : true //当前计划书是 单主险还是多主险
        let proposal = res.proposalDTO;
        if(proposal.appntDTO && proposal.appntDTO.sex){
          if(!proposal.appntDTO.age)
            proposal.appntDTO.age = CommonUtils.getAgeByBirthday(proposal.appntDTO.birthday);
          $data.summary.appntLabel = (proposal.appntDTO.sex === '0' ? '男':'女')+proposal.appntDTO.age+'岁';
        }
        $data.summary.insuredLabel = (proposal.insuredDTO.sex === '0' ? '男':'女')+proposal.insuredDTO.age+'岁';
        $data.summary.totalPremLabel = 0;
        proposal.planDTOs.forEach(plan=>{
          plan.riskDTOs.forEach(risk=>{
            $data.summary.totalPremLabel += Number(risk.prem);
            $data.riskList.push({
              name:risk.riskName,
              amount:this.transAmountLabel(risk.amt),
              ensure:risk.insuYear === '999' ? '终身': (risk.insuYear+dict.ensureUnitMap[risk.insuYearFlag]),
              payInv:risk.payEndYear+dict.payUnitMap[risk.payEndYearFlag],
              premium:this.transPremiumLabel(risk.prem)
            });
          });
        });
        $data.summary.totalPremLabel += '元';
        // 代理人信息和敬呈客户名
        if(res.sharingParams){
          let shareParam = JSON.parse(res.sharingParams);
          $data.agentInfo = {name:shareParam.agent.realName,mobile:shareParam.mobile};
          console.log('agentInfo:.......',JSON.stringify($data.agentInfo));
          $data.customerName = shareParam.customerName;
        }

        // 2、计算利益表
        if(!proposal)return{err:'数据错误，无法计算相关利益，请重试'};
        let param = {
          ...this.baseParam,
          'aggregateFlag': $data.isSingle ? 0 : 1, //是否是组合计划书  是-1 否-0
          'appntDTO': proposal.appntDTO,
          'insuredDTO': proposal.insuredDTO,
          'planDTOs': proposal.planDTOs
        };
        console.log(`-->计算利益表：${JSON.stringify(param)}`);
        let benefit = await plan.getBenefitCalculation(param);
        console.log(`<--计算利益表：${benefit ? JSON.stringify(benefit) : benefit}`);
        if(!benefit)
          return {err:'3、计算利益表失败'};
        if(benefit.result !== '0')
          return {err:benefit.resultMessage};
        // 计算滑块区间
        $data.sliderRange.min = Number(benefit.startAge);
        $data.sliderRange.max = Number(benefit.endAge);
        $data.sliderRange.selected = $data.sliderRange.min;

        // 3、以利益表算保险责任。分两种情况，单主险一套接口；多主险又一套接口。
        let responsibility = {}; // 保险责任的返回结果
        let planCodes = benefit.planCodes; //esp计划编码
        //获取计划的利益表（单个险种的）  区分单计划 组合计划 ！！！！！与原返回数据不同
        let benefitTableMap = $data.isSingle ? benefit.planAggregateBenefitTableMap[planCodes[0]] : benefit.benefitTableMap;

        let benefitRateList =  benefit.rateGrateValue;  //利率
        let benechargeKey = Object.keys(benefitTableMap);

        // 获取利益项的key数组（利益表第一行的key数组)
        let benefitKeyArr = [];
        //循环 获取利益表项 - as接口入参
        if(benefitTableMap[benechargeKey[0]] && benefitTableMap[benechargeKey[0]].length >0){
          $data.benefitTable = benefitTableMap[benechargeKey[0]];// 用于页面显示利益项
          let beneTablesParam = Object.keys(benefitTableMap[benechargeKey[0]][0]);
          beneTablesParam.map(item =>{
            if(item !== 'insuredAge' &&  item !== 'currYear'){
              benefitKeyArr.push(item)
            }
          })
        }

        if($data.isSingle) {
          let itemCode = '';
          proposal.planDTOs.map(plan=>{itemCode = plan.salesPlanCode});

          // 附加险列表入参
          let risks = [];
          if(benefit.accessoryRisks){
            let keys = Object.keys(benefit.accessoryRisks);
            keys.map(item=>{risks = benefit.accessoryRisks[item];})
          }

          //利益项入参
          let beneColumns = [];
          benefit.riskBenefitsOfPlans.map(item=>{
            let beniObj = {
              riskCode: item.riskCode,
              amt: item.amt,
              prem: item.prem,
              beneColumns: item.benefitItem
            };
            beneColumns.push(beniObj)
          });

          let params = {
            'itemCode': itemCode, // 销售计划
            'risks': risks, // 附加险列表
            'beneColumns': beneColumns, // 利益项值
            'beneTables': benefitKeyArr // 利益表值
          };
          console.log(`-->获取单主险的保险责任：${JSON.stringify(params)}`);
          responsibility = await lxb.getCombinationShow(params);
          console.log(`<--获取单主险的保险责任：${responsibility ? JSON.stringify(responsibility):responsibility}`);

        }else{
          let planCodeMap = {};
          let mainRiskCodeMap = {};
          proposal.planDTOs.forEach(plan=> {
            planCodeMap[plan.planCode] = plan.salesPlanCode;
            plan.riskDTOs.forEach(risk => {
              if(risk.isMainRisk === '1'){
                mainRiskCodeMap[risk.salesPlanCode] = risk.mainRiskCode;
              }
            });
          });
          // 附加险列表入参
          if(benefit.accessoryRisks){
            let keys = Object.keys(benefit.accessoryRisks);
            keys.map(item=>{
              benefit.accessoryRisks[planCodeMap[item]] = benefit.accessoryRisks[item];
              delete benefit.accessoryRisks[item]
            })
          }

          let params = {
            'itemCode': mainRiskCodeMap, // 销售计划
            'risks': benefit.accessoryRisks, // 附加险列表
            'riskBenefitsOfPlans': benefit.riskBenefitsOfPlans, // 利益项值
            'beneTables': benefitKeyArr, // 利益表值
            'aggregateBenefitItemMap': benefit.aggregateBenefitItemMap//大类小类利益项整合
          };
          console.log(`-->获取多主险保险责任：${JSON.stringify(params)}`);
          responsibility = await lxb.getCombinationShow(params);
          console.log(`<--获取多主险保险责任：${responsibility ? JSON.stringify(responsibility):responsibility}`);

        }
        if(!responsibility)
          return {err:'4、无法计算保险责任'};
        if(responsibility.result !== '0')
          return {err:responsibility.resultMessage};
        // 保险责任列表
        $data.respList = responsibility.data.byDuty;
        // 初始化微信SDK
        try{
          if(responsibility.data.parameters && responsibility.data.parameters.length > 0){
            // 分享参数（标题、图标等）
            this.shareParam.title = responsibility.data.parameters[0].title;
            this.shareParam.desc = responsibility.data.parameters[0].description;
            this.shareParam.imgUrl = responsibility.data.parameters[0].image;
            $data.shareParam = this.shareParam;
            console.log(`--初始化微信SDK：${JSON.stringify($data.shareParam)}`);
            weixin.share($data.shareParam);
          }
        }catch (e) {
          console.error(e);
        }
        // 目前尚不知道多险种保险责任的数据结构，暂只取主险（单个险种）的条款。
        let risk = {name:$data.riskList[0].name,clauseList:responsibility.data.productClause};
        $data.clauseCfg.riskList = [risk];
        // 利益项映射
        responsibility.data.beneTables.forEach(item=>{$data.benefitCodeLabelMap[item.code] = item.label;});
        $data.benefitTitleList = responsibility.data.beneTables;
        $data.riskWarning = responsibility.data.riskWarning;
        return {data:$data};
      },
      /**
       * 获取代理人计划书详情
       * @param proposalNo
       * @return {Promise<{err: *}|{data: *}|{err: string}>}
       */
      async getProposalDetailForAgent(proposalNo){
        // 1、获取建议书基本信息（仅在形式上做一下代理人计划书详情的接口调用）
        let proposal;
        let param = {
          ...this.baseParam,
          proposalNo:proposalNo
        };
        console.log(`-->获取代理人计划书详情,${JSON.stringify(param)}`);
        let res = await plan.getQueryDetailA(param);
        console.log(`<--获取代理人计划书详情,${res ? JSON.stringify(res) : res}`);
        if(!res)
          return {err:'1、获取代理人计划书详情'};
        if(res.result !== '0')
          return {err:res.resultMessage};

        // 2、获取分享连接
        await this.getProposalDetailForShare(proposalNo);
        return {data:res}
      },
      /**
       * 获取分享计划书详情
       * @param proposalNo
       * @return {Promise<{err: *}|{data: *}|{err: string}>}
       */
      async getProposalDetailForShare(proposalNo){
        let url = window.location.href;
        // 分解返回的shareUrl查询参数
        let shareUrlMap = {shareUrl:url};
        let arr = shareUrlMap.shareUrl.split('?');
        shareUrlMap.params = {baseUrl:arr[0]};
        arr = arr[1].split('&');
        let _arr;
        arr.forEach(item=>{
          _arr = item.split('=');
          shareUrlMap.params[_arr[0]] = _arr[1];
        });
        this.shareParam.link = shareUrlMap.shareUrl;// 记录分享连接

        let param = {
          ...this.baseParam,
          proposalNo:proposalNo,
          timestamp:shareUrlMap.params.timestamp,
          sign:shareUrlMap.params.sign,
          userId:shareUrlMap.userId // 代理人ID
        };
        console.log(`-->取contextToken:${JSON.stringify(param)}`);
        let res = await plan.checkSign(param);
        console.log(`<--取contextToken:${res ? JSON.stringify(res):res}`);
        if(!res)
          return {err:'2、无法获取上下文token'};
        if(res.result !== '0')
          return {err:res.resultMessage};
        let contextToken = res.contextToken;
        param = {contextToken:contextToken};
        console.log(`-->取分享建议书详情：${JSON.stringify(param)}`);
        res = await plan.getQueryDetailC(param);
        console.log(`<--取分享建议书详情：${res ? JSON.stringify(res):res}`);
        if(!res)
          return {err:'3、无法获取分享建议书详情'};
        if(res.result !== '0')
          return {err:res.resultMessage};

        return {data:res};
      },

      transAmountLabel(amount){
        if(amount.endsWith('.00'))
          amount = amount.replace('.00','');
        if(amount.endsWith('0000')){
          amount = amount.substring(0,amount.length - 4);
          return amount + '万';
        }
        return amount + '元';
      },
      transPremiumLabel(premium){
        if(premium.endsWith('.00'))
          premium = premium.replace('.00','');
        return premium;
      },

    },
    computed:{
      policyYear(){return this.sliderRange.selected - this.sliderRange.min + 1}
    }
  }
</script>

<style scoped lang="less">
  .proposal-detail{
    position: relative;
    background-color: #F2F2F2;
    height: 100vh;
    .head{
      background-color: white;
      margin-bottom: 20px;
      .head-bg{
        position: relative;
        img{width: 100%;}// 顶部图片
        .summary{
          position: absolute; bottom: -35px; width: 100%; display: flex; justify-content: center;
          /** 汇总表格 */
          .summary-table{
            width: 600px;
            background:rgba(255,255,255,1);
            box-shadow:0px 0px 10px 0px rgba(153,153,153,0.3);
            border-radius:12px;
            display: flex; justify-content: center;
            padding: 23px 0 23px 0;
            /*margin: 0 75px 0 75px;*/

            .summary-table-item{
              display: flex; flex-direction: column; align-items: center;
              border-right: 1px solid #EEEEEE;
              min-width: 200px;
              span:first-child{font-family: PingFangSC-Regular; font-size: 28px; color: #333333;line-height:28px;font-weight:400;}
              span:last-child{font-family: PingFangSC-Regular; font-size: 28px; color: #61A0EF; margin-top: 14px;line-height:28px;}
            }
            .summary-table-item:last-child{border-right: none}
          }
        }
      }

      /** 险种列表 */
      .pro-table{
        width: calc(100vw - 60px); margin: 75px 30px 40px 30px;
        border-radius: 10px; border:1px solid rgba(238,238,238,1);
        font-family: PingFangSC-Regular;
        text-align: center;
        display: table;
        > div{
          display: table-row;
          > div{
            display: table-cell;
            padding: 24px 0 24px 0;
            border-right: 1px solid #EEEEEE;
          }
          > div:last-child{border-right: none;}
        }
        .pro-table-title > div{background-color: #F2F2F2; color: #666666;font-size: 28px;font-weight:400;line-height: 28px;vertical-align: middle}
        .pro-table-row > div{color: #333333;font-size: 26px; border-top: 1px solid #EEEEEE;font-weight:400;line-height: 40px;vertical-align: middle}
      }
    }

    .body{
      padding-top: 10px;
      background-color: white;
      margin-bottom: 190px;/** 底部固定位置，高100px + 10px阴影 */
      .part{
        margin: 20px 30px 20px 30px;
        padding-top: 40px;
        box-shadow:0px 0px 14px 0px rgba(153,153,153,0.2);
        border-radius:10px;
        .part-title{
          display: flex;justify-content: space-between; align-items: center; margin-right: 30px;
          height: 40px; line-height: 40px;
          font-family: PingFangSC-Regular; font-weight: 600; color: #333333; font-size: 32px;
          .title-flag{display: inline-block;background-color: #61A0EF; width: 6px; height: 32px; border-radius: 3px; vertical-align: sub};
          span:nth-child(2){display: inline-block; padding-left: 24px;}
        }

        .part-body{
          position:relative; padding: 30px;

        }

        .part-footer{position:relative;text-align: center;font-size:28px; padding: 30px 0 30px 0;color: #666666;}
        /** 0.5px 细线 */
        .part-footer:after{content: "";pointer-events: none;box-sizing: border-box;position: absolute;top: 0;left: -50%;right: -50%;transform: scale(0.5);border-bottom: 1px solid #EEEEEE;}

        .bt-view-benefit-table{color: #61A0EF;font-size:28px;line-height:28px;}
        .notice-item{font-size: 26px; color:#666666}
        .notice-item:nth-child(2){margin-top: 20px;}

      }

      .bt-view-clause-list{text-align:center; padding: 30px 0 30px 0; font-size: 32px; font-weight: 500; color: #61A0EF;}
      .benefit-items{
        background-color: #61A0EF0F;
        padding: 35px; margin: 30px 0 30px 0;
        text-align: center;
        box-shadow:0px 0px 14px 0px rgba(153,153,153,0.2);
        border-radius:10px;
        p{padding-top: 20px;}
        .triangle{
          border-left: 20px solid transparent;
          border-right: 20px solid transparent;
          border-top: 20px solid #61A0EF0F;
          position: absolute;
          bottom: 2rem;
          left: 50%;
          margin-left: -20px;
        }
      }
      .benefit-slider{
        margin-top: 1rem;
        display: flex; align-items: center; justify-content: center;
        .slider:before{position: absolute;left: 0;top: .27rem;}
        .slider{margin: 0 30px 0 31px;height: 51px;}
        .bt-icon{img{width: 51px;}}
        /deep/.md-slider-handle{ top: .0555rem;
          span{background-color: #61A0EF;height:40px;width:40px}}
        /deep/.md-slider-handle:after{
          visibility: visible; background-color: #61A0EF19!important;color: #61A0EF!important;;opacity: 100!important;border: 1px solid #61A0EF!important;;
        }
      }
      .benefit-slider-tip{font-size: 26px; color: #999999;margin-top: 12px;}
    }

    .footer{
      position: fixed; bottom: 0; width: 100%; z-index: 998; height: 100px; background-color:#FFFFFF; box-shadow:0 0 10px 0 rgba(0,0,0,0.1);
      display: flex; align-items: center; justify-content: space-between;
      .bt-icons{
        /*width:calc(100vw - 284px);!** 减去.bt-send的宽度 *!*/
        flex: 1;
        padding: 0 30px 0 30px;
        display: flex; align-items: center;
        .icon-agent{width: 46px;}
        .agent-name{font-size:28px; color:#333333; margin-left: 16px;}
        .agent-phone{font-size:28px; color:#333333; margin-left: 16px;}
        .icon-edit{width: 29px;}
      }
      .bt-send{
        display: flex; align-items: center; justify-content: space-around; height: 60px; width: 284px;
        border-left: 1px solid #EEEEEE;
        > div{
          width: 220px; height: 80px;line-height: 80px;
          background-color: #61A0EF; border-radius: 10px; text-align: center;
          > span{
            font-size: 26px; color: #FFFFFF;
          }
        }
      }
      .bt-call{
        display: flex; align-items: center; justify-content: space-around; height: 60px; width: 318px; margin-right: 30px;
        > div{
          width: 318px; height: 80px;line-height: 80px;
          background-color: #61A0EF; border-radius: 10px; text-align: center;
          > span{
            font-size: 26px; color: #FFFFFF; margin-left: 22px;
          }
        }
      }
    }
    .cover{

      width: 100vw; height: 100vh;
      background-image: linear-gradient(to bottom right, #FDECD5, #EED5B8);
      display: flex; align-items: center;
      > div{
        position: relative;
        img{width: 100%}
        .cover-name{// 名字
          position:absolute;
          display: flex;justify-content: center;
          width:100%; top:49%; // 511/1043
          text-align: center;
          img{width: 33px;}
          span{display:block; font-size:36px;font-family:PingFang SC;font-weight:600;color: #9D5A34}
        }
        // 亲启
        .cover-bt{position: absolute;width: 20%;height: 14%;top: 58%;left: 39%;}
      }
    }

    // 分享弹层
    /*.share-layer{*/
      /*width: 100vw;height: 100vh;*/
      /*> div:first-child{margin-top:24px; margin-right:32px; text-align: right; img{width: 235px;}}*/
      /*> div:nth-child(2){margin-top:24px; text-align: center; img{width: 524px; }}*/
      /*> div:nth-child(3){*/
        /*display: flex; justify-content: center; margin-top: 120px;*/
        /*> div{*/
          /*width: 328px; border: 2px solid #FFFFFF; border-radius: 45px; text-align: center; color: #FFFFFF;*/
          /*font-family:PingFangSC-Medium,PingFang SC;font-weight:500;font-size:26px; padding: 13px 0 13px 0;*/
        /*}*/
      /*}*/
    /*}*/
  }
</style>

<style>
  .slider .md-slider-bar{position: absolute;left: 0;top: .27rem;}
  .red-num > span{color: #E25151;}
  .resp-sub-title{font-family:PingFangSC-Regular,PingFang SC;font-weight:400;font-size:28px;color: #333333;}
  .resp-detail{font-family:PingFangSC-Regular,PingFang SC;font-weight:400;font-size:26px;color: #999999;padding: 20px 0 26px 0;line-height: 50px;}
  .notice-item > p{line-height: 46px;}
</style>