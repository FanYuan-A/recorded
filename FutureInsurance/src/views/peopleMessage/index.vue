<template>
  <div class="peopleMessage wrapper">
    <Header></Header>
    <div class="main">
      <!--车主-->
      <div class="title">
        车主信息
        <div class="ocr">
          <img src="../../assets/img/ocr.png" alt="">
          <input type="file" class="ocrfile" @change="uploadImg($event)" ref="ocrfile"
                 v-if="VehicleOwner.PersonType=='1'">
        </div>
      </div>
      <mt-cell title="车主类型">
        <div style="float: right;">
          <label class="mint-radiolist-label" style="display: inline-block;">
          <span class="mint-radio is-left">
          <input type="radio" class="mint-radio-input" v-model="VehicleOwner.PersonType" value="1"
                 @click="restVehicleOwner('VehicleOwner')">
          <span class="mint-radio-core"></span>
          </span>
            <span class="mint-radio-label">个人</span>
          </label>
          <label class="mint-radiolist-label" style="display: inline-block;">
          <span class="mint-radio is-left">
          <input type="radio" class="mint-radio-input" v-model="VehicleOwner.PersonType" value="0"
                 @click="restVehicleOwner('VehicleOwner')">
          <span class="mint-radio-core"></span>
          </span>
            <span class="mint-radio-label">团体</span>
          </label>
        </div>
      </mt-cell>
      <div v-if="VehicleOwner.PersonType=='1'">
        <mt-cell title="车主姓名" :class="VehicleOwner.PersonnelName?'':'red'">
          <input type="text" placeholder="请输入车主姓名" maxlength="20" v-model="VehicleOwner.PersonnelName">
        </mt-cell>
        <mt-cell title="身份证" class="flex7" :class="VehicleOwner.CertificateNo?'':'red'">
          <input type="text" placeholder="请输入身份证号" maxlength="18" v-model="VehicleOwner.CertificateNo">
        </mt-cell>
        <mt-cell title="联系电话" :class="VehicleOwner.MobileTelephone?'':'red'">
          <input type="text" placeholder="请输入联系电话" maxlength="11" v-model="VehicleOwner.MobileTelephone">
        </mt-cell>
        <mt-cell title="地址" class="flex8" :class="VehicleOwner.Address?'':'red'">
          <input type="text" placeholder="请输入地址" v-model="VehicleOwner.Address">
        </mt-cell>
        <mt-cell title="邮箱" class="flex8" :class="VehicleOwner.Email?'':'red'">
          <input type="text" placeholder="请输入邮箱" v-model="VehicleOwner.Email">
        </mt-cell>
      </div>
      <div v-if="VehicleOwner.PersonType=='0'">
        <mt-cell title="机构名称" class="flex5" :class="VehicleOwner.GroupName?'':'red'">
          <input type="text" placeholder="请输入机构名称" maxlength="20" v-model="VehicleOwner.GroupName">
        </mt-cell>
        <mt-cell title="组织机构证件类型" :class="VehicleOwner.CertificateType?'':'red'">
          <select class="moneyIpt dib needsclick" v-model="VehicleOwner.CertificateType">
            <option value="">请选择组织机构证件类型</option>
            <option value="1">企业法人营业执照</option>
            <option value="2">中华人民共和国组织机构代码</option>
            <option value="3">税务登记证</option>
            <option value="4">社保保险登记证</option>
            <option value="5">办学许可证</option>
            <option value="9">其他</option>
          </select>
        </mt-cell>
        <mt-cell title="组织机构证件号" class="flex2_5" :class="VehicleOwner.CertificateNo?'':'red'">
          <input type="text" placeholder="请输入组织机构证件号" maxlength="25" v-model="VehicleOwner.CertificateNo">
        </mt-cell>
        <mt-cell title="机构地址" class="flex5" :class="VehicleOwner.Address?'':'red'">
          <input type="text" placeholder="请输入机构地址" v-model="VehicleOwner.Address">
        </mt-cell>
        <mt-cell title="邮编" class="flex5" :class="VehicleOwner.Postcode?'':'red'">
          <input type="text" placeholder="请输入邮编" v-model="VehicleOwner.Postcode">
        </mt-cell>
        <mt-cell title="机构联系人" :class="VehicleOwner.LinkManName?'':'red'">
          <input type="text" placeholder="请输入机构联系人" v-model="VehicleOwner.LinkManName" maxlength="20">
        </mt-cell>
        <mt-cell title="联系人性别" :class="VehicleOwner.LinkManSexCode?'':'red'">
          <select class="moneyIpt dib needsclick" v-model="VehicleOwner.LinkManSexCode">
            <option value="">请选择联系人性别</option>
            <option value="M">男</option>
            <option value="F">女</option>
          </select>
        </mt-cell>
        <mt-cell title="联系人手机号" :class="VehicleOwner.LinkManMobileTelephone?'':'red'">
          <input type="text" placeholder="请输入联系人手机号" v-model="VehicleOwner.LinkManMobileTelephone"
                 maxlength="11">
        </mt-cell>
        <mt-cell title="纳税人类型" :class="VehicleOwner.CertType?'':'red'">
          <select class="moneyIpt dib needsclick" placeholder="请选择纳税人类型" v-model="VehicleOwner.CertType">
            <option value="">请选择纳税人类型</option>
            <option value="0">境内个人</option>
            <option value="1">小规模纳税人</option>
            <option value="2">增值税一般纳税人</option>
          </select>
        </mt-cell>
        <!--<mt-cell title="工商注册号">-->
        <!--<input type="text" placeholder="请输入工商注册号" v-model="VehicleOwner.BusinessRegisterId">-->
        <!--</mt-cell>-->
      </div>

      <!--被保人-->
      <div class="title">
        <mt-switch v-model="peopleVal.policy" @change="restVehicleOwner('Insured')">被保人同车主</mt-switch>
      </div>
      <div v-if="!peopleVal.policy">
        <mt-cell title="被保人类型">
          <div style="float: right;">
            <label class="mint-radiolist-label" style="display: inline-block;">
          <span class="mint-radio is-left">
          <input type="radio" class="mint-radio-input" v-model="Insured.PersonType" value="1"
                 @click="restVehicleOwner('Insured')">
          <span class="mint-radio-core"></span>
          </span>
              <span class="mint-radio-label">个人</span>
            </label>
            <label class="mint-radiolist-label" style="display: inline-block;">
          <span class="mint-radio is-left">
          <input type="radio" class="mint-radio-input" v-model="Insured.PersonType" value="0"
                 @click="restVehicleOwner('Insured')">
          <span class="mint-radio-core"></span>
          </span>
              <span class="mint-radio-label">团体</span>
            </label>
          </div>
        </mt-cell>
        <div v-if="Insured.PersonType=='1'">
          <mt-cell title="被保人姓名" :class="Insured.PersonnelName?'':'red'">
            <input type="text" placeholder="请输入被保人姓名" maxlength="16" v-model="Insured.PersonnelName">
          </mt-cell>
          <mt-cell title="身份证" class="flex7" :class="Insured.CertificateNo?'':'red'">
            <input type="text" placeholder="请输入身份证号" maxlength="20" v-model="Insured.CertificateNo">
          </mt-cell>
          <mt-cell title="联系电话" :class="Insured.MobileTelephone?'':'red'">
            <input type="text" placeholder="请输入联系电话" maxlength="11" v-model="Insured.MobileTelephone">
          </mt-cell>
          <mt-cell title="地址" class="flex8" :class="Insured.Address?'':'red'">
            <input type="text" placeholder="请输入地址" v-model="Insured.Address">
          </mt-cell>
          <mt-cell title="邮箱" class="flex8" :class="Insured.Email?'':'red'">
            <input type="text" placeholder="请输入邮箱" v-model="Insured.Email">
          </mt-cell>
        </div>
        <div v-if="Insured.PersonType=='0'">
          <mt-cell title="机构名称" class="flex5" :class="Insured.Email?'':'red'">
            <input type="text" placeholder="请输入机构名称" maxlength="20" v-model="Insured.GroupName">
          </mt-cell>
          <mt-cell title="组织机构证件类型" :class="Insured.CertificateType?'':'red'">
            <select class="moneyIpt dib needsclick" placeholder="请选择组织机构证件类型"
                    v-model="Insured.CertificateType">
              <option value="">请选择组织机构证件类型</option>
              <option value="1">企业法人营业执照</option>
              <option value="2">中华人民共和国组织机构代码</option>
              <option value="3">税务登记证</option>
              <option value="4">社保保险登记证</option>
              <option value="5">办学许可证</option>
              <option value="9">其他</option>
            </select>
          </mt-cell>
          <mt-cell title="组织机构证件号" class="flex2_5" :class="Insured.CertificateNo?'':'red'">
            <input type="text" placeholder="请输入组织机构证件号" maxlength="18" v-model="Insured.CertificateNo">
          </mt-cell>
          <mt-cell title="机构地址" class="flex5" :class="Insured.Address?'':'red'">
            <input type="text" placeholder="请输入机构地址" v-model="Insured.Address">
          </mt-cell>
          <mt-cell title="邮编" class="flex5" :class="Insured.Postcode?'':'red'">
            <input type="text" placeholder="请输入邮编" v-model="Insured.Postcode">
          </mt-cell>
          <mt-cell title="机构联系人" :class="Insured.LinkManName?'':'red'">
            <input type="text" placeholder="请输入机构联系人" v-model="Insured.LinkManName" maxlength="20">
          </mt-cell>
          <mt-cell title="联系人性别" :class="Insured.LinkManSexCode?'':'red'">
            <select class="moneyIpt dib needsclick" v-model="Insured.LinkManSexCode">
              <option value="">请选择联系人性别</option>
              <option value="M">男</option>
              <option value="F">女</option>
            </select>
          </mt-cell>
          <mt-cell title="联系人手机号" :class="Insured.LinkManMobileTelephone?'':'red'">
            <input type="text" placeholder="请输入联系人手机号" v-model="Insured.LinkManMobileTelephone"
                   maxlength="11">
          </mt-cell>
          <mt-cell title="纳税人类型" :class="Insured.CertType?'':'red'">
            <select class="moneyIpt dib needsclick" placeholder="请选择纳税人类型" v-model="Insured.CertType">
              <option value="">请选择纳税人类型</option>
              <option value="0">境内个人</option>
              <option value="1">小规模纳税人</option>
              <option value="2">增值税一般纳税人</option>
            </select>
          </mt-cell>
          <!--<mt-cell title="工商注册号">-->
          <!--<input type="text" placeholder="请输入工商注册号" v-model="Insured.BusinessRegisterId">-->
          <!--</mt-cell>-->
        </div>
      </div>

      <!--投保人-->
      <div class="title">
        <mt-switch v-model="peopleVal.Insured" @change="applicantWith('0')">投保人同被保人</mt-switch>
        <mt-switch v-model="peopleVal.Insured1" @change="applicantWith('1')">投保人同车主</mt-switch>
      </div>
      <div v-if="!peopleVal.Insured&&!peopleVal.Insured1">
        <mt-cell title="投保人类型">
          <div style="float: right;">
            <label class="mint-radiolist-label" style="display: inline-block;">
          <span class="mint-radio is-left">
          <input type="radio" class="mint-radio-input" v-model="Applicant.PersonType" value="1"
                 @click="restVehicleOwner('Applicant')">
          <span class="mint-radio-core"></span>
          </span>
              <span class="mint-radio-label">个人</span>
            </label>
            <label class="mint-radiolist-label" style="display: inline-block;">
          <span class="mint-radio is-left">
          <input type="radio" class="mint-radio-input" v-model="Applicant.PersonType" value="0"
                 @click="restVehicleOwner('Applicant')">
          <span class="mint-radio-core"></span>
          </span>
              <span class="mint-radio-label">团体</span>
            </label>
          </div>
        </mt-cell>
        <div v-if="Applicant.PersonType=='1'">
          <mt-cell title="投保人姓名" :class="Applicant.PersonnelName?'':'red'">
            <input type="text" placeholder="请输入投保人姓名" maxlength="16" v-model="Applicant.PersonnelName">
          </mt-cell>
          <mt-cell title="身份证" class="flex7" :class="Applicant.CertificateNo?'':'red'">
            <input type="text" placeholder="请输入身份证号" maxlength="20" v-model="Applicant.CertificateNo">
          </mt-cell>
          <mt-cell title="联系电话" :class="Applicant.MobileTelephone?'':'red'">
            <input type="text" placeholder="请输入联系电话" maxlength="11" v-model="Applicant.MobileTelephone">
          </mt-cell>
          <mt-cell title="地址" class="flex8" :class="Applicant.Address?'':'red'">
            <input type="text" placeholder="请输入地址" v-model="Applicant.Address">
          </mt-cell>
          <mt-cell title="邮箱" class="flex8" :class="Applicant.Email?'':'red'">
            <input type="text" placeholder="请输入邮箱" v-model="Applicant.Email">
          </mt-cell>
        </div>
        <div v-if="Applicant.PersonType=='0'">
          <mt-cell title="机构名称" class="flex5" :class="Applicant.GroupName?'':'red'">
            <input type="text" placeholder="请输入机构名称" maxlength="20" v-model="Applicant.GroupName">
          </mt-cell>
          <mt-cell title="组织机构证件类型" :class="Applicant.CertificateType?'':'red'">
            <select class="moneyIpt dib needsclick" placeholder="请选择组织机构证件类型"
                    v-model="Applicant.CertificateType">
              <option value="">请选择组织机构证件类型</option>
              <option value="1">企业法人营业执照</option>
              <option value="2">中华人民共和国组织机构代码</option>
              <option value="3">税务登记证</option>
              <option value="4">社保保险登记证</option>
              <option value="5">办学许可证</option>
              <option value="9">其他</option>
            </select>
          </mt-cell>
          <mt-cell title="组织机构证件号" class="flex2_5" :class="Applicant.CertificateNo?'':'red'">
            <input type="text" placeholder="请输入组织机构证件号" maxlength="18" v-model="Applicant.CertificateNo">
          </mt-cell>
          <mt-cell title="机构地址" class="flex5" :class="Applicant.Address?'':'red'">
            <input type="text" placeholder="请输入机构地址" v-model="Applicant.Address">
          </mt-cell>
          <mt-cell title="邮编" class="flex5" :class="Applicant.Postcode?'':'red'">
            <input type="text" placeholder="请输入邮编" v-model="Applicant.Postcode">
          </mt-cell>
          <mt-cell title="机构联系人" :class="Applicant.LinkManName?'':'red'">
            <input type="text" placeholder="请输入机构联系人" v-model="Applicant.LinkManName" maxlength="20">
          </mt-cell>
          <mt-cell title="联系人性别" :class="Applicant.LinkManSexCode?'':'red'">
            <select class="moneyIpt dib needsclick" v-model="Applicant.LinkManSexCode">
              <option value="">请选择联系人性别</option>
              <option value="M">男</option>
              <option value="F">女</option>
            </select>
          </mt-cell>
          <mt-cell title="联系人手机号" :class="Applicant.LinkManMobileTelephone?'':'red'">
            <input type="text" placeholder="请输入联系人手机号" v-model="Applicant.LinkManMobileTelephone"
                   maxlength="11">
          </mt-cell>
          <mt-cell title="纳税人类型" :class="Applicant.CertType?'':'red'">
            <select class="moneyIpt dib needsclick" placeholder="请选择纳税人类型" v-model="Applicant.CertType">
              <option value="">请选择纳税人类型</option>
              <option value="0">境内个人</option>
              <option value="1">小规模纳税人</option>
              <option value="2">增值税一般纳税人</option>
            </select>
          </mt-cell>
          <!--<mt-cell title="工商注册号">-->
          <!--<input type="text" placeholder="请输入工商注册号" v-model="Applicant.BusinessRegisterId">-->
          <!--</mt-cell>-->
        </div>
      </div>
    </div>
    <div class="btn-box">
      <mt-button type="primary" size="small" class="btn"
                 @click="$router.push({path:'/carMessage',query:{orderNo:orderNo}})">
        上一步
      </mt-button>
      <mt-button type="primary" size="small" class="btn" @click="submit">下一步</mt-button>
    </div>
  </div>
</template>

<script>
  import Header from '../../components/Header';
  import canvasResize from 'canvas-resize';

  export default {
    name: 'peopleMessage',
    data() {
      return {
        orderNo: '',
        peopleVal: {
          // peopleOrGroup: '1',
          // peopleOrGroup1: '1',
          // peopleOrGroup2: '1',
          policy: true,  // 被保人等同于车主
          Insured: true, // 投保人等同于被保人
          Insured1: false, // 投保人等同于车主
        },
        // 车主
        VehicleOwner: {
          PersonType: '1',
          // GroupName: '', // 名字
          // CertificateType: '', // 组织客户证件类型
          // CertificateNo: '', // 组织客户证件号
          // Address: '', // 地址
          // LinkManName: '', // 机构联系人
          // LinkManMobileTelephone: '', // 联系人手机号
          // CertType: '', // 纳税人类型
          // BusinessRegisterId: '', // 工商注册号
          //
          // 个人
          PersonnelName: '', // 名字
          CertificateNo: '', // 证件号
          Address: '', // 地址
          Email: '', // 邮箱
        },
        // 被保人
        Insured: {
          PersonType: '1',
          // GroupName: '', // 名字
          // CertificateType: '', // 组织客户证件类型
          // CertificateNo: '', // 组织客户证件号
          // Address: '', // 地址
          // LinkManName: '', // 机构联系人
          // LinkManMobileTelephone: '', // 联系人手机号
          // CertType: '', // 纳税人类型
          // BusinessRegisterId: '', // 工商注册号
          //
          // // 个人
          // PersonnelName: '',
          // MobileTelephone: '',
        },
        // 投保人
        Applicant: {
          PersonType: '1',
          // GroupName: '', // 名字
          // CertificateType: '', // 组织客户证件类型
          // CertificateNo: '', // 组织客户证件号
          // Address: '', // 地址
          // LinkManName: '', // 机构联系人
          // LinkManMobileTelephone: '', // 联系人手机号
          // CertType: '', // 纳税人类型
          // BusinessRegisterId: '', // 工商注册号
          // // 个人
          // PersonnelName: '',
          // MobileTelephone: '',
        },
      };
    },
    components: {
      Header
    },
    watch: {
      carTypeShow: {
        handler(val) {
          if (val) {
            document.getElementsByTagName('body')[0].addEventListener('touchmove', (e) => {
              e.preventDefault();
            }, {passive: false});//阻止默认事件
          } else {
            document.getElementsByTagName('body')[0].addEventListener('touchmove', (e) => {
              e.returnValue = true;
            }, {passive: false});//打开默认事件
          }
        },
      },
      'VehicleOwner.CertificateNo'(val) {
        if (val) {
          this.VehicleOwner.CertificateNo = val.toUpperCase();
        }
      },
      'Insured.CertificateNo'(val) {
        if (val) {
          this.Insured.CertificateNo = val.toUpperCase();
        }
      },
      'Applicant.CertificateNo'(val) {
        if (val) {
          this.Applicant.CertificateNo = val.toUpperCase();
        }
      },
    },
    mounted() {
      this.orderNo = this.$route.query.orderNo;
      this.getPeopleInfo('1', null);
    },
    methods: {
      // 查询和保存人员信息
      getPeopleInfo(type, callback) {
        this.$post(this.$url.car.basicInformation, {
          type: type,
          orderNo: this.orderNo,
          basicInformation: {
            VehicleOwner: this.VehicleOwner,
            Insured: this.Insured,
            Applicant: this.Applicant,
          },
          peopleVal: this.peopleVal
        }).then((res) => {
          // console.log(res);
          if (res.code != 200) {
            this.Toast({
              message: res.message,
              position: 'bottom'
            });
          } else {
            if (res.response.basicInformation) {
              let basicInformation = JSON.parse(res.response.basicInformation);
              console.log(basicInformation);
              let VehicleOwner = basicInformation.VehicleOwner;
              let Insured = basicInformation.Insured;
              let Applicant = basicInformation.Applicant;
              if (VehicleOwner.PersonType == '1') {
                // 个人
                this.VehicleOwner.PersonType = VehicleOwner.PersonType;
                this.VehicleOwner.PersonnelName = VehicleOwner.PersonnelName;
                this.VehicleOwner.CertificateNo = VehicleOwner.CertificateNo;
                this.VehicleOwner.Address = VehicleOwner.Address;
                this.VehicleOwner.MobileTelephone = VehicleOwner.MobileTelephone;
                this.VehicleOwner.Email = VehicleOwner.Email;
              } else {
                // 团体
                this.VehicleOwner.PersonType = VehicleOwner.PersonType;
                this.VehicleOwner.GroupName = VehicleOwner.GroupName;
                this.VehicleOwner.CertificateType = VehicleOwner.CertificateType;
                this.VehicleOwner.Address = VehicleOwner.Address;
                this.VehicleOwner.LinkManName = VehicleOwner.LinkManName;
                this.VehicleOwner.LinkManMobileTelephone = VehicleOwner.LinkManMobileTelephone;
                this.VehicleOwner.CertType = VehicleOwner.CertType;
                // this.VehicleOwner.BusinessRegisterId = VehicleOwner.BusinessRegisterId;
                this.VehicleOwner.LinkManSexCode = VehicleOwner.LinkManSexCode;
                this.VehicleOwner.Postcode = VehicleOwner.Postcode;
              }
              if (Insured.PersonType == '1') {
                // 个人
                this.Insured.PersonType = Insured.PersonType;
                this.Insured.PersonnelName = Insured.PersonnelName;
                this.Insured.CertificateNo = Insured.CertificateNo;
                this.Insured.Address = Insured.Address;
                this.Insured.MobileTelephone = Insured.MobileTelephone;
                this.Insured.Email = Insured.Email;
              } else {
                // 团体
                this.Insured.PersonType = Insured.PersonType;
                this.Insured.GroupName = Insured.GroupName;
                this.Insured.CertificateType = Insured.CertificateType;
                this.Insured.Address = Insured.Address;
                this.Insured.LinkManName = Insured.LinkManName;
                this.Insured.LinkManMobileTelephone = Insured.LinkManMobileTelephone;
                this.Insured.CertType = Insured.CertType;
                // this.Insured.BusinessRegisterId = Insured.BusinessRegisterId;
                this.Insured.LinkManSexCode = Insured.LinkManSexCode;
                this.Insured.Postcode = Insured.Postcode;
              }
              if (Applicant.PersonType == '1') {
                // 个人
                this.Applicant.PersonType = Applicant.PersonType;
                this.Applicant.PersonnelName = Applicant.PersonnelName;
                this.Applicant.CertificateNo = Applicant.CertificateNo;
                this.Applicant.Address = Applicant.Address;
                this.Applicant.MobileTelephone = Applicant.MobileTelephone;
                this.Applicant.Email = Applicant.Email;
              } else {
                // 团体
                this.Applicant.PersonType = Applicant.PersonType;
                this.Applicant.GroupName = Applicant.GroupName;
                this.Applicant.CertificateType = Applicant.CertificateType;
                this.Applicant.Address = Applicant.Address;
                this.Applicant.LinkManName = Applicant.LinkManName;
                this.Applicant.LinkManMobileTelephone = Applicant.LinkManMobileTelephone;
                this.Applicant.CertType = Applicant.CertType;
                // this.Applicant.BusinessRegisterId = Applicant.BusinessRegisterId;
                this.Applicant.LinkManSexCode = Applicant.LinkManSexCode;
                this.Applicant.Postcode = Applicant.Postcode;
              }
              let peopleVal = basicInformation.peopleVal;
              this.peopleVal.policy = peopleVal.policy;
              this.peopleVal.Insured = peopleVal.Insured;
              this.peopleVal.Insured1 = peopleVal.Insured1;
            }
            if (callback) {
              callback();
            }
          }
        });
      },
      // OCR识别
      uploadImg(ipt) {
        canvasResize(ipt.target.files[0], {
          crop: false,
          quality: 0.3,
          rotate: 0,
          callback: (baseStr) => {
            this.$refs.ocrfile.setAttribute('type', 'text');
            this.$refs.ocrfile.setAttribute('type', 'file');
            let baseUri = baseStr.substring(baseStr.indexOf('base64,') + 7);
            this.$post(this.$url.checkInsurance.uploadPicture, {
              img: baseUri,
              type: 1
            }).then((res) => {
              console.log(res);
              if (res.code != 200) {
                this.Toast({
                  message: res.message,
                  position: 'bottom'
                });
              } else {
                if (res.response) {
                  this.sendOCR(res.response.attachmentName);
                }
              }
            });
          }
        });
      },
      sendOCR(name) {
        this.$post(this.$url.car.ocr, {
          imgName: name,
          type: 1
        }).then((res) => {
          console.log(res);
          if (res.code != 200) {
            this.Toast({
              message: res.message,
              position: 'bottom'
            });
          } else {
            if (res.response) {
              this.VehicleOwner.PersonnelName = res.response.name;
              this.VehicleOwner.CertificateNo = res.response.cardNo;
              this.VehicleOwner.Address = res.response.addrss;
            }
          }
        });
      },
      applicantWith(type) {
        if (this.peopleVal.Insured && type == '0') {
          this.peopleVal.Insured1 = false;
        }
        if (this.peopleVal.Insured1 && type == '1') {
          this.peopleVal.Insured = false;
        }
      },
      // 重置车主
      restVehicleOwner(mark) {
        switch (mark) {
            // 车主
          case 'VehicleOwner':
            this.VehicleOwner = {
              PersonType: this.VehicleOwner.PersonType,
              PersonnelName: '', // 名字
              CertificateNo: '', // 证件号
              Address: '', // 地址
              Email: '', // 邮箱
            };
            break;
            // 被保人
          case 'Insured':
            this.Insured = {
              PersonType: this.Insured.PersonType,
            };
            break;
            // 投保人
          case 'Applicant':
            this.Applicant = {
              PersonType: this.Applicant.PersonType,
            };
            break;
        }
      },
      // 校验
      checkVal(callback) {
        let obj = this;
        let flag = false;
        // 校验车主
        if (obj.VehicleOwner.PersonType == '1') {
          if (!obj.VehicleOwner.PersonnelName) {
            this.Toast({message: '请输入车主姓名', position: 'bottom'});
            return;
          } else if (!(/^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/).test(obj.VehicleOwner.PersonnelName)) {
            this.Toast({message: '车主姓名最少为两位汉字', position: 'bottom'});
            return;
          } else if (!obj.VehicleOwner.CertificateNo) {
            this.Toast({message: '请输入车主身份证', position: 'bottom'});
            return;
          } else if (!(/^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/).test(obj.VehicleOwner.CertificateNo)) {
            this.Toast({
              message: '请输入车主合法身份证号',
              position: 'bottom'
            });
            return;
          } else if (!obj.VehicleOwner.MobileTelephone) {
            this.Toast({message: '请输入车主联系方式', position: 'bottom'});
            return;
          } else if (!(/^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/).test(obj.VehicleOwner.MobileTelephone)) {
            this.Toast({
              message: '请输入车主合法手机号码',
              position: 'bottom'
            });
            return;
          } else if (!obj.VehicleOwner.Address) {
            this.Toast({message: '请输入车主地址', position: 'bottom'});
            return;
          } else if (!obj.VehicleOwner.Email) {
            this.Toast({message: '请输入车主邮箱', position: 'bottom'});
            return;
          } else if (!(/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/).test(obj.VehicleOwner.Email)) {
            this.Toast({message: '请输入车主合法邮箱', position: 'bottom'});
            return;
          }
          flag = true;
        } else if (obj.VehicleOwner.PersonType == '0') {
          if (!obj.VehicleOwner.GroupName) {
            this.Toast({message: '请输入车主姓名', position: 'bottom'});
            return;
          } else if (!(/^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/).test(obj.VehicleOwner.GroupName)) {
            this.Toast({message: '车主姓名最少为两位汉字', position: 'bottom'});
            return;
          } else if (!obj.VehicleOwner.CertificateType) {
            this.Toast({message: '请选择车主证件类型', position: 'bottom'});
            return;
          } else if (!obj.VehicleOwner.CertificateNo) {
            this.Toast({message: '请输入车主证件号', position: 'bottom'});
            return;
          } else if (!obj.VehicleOwner.Address) {
            this.Toast({message: '请输入车主地址', position: 'bottom'});
            return;
          } else if (!obj.VehicleOwner.Postcode) {
            this.Toast({message: '请输入邮编', position: 'bottom'});
            return;
          } else if (!obj.VehicleOwner.LinkManName) {
            this.Toast({message: '请输入联系人姓名', position: 'bottom'});
            return;
          } else if (!obj.VehicleOwner.LinkManSexCode) {
            this.Toast({message: '请选择联系人性别', position: 'bottom'});
            return;
          } else if (!obj.VehicleOwner.LinkManMobileTelephone) {
            this.Toast({message: '请输入联系人手机号', position: 'bottom'});
            return;
          } else if (!(/^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/).test(obj.VehicleOwner.LinkManMobileTelephone)) {
            this.Toast({message: '请输入合法手机号码', position: 'bottom'});
            return;
          } else if (!obj.VehicleOwner.CertType) {
            this.Toast({message: '请选择纳税人类型', position: 'bottom'});
            return;
          }
          // else if (!obj.VehicleOwner.BusinessRegisterId) {
          //   this.Toast({message: "请输入工商注册号", position: "bottom"});
          //   return;
          // }
          flag = true;
        }

        // 校验被保人
        if (!obj.peopleVal.policy) {
          if (obj.Insured.PersonType == '1') {
            if (!obj.Insured.PersonnelName) {
              this.Toast({message: '请输入被保人姓名', position: 'bottom'});
              return;
            } else if (!(/^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/).test(obj.Insured.PersonnelName)) {
              this.Toast({message: '被保人姓名最少为两位汉字', position: 'bottom'});
              return;
            } else if (!obj.Insured.CertificateNo) {
              this.Toast({message: '请输入被保人身份证', position: 'bottom'});
              return;
            } else if (!(/^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/).test(obj.Insured.CertificateNo)) {
              this.Toast({
                message: '请输入被保人合法身份证号',
                position: 'bottom'
              });
              return;
            } else if (!obj.Insured.MobileTelephone) {
              this.Toast({message: '请输入被保人联系方式', position: 'bottom'});
              return;
            } else if (!(/^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/).test(obj.Insured.MobileTelephone)) {
              this.Toast({
                message: '请输入被保人合法手机号码',
                position: 'bottom'
              });
              return;
            } else if (!obj.Insured.Address) {
              this.Toast({message: '请输入被保人地址', position: 'bottom'});
              return;
            } else if (!obj.Insured.Email) {
              this.Toast({message: '请输入被保人邮箱', position: 'bottom'});
              return;
            } else if (!(/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/).test(obj.Insured.Email)) {
              this.Toast({message: '请输入被保人合法邮箱', position: 'bottom'});
              return;
            }
            flag = true;
          } else if (obj.Insured.PersonType == '0') {
            if (!obj.Insured.GroupName) {
              this.Toast({message: '请输入被保人姓名', position: 'bottom'});
              return;
            } else if (!(/^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/).test(obj.Insured.GroupName)) {
              this.Toast({message: '被保人姓名最少为两位汉字', position: 'bottom'});
              return;
            } else if (!obj.Insured.CertificateType) {
              this.Toast({message: '请选择被保人证件类型', position: 'bottom'});
              return;
            } else if (!obj.Insured.CertificateNo) {
              this.Toast({message: '请输入被保人证件号', position: 'bottom'});
              return;
            } else if (!obj.Insured.Address) {
              this.Toast({message: '请输入被保人地址', position: 'bottom'});
              return;
            } else if (!obj.Insured.Postcode) {
              this.Toast({message: '请输入邮编', position: 'bottom'});
              return;
            } else if (!obj.Insured.LinkManName) {
              this.Toast({message: '请输入联系人姓名', position: 'bottom'});
              return;
            } else if (!obj.Insured.LinkManSexCode) {
              this.Toast({message: '请选择联系人性别', position: 'bottom'});
              return;
            } else if (!obj.Insured.LinkManMobileTelephone) {
              this.Toast({message: '请输入联系人手机号', position: 'bottom'});
              return;
            } else if (!(/^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/).test(obj.Insured.LinkManMobileTelephone)) {
              this.Toast({message: '请输入合法手机号码', position: 'bottom'});
              return;
            } else if (!obj.Insured.CertType) {
              this.Toast({message: '请选择纳税人类型', position: 'bottom'});
              return;
            }
            // else if (!obj.Insured.BusinessRegisterId) {
            //   this.Toast({message: "请输入工商注册号", position: "bottom"});
            //   return;
            // }
            flag = true;
          }
        } else {
          flag = true;
        }

        // 校验投保人
        if (!obj.peopleVal.Insured && !obj.peopleVal.Insured1) {
          if (obj.Applicant.PersonType == '1') {
            if (!obj.Applicant.PersonnelName) {
              this.Toast({message: '请输入投保人姓名', position: 'bottom'});
              return;
            } else if (!(/^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/).test(obj.Applicant.PersonnelName)) {
              this.Toast({message: '投保人姓名最少为两位汉字', position: 'bottom'});
              return;
            } else if (!obj.Applicant.CertificateNo) {
              this.Toast({message: '请输入投保人身份证', position: 'bottom'});
              return;
            } else if (!(/^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/).test(obj.Applicant.CertificateNo)) {
              this.Toast({
                message: '请输入投保人合法身份证号',
                position: 'bottom'
              });
              return;
            } else if (!obj.Applicant.MobileTelephone) {
              this.Toast({message: '请输入投保人联系方式', position: 'bottom'});
              return;
            } else if (!(/^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/).test(obj.Applicant.MobileTelephone)) {
              this.Toast({
                message: '请输入投保人合法手机号码',
                position: 'bottom'
              });
              return;
            } else if (!obj.Applicant.Address) {
              this.Toast({message: '请输入投保人地址', position: 'bottom'});
              return;
            } else if (!obj.Applicant.Email) {
              this.Toast({message: '请输入投保人邮箱', position: 'bottom'});
              return;
            } else if (!(/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/).test(obj.Applicant.Email)) {
              this.Toast({message: '请输入投保人合法邮箱', position: 'bottom'});
              return;
            }
            flag = true;
          } else if (obj.Applicant.PersonType == '0') {
            if (!obj.Applicant.GroupName) {
              this.Toast({message: '请输入投保人姓名', position: 'bottom'});
              return;
            } else if (!(/^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/).test(obj.Applicant.GroupName)) {
              this.Toast({message: '投保人姓名最少为两位汉字', position: 'bottom'});
              return;
            } else if (!obj.Applicant.CertificateType) {
              this.Toast({message: '请选择投保人证件类型', position: 'bottom'});
              return;
            } else if (!obj.Applicant.CertificateNo) {
              this.Toast({message: '请输入投保人证件号', position: 'bottom'});
              return;
            } else if (!obj.Applicant.Address) {
              this.Toast({message: '请输入投保人地址', position: 'bottom'});
              return;
            } else if (!obj.Applicant.Postcode) {
              this.Toast({message: '请输入邮编', position: 'bottom'});
              return;
            } else if (!obj.Applicant.LinkManName) {
              this.Toast({message: '请输入联系人姓名', position: 'bottom'});
              return;
            } else if (!obj.Applicant.LinkManSexCode) {
              this.Toast({message: '请选择联系人性别', position: 'bottom'});
              return;
            } else if (!obj.Applicant.LinkManMobileTelephone) {
              this.Toast({message: '请输入联系人手机号', position: 'bottom'});
              return;
            } else if (!(/^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/).test(obj.Applicant.LinkManMobileTelephone)) {
              this.Toast({message: '请输入合法手机号码', position: 'bottom'});
              return;
            } else if (!obj.Applicant.CertType) {
              this.Toast({message: '请选择纳税人类型', position: 'bottom'});
              return;
            }
            // else if (!obj.Applicant.BusinessRegisterId) {
            //   this.Toast({message: "请输入工商注册号", position: "bottom"});
            //   return;
            // }
            flag = true;
          }
        } else {
          flag = true;
        }
        if (flag) {
          callback();
        }
      },
      submit() {
        // 被保人等同于车主
        if (this.peopleVal.policy) {
          // 判断车主类型,赋值
          if (this.VehicleOwner.PersonType == '0') {
            // 团队
            this.Insured.PersonType = this.VehicleOwner.PersonType;
            this.Insured.GroupName = this.VehicleOwner.GroupName;
            this.Insured.LinkManSexCode = this.VehicleOwner.LinkManSexCode;
            this.Insured.Postcode = this.VehicleOwner.Postcode;
            this.Insured.CertificateType = this.VehicleOwner.CertificateType;
            this.Insured.CertificateNo = this.VehicleOwner.CertificateNo;
            this.Insured.Address = this.VehicleOwner.Address;
            this.Insured.LinkManName = this.VehicleOwner.LinkManName;
            this.Insured.LinkManMobileTelephone = this.VehicleOwner.LinkManMobileTelephone;
            this.Insured.CertType = this.VehicleOwner.CertType;
            // this.Insured.BusinessRegisterId = this.VehicleOwner.BusinessRegisterId;
          } else {
            // 个人
            this.Insured.PersonType = this.VehicleOwner.PersonType;
            this.Insured.PersonnelName = this.VehicleOwner.PersonnelName;
            this.Insured.CertificateNo = this.VehicleOwner.CertificateNo;
            this.Insured.MobileTelephone = this.VehicleOwner.MobileTelephone;
            this.Insured.Address = this.VehicleOwner.Address;
            this.Insured.Email = this.VehicleOwner.Email;
          }
        }

        // 投保人等同于被保人
        if (this.peopleVal.Insured) {
          if (this.Insured.PersonType == '0') {
            // 团队
            this.Applicant.PersonType = this.Insured.PersonType;
            this.Applicant.GroupName = this.Insured.GroupName;
            this.Applicant.LinkManSexCode = this.Insured.LinkManSexCode;
            this.Applicant.Postcode = this.Insured.Postcode;
            this.Applicant.CertificateType = this.Insured.CertificateType;
            this.Applicant.CertificateNo = this.Insured.CertificateNo;
            this.Applicant.Address = this.Insured.Address;
            this.Applicant.LinkManName = this.Insured.LinkManName;
            this.Applicant.LinkManMobileTelephone = this.Insured.LinkManMobileTelephone;
            this.Applicant.CertType = this.Insured.CertType;
            // this.Applicant.BusinessRegisterId = this.Insured.BusinessRegisterId;
          } else {
            // 个人
            this.Applicant.PersonType = this.Insured.PersonType;
            this.Applicant.PersonnelName = this.Insured.PersonnelName;
            this.Applicant.CertificateNo = this.Insured.CertificateNo;
            this.Applicant.MobileTelephone = this.Insured.MobileTelephone;
            this.Applicant.Address = this.Insured.Address;
            this.Applicant.Email = this.Insured.Email;
          }
        }

        // 投保人等同于车主
        if (this.peopleVal.Insured1) {
          if (this.VehicleOwner.PersonType == '0') {
            // 团队
            this.Applicant.PersonType = this.VehicleOwner.PersonType;
            this.Applicant.GroupName = this.VehicleOwner.GroupName;
            this.Applicant.LinkManSexCode = this.VehicleOwner.LinkManSexCode;
            this.Applicant.Postcode = this.VehicleOwner.Postcode;
            this.Applicant.CertificateType = this.VehicleOwner.CertificateType;
            this.Applicant.CertificateNo = this.VehicleOwner.CertificateNo;
            this.Applicant.Address = this.VehicleOwner.Address;
            this.Applicant.LinkManName = this.VehicleOwner.LinkManName;
            this.Applicant.LinkManMobileTelephone = this.VehicleOwner.LinkManMobileTelephone;
            this.Applicant.CertType = this.VehicleOwner.CertType;
            // this.Applicant.BusinessRegisterId = this.VehicleOwner.BusinessRegisterId;
          } else {
            // 个人
            this.Applicant.PersonType = this.VehicleOwner.PersonType;
            this.Applicant.PersonnelName = this.VehicleOwner.PersonnelName;
            this.Applicant.CertificateNo = this.VehicleOwner.CertificateNo;
            this.Applicant.MobileTelephone = this.VehicleOwner.MobileTelephone;
            this.Applicant.Address = this.VehicleOwner.Address;
            this.Applicant.Email = this.VehicleOwner.Email;
          }
        }

        console.log(this.VehicleOwner);
        console.log(this.Insured);
        console.log(this.Applicant);
        // 校验
        this.checkVal(() => {
          this.getPeopleInfo('2', () => {
            this.$router.push({name: 'insuranceType', query: {orderNo: this.orderNo}});
          });
        });
      },
    }
  };
</script>

<style>
  .peopleMessage {
    color: #000;
    /*padding-bottom: .45rem;*/
  }

  .peopleMessage .title {
    font-size: .14rem;
    padding: .1rem .15rem;
    background: #F5F5F9;
  }

  .peopleMessage .title .mint-switch {
    display: inline-block;
    /*margin-right: .3rem;*/
  }

  .peopleMessage .title i {
    color: #999999;
    font-size: .12rem;
  }

  .peopleMessage input {
    text-align: right;
  }

  .peopleMessage .mint-radio-core {
    width: .2rem;
    height: .2rem;
    margin-left: .05rem;
  }

  .peopleMessage .mint-radio-core::after {
    top: .041rem;
    left: .044rem;
  }

  .peopleMessage .btn-box {
    width: 100%;
    display: block;
    text-align: center;
  }

  .peopleMessage .btn {
    width: 47%;
    display: inline-block;
  }

  .peopleMessage .btn:first-child {
    margin-right: .1rem;
  }

  .peopleMessage .mint-switch-label {
    vertical-align: middle;
    margin-left: 0;
    margin-right: .15rem;
  }

  .peopleMessage .mint-popup {
    width: 100%;
  }

  /*.peopleMessage .mint-cell-value {*/
  /*flex: 2;*/
  /*}*/
  .peopleMessage select {
    text-align: right;
    text-align-last: right;
    color: #888;
  }

  .peopleMessage input {
    width: 100%;
    text-align: right;
  }

  .peopleMessage .mint-switch-core {
    width: 38px;
    height: 17px;
    vertical-align: middle;
  }

  .peopleMessage .mint-switch-core::before {
    width: 36px;
    height: 15px;
  }

  .peopleMessage .mint-switch-core::after {
    width: 15px;
    height: 15px;
  }

  .flex2_5 .mint-cell-value {
    flex: 2.5;
  }

  .flex5 .mint-cell-value {
    flex: 5;
  }

  .flex6 .mint-cell-value {
    flex: 6;
  }

  .flex7 .mint-cell-value {
    flex: 7;
  }

  .flex8 .mint-cell-value {
    flex: 8;
  }

</style>
