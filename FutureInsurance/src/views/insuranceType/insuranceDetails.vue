<template>
  <div class="insuranceDetails wrapper">
    <Header :headerText="headerText" :hiddenMsgBox="true"></Header>
    <div class="main" v-if="formMask">
      <!--商业险-->
      <div class="bb" v-if="showSy&&policyStatus!='2'">
        <div class="title" @click="show1 = !show1">
          <i>商业险</i>
          <span v-if="policyStatus=='2'||policyStatus=='5'"
                @click="$router.push({name:'insuranceType',query:{orderNo:orderNo}})">修改</span>
        </div>
        <div v-if="show1">
          <mt-cell title="起保时间" :value="insuranceInfo.BizApplication.bizEffectiveDate"></mt-cell>
          <mt-cell title="终保时间" :value="insuranceInfo.BizApplication.bizExpireDate"></mt-cell>
          <mt-cell title="分值" :value="insuranceInfo.BizApplication.bizBizName"></mt-cell>
          <mt-cell title="保费折扣信息" :value="insuranceInfo.BizApplication.bizTotalRatioTP"></mt-cell>
          <mt-cell title="商业险总保费" :value="insuranceInfo.BizApplication.bizTotalActualPremium"></mt-cell>
          <mt-cell :title="item.name" v-for="(item,index) in insuranceInfo.CoverageList" :value="item.money"
                   v-if="item.name.indexOf('交强险')==-1" :key="index"></mt-cell>
        </div>
      </div>
      <!--交强险-->
      <div class="bb" v-if="showJq&&policyStatus!='2'">
        <div class="title" @click="show2 = !show2">
          <i>交强险</i>
          <span v-if="policyStatus=='2'||policyStatus=='5'"
                @click="$router.push({name:'insuranceType',query:{orderNo:orderNo}})">修改</span>
        </div>
        <div v-if="show2">
          <mt-cell title="起保时间" :value="insuranceInfo.TPFApplication.tfpEffectiveDate"></mt-cell>
          <mt-cell title="终保时间" :value="insuranceInfo.TPFApplication.tfpExpireDate"></mt-cell>
          <mt-cell title="分值" :value="insuranceInfo.TPFApplication.tfpBizName"></mt-cell>
          <mt-cell title="交强险及车船税"
                   :value="Number(insuranceInfo.TPFApplication.tfpTotalActualPremium)+Number(insuranceInfo.VehicleTax.VehicleTaxAmount)"></mt-cell>
          <mt-cell :title="item.name" v-for="(item,index) in insuranceInfo.CoverageList" :value="item.money"
                   v-if="item.name.indexOf('交强险')!=-1" :key="index"></mt-cell>
          <mt-cell title="车船税" :value="insuranceInfo.VehicleTax.VehicleTaxAmount"></mt-cell>
        </div>
      </div>
      <!--车辆信息-->
      <div class="bb" v-if="showCar">
        <div class="title" @click="show3 = !show3">
          <i>车辆信息</i>
          <span v-if="policyStatus=='2'||policyStatus=='5'"
                @click="$router.push({name:'carMessage',query:{orderNo:orderNo}})">修改</span>
        </div>
        <div v-if="show3">
          <mt-cell title="车架号" :value="insuranceInfo.Vehicle.VehicleFrameNo"></mt-cell>
          <!--<mt-cell title="车主" :value="insuranceInfo.Vehicle.owner"></mt-cell>-->
          <mt-cell title="客户协商车价" :value="insuranceInfo.Vehicle.CustomerNegotiatePrice"></mt-cell>
          <mt-cell title="车款名称" :value="insuranceInfo.Vehicle.CarName"></mt-cell>
          <mt-cell title="发动机号" :value="insuranceInfo.Vehicle.EngineNo"></mt-cell>
          <mt-cell title="车牌号"
                   :value="insuranceInfo.Vehicle.VehicleLicenceCode?insuranceInfo.Vehicle.VehicleLicenceCode:'新车无车牌'"></mt-cell>
          <mt-cell title="车辆初始登记日期" :value="insuranceInfo.Vehicle.FirstRegisterDate"></mt-cell>
        </div>
      </div>
      <!--人员信息-->
      <div class="bb" v-if="showPeople">
        <div class="title" @click="show4 = !show4">
          <i>人员信息</i>
          <span v-if="policyStatus=='2'||policyStatus=='5'"
                @click="$router.push({name:'peopleMessage',query:{orderNo:orderNo}})">修改</span>
        </div>
        <div v-if="show4" class="people">
          <!--车主信息-->
          <div class="title clearfix">
            <span>车主信息</span>
          </div>
          <mt-cell title="车主类型" :value="peopleInfo.VehicleOwner.PersonType=='1'?'个人':'团体'"></mt-cell>
          <div v-if="peopleInfo.VehicleOwner.PersonType=='1'">
            <mt-cell title="车主姓名" :value="peopleInfo.VehicleOwner.PersonnelName"></mt-cell>
            <mt-cell title="身份证" :value="peopleInfo.VehicleOwner.CertificateNo"></mt-cell>
            <mt-cell title="联系电话" :value="peopleInfo.VehicleOwner.MobileTelephone"></mt-cell>
            <mt-cell title="地址" :value="peopleInfo.VehicleOwner.Address"></mt-cell>
            <mt-cell title="邮箱" :value="peopleInfo.VehicleOwner.Email"></mt-cell>
          </div>
          <div v-if="peopleInfo.VehicleOwner.PersonType=='0'">
            <mt-cell title="机构名称" class="flex5">
              <input type="text" placeholder="请输入机构名称" maxlength="20" :value="peopleInfo.VehicleOwner.GroupName">
            </mt-cell>
            <mt-cell title="组织机构证件类型">
              <select class="moneyIpt dib needsclick" v-model="peopleInfo.VehicleOwner.CertificateType" disabled>
                <option value="1">企业法人营业执照</option>
                <option value="2">中华人民共和国组织机构代码</option>
                <option value="3">税务登记证</option>
                <option value="4">社保保险登记证</option>
                <option value="5">办学许可证</option>
                <option value="9">其他</option>
              </select>
            </mt-cell>
            <mt-cell title="组织机构证件号" class="flex2_5">
              <input type="text" placeholder="请输入组织机构证件号" maxlength="25" :value="peopleInfo.VehicleOwner.CertificateNo">
            </mt-cell>
            <mt-cell title="机构地址" class="flex5">
              <input type="text" placeholder="请输入机构地址" :value="peopleInfo.VehicleOwner.Address">
            </mt-cell>
            <mt-cell title="邮编" class="flex5">
              <input type="text" placeholder="请输入邮编" :value="peopleInfo.VehicleOwner.Postcode">
            </mt-cell>
            <mt-cell title="机构联系人">
              <input type="text" placeholder="请输入机构联系人" :value="peopleInfo.VehicleOwner.LinkManName" maxlength="20">
            </mt-cell>
            <mt-cell title="联系人性别">
              <select class="moneyIpt dib needsclick" :value="peopleInfo.VehicleOwner.LinkManSexCode">
                <option value="M">男</option>
                <option value="F">女</option>
              </select>
            </mt-cell>
            <mt-cell title="联系人手机号">
              <input type="text" placeholder="请输入联系人手机号" :value="peopleInfo.VehicleOwner.LinkManMobileTelephone"
                     maxlength="11">
            </mt-cell>
            <mt-cell title="纳税人类型">
              <select class="moneyIpt dib needsclick" v-model="peopleInfo.VehicleOwner.CertType" disabled>
                <option value="">请选择纳税人类型</option>
                <option value="0">境内个人</option>
                <option value="1">小规模纳税人</option>
                <option value="2">增值税一般纳税人</option>
              </select>
            </mt-cell>
            <mt-cell title="工商注册号">
              <!--<input type="text" placeholder="请输入工商注册号" :value="peopleInfo.VehicleOwner.BusinessRegisterId">-->
            </mt-cell>
          </div>

          <!--被保人-->
          <div class="title">
            <mt-switch v-model="peopleVal.policy" disabled>被保人同车主</mt-switch>
          </div>
          <div v-if="!peopleVal.policy">
            <mt-cell title="被保人类型" :value="peopleInfo.Insured.PersonType=='1'?'个人':'团体'"></mt-cell>
            <div v-if="peopleInfo.Insured.PersonType=='1'">
              <mt-cell title="投保人姓名" :value="peopleInfo.Insured.PersonnelName"></mt-cell>
              <mt-cell title="身份证" class="flex7" :value="peopleInfo.Insured.CertificateNo"></mt-cell>
              <mt-cell title="联系电话" :value="peopleInfo.Insured.MobileTelephone"></mt-cell>
              <mt-cell title="地址" class="flex8" :value="peopleInfo.Insured.Address"></mt-cell>
              <mt-cell title="邮箱" :value="peopleInfo.Insured.Email"></mt-cell>
            </div>
            <div v-if="peopleInfo.Insured.PersonType=='0'">
              <mt-cell title="机构名称" class="flex5" :value="peopleInfo.Insured.GroupName"></mt-cell>
              <mt-cell title="组织机构证件类型">
                <select class="moneyIpt dib needsclick" v-model="peopleInfo.Insured.CertificateType" disabled>
                  <option value="">请选择组织机构证件类型</option>
                  <option value="1">企业法人营业执照</option>
                  <option value="2">中华人民共和国组织机构代码</option>
                  <option value="3">税务登记证</option>
                  <option value="4">社保保险登记证</option>
                  <option value="5">办学许可证</option>
                  <option value="9">其他</option>
                </select>
              </mt-cell>
              <mt-cell title="组织机构证件号" class="flex2_5" :value="peopleInfo.Insured.CertificateNo"></mt-cell>
              <mt-cell title="机构地址" class="flex5" :value="peopleInfo.Insured.Address"></mt-cell>
              <mt-cell title="邮编" class="flex5" :value="peopleInfo.Insured.Postcode"></mt-cell>
              <mt-cell title="机构联系人" :value="peopleInfo.Insured.LinkManName"></mt-cell>
              <mt-cell title="联系人性别">
                <select class="moneyIpt dib needsclick" v-model="peopleInfo.Insured.LinkManSexCode" disabled>
                  <option value="M">男</option>
                  <option value="F">女</option>
                </select>
              </mt-cell>
              <mt-cell title="联系人手机号" :value="peopleInfo.Insured.LinkManMobileTelephone"></mt-cell>
              <mt-cell title="纳税人类型">
                <select class="moneyIpt dib needsclick" v-model="peopleInfo.Insured.CertType" disabled>
                  <option value="">请选择纳税人类型</option>
                  <option value="0">境内个人</option>
                  <option value="1">小规模纳税人</option>
                  <option value="2">增值税一般纳税人</option>
                </select>
              </mt-cell>
              <!--<mt-cell title="工商注册号" :value="peopleInfo.Insured.BusinessRegisterId"></mt-cell>-->
            </div>
          </div>

          <!--投保人-->
          <div class="title">
            <mt-switch v-model="peopleVal.Insured" disabled>投保人同被保人</mt-switch>
            <mt-switch v-model="peopleVal.Insured1" disabled>投保人同车主</mt-switch>
          </div>
          <div v-if="!peopleVal.Insured&&!peopleVal.Insured1">
            <mt-cell title="投保人类型" :value="peopleInfo.Applicant.PersonType=='1'?'个人':'团体'"></mt-cell>
            <div v-if="peopleInfo.Applicant.PersonType=='1'">
              <mt-cell title="投保人姓名" :value="peopleInfo.Applicant.PersonnelName"></mt-cell>
              <mt-cell title="身份证" class="flex7" :value="peopleInfo.Applicant.CertificateNo"></mt-cell>
              <mt-cell title="联系电话" :value="peopleInfo.Applicant.MobileTelephone"></mt-cell>
              <mt-cell title="地址" class="flex8" :value="peopleInfo.Applicant.Address"></mt-cell>
              <mt-cell title="邮箱" :value="peopleInfo.Applicant.Email"></mt-cell>
            </div>
            <div v-if="peopleInfo.Applicant.PersonType=='0'">
              <mt-cell title="机构名称" class="flex5" :value="peopleInfo.Applicant.GroupName"></mt-cell>
              <mt-cell title="组织机构证件类型">
                <select class="moneyIpt dib needsclick" v-model="peopleInfo.Applicant.CertificateType" disabled>
                  <option value="">请选择组织机构证件类型</option>
                  <option value="1">企业法人营业执照</option>
                  <option value="2">中华人民共和国组织机构代码</option>
                  <option value="3">税务登记证</option>
                  <option value="4">社保保险登记证</option>
                  <option value="5">办学许可证</option>
                  <option value="9">其他</option>
                </select>
              </mt-cell>
              <mt-cell title="组织机构证件号" class="flex2_5" :value="peopleInfo.Applicant.CertificateNo"></mt-cell>
              <mt-cell title="机构地址" class="flex5" :value="peopleInfo.Applicant.Address"></mt-cell>
              <mt-cell title="邮编" class="flex5" :value="peopleInfo.Applicant.Postcode"></mt-cell>
              <mt-cell title="机构联系人" :value="peopleInfo.Applicant.LinkManName"></mt-cell>
              <mt-cell title="联系人性别">
                <select class="moneyIpt dib needsclick" v-model="peopleInfo.Applicant.LinkManSexCode" disabled>
                  <option value="M">男</option>
                  <option value="F">女</option>
                </select>
              </mt-cell>
              <mt-cell title="联系人手机号" :value="peopleInfo.Applicant.LinkManMobileTelephone"></mt-cell>
              <mt-cell title="纳税人类型">
                <select class="moneyIpt dib needsclick" v-model="peopleInfo.Applicant.CertType" disabled>
                  <option value="">请选择纳税人类型</option>
                  <option value="0">境内个人</option>
                  <option value="1">小规模纳税人</option>
                  <option value="2">增值税一般纳税人</option>
                </select>
              </mt-cell>
              <!--<mt-cell title="工商注册号" :value="peopleInfo.Applicant.BusinessRegisterId"></mt-cell>-->
            </div>
          </div>
        </div>
      </div>
      <!--其他信息-->
      <div class="bb" v-if="policyStatus != '2'">
        <div class="title" @click="show5 = !show5">
          <i>其他信息</i>
        </div>
        <div v-if="show5">
          <mt-cell title="验车码" :value="insuranceInfo.BasePart.CheckVihecleCode"></mt-cell>
          <mt-cell title="是否续保" :value="insuranceInfo.BasePart.IsRenewal"></mt-cell>
          <mt-cell title="转保业务" :value="insuranceInfo.BasePart.RenewalFlag"></mt-cell>
          <mt-cell title="可改特别约定" v-if="insuranceInfo.BizApplication"
                   :value="insuranceInfo.BizApplication.BizAlterableSpecialPromise?insuranceInfo.BizApplication.BizAlterableSpecialPromise:insuranceInfo.TPFApplication.tfpAlterableSpecialPromise"></mt-cell>
        </div>
      </div>
      <!--条款-->
      <div style="margin-top: .1rem;" v-if="policyStatus=='5'">
        <div class="clause">
          <label class="mint-checklist-label dib">
        <span class="mint-checkbox is-left">
          <input type="checkbox" class="mint-checkbox-input" v-model="isClause">
          <span class="mint-checkbox-core"></span>
        </span>
          </label>
          <div>
            本人确认所填投保信息真实、完整、准确、属实，确认投保勾选险种及投保日期；投保人已仔细阅读
            <i class="red" @click="$refs.showStrongInsurance.show()">《机动车交通事故责任强制保险条款》</i>，
            <i class="red" @click="$refs.showComprehensive.show()">《中国保险行业协会机动车综合商业保险示范条款》</i>，
            <i class="red" @click="$refs.showSpecialType.show()">《中国保险行业协会特种车综合商业保险示范条款》</i>，
            且保险人已明确说明条款内容、免除保险人责任条款的含义及其法律后果。
          </div>
        </div>
      </div>
    </div>
    <div class="noData" v-if="noData">
      <img src="../../assets/img/fail.png" alt="">
      <p>很遗憾,报价失败了,原因:</p>
      <p>{{noDataText}}</p>
    </div>
    <div class="btn-box" v-if="noData">
      <!--<mt-button type="primary" size="large" @click="$router.push('carMessage')">重新报价</mt-button>-->
      <mt-button type="primary" size="large" @click="$router.push({name:'carMessage', query: {orderNo: orderNo}})">
        重新报价
      </mt-button>
    </div>
    <!--<div class="btn-box">-->
    <div class="btn-box" v-if="(!noData&&formMask)&&(policyStatus=='5')&&isClause">
      <mt-button type="primary" size="small" class="btn"
                 @click="$router.push({name: 'uploadImg', query: {orderNo: orderNo, TpCalulateNo: TpCalulateNo}})">
        上传照片
      </mt-button>
      <mt-button type="primary" size="small" class="btn"
                 @click="$router.push({name: 'checkInsurance', query: {orderNo: orderNo, TpCalulateNo: TpCalulateNo}})">
        立即核保
      </mt-button>
    </div>

    <!--机动车条款-->
    <strongInsurance ref="showStrongInsurance"></strongInsurance>
    <comprehensive ref="showComprehensive"></comprehensive>
    <specialType ref="showSpecialType"></specialType>
  </div>
</template>

<script>
  import Header from '../../components/Header';
  import strongInsurance from './strongInsurance';
  import comprehensive from './comprehensive';
  import specialType from './specialType';

  export default {
    name: 'insuranceDetails',
    data() {
      return {
        headerText: '报价详情',
        formMask: true,
        noData: false,
        noDataText: '',
        show1: true,
        show2: true,
        show3: true,
        show4: true,
        show5: true,
        showCar: false,
        showPeople: false,
        showJq: false,
        showSy: false,
        isClause: false, // 是否选择同意条款
        policyStatus: '2',
        orderNo: '',
        TpCalulateNo: '',
        insuranceInfo: {
          // 交强险投保单
          TPFApplication: {
            tfpEffectiveDate: '',  // 起保
            tfpExpireDate: '',  // 终保
            TfpTotalActualPremium: '',
          },
          // 商业险投保单
          BizApplication: {
            bizEffectiveDate: '',  // 起保
            bizExpireDate: '',  // 终保
          },
          // 商业保险
          CoverageList: [],
          // 车船
          VehicleTax: {
            VehicleTaxAmount: '',
          },
          // 车辆
          Vehicle: {},
          // 其他
          BasePart: {
            tpCalulateNo: ''
          },
        },
        peopleVal: {
          policy: true,  // 被保人等同于车主
          Insured: true, // 投保人等同于被保人
          Insured1: false, // 投保人等同于车主
        },
        peopleInfo: {
          // 车主
          VehicleOwner: {},
          // 被保人
          Insured: {},
          // 投保人
          Applicant: {},
        },
        all: {},
        offerData: {},
        mark: '',
        insurances: {},
        showUploadBtn: 0
      };
    },
    components: {
      Header,
      strongInsurance,
      comprehensive,
      specialType,
    },
    mounted() {
      this.orderNo = this.$route.query.orderNo;
      this.TpCalulateNo = this.$route.query.TpCalulateNo;
      this.policyStatus = this.$route.query.policyStatus;
      this.mark = this.$route.query.mark;
      // 从险种进入
      let offerData = sessionStorage.getItem('offerData');
      if (offerData) {
        this.offer(JSON.parse(offerData));
        return;
      } else {
        // app进入详情
        /**policyStatus
         * 0: 已支付
         * 1: 待支付
         * 2: 报价前
         * 4: 核保中
         * 5: 已报价
         */
        this.headerText = '订单详情';
        if (this.policyStatus == '0' || this.policyStatus == '4' || this.policyStatus == '5') {
          this.getInsuranceInfo();
        } else if (this.policyStatus == '2') {
          // this.showUploadBtn = 999;
          this.getPeopleInfo();
          this.getCarInfo();
        }
      }
    },
    methods: {
      // 报价
      offer(offerData) {
        if (this.mark == 'error') {
          this.Toast({
            message: offerData.message,
            position: 'bottom'
          });
          this.formMask = false;
          this.noData = true;
          this.noDataText = offerData.message;
        } else if (this.mark == 'success') {
          if (offerData.response.Body) {
            this.insurances = offerData.response.Body;
            this.noData = false;
            this.formMask = true;
            this.policyStatus = '5';
            this.getInsuranceInfo();
          }
        }
        // let p = this.all;
        // p.orderNo = this.orderNo;
        // this.formMask = false;
        // this.$post(this.$url.car.insuranceQuotes, p).then((res) => {
        //   console.log(res);
        //   if (res.code != 200) {
        //     this.Toast({
        //       message: res.message,
        //       position: 'bottom'
        //     });
        //     this.noData = true;
        //     this.noDataText = res.message;
        //   } else {
        //     if (res.response.Body) {
        //       this.insurances = res.response.Body;
        //       this.noData = false;
        //       this.formMask = true;
        //       this.policyStatus = '5';
        //       this.getInsuranceInfo();
        //     }
        //   }
        // });
      },
      // 订单详情
      getInsuranceInfo() {
        this.$post(this.$url.car.getOrderDetails, {
          policyStatus: this.policyStatus,
          orderNo: this.orderNo,
        }).then((res) => {
          console.log(res);
          if (res.code != 200) {
            this.Toast({
              message: res.message,
              position: 'bottom'
            });
          } else {
            if (res.response) {
              // this.insuranceInfo = res.response;
              // console.log(this.insuranceInfo);
              let data = res.response;
              if (res.response.BasePart) {
                this.insuranceInfo.BasePart = data.BasePart;
              }
              if (res.response.CoverageList) {
                this.insuranceInfo.CoverageList = data.CoverageList;
              }
              if (res.response.TPFApplication) {
                this.insuranceInfo.TPFApplication = data.TPFApplication;
                this.showJq = true;
              } else {
                this.showJq = false;
              }
              if (res.response.Vehicle) {
                this.insuranceInfo.Vehicle = data.Vehicle;
              }
              if (res.response.BizApplication) {
                this.insuranceInfo.BizApplication = data.BizApplication;
                this.showSy = true;
              } else {
                this.showSy = false;
              }

              // console.log(this.insuranceInfo.BasePart.TpCalulateNo);
              this.TpCalulateNo = data.BasePart.TpCalulateNo;
              // this.checkVerifyInsurance();
              this.getPeopleInfo();
              this.getCarInfo();
            }
            this.$forceUpdate();
          }
        });
      },
      checkVerifyInsurance() {
        this.$post(this.$url.car.checkVerifyInsurance, {
          orderNo: this.orderNo,
        }).then((res) => {
          console.log(res);
          if (res.code != 200) {
            this.Toast({
              message: res.message,
              position: 'bottom'
            });
          } else {
            if (res.response) {
              this.showUploadBtn = res.response.state;
            }
            if (this.policyStatus == '0') {
              this.showUploadBtn = 999;
            }
          }
        });
      },
      // 查询和保存人员信息
      getPeopleInfo() {
        this.$post(this.$url.car.basicInformation, {type: '1', orderNo: this.orderNo}).then((res) => {
          // console.log(res);
          if (res.code != 200) {
            this.Toast({
              message: res.message,
              position: 'bottom'
            });
          } else {
            if (res.response.basicInformation) {
              let basicInformation = JSON.parse(res.response.basicInformation);
              // console.log(basicInformation);
              let Applicant = basicInformation.Applicant;
              let Insured = basicInformation.Insured;
              let VehicleOwner = basicInformation.VehicleOwner;
              if (VehicleOwner.PersonType == '1') {
                // 个人
                this.peopleInfo.VehicleOwner.PersonType = VehicleOwner.PersonType;
                this.peopleInfo.VehicleOwner.PersonnelName = VehicleOwner.PersonnelName;
                this.peopleInfo.VehicleOwner.CertificateNo = VehicleOwner.CertificateNo;
                this.peopleInfo.VehicleOwner.Address = VehicleOwner.Address;
                this.peopleInfo.VehicleOwner.MobileTelephone = VehicleOwner.MobileTelephone;
                this.peopleInfo.VehicleOwner.Email = VehicleOwner.Email;
              } else {
                // 团体
                this.peopleInfo.VehicleOwner.PersonType = VehicleOwner.PersonType;
                this.peopleInfo.VehicleOwner.GroupName = VehicleOwner.GroupName;
                this.peopleInfo.VehicleOwner.CertificateType = VehicleOwner.CertificateType;
                this.peopleInfo.VehicleOwner.Address = VehicleOwner.Address;
                this.peopleInfo.VehicleOwner.LinkManName = VehicleOwner.LinkManName;
                this.peopleInfo.VehicleOwner.LinkManMobileTelephone = VehicleOwner.LinkManMobileTelephone;
                this.peopleInfo.VehicleOwner.CertType = VehicleOwner.CertType;
                // this.peopleInfo.VehicleOwner.BusinessRegisterId = VehicleOwner.BusinessRegisterId;
                this.peopleInfo.VehicleOwner.LinkManSexCode = VehicleOwner.LinkManSexCode;
                this.peopleInfo.VehicleOwner.Postcode = VehicleOwner.Postcode;
              }
              if (Insured.PersonType == '1') {
                // 个人
                this.peopleInfo.Insured.PersonType = Insured.PersonType;
                this.peopleInfo.Insured.PersonnelName = Insured.PersonnelName;
                this.peopleInfo.Insured.CertificateNo = Insured.CertificateNo;
                this.peopleInfo.Insured.Address = Insured.Address;
                this.peopleInfo.Insured.MobileTelephone = Insured.MobileTelephone;
                this.peopleInfo.Insured.Email = Insured.Email;
              } else {
                // 团体
                this.peopleInfo.Insured.PersonType = Insured.PersonType;
                this.peopleInfo.Insured.GroupName = Insured.GroupName;
                this.peopleInfo.Insured.CertificateType = Insured.CertificateType;
                this.peopleInfo.Insured.Address = Insured.Address;
                this.peopleInfo.Insured.LinkManName = Insured.LinkManName;
                this.peopleInfo.Insured.LinkManMobileTelephone = Insured.LinkManMobileTelephone;
                this.peopleInfo.Insured.CertType = Insured.CertType;
                // this.peopleInfo.Insured.BusinessRegisterId = Insured.BusinessRegisterId;
                this.peopleInfo.Insured.LinkManSexCode = Insured.LinkManSexCode;
                this.peopleInfo.Insured.Postcode = Insured.Postcode;
              }
              if (Applicant.PersonType == '1') {
                // 个人
                this.peopleInfo.Applicant.PersonType = Applicant.PersonType;
                this.peopleInfo.Applicant.PersonnelName = Applicant.PersonnelName;
                this.peopleInfo.Applicant.CertificateNo = Applicant.CertificateNo;
                this.peopleInfo.Applicant.Address = Applicant.Address;
                this.peopleInfo.Applicant.MobileTelephone = Applicant.MobileTelephone;
                this.peopleInfo.Applicant.Email = Applicant.Email;
              } else {
                // 团体
                this.peopleInfo.Applicant.PersonType = Applicant.PersonType;
                this.peopleInfo.Applicant.GroupName = Applicant.GroupName;
                this.peopleInfo.Applicant.CertificateType = Applicant.CertificateType;
                this.peopleInfo.Applicant.Address = Applicant.Address;
                this.peopleInfo.Applicant.LinkManName = Applicant.LinkManName;
                this.peopleInfo.Applicant.LinkManMobileTelephone = Applicant.LinkManMobileTelephone;
                this.peopleInfo.Applicant.CertType = Applicant.CertType;
                // this.peopleInfo.Applicant.BusinessRegisterId = Applicant.BusinessRegisterId;
                this.peopleInfo.Applicant.LinkManSexCode = Applicant.LinkManSexCode;
                this.peopleInfo.Applicant.Postcode = Applicant.Postcode;
              }

              let peopleVal = basicInformation.peopleVal;
              this.peopleVal.policy = peopleVal.policy;
              this.peopleVal.Insured = peopleVal.Insured;
              this.peopleVal.Insured1 = peopleVal.Insured1;
              this.showPeople = true;
            }
            this.$forceUpdate();
          }
        });
      },
      // 查询和保存car信息
      getCarInfo() {
        this.$post(this.$url.car.vehicleInfo, {type: '1', orderNo: this.orderNo}).then((res) => {
          if (res.code != 200) {
            this.Toast({
              message: res.message,
              position: 'bottom'
            });
          } else {
            // console.log(res.response.Vehicle);
            if (res.response.Vehicle != '') {
              let Vehicle = JSON.parse(res.response.Vehicle).Vehicle;
              let carVal = JSON.parse(JSON.parse(res.response.Vehicle).carVal);
              this.insuranceInfo.Vehicle.VehicleLicenceCode = Vehicle.VehicleLicenceCode;
              this.insuranceInfo.Vehicle.VehicleFrameNo = Vehicle.VehicleFrameNo;
              this.insuranceInfo.Vehicle.CarName = carVal.AutoModelVal;
              this.insuranceInfo.Vehicle.EngineNo = Vehicle.EngineNo;
              this.insuranceInfo.Vehicle.FirstRegisterDate = Vehicle.FirstRegisterDate;
              this.showCar = true;
            }
            this.$forceUpdate();
          }
        });
      },
      submit() {
        if (this.showUploadBtn == 0) {
          this.$router.push({name: 'checkInsurance', query: {orderNo: this.orderNo, TpCalulateNo: this.TpCalulateNo}});
        } else {
          this.$router.push({name: 'uploadImg', query: {orderNo: this.orderNo, TpCalulateNo: this.TpCalulateNo}});
        }
      },
    }
  };
</script>

<style>
  .insuranceDetails {

  }

  .insuranceDetails .bb {
    border-bottom: 1px solid #d9d9d9;
  }

  .insuranceDetails .title {
    font-size: .15rem;
    padding: .15rem .2rem;
    background: #F5F5F9;
  }

  .insuranceDetails .title span {
    float: right;
    color: #26a2ff;
  }

  .insuranceDetails .mint-cell-value {
    flex: 1;
    line-height: .2rem;
    justify-content: flex-end;
    text-align: right;
  }

  .insuranceDetails .btn-box {
    width: 100%;
    display: block;
    text-align: center;
  }

  .insuranceDetails .btn-box .btn {
    width: 47%;
    display: inline-block;
  }

  .insuranceDetails .btn-box .btn:first-child {
    margin-right: .1rem;
  }

  .insuranceDetails .people .title {
    font-size: .14rem;
    padding: .1rem .15rem;
    background: #fff;
  }

  .insuranceDetails .people .title span {
    float: none;
    color: #000;
  }

  .insuranceDetails .people .title .mint-switch {
    display: inline-block;
    /*margin-right: .3rem;*/
  }

  .insuranceDetails .people .title i {
    color: #999999;
    font-size: .12rem;
  }

  .insuranceDetails .people input {
    text-align: right;
  }

  .insuranceDetails .people .mint-radio-core {
    width: .2rem;
    height: .2rem;
    margin-left: .05rem;
  }

  .insuranceDetails .people .mint-radio-core::after {
    top: .041rem;
    left: .044rem;
  }

  .insuranceDetails .people .mint-switch-label {
    vertical-align: middle;
    margin-left: 0;
    margin-right: .15rem;
  }

  .insuranceDetails .people .mint-popup {
    width: 100%;
  }

  /*.insuranceDetails .mint-cell-value {*/
  /*flex: 2;*/
  /*}*/
  .insuranceDetails .people select {
    text-align: right;
    text-align-last: right;
    color: #888;
    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;
  }

  .insuranceDetails .people input {
    width: 100%;
    text-align: right;
  }

  .insuranceDetails .people .mint-switch-core {
    width: 38px;
    height: 17px;
    vertical-align: middle;
  }

  .insuranceDetails .people .mint-switch-core::before {
    width: 36px;
    height: 15px;
  }

  .insuranceDetails .people .mint-switch-core::after {
    width: 15px;
    height: 15px;
  }

  .insuranceDetails .noData {
    height: 90%;
    padding: 0 .2rem;
    font-size: .16rem;
    text-align: center;
  }

  .insuranceDetails .noData img {
    width: .8rem;
    display: block;
    margin: .4rem auto;
  }

  .insuranceDetails .noData p {
    margin-bottom: .1rem;
  }

  .insuranceDetails .btn-box {
    width: 100%;
    display: block;
    text-align: center;
  }

  .insuranceDetails .btn {
    width: 47%;
    display: inline-block;
  }

  .insuranceDetails .btn:first-child {
    margin-right: .1rem;
  }

  .insuranceDetails .mint-checkbox-input:checked + .mint-checkbox-core {
    background-color: #F15B5A;
    border-color: #F15B5A;
  }

  .insuranceDetails .mint-switch-core {
    width: 42px;
    height: 24px;
  }

  .insuranceDetails .mint-switch-core::before {
    width: 40px;
    height: 22px;
  }

  .insuranceDetails .mint-switch-core::after {
    width: 22px;
    height: 22px;
  }

  .insuranceDetails .mint-checkbox-core::after {
    width: 6px;
    height: 11px;
  }

  .insuranceDetails .clause {
    padding: 0 .1rem;
    position: relative;
  }

  .insuranceDetails .clause .mint-checklist-label {
    display: inline-block;
    padding-right: 0px;
    position: absolute;
    top: 0;
    left: 0;
  }

  .insuranceDetails .clause > div {
    text-indent: .35rem;
    line-height: .25rem;
    display: inline-block;
    vertical-align: top;
  }

  .insuranceDetails .clause i {
    font-weight: bold;
  }
</style>
