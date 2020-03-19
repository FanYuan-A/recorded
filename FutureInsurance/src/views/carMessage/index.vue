<template>
  <div class="carMessage wrapper">
    <Header></Header>
    <div class="main">
      <div class="title">
        车辆信息
        <div class="ocr">
          <img src="../../assets/img/ocr.png" alt="">
          <input type="file" class="ocrfile" @change="uploadImg($event)" ref="ocrfile">
        </div>
      </div>
      <mt-cell title="车牌号" :class="Vehicle.VehicleLicenceCode?'':'red'">
        <input type="text" placeholder="车牌号" v-model="Vehicle.VehicleLicenceCode">
      </mt-cell>
      <mt-cell title="车辆初登日期" @click.native="selectData" :class="Vehicle.FirstRegisterDate?'':'red'">
        <input type="text" placeholder="请选择车辆初登日期" disabled v-model="Vehicle.FirstRegisterDate">
      </mt-cell>
      <mt-cell title="发动机号" :class="Vehicle.EngineNo?'':'red'">
        <input type="text" placeholder="请输入发动机号" v-model="Vehicle.EngineNo" maxlength="20">
      </mt-cell>
      <mt-cell title="车架号(VIN)" :class="Vehicle.VehicleFrameNo?'':'red'">
        <input type="text" placeholder="请输入车架号" v-model.trim="Vehicle.VehicleFrameNo" maxlength="17" @input="queryCar">
      </mt-cell>
      <mt-cell title="品牌型号" :class="carVal.AutoModelVal?'':'red'"
               @click.native="$refs.showMessage.show();$refs.showMessage.setCarMessage(carVal.AutoModelVal)">
        <input type="text" placeholder="请选择品牌型号" disabled v-model="carVal.AutoModelVal">
      </mt-cell>
      <mt-cell title="整备质量(吨)" :class="Vehicle.Weight?'':'red'">
        <input type="text" placeholder="请输入整备质量" v-model="Vehicle.Weight">
      </mt-cell>
      <mt-cell title="排气量(升)" :class="Vehicle.ExhaustCapability?'':'red'">
        <input type="text" placeholder="请输入排气量" v-model="Vehicle.ExhaustCapability">
      </mt-cell>
      <!--<mt-cell title="座位数" :class="Vehicle.ExhaustCapability?'':'red'">-->
      <!--<input type="text" placeholder="请输入座位数" v-model="Vehicle.ExhaustCapability">-->
      <!--</mt-cell>-->
      <mt-cell title="车辆种类" :class="Vehicle.VehicleType?'':'red'">
        <select class="moneyIpt dib needsclick" v-model="Vehicle.VehicleType">
          <option value="1">客车(非营业)</option>
          <option value="2">货车</option>
          <option value="10">客车(出租)</option>
          <option value="11">客车(租赁)</option>
        </select>
      </mt-cell>
      <!--<mt-cell title="交管车辆类型" @click.native="carTypeShow=true">-->
      <!--<input type="text" placeholder="请选择交管车辆类型" disabled v-model="carVal.VehicleVal">-->
      <!--</mt-cell>-->
      <mt-cell title="交管车辆类型" :class="Vehicle.VehicleStyle&&Vehicle.VehicleStyle!='999'?'':'red'">
        <select class="moneyIpt dib needsclick" v-model="Vehicle.VehicleStyle">
          <option value="999">请选择交管车辆类型</option>
          <option :value="tiem.value" v-for="(tiem,index) in VehicleStyleList" :key="index">{{tiem.key}}</option>
        </select>
      </mt-cell>
      <mt-cell title="是否为过户车" class="flex-end">
        <mt-switch v-model="carVal.isTransfer" @change="Vehicle.TransferDate=''"></mt-switch>
      </mt-cell>
      <mt-cell title="过户日期" @click.native="selectData1" v-show="carVal.isTransfer"
               :class="Vehicle.TransferDate?'':'red'">
        <input type="text" placeholder="请选择过户日期" disabled v-model="Vehicle.TransferDate"
               style="width: 100%;text-align: right;">
      </mt-cell>
      <mt-cell title="是否按揭" class="flex-end">
        <mt-switch v-model="carVal.IsMortgage" @change="Vehicle.Mortgage={IsMortgage: '0'}"></mt-switch>
      </mt-cell>
      <mt-cell title="第一受益人姓名" class="flex-end" v-if="carVal.IsMortgage" :class="Vehicle.Mortgage.Name?'':'red'">
        <input type="text" placeholder="请输入第一受益人姓名" v-model="Vehicle.Mortgage.Name">
      </mt-cell>

      <mt-cell title="使用性质" :class="Vehicle.UsageAttributeCode?'':'red'">
        <select class="moneyIpt dib needsclick mr1" v-model="Vehicle.UsageAttributeCode">
          <option value="">请选择使用性质</option>
          <option value="1">非营运</option>
          <option value="2">营运</option>
        </select>
      </mt-cell>
      <mt-cell title="所属性质" :class="Vehicle.OwnershipAttributeCode?'':'red'">
        <select class="moneyIpt dib needsclick mr1" v-model="Vehicle.OwnershipAttributeCode">
          <option value="">请选择所属性质</option>
          <option value="1">个人</option>
          <option value="2">机关</option>
          <option value="3">企业</option>
        </select>
      </mt-cell>
      <div class="copyright">
        <p>彩虹无线公司 版权所有</p>
        <p>Copyright2016-2019cihon.</p>
        <p>All Rights Reserved.</p>
      </div>
    </div>
    <mt-button type="primary" size="large" class="btn" @click="submit">下一步</mt-button>
    <mt-datetime-picker
        ref="FirstRegisterDate"
        type="date"
        v-model="dateVal"
        year-format="{value} 年"
        month-format="{value} 月"
        date-format="{value} 日"
        :startDate="new Date('2000/1/1')"
        :endDate="new Date()"
        @confirm="handleChange">
    </mt-datetime-picker>

    <mt-datetime-picker
        ref="ghcTime"
        type="date"
        v-model="dateVal1"
        year-format="{value} 年"
        month-format="{value} 月"
        date-format="{value} 日"
        :startDate="new Date('2000/1/1')"
        :endDate="new Date()"
        @confirm="handleChange1">
    </mt-datetime-picker>
    <!--交管车辆类型-->
    <mt-popup
        v-model="carTypeShow"
        position="bottom"
        popup-transition="popup-fade">
      <div class="picker-toolbar">
        <span class="mint-datetime-action mint-datetime-cancel"
              @click="carTypeShow=false;">取消</span>
        <span class="mint-datetime-action mint-datetime-confirm"
              @click="chooseCarTpe">确定</span>
      </div>
      <mt-picker :slots="slots" valueKey="name" @change="carTypeChange"></mt-picker>
    </mt-popup>
    <showMessage ref="showMessage" @getCarId="getCarId"></showMessage>
  </div>
</template>

<script>
  import Header from '../../components/Header';
  import showMessage from './showMessage';
  import canvasResize from 'canvas-resize';

  export default {
    name: 'carMessage',
    data() {
      return {
        orderNo: '',
        value: '',
        dateVal: '',
        dateVal1: '',
        fee: '',
        carTypeShow: false,
        slots: [{values: ''}],
        carType: '',
        carVal: {
          AutoModelVal: '',  // 品牌型号汉字
          importFlag: '',  // 品牌型号类型
          VehicleVal: '',  // 交管车辆类型汉字
          VehicleTypeValue: '',  // 车辆种类
          isTransfer: false, // 是否过户车
          seatings: '', // 座位号
          IsMortgage: false, // 座位号
        },
        Vehicle: {
          VehicleLicenceCode: '', // 车牌号
          FirstRegisterDate: '',  // 车辆初始登记日期
          EngineNo: '',  // 发动机号
          AutoModelCode: '',  // 品牌型号
          Weight: '',  // 整备质量
          ExhaustCapability: '',  // 排气量
          VehicleFrameNo: '',   // 车架号
          VehicleType: '1',  // 车辆种类
          VehicleStyle: '999',  // 交管车辆类型
          TransferDate: '',  // 过户时间
          UsageAttributeCode: '1',   // 使用性质
          OwnershipAttributeCode: '1',   // 所属性质
          Mortgage: {
            IsMortgage: '0',
          }
        },
        VehicleStyleList: [],
      };
    },
    watch: {
      'Vehicle.EngineNo'(val) {
        if (val) {
          this.Vehicle.EngineNo = val.toUpperCase();
        }
      },
      'Vehicle.VehicleFrameNo'(val) {
        if (val) {
          this.Vehicle.VehicleFrameNo = val.toUpperCase();
        }
      },
    },
    components: {
      showMessage,
      Header
    },
    mounted() {
      this.Vehicle.VehicleLicenceCode = this.$route.query.carNo;
      this.orderNo = this.$route.query.orderNo;
      this.queryCarType();
      this.createOrderNo();
    },
    methods: {
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
          type: 2
        }).then((res) => {
          console.log(res);
          if (res.code != 200) {
            this.Toast({
              message: res.message,
              position: 'bottom'
            });
          } else {
            if (res.response) {
              this.Vehicle.FirstRegisterDate = res.response.ferstDay;
              this.Vehicle.VehicleLicenceCode = res.response.cardNo;
              this.Vehicle.VehicleFrameNo = res.response.vin;
              this.Vehicle.EngineNo = res.response.engineNo;
              this.Vehicle.UsageAttributeCode = res.response.useType ? (res.response.useType === '营运' ? '2' : '1') : '';

              // this.carVal.AutoModelVal
              // this.Vehicle.AutoModelCode
              this.vinQueryCar(this.Vehicle.VehicleFrameNo);
            }
          }
        });
      },
      createOrderNo() {
        if (!this.orderNo) {
          this.$post(this.$url.car.insuredStart).then((res) => {
            if (res.code != 200) {
              this.Toast({
                message: res.message,
                position: 'bottom'
              });
            } else {
              let orderNo = res.response.orderNo;
              if (orderNo) {
                this.orderNo = orderNo;
                this.getCarInfo('1', null);
              }
            }
          });
        } else {
          this.getCarInfo('1', null);
        }
      },
      // 查询和保存car信息
      getCarInfo(type, callback) {
        this.$post(this.$url.car.vehicleInfo, {
          type: type,
          orderNo: this.orderNo,
          Vehicle: this.Vehicle,
          carVal: this.carVal,
          fee: this.fee,
        }).then((res) => {
          if (res.code != 200) {
            this.Toast({
              message: res.message,
              position: 'bottom'
            });
          } else {
            if (res.response.Vehicle) {
              this.Vehicle = JSON.parse(res.response.Vehicle).Vehicle;
              this.carVal = JSON.parse(JSON.parse(res.response.Vehicle).carVal);
              this.fee = JSON.parse(JSON.parse(res.response.Vehicle).fee);
            }
            if (callback) {
              callback();
            }
          }
        });
      },
      selectData1() {
        // 如果已经选过日期，则再次打开时间选择器时，日期回显（不需要回显的话可以去掉 这个判断）
        if (this.Vehicle.TransferDate) {
          this.dateVal1 = this.Vehicle.TransferDate;
        } else {
          this.dateVal1 = new Date();
        }
        this.$refs['ghcTime'].open();
      },
      handleChange1(value) {
        let date = new Date(value);
        let m = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
        let d = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
        this.Vehicle.TransferDate = date.getFullYear() + '-' + m + '-' + d;
      },
      selectData() {
        // 如果已经选过日期，则再次打开时间选择器时，日期回显（不需要回显的话可以去掉 这个判断）
        if (this.Vehicle.FirstRegisterDate) {
          this.dateVal = this.Vehicle.FirstRegisterDate;
        } else {
          this.dateVal = new Date();
        }
        this.$refs['FirstRegisterDate'].open();
      },
      handleChange(value) {
        let date = new Date(value);
        let m = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
        let d = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
        this.Vehicle.FirstRegisterDate = date.getFullYear() + '-' + m + '-' + d;
      },
      carTypeChange(picker, values) {
        if (values[0]) {
          this.carType = values[0];
        }
      },
      // 根据vin查询品牌信息
      queryCar() {
        if (this.Vehicle.VehicleFrameNo.length >= 17) {
          this.vinQueryCar(this.Vehicle.VehicleFrameNo);
        }
      },
      vinQueryCar(vin) {
        this.$post(this.$url.car.message, {
          vehicleFrameNo: vin
        }).then((res) => {
          console.log(res);
          if (res.code == 200) {
            if (res.response.list.length != 0) {
              let carInfo = res.response.list[0];
              this.getCarId(carInfo);
            }
          }
        });
      },
      // 查询返回品牌信息
      getCarId(carInfo) {
        console.log(carInfo);
        // item.code,item.names,item.importFlag,item.fee,item.weight
        this.Vehicle.AutoModelCode = carInfo.code;
        this.carVal.AutoModelVal = carInfo.names;
        this.carVal.importFlag = carInfo.importFlag;
        this.fee = carInfo.fee;
        this.Vehicle.Weight = carInfo.weight;
        this.Vehicle.ExhaustCapability = carInfo.exhaustCapability;
        this.carVal.seatings = carInfo.seating;
      },
      // 查询交管车辆类型
      queryCarType() {
        this.$post(this.$url.car.vehicleStyleQuery).then((res) => {
          // console.log(res);
          if (res.code != 200) {
            this.Toast({
              message: res.message,
              position: 'bottom'
            });
          } else {
            let list = res.response.list;
            this.VehicleStyleList = list;
            if (list.length != 0) {
              let pickerArray = [];
              for (let i = 0; i < list.length; i++) {
                let obj = {};
                for (let j in list[i]) {
                  obj.name = j;
                  obj.id = list[i][j];
                  pickerArray.push(obj);
                }
              }
              this.slots[0].values = pickerArray;
            }
          }
        });
      },
      chooseCarTpe() {
        this.Vehicle.VehicleStyle = this.carType.id;
        this.carVal.VehicleVal = this.carType.name;
        this.carTypeShow = false;
      },
      submit() {
        this.checkVal(() => {
          if (this.carVal.IsMortgage) {
            this.Vehicle.Mortgage.IsMortgage = '1';
          } else {
            this.Vehicle.Mortgage.IsMortgage = '0';
          }
          this.getCarInfo('2', () => {
            this.$router.push({name: 'peopleMessage', query: {orderNo: this.orderNo}});
          });
        });
      },
      checkVal(callback) {
        let obj = this.Vehicle;
        if (!obj.FirstRegisterDate) {
          this.Toast({message: '请选择车辆初登日期', position: 'bottom'});
          return;
        } else if (!obj.EngineNo) {
          this.Toast({message: '请输入发动机号', position: 'bottom'});
          return;
        } else if ((/^[\u4e00-\u9fa5]+$/).test(obj.EngineNo)) {
          this.Toast({message: '发动机号不可以输入汉字', position: 'bottom'});
          return;
        } else if (!(/^[A-Za-z0-9\-]+$/).test(obj.EngineNo)) {
          this.Toast({message: '发动机号不能包含特殊字符', position: 'bottom'});
          return;
        } else if (!obj.VehicleFrameNo) {
          this.Toast({message: '请输入车架号', position: 'bottom'});
          return;
        } else if (obj.VehicleFrameNo.length != 17) {
          this.Toast({message: '车架号为17位', position: 'bottom'});
          return;
        } else if ((/^[\u4e00-\u9fa5]+$/).test(obj.VehicleFrameNo)) {
          this.Toast({message: '车架号不可以输入汉字', position: 'bottom'});
          return;
        } else if (!(/^[A-Za-z0-9]+$/).test(obj.VehicleFrameNo)) {
          this.Toast({message: '车架号不能包含特殊字符', position: 'bottom'});
          return;
        } else if (obj.VehicleFrameNo.indexOf('I') != -1 || obj.VehicleFrameNo.indexOf('O') != -1 || obj.VehicleFrameNo.indexOf('Q') != -1) {
          this.Toast({message: '车架号不能包含I,O,Q', position: 'bottom'});
          return;
        } else if (!obj.AutoModelCode) {
          this.Toast({message: '请选择品牌型号', position: 'bottom'});
          return;
        } else if (!this.Vehicle.Weight) {
          this.Toast({message: '请输入整备质量', position: 'bottom'});
          return;
        } else if (obj.VehicleStyle == '999') {
          this.Toast({message: '请选择交管车辆类型', position: 'bottom'});
          return;
        } else if (this.carVal.isTransfer && !obj.TransferDate) {
          this.Toast({message: '请选择过户时间', position: 'bottom'});
          return;
        } else if (this.carVal.IsMortgage && !this.Vehicle.Mortgage.Name) {
          this.Toast({message: '请输入第一受益人姓名', position: 'bottom'});
          return;
        } else {
          callback();
        }
      },
    }
  };
</script>

<style>
  .carMessage {
    color: #000;
    position: relative;
  }

  .carMessage .title {
    font-size: .14rem;
    padding: .1rem .15rem;
    background: #F5F5F9;
  }

  .carMessage .title i {
    color: #999999;
    font-size: .12rem;
  }

  .carMessage .mint-cell-value {
    flex: 2;
    justify-content: flex-end;
  }

  .carMessage input {
    width: 100%;
    text-align: right;
  }

  .carMessage .mint-radio-core {
    width: .2rem;
    height: .2rem;
    margin-left: .05rem;
  }

  .carMessage .mint-radio-core::after {
    top: .041rem;
    left: .044rem;
  }

  .carMessage .flex-end .mint-cell-value {
    justify-content: flex-end;
  }

  .carMessage .mint-switch-core {
    width: 42px;
    height: 24px;
  }

  .carMessage .mint-switch-core::before {
    width: 40px;
    height: 22px;
  }

  .carMessage .mint-switch-core::after {
    width: 22px;
    height: 22px;
  }

  .carMessage .btn {
    -position: fixed;
    -bottom: 0;
    -left: 0;
    -z-index: 999;
  }

  .carMessage .mint-popup {
    width: 100%;
  }

  .carMessage .copyright {
    font-size: .14rem;
    color: #b1b1b1;
    text-align: center;
    padding-top: .4rem;
  }

  .carMessage select {
    text-align: right;
    text-align-last: right;
    color: #888;
    /*appearance: none;*/
    /*-moz-appearance: none;*/
    /*-webkit-appearance: none;*/
  }
</style>
