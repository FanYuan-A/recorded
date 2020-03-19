<template>
  <div class="insuranceType wrapper">
    <Header></Header>
    <div class="main">
      <div class="title">保险类型</div>
      <mt-cell title="交强险" class="flex-end">
        <mt-switch v-model="basicInfo.jqxVal"></mt-switch>
      </mt-cell>
      <mt-cell title="交强险起保日期" @click.native="$refs.strong.open()" v-show="basicInfo.jqxVal"
               :class="basicInfo.all.TPFApplication.EffectiveDate?'':'red'">
        <input type="text" placeholder="请选择交强险起保日期" disabled v-model="basicInfo.all.TPFApplication.EffectiveDate"
               style="width: 100%;text-align: right;">
      </mt-cell>
      <mt-cell title="车船税纳税类型" class="flex-end" v-if="basicInfo.jqxVal">
        <div>
          <select class="moneyIpt dib" v-model="basicInfo.all.VehicleTax.TaxConditionCode"
                  @change="restTaxConditionCode">
            <option value="T">正常缴税</option>
            <option value="E">免税</option>
            <option value="C">减税</option>
            <option value="P">已完税</option>
          </select>
        </div>
      </mt-cell>
      <div v-if="basicInfo.jqxVal&&basicInfo.all.VehicleTax.TaxConditionCode=='E'">
        <mt-cell title="减免税原因" class="flex-end" :class="basicInfo.all.VehicleTax.DeductionDueCode?'':'red'">
          <div>
            <select class="moneyIpt dib" v-model="basicInfo.all.VehicleTax.DeductionDueCode">
              <option value="">请选择</option>
              <option value="A">军队、武警专用车</option>
              <option value="C">具备减免税证明</option>
              <option value="D">外国使领馆、国际组织及其人员</option>
              <option value="E">能源减免</option>
              <option value="N">新能源车型</option>
              <option value="O">其他</option>
              <option value="P">警车</option>
              <option value="S">节约能源车型</option>
            </select>
          </div>
        </mt-cell>
        <mt-cell title="纳税机关名称" class="flex-end" :class="basicInfo.all.VehicleTax.CertDepartmentName?'':'red'">
          <div>
            <input type="text" placeholder="请输入纳税机关名称" v-model="basicInfo.all.VehicleTax.CertDepartmentName"
                   style="width: 100%;text-align: right;">
          </div>
        </mt-cell>
        <mt-cell title="减免税凭证号" class="flex-end" :class="basicInfo.all.VehicleTax.FreeNo?'':'red'">
          <div>
            <input type="text" placeholder="请输入减免税凭证号" v-model="basicInfo.all.VehicleTax.FreeNo"
                   style="width: 100%;text-align: right;">
          </div>
        </mt-cell>
        <input type="hidden" :value="basicInfo.all.VehicleTax.DeductionDueType=='E'">
      </div>
      <div v-if="basicInfo.jqxVal&&basicInfo.all.VehicleTax.TaxConditionCode=='C'">
        <mt-cell title="减免税原因" class="flex-end" :class="basicInfo.all.VehicleTax.DeductionDueCode?'':'red'">
          <div>
            <select class="moneyIpt dib" v-model="basicInfo.all.VehicleTax.DeductionDueCode">
              <option value="">请选择</option>
              <option value="A">军队、武警专用车</option>
              <option value="C">具备减免税证明</option>
              <option value="D">外国使领馆、国际组织及其人员</option>
              <option value="E">能源减免</option>
              <option value="N">新能源车型</option>
              <option value="O">其他</option>
              <option value="P">警车</option>
              <option value="S">节约能源车型</option>
            </select>
          </div>
        </mt-cell>
        <mt-cell title="减免税方案" class="flex-end" :class="basicInfo.all.VehicleTax.DeductionDueType?'':'red'">
          <div style="float: right;">
            <label class="mint-radiolist-label" style="display: inline-block;">
          <span class="mint-radio is-left">
          <input type="radio" class="mint-radio-input" v-model="basicInfo.all.VehicleTax.DeductionDueType" value="A">
          <span class="mint-radio-core"></span>
          </span>
              <span class="mint-radio-label">金额减免</span>
            </label>
            <label class="mint-radiolist-label" style="display: inline-block;">
          <span class="mint-radio is-left">
          <input type="radio" class="mint-radio-input" @click="restTaxDeductionDueType"
                 v-model="basicInfo.all.VehicleTax.DeductionDueType" value="P">
          <span class="mint-radio-core"></span>
          </span>
              <span class="mint-radio-label">比例减免</span>
            </label>
          </div>
        </mt-cell>
        <mt-cell title="减免税金额" class="flex-end" @click="restTaxDeductionDueType"
                 :class="basicInfo.all.VehicleTax.Deduction?'':'red'"
                 v-if="basicInfo.all.VehicleTax.DeductionDueType == 'A'">
          <div>
            <input type="text" placeholder="请输入减免税金额" v-model="basicInfo.all.VehicleTax.Deduction"
                   style="width: 100%;text-align: right;">
          </div>
        </mt-cell>
        <mt-cell title="减免税比例" class="flex-end" v-if="basicInfo.all.VehicleTax.DeductionDueType == 'P'"
                 :class="basicInfo.all.VehicleTax.DeductionDueProportion?'':'red'">
          <div>
            <input type="text" placeholder="请输入减免税比例" v-model="basicInfo.all.VehicleTax.DeductionDueProportion"
                   style="width: 100%;text-align: right;">
          </div>
        </mt-cell>

        <mt-cell title="纳税机关名称" class="flex-end" :class="basicInfo.all.VehicleTax.CertDepartmentName?'':'red'">
          <div>
            <input type="text" placeholder="请输入纳税机关名称" v-model="basicInfo.all.VehicleTax.CertDepartmentName"
                   style="width: 100%;text-align: right;">
          </div>
        </mt-cell>
        <mt-cell title="减免税凭证号" class="flex-end" :class="basicInfo.all.VehicleTax.FreeNo?'':'red'">
          <div>
            <input type="text" placeholder="请输入减免税凭证号" v-model="basicInfo.all.VehicleTax.FreeNo"
                   style="width: 100%;text-align: right;">
          </div>
        </mt-cell>
      </div>
      <div v-if="basicInfo.jqxVal&&basicInfo.all.VehicleTax.TaxConditionCode=='P'">
        <mt-cell title="纳税机关名称" class="flex-end" :class="basicInfo.all.VehicleTax.CertDepartmentName?'':'red'">
          <div>
            <input type="text" placeholder="请输入纳税机关名称" v-model="basicInfo.all.VehicleTax.CertDepartmentName"
                   style="width: 100%;text-align: right;">
          </div>
        </mt-cell>
        <mt-cell title="完税凭证号" class="flex-end" :class="basicInfo.all.VehicleTax.PayNo?'':'red'">
          <div>
            <input type="text" placeholder="请输入减免税凭证号" v-model="basicInfo.all.VehicleTax.PayNo"
                   style="width: 100%;text-align: right;">
          </div>
        </mt-cell>
      </div>

      <mt-cell title="商业险" class="flex-end">
        <mt-switch v-model="basicInfo.syxVal" @change="changeSYX"></mt-switch>
      </mt-cell>
      <mt-cell title="商业险起保日期" @click.native="$refs.business.open()" v-show="basicInfo.syxVal"
               :class="basicInfo.all.BizApplication.EffectiveDate?'':'red'">
        <input type="text" placeholder="请选择商业险起保日期" disabled v-model="basicInfo.all.BizApplication.EffectiveDate"
               style="width: 100%;text-align: right;">
      </mt-cell>
      <div v-for="(val,key,i) in syx" :key="i" v-if="basicInfo.syxVal">
        <div v-if="key!='fjx'&&key!='szfjx'">
          <div class="title">{{key | formatTitle}}</div>
          <mt-cell :title="item.name" :key="index" v-for="(item,index) in val" :class="item.type==2?'flex-end':'flex'"
                   :id="item.coverage">
            <div class="mint-cell-value" style="width: 100%;" :class="item.defaule?'':'visibilityHidden'">
              <!--输入框-->
              <input type="text" class="moneyIpt dib" v-model="item.insuredAmount" disabled v-if="item.type==0">
              <div v-if="(item.type==1||item.type==3) && item.coverage!='H10'"
                   :class="item.name=='乘客座位险'?'chengke':'chengke1'">
                <!--乘客座位险-->
                <input type="hidden" :value="item.seatingNo=seatings">
                <select class="moneyIpt dib needsclick mr1" v-if="item.name=='乘客座位险'" disabled v-model="item.seatingNo" style="background: #eaeaea;">
                  <option value="">请选择</option>
                  <option :value="v.attributeCode" v-for="(v,i) in item.seating" :key="i" v-if="i<seatings">
                    {{v.attributeName}}
                  </option>
                </select>
                <!--下拉框-->
                <select class="moneyIpt dib needsclick mr1" v-model="item.insuredAmount">
                  <option value="">请选择</option>
                  <option :value="v.attributeCode" v-for="(v,i) in item.list" :key="i">{{v.attributeName}}</option>
                </select>
              </div>
              <div v-if="(item.type==1||item.type==3) && item.coverage=='H10'" class="w46" style="width: 100%;">
                <select class="moneyIpt dib needsclick mr1" v-model="item.insuredAmount">
                  <option value="">请选择</option>
                  <option :value="v.attributeCode" v-for="(v,i) in item.list" :key="i">{{v.attributeName}}</option>
                </select>

                <!--<input type="hidden" :value="importFlag=='1'?item.insuredAmount ='国产':item.insuredAmount ='进口'">-->
                <!--<input type="text" class="moneyIpt dib" v-model="item.insuredAmount" disabled>-->
                <!--<p class="moneyIpt dib" style="line-height: .3rem;text-align: center;color: #000;">-->
                <!--{{importFlag=='1'?item.insuredAmount ='国产':item.insuredAmount ='进口'}}</p>-->
              </div>
              <!--不计免赔radio-->
              <label class="mint-checklist-label dib" v-if="item.isHRF == '1'">
        <span class="mint-checkbox is-left">
           <!--@change="item.isRF=='1'?item.isRF=true:item.isRF=false"-->
          <input type="hidden" :value="item.isRF=='1'?item.isRF=true:item.isRF=false">
          <input type="checkbox" class="mint-checkbox-input" v-model="item.isRF" @click="switchChange(item.isRF)">
          <span class="mint-checkbox-core"></span>
        </span>
                <span class="mint-checkbo-label">不计免赔</span>
              </label>
              <!--指定装修厂-->
              <div v-if="item.type==4" class="dib w46">
                <select class="moneyIpt dib needsclick" v-model="item.insuredAmount">
                  <option value="">请选择</option>
                  <option :value="v.attributeCode" v-for="(v,i) in item.list" :key="i">{{v.attributeName}}</option>
                </select>
                <!--<input type="hidden" :value="importFlag=='1'?item.insuredAmount ='国产':item.insuredAmount ='进口'">-->
                <!--<input type="text" class="moneyIpt dib" v-model="item.insuredAmount" disabled>-->
                <!--<p class="moneyIpt dib" style="line-height: .3rem;text-align: center;color: #000;">-->
                <!--{{importFlag=='1'?item.insuredAmount ='国产':item.insuredAmount ='进口'}}</p>-->
                <input type="hidden" :value="item.proportion">
                <input type="number" class="moneyIpt dib" v-model="item.proportion"
                       style="margin-left: 0.1rem;width: 35%!important;">
                %
              </div>
            </div>
            <!--switch-->
            <input type="hidden"
                   :value="item.coverage=='A1'?(item.defaule? (basicInfo.showOther=true): (basicInfo.showOther=false)):''">
            <input type="hidden"
                   :value="item.coverage=='E1'?(item.defaule? (basicInfo.showThree=true): (basicInfo.showThree=false)):''">
            <mt-switch class="dib" :class="item.type==4?'mt15':''" v-model="item.defaule"
                       @change="changefjx(item.coverage,item.defaule)"></mt-switch>
            <!--:disabled="item.coverage=='A1'?true:false"-->
          </mt-cell>
        </div>
        <div v-if="key=='fjx' && basicInfo.showOther">
          <div class="title">{{key | formatTitle}}</div>
          <mt-cell :title="item.name" :key="index" v-for="(item,index) in val" :class="item.type==2?'flex-end':'flex'"
                   :id="item.coverage">
            <div class="mint-cell-value" style="width: 100%;" :class="item.defaule?'':'visibilityHidden'">
              <!--输入框-->
              <input type="text" class="moneyIpt dib" v-model="item.insuredAmount" disabled v-if="item.type==0">
              <div v-if="(item.type==1||item.type==3) && item.coverage!='H10'"
                   :class="item.name=='乘客座位险'?'chengke':'chengke1'">
                <!--乘客座位险-->
                <input type="hidden" :value="item.seatingNo=seatings">
                <select class="moneyIpt dib needsclick mr1" v-if="item.name=='乘客座位险'" v-model="item.seatingNo" disabled>
                  <option value="">请选择</option>
                  <option :value="v.attributeCode" v-for="(v,i) in item.seating" :key="i">{{v.attributeName}}</option>
                </select>
                <!--下拉框-->
                <select class="moneyIpt dib needsclick mr1" v-model="item.insuredAmount">
                  <option value="">请选择</option>
                  <option :value="v.attributeCode" v-for="(v,i) in item.list" :key="i">{{v.attributeName}}</option>
                </select>
              </div>
              <div v-if="(item.type==1||item.type==3) && item.coverage=='H10'" class="w46" style="width: 100%;">
                <select class="moneyIpt dib needsclick mr1" v-model="item.insuredAmount">
                  <option value="">请选择</option>
                  <option :value="v.attributeCode" v-for="(v,i) in item.list" :key="i">{{v.attributeName}}</option>
                </select>

                <!--<input type="hidden" :value="importFlag=='1'?item.insuredAmount ='国产':item.insuredAmount ='进口'">-->
                <!--<input type="text" class="moneyIpt dib" v-model="item.insuredAmount" disabled>-->
                <!--<p class="moneyIpt dib" style="line-height: .3rem;text-align: center;color: #000;">-->
                <!--{{importFlag=='1'?item.insuredAmount ='国产':item.insuredAmount ='进口'}}</p>-->
              </div>
              <!--不计免赔radio-->
              <label class="mint-checklist-label dib" v-if="item.isHRF == '1'">
        <span class="mint-checkbox is-left">
           <!--@change="item.isRF=='1'?item.isRF=true:item.isRF=false"-->
          <input type="hidden" :value="item.isRF=='1'?item.isRF=true:item.isRF=false">
          <input type="checkbox" class="mint-checkbox-input" v-model="item.isRF" @click="switchChange(item.isRF)">
          <span class="mint-checkbox-core"></span>
        </span>
                <span class="mint-checkbo-label">不计免赔</span>
              </label>
              <!--指定装修厂-->
              <div v-if="item.type==4" class="dib w46">
                <select class="moneyIpt dib needsclick" v-model="item.insuredAmount">
                  <option value="">请选择</option>
                  <option :value="v.attributeCode" v-for="(v,i) in item.list" :key="i">{{v.attributeName}}</option>
                </select>
                <!--<input type="hidden" :value="importFlag=='1'?item.insuredAmount ='国产':item.insuredAmount ='进口'">-->
                <!--<input type="text" class="moneyIpt dib" v-model="item.insuredAmount" disabled>-->
                <!--<p class="moneyIpt dib" style="line-height: .3rem;text-align: center;color: #000;">-->
                <!--{{importFlag=='1'?item.insuredAmount ='国产':item.insuredAmount ='进口'}}</p>-->
                <input type="hidden" :value="item.proportion">
                <input type="number" class="moneyIpt dib" v-model="item.proportion"
                       style="margin-left: 0.1rem;width: 35%!important;">
                %
              </div>
            </div>
            <!--switch-->
            <mt-switch class="dib" :class="item.type==4?'mt15':''" v-model="item.defaule"></mt-switch>
            <!--:disabled="item.coverage=='A1'?true:false"-->
          </mt-cell>
        </div>
        <div v-if="key=='szfjx' && basicInfo.showThree">
          <div class="title">{{key | formatTitle}}</div>
          <mt-cell :title="item.name" :key="index" v-for="(item,index) in val" :class="item.type==2?'flex-end':'flex'">
            <div class="mint-cell-value" style="width: 100%;" :class="item.defaule?'':'visibilityHidden'">
              <!--输入框-->
              <input type="text" class="moneyIpt dib" v-model="item.insuredAmount" disabled v-if="item.type==0">
              <div v-if="(item.type==1||item.type==3) && item.coverage!='H10'"
                   :class="item.name=='乘客座位险'?'chengke':'chengke1'">
                <!--乘客座位险-->
                <input type="hidden" :value="item.seatingNo=seatings">
                <select class="moneyIpt dib needsclick mr1" v-if="item.name=='乘客座位险'" v-model="item.seatingNo" disabled>
                  <option value="">请选择</option>
                  <option :value="v.attributeCode" v-for="(v,i) in item.seating" :key="i">{{v.attributeName}}</option>
                </select>
                <!--下拉框-->
                <select class="moneyIpt dib needsclick mr1" v-model="item.insuredAmount">
                  <option value="">请选择</option>
                  <option :value="v.attributeCode" v-for="(v,i) in item.list" :key="i">{{v.attributeName}}</option>
                </select>
              </div>
              <div v-if="(item.type==1||item.type==3) && item.coverage=='H10'" class="w46" style="width: 100%;">
                <select class="moneyIpt dib needsclick mr1" v-model="item.insuredAmount">
                  <option value="">请选择</option>
                  <option :value="v.attributeCode" v-for="(v,i) in item.list" :key="i">{{v.attributeName}}</option>
                </select>

                <!--<input type="hidden" :value="importFlag=='1'?item.insuredAmount ='国产':item.insuredAmount ='进口'">-->
                <!--<input type="text" class="moneyIpt dib" v-model="item.insuredAmount" disabled>-->
                <!--<p class="moneyIpt dib" style="line-height: .3rem;text-align: center;color: #000;">-->
                <!--{{importFlag=='1'?item.insuredAmount ='国产':item.insuredAmount ='进口'}}</p>-->
              </div>
              <!--不计免赔radio-->
              <label class="mint-checklist-label dib" v-if="item.isHRF == '1'">
        <span class="mint-checkbox is-left">
           <!--@change="item.isRF=='1'?item.isRF=true:item.isRF=false"-->
          <input type="hidden" :value="item.isRF=='1'?item.isRF=true:item.isRF=false">
          <input type="checkbox" class="mint-checkbox-input" v-model="item.isRF" @click="switchChange(item.isRF)">
          <span class="mint-checkbox-core"></span>
        </span>
                <span class="mint-checkbo-label">不计免赔</span>
              </label>
              <!--指定装修厂-->
              <div v-if="item.type==4" class="dib w46">
                <select class="moneyIpt dib needsclick" v-model="item.insuredAmount">
                  <option value="">请选择</option>
                  <option :value="v.attributeCode" v-for="(v,i) in item.list" :key="i">{{v.attributeName}}</option>
                </select>
                <!--<input type="hidden" :value="importFlag=='1'?item.insuredAmount ='国产':item.insuredAmount ='进口'">-->
                <!--<input type="text" class="moneyIpt dib" v-model="item.insuredAmount" disabled>-->
                <!--<p class="moneyIpt dib" style="line-height: .3rem;text-align: center;color: #000;">-->
                <!--{{importFlag=='1'?item.insuredAmount ='国产':item.insuredAmount ='进口'}}</p>-->
                <input type="hidden" :value="item.proportion">
                <input type="number" class="moneyIpt dib" v-model="item.proportion"
                       style="margin-left: 0.1rem;width: 35%!important;">
                %
              </div>
            </div>
            <!--switch-->
            <mt-switch class="dib" :class="item.type==4?'mt15':''" v-model="item.defaule"></mt-switch>
            <!--:disabled="item.coverage=='A1'?true:false"-->
          </mt-cell>
        </div>
      </div>
    </div>
    <div class="btn-box">
      <mt-button type="primary" size="small" class="btn"
                 @click="$router.push({path:'/peopleMessage',query:{orderNo:orderNo}})">上一步
      </mt-button>
      <mt-button type="primary" size="small" class="btn" @click="submit">立即报价</mt-button>
    </div>
    <!--交强险起保日期-->
    <mt-datetime-picker
        ref="strong"
        type="datetime"
        year-format="{value}"
        month-format="{value}"
        date-format="{value}"
        hour-format="{value}"
        minute-format="{value}"
        :startDate="new Date(startDate())"
        :endDate="new Date(endData())"
        @confirm="handleChange">
    </mt-datetime-picker>
    <!--商业险起保日期-->
    <mt-datetime-picker
        ref="business"
        type="datetime"
        year-format="{value}"
        month-format="{value}"
        date-format="{value}"
        hour-format="{value}"
        minute-format="{value}"
        :startDate="new Date(startDate())"
        :endDate="new Date(endData())"
        @confirm="handleChange1">
    </mt-datetime-picker>
  </div>
</template>

<script>
  import Header from '../../components/Header';

  export default {
    name: 'insuranceType',
    data() {
      return {
        orderNo: '',
        importFlag: '',
        seatings: '',
        basicInfo: {
          all: {
            // 交强险投保单
            TPFApplication: {
              EffectiveDate: '',
            },
            // 车船税
            VehicleTax: {
              TaxConditionCode: 'T',
            },
            // 商业险投保单
            BizApplication: {
              EffectiveDate: ''
            },
            CoverageList: []
          },
          showOther: false,
          showThree: false,
          jqxVal: false,
          syxVal: false,
          moneyJM: false,  // 金额减免
          proportionJM: false,  // 比例减免
          jqx: {},
        },
        syx: {},
        CoverageList: [],
        switch: false,
        otherInfo: {
          Vehicle: {},
          PeopleInfo: {},
        }
      };
    },
    components: {
      Header
    },
    filters: {
      formatTitle(value) {
        switch (value) {
          case 'fjx':
            value = '车损险附加险';
            break;
          case 'jbx':
            value = '基本险';
            break;
          case 'szfjx':
            value = '三者附加险';
            break;
        }
        return value;
      },
    },
    mounted() {
      this.orderNo = this.$route.query.orderNo;
      this.getInsuranceInfo('1', () => {
        this.getCarInfo();
        this.getPeopleInfo();
      });
    },
    methods: {
      changefjx(coverage, defaule) {
        if (coverage == 'A1' && defaule) {
          this.basicInfo.showOther = true;
        } else {
          this.basicInfo.showOther = false;
        }

        if (coverage == 'E1' && defaule) {
          this.basicInfo.showThree = true;
        } else {
          this.basicInfo.showThree = false;
        }
      },
      // 查询和保存险种信息
      getInsuranceInfo(type, callback) {
        this.$post(this.$url.car.insuranceInfo, {
          type: type,
          orderNo: this.orderNo,
          basicInfo: this.basicInfo,
          insuranceInfo: this.syx,
        }).then((res) => {
          if (res.code != 200) {
            this.Toast({
              message: res.message,
              position: 'bottom'
            });
          } else {
            // console.log(res.response);
            if (res.response.insuranceInfo == '') {
              this.getInsuranceType();
            } else {
              if (res.response.insuranceInfo) {
                let insuranceInfo = JSON.parse(res.response.insuranceInfo);
                // console.log(insuranceInfo);
                this.basicInfo = insuranceInfo.basicInfo;
                this.syx = insuranceInfo.insuranceInfo;
              }
            }
            if (callback) {
              callback();
            }
          }
        });
      },
      // 获取车辆信息
      getCarInfo() {
        this.$post(this.$url.car.vehicleInfo, {type: '1', orderNo: this.orderNo}).then((res) => {
          if (res.code != 200) {
            this.Toast({
              message: res.message,
              position: 'bottom'
            });
          } else {
            if (res.response.Vehicle) {
              this.importFlag = JSON.parse(JSON.parse(res.response.Vehicle).carVal).importFlag;
              this.seatings = JSON.parse(JSON.parse(res.response.Vehicle).carVal).seatings;
              this.otherInfo.Vehicle = JSON.parse(res.response.Vehicle).Vehicle;
            }
          }
        });
      },
      // 获取人员信息
      getPeopleInfo() {
        this.$post(this.$url.car.basicInformation, {type: '1', orderNo: this.orderNo}).then((res) => {
          if (res.code != 200) {
            this.Toast({
              message: res.message,
              position: 'bottom'
            });
          } else {
            if (res.response.basicInformation) {
              this.otherInfo.PeopleInfo = JSON.parse(res.response.basicInformation);
            }
          }
        });
      },
      handleChange(value) {
        console.log(value);
        let date = new Date(value);
        let m = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
        let d = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
        let hh = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
        let mm = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
        this.basicInfo.all.TPFApplication.EffectiveDate = date.getFullYear() + '-' + m + '-' + d + ' ' + hh + ':' + mm;
      },
      handleChange1(value) {
        let date = new Date(value);
        let m = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
        let d = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
        let hh = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
        let mm = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
        this.basicInfo.all.BizApplication.EffectiveDate = date.getFullYear() + '-' + m + '-' + d + ' ' + hh + ':' + mm;
      },
      changeSYX() {
        if (this.basicInfo.syxVal) {
          for (let i in this.syx) {
            let a = this.syx[i];
            for (let j = 0; j < a.length; j++) {
              if (a[j].coverage == 'A1') {
                a[j].defaule = true;
              }
            }
          }
        }
      },
      changeSeatingNo(val) {

      },
      // 查询当前user保险详情
      getInsuranceType() {
        this.$post(this.$url.car.insurancePlanQuery).then((res) => {
          // console.log(res);
          if (res.code != 200) {
            this.Toast({
              message: res.message,
              position: 'bottom'
            });
          } else {
            if (res.response) {
              this.basicInfo.jqx = res.response.jqx;
              this.syx = res.response.syx;
            }
          }
        });
      },
      switchChange(val) {
        console.log(val);
      },
      submit() {
        this.basicInfo.all.Applicant = {};
        this.basicInfo.all.Insured = {};
        this.basicInfo.all.Vehicle = {};
        this.basicInfo.all.VehicleOwner = {};
        this.basicInfo.all.CoverageList = [];
        // console.log(this.basicInfo);
        // console.log(this.syx);
        // return
        if (!this.basicInfo.jqxVal && !this.basicInfo.syxVal) {
          this.Toast({
            message: '必须选择一个险种',
            position: 'bottom'
          });
          return;
        }
        // 交强险
        this.CoverageList = [];
        if (this.basicInfo.jqxVal) {
          if (!this.basicInfo.all.TPFApplication.EffectiveDate) {
            this.Toast({
              message: '请选择交强险起保日期',
              position: 'bottom'
            });
            return;
          } else if (this.basicInfo.all.VehicleTax.TaxConditionCode == 'E' && !this.basicInfo.all.VehicleTax.DeductionDueCode) {
            this.Toast({
              message: '请选择减免税原因',
              position: 'bottom'
            });
            return;
          } else if (this.basicInfo.all.VehicleTax.TaxConditionCode == 'E' && !this.basicInfo.all.VehicleTax.CertDepartmentName) {
            this.Toast({
              message: '请输入纳税机关名称',
              position: 'bottom'
            });
            return;
          } else if (this.basicInfo.all.VehicleTax.TaxConditionCode == 'E' && !this.basicInfo.all.VehicleTax.FreeNo) {
            this.Toast({
              message: '请输入减免税凭证号',
              position: 'bottom'
            });
            return;
          } else if (this.basicInfo.all.VehicleTax.TaxConditionCode == 'C' && !this.basicInfo.all.VehicleTax.DeductionDueCode) {
            this.Toast({
              message: '请选择减免税原因',
              position: 'bottom'
            });
            return;
          } else if (this.basicInfo.all.VehicleTax.TaxConditionCode == 'C' && !this.basicInfo.all.VehicleTax.DeductionDueType) {
            this.Toast({
              message: '请至少选择一个减免税方案',
              position: 'bottom'
            });
            return;
          } else if (this.basicInfo.all.VehicleTax.TaxConditionCode == 'C' && this.basicInfo.all.VehicleTax.DeductionDueType == 'A' && !this.basicInfo.all.VehicleTax.Deduction) {
            this.Toast({
              message: '请输入减免税金额',
              position: 'bottom'
            });
            return;
          } else if (this.basicInfo.all.VehicleTax.TaxConditionCode == 'C' && this.basicInfo.all.VehicleTax.DeductionDueType == 'P' && !this.basicInfo.all.VehicleTax.DeductionDueProportion) {
            this.Toast({
              message: '减免税比例',
              position: 'bottom'
            });
            return;
          } else if (this.basicInfo.all.VehicleTax.TaxConditionCode == 'C' && this.basicInfo.all.VehicleTax.DeductionDueType == 'P' && Number(this.basicInfo.all.VehicleTax.DeductionDueProportion) < 0) {
            this.Toast({
              message: '减免税比例不可小于0.0',
              position: 'bottom'
            });
            return;
          } else if (this.basicInfo.all.VehicleTax.TaxConditionCode == 'C' && this.basicInfo.all.VehicleTax.DeductionDueType == 'P' && Number(this.basicInfo.all.VehicleTax.DeductionDueProportion) > 1) {
            this.Toast({
              message: '减免税比例不可大于1.0',
              position: 'bottom'
            });
            return;
          } else if (this.basicInfo.all.VehicleTax.TaxConditionCode == 'C' && !this.basicInfo.all.VehicleTax.CertDepartmentName) {
            this.Toast({
              message: '请输入纳税机关名称',
              position: 'bottom'
            });
            return;
          } else if (this.basicInfo.all.VehicleTax.TaxConditionCode == 'C' && !this.basicInfo.all.VehicleTax.FreeNo) {
            this.Toast({
              message: '请输入减免税凭证号',
              position: 'bottom'
            });
            return;
          } else if (this.basicInfo.all.VehicleTax.TaxConditionCode == 'P' && !this.basicInfo.all.VehicleTax.CertDepartmentName) {
            this.Toast({
              message: '请输入纳税机关名称',
              position: 'bottom'
            });
            return;
          } else if (this.basicInfo.all.VehicleTax.TaxConditionCode == 'P' && !this.basicInfo.all.VehicleTax.PayNo) {
            this.Toast({
              message: '请输入减免税凭证号',
              position: 'bottom'
            });
            return;
          } else {
            this.CoverageList.push(this.basicInfo.jqx);
          }
        } else {
          if (this.basicInfo.all.CoverageList) {
            for (let i = 0; i < this.basicInfo.all.CoverageList.length; i++) {
              if (this.basicInfo.all.CoverageList[i].coverage == 'TPF') {
                this.basicInfo.all.CoverageList[i] = {};
              }
            }
          }
          this.basicInfo.all.TPFApplication.EffectiveDate = '';
          this.basicInfo.all.VehicleTax.TaxConditionCode = '';
        }
        // 商业险
        if (this.basicInfo.syxVal) {
          if (!this.basicInfo.all.BizApplication.EffectiveDate) {
            this.Toast({
              message: '请选择商业险起保日期',
              position: 'bottom'
            });
            return;
          } else {
            let syx = this.syx;
            for (let i in syx) {
              let a = syx[i];
              let num = 0;
              for (let j = 0; j < a.length; j++) {
                // 如果选择了开启
                if (a[j].defaule) {
                  if (a[j].coverage != 'A1' && a[j].coverage != 'G1' && a[j].coverage != 'I1' && a[j].coverage != 'D1' && a[j].coverage != 'P10' && a[j].coverage != 'F10') {
                    if (a[j].insuredAmount == '') {
                      this.Toast({
                        message: '请填写' + a[j].name + '的保额',
                        position: 'bottom'
                      });
                      document.getElementById(a[j].coverage).style.color = 'red';
                      return;
                    }
                  }

                  if (a[j].coverage == 'O10') {
                    if (a[j].proportion == '') {
                      this.Toast({
                        message: '请填写' + a[j].name + '的百分比',
                        position: 'bottom'
                      });
                      document.getElementById(a[j].coverage).style.color = 'red';
                      return;
                    } else {
                      document.getElementById(a[j].coverage).style.color = '#000';
                    }
                  }

                  if (a[j].coverage == 'F10') {
                    for (let ii in this.syx) {
                      let aa = this.syx[ii];
                      for (let jj = 0; jj < aa.length; jj++) {
                        if (aa[jj].coverage == 'E1') {
                          if (!aa[jj].defaule) {
                            this.Toast({
                              message: '请选择' + aa[jj].name,
                              position: 'bottom'
                            });
                            document.getElementById(a[j].coverage).style.color = 'red';
                            return;
                          } else {
                            document.getElementById(a[j].coverage).style.color = '#000';
                          }
                        }
                      }
                    }
                  }
                }
                // document.getElementById(a[j].coverage).style.color = 'red';
                // document.getElementById(a[j].coverage).style.color = '#000';
                else if (!a[j].defaule && (a[j].coverage == 'A1')) {
                  num += 1;
                } else if (!a[j].defaule && (a[j].coverage == 'E1')) {
                  num += 1;
                } else if (!a[j].defaule && (a[j].coverage == 'B1')) {
                  num += 1;
                } else if (!a[j].defaule && (a[j].coverage == 'G1')) {
                  num += 1;
                } else if (!a[j].defaule && (a[j].coverage == 'C1')) {
                  num += 1;
                }
                if (num >= 5) {
                  this.Toast({
                    message: '请选择至少一个基本险',
                    position: 'bottom'
                  });
                  return;
                }

                this.CoverageList.push(a[j]);
              }
            }
          }
        } else {
          this.basicInfo.all.BizApplication = {
            EffectiveDate: ''
          };
          for (let i in this.syx) {
            let a = this.syx[i];
            for (let j = 0; j < a.length; j++) {
              if (this.basicInfo.jqxVal && !this.basicInfo.syxVal) {
                a[j].defaule = false;
              }
              this.CoverageList.push(a[j]);
            }
          }
        }

        this.getInsuranceInfo('2', () => {
          // 拼接最终对象
          this.basicInfo.all.Applicant = this.otherInfo.PeopleInfo.Applicant;
          this.basicInfo.all.Insured = this.otherInfo.PeopleInfo.Insured;
          this.basicInfo.all.VehicleOwner = this.otherInfo.PeopleInfo.VehicleOwner;
          this.basicInfo.all.Vehicle = this.otherInfo.Vehicle;
          this.basicInfo.all.CoverageList = this.CoverageList;
          this.offer(this.basicInfo.all);
        });
      },
      // 报价
      offer(all) {
        all.orderNo = this.orderNo;
        this.$post(this.$url.car.insuranceQuotes, all).then((res) => {
          console.log(res);
          sessionStorage.removeItem('offerData');
          sessionStorage.setItem('offerData', JSON.stringify(res));
          if (res.code == 202) {
            // 交强险更新
            if (res.response.tfpEffectiveDateStr && !res.response.bizEffectiveDateStr) {
              this.MessageBox.alert('交强险重复投保:' + '<br>' + '起保日期更新为:' + res.response.tfpEffectiveDateStr).then(() => {
                if (res.response.Body) {
                  if (sessionStorage.getItem('offerData')) {
                    this.$router.push({name: 'insuranceDetails', query: {orderNo: this.orderNo, mark: 'success'}});
                  }
                }
              });
            }
            // 商业险更新
            if (!res.response.tfpEffectiveDateStr && res.response.bizEffectiveDateStr) {
              this.MessageBox.alert('商业险重复投保:' + '<br>' + '起保日期更新为:' + res.response.bizEffectiveDateStr).then(() => {
                if (res.response.Body) {
                  if (sessionStorage.getItem('offerData')) {
                    this.$router.push({name: 'insuranceDetails', query: {orderNo: this.orderNo, mark: 'success'}});
                  }
                }
              });
            }
            // 交强险更新 和 商业险更新
            if (res.response.tfpEffectiveDateStr && res.response.bizEffectiveDateStr) {
              this.MessageBox.alert('交强险重复投保:' + '<br>' + '起保日期更新为:' + res.response.tfpEffectiveDateStr + '<br>' + '商业险重复投保:' + '<br>' + '起保日期更新为:' + res.response.bizEffectiveDateStr).then(() => {
                if (res.response.Body) {
                  if (sessionStorage.getItem('offerData')) {
                    this.$router.push({name: 'insuranceDetails', query: {orderNo: this.orderNo, mark: 'success'}});
                  }
                }
              });
            }
          } else {
            if (res.code != 200) {
              if (sessionStorage.getItem('offerData')) {
                this.$router.push({name: 'insuranceDetails', query: {orderNo: this.orderNo, mark: 'error'}});
              }
            } else {
              if (res.response.Body) {
                if (sessionStorage.getItem('offerData')) {
                  this.$router.push({name: 'insuranceDetails', query: {orderNo: this.orderNo, mark: 'success'}});
                }
              }
            }
          }
        });
      },
      startDate() {
        let d = new Date();
        let year = d.getFullYear();
        let month = d.getMonth() + 1;
        let day = d.getDate() + 1;
        let day3 = new Date();
        day3.setTime(day3.getTime() + 24 * 60 * 60 * 1000);
        let s3 = day3.getFullYear() + '/' + (day3.getMonth() + 1) + '/' + day3.getDate();
        return s3;
      },
      endData() {
        let d = new Date();
        let year = d.getFullYear() + 1;
        let month = d.getMonth() + 1;
        let day = d.getDate();
        return year + '/' + month + '/' + day;
      },
      mergeObject(target, source) {
        for (let obj in source) {
          target[obj] = source[obj];
        }
        return target;
      },
      restTaxConditionCode() {
        this.basicInfo.all.VehicleTax = {
          TaxConditionCode: this.basicInfo.all.VehicleTax.TaxConditionCode
        };
      },
      restTaxDeductionDueType() {
        this.basicInfo.all.VehicleTax.Deduction = '';
        this.basicInfo.all.VehicleTax.Deduction = '';
      },
    }
  };
</script>

<style>
  .insuranceType {
    color: #000;
    /*padding-bottom: .45rem;*/
  }

  .insuranceType .title {
    font-size: .14rem;
    padding: .1rem .15rem;
    background: #F5F5F9;
  }

  .insuranceType .mint-cell-value {
    width: 70%;
    flex-direction: row;
    justify-content: space-between;
  }

  .insuranceType .flex-end .mint-cell-value {
    justify-content: flex-end;
  }

  .insuranceType .mint-switch-core {
    width: 42px;
    height: 24px;
  }

  .insuranceType .mint-switch-core::before {
    width: 40px;
    height: 22px;
  }

  .insuranceType .mint-switch-core::after {
    width: 22px;
    height: 22px;
  }

  .insuranceType .mint-checkbox-core::after {
    width: 6px;
    height: 11px;
  }

  .insuranceType .moneyIpt {
    width: 33%;
    height: .35rem;
    border: 1px solid #d4d4d4;
    padding: .02rem .05rem;
    border-radius: .05rem;
  }

  .insuranceType select.moneyIpt {
    width: 100%;
    background: #ffffff;
  }

  .insuranceType .chengke {
    width: 46%;
    padding: .1rem 0;
  }

  .insuranceType .chengke select {
    margin-bottom: .05rem;
  }

  .dib {
    display: inline-block;
    vertical-align: middle;
  }

  .mt15 {
    margin-top: .15rem;
  }

  .w41 .moneyIpt {
    width: 41% !important;
  }

  .w46 .moneyIpt {
    width: 46% !important;
  }

  .insuranceType .btn {
    -position: fixed;
    -bottom: 0;
    -left: 0;
    -z-index: 999;
  }

  .mint-popup-bottom {
    width: 100%;
    z-index: 9999;
  }

  .mr1 {
    margin-right: .1rem;
  }

  input:disabled, input[disabled] {
    color: #000 !important;
  }

  .insuranceType .btn-box {
    width: 100%;
    display: block;
    text-align: center;
  }

  .insuranceType .btn {
    width: 47%;
    display: inline-block;
  }

  .insuranceType .btn:first-child {
    margin-right: .1rem;
  }

  .visibilityHidden {
    visibility: hidden;
  }

  .mint-msgbox-message {
    text-align: left !important;;
    line-height: 31px !important;;
  }
</style>
