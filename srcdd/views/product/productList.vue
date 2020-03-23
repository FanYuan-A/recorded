<template>
  <div id="productList">
    <!-- banner -->
    <md-swiper class="swiper" ref="swiper" :is-prevent="false" :useNative-driver="false">
      <md-swiper-item :key="idx" v-for="(item, idx) in banner">
        <div class="banner-item"><img :src="item.imageUrl" @click="clickBanner(idx)"/></div>
      </md-swiper-item>
    </md-swiper>
    <!-- TabBar导航 -->
    <div class="tab-container" ref="tabBar">
      <md-tab-bar v-model="selectedProductType" :items="productTypeList"/>
      <md-icon class="icon-eye" :name="showBonusFlag ? 'visible' : 'invisible'" size="lg" @click="showBonusFlag = !showBonusFlag"/>
    </div>

    <!-- 滚动区域 -->
    <md-scroll-view :scrolling-x="false" ref='scrollView' :auto-reflow="true" class="proScr" :style="{height:scrollViewHeight}">
      <!-- 产品列表 -->
      <div class="product-list">
        <template v-if="productList.length !== 0">
          <div class="product-list-item" v-for="(item,index) of productList" :key="index">
            <div class="product-card"   @click="gotoProductDetail(index)">
              <div><img :src="item.LXB_SHOW.list_img"></div>
              <div>
                <div class="name_price">
                  <p class="product-name">{{item.LXB_BASE.itemName}}</p>
                </div>
                <p class="product-detail">{{item.LXB_SHOW.list_desc}}</p>
                <div class="extension-box"  @click.stop="showBonusPopup(index)">
                  <p class="extension" v-show="showBonusFlag">{{item.LXB_SHOW.list_bonus}}</p>
                  <p class="bonus-arrow" v-show="showBonusFlag && item.hasBonusDetail"><md-icon :name="bonusPopup.show?'arrow-down':'arrow-right'" size="lg"/> </p>
                </div>
              </div>
            </div>

          </div>
        </template>
        <div v-else class="no-data">{{showMessage}}</div>
      </div>
    </md-scroll-view>
    <!-- 历史计划书 -->
    <div class="proposal-history" @click="gotoProposalList">
      <img src="@/assets/imgs/product/icon-history-proposal.png"/><span>历史计划书</span>
    </div>
    <!-- 佣金弹层 -->
    <md-popup v-model="bonusPopup.show" position="bottom">
      <div class="popup-bonus-content">
        <div class="popup-bt-close">
          <span class="bonus-title" v-html="bonusPopup.title"></span>
          <md-icon name="close" size="lg" @click="bonusPopup.show = false"/>
        </div>
        <div class="table-box" v-html="bonusPopup.content"></div>
      </div>
    </md-popup>
  </div>

</template>
<script>
import {Swiper, SwiperItem, ScrollView, Icon, TabBar, Popup, CheckBox, CheckGroup, ScrollViewMore, Button, Toast} from 'mand-mobile'
import lxb from '@/api/lxb.js'
// import slide from '@/utils/slide.js'
import commonUtils from '@/utils/common'
import weixin from '../../utils/weixin'

export default {
  name: 'productList',
  components: {
    [Swiper.name]: Swiper,
    [SwiperItem.name]: SwiperItem,
    [ScrollView.name]: ScrollView,
    [Icon.name]: Icon,
    [TabBar.name]: TabBar,
    [Popup.name]: Popup,
    [CheckBox.name]: CheckBox,
    [CheckGroup.name]: CheckGroup,
    [ScrollViewMore.name]: ScrollViewMore,
    [Button.name]: Button,
    [Toast.name]: Toast,
  },
  data() {
    return {
      // 横幅图
      banner:{},
      // 选中的“产品类型”TAB项
      selectedProductType:'',
      // “产品类型”TAB列表
      productTypeList:[],
      // 产品列表
      productList: [],
      // 是否显示“推广费”
      showBonusFlag:false,
      // “推广费”弹层
      bonusPopup:{
        show:false,
        content:'',
        title:'',
      },
      showMessage: '更多产品，敬请期待',
      scrollViewHeight:'0'
    }
  },
  async mounted() {
    // 获取产品类型
    await this.queryProductTypeList();
    await this.queryProductList(this.selectedProductType);
    commonUtils.closeGlobalMask();
  },
  created(){
    //隐藏菜单
    // weixin.hideMenu()
  },

  watch: {
    // 产品分类TAB切换，重查产品列表
    selectedProductType(newType){
      this.queryProductList(newType);
    }
  },
  methods: {

    /**
     * 取产品类型列表
     * @returns {Promise<void>}
     */
    async queryProductTypeList(){
      console.log(`-->获取banner、产品分类：`);
      let res = await lxb.getProductTypeList()||{};
      console.log(`<--获取banner、产品分类：${JSON.stringify(res)}`);
      if(res.result === '0'){
        // banner
        this.banner = [];
        this.banner = res.planbookBanner;
        // 类型列表
        this.productTypeList = [];
        res.productTypeList.forEach(item=>this.productTypeList.push({name:item.productSubType,label:item.name}));
        this.selectedProductType = this.productTypeList.length > 0 ? this.productTypeList[0].name : '';// 由watch更新产品列表
      }else{
        Toast(res.resultMessage);
      }
    },
    /**
     * 查询产品列表
     * @param productType
     * @returns {Promise<void>}
     */
    async queryProductList(productType){
      console.log(`-->获取产品列表：productType：${productType}`);
      let res = await lxb.getProductList(productType)||{};
      console.log(`<--获取产品列表：${JSON.stringify(res)}`);
      if(res.result === '0'){
        this.productList = [];
        if(res.data.queryContentResDTO.records > 0)
          this.productList = res.data.queryContentResDTO.data;
        this.productList.forEach(item=>{
          // 该产品是否有推广费详情
          item.hasBonusDetail = item.LXB_SHOW.list_bonus_desc && item.LXB_SHOW.list_bonus_desc !== '';
          // 拼接“跳产品详情”参数
          if(item.LXB_SHARE && item.LXB_SHARE.linkUrl && item.LXB_SHARE.linkUrl !== '')
            item.LXB_SHARE.linkUrl = process.env.VUE_APP_BASE_LXB_H5 + item.LXB_SHARE.linkUrl + (item.LXB_SHARE.linkUrl.includes('?') ? '&' : '?') + 'from=new_proposal_product_list';
          else
            item.LXB_SHARE.linkUrl = '';
        });
        // 计算产品列表可滚动组件的高度 =屏幕（可视区）高度 - banner - tabbar
        this.$nextTick(()=>{
          let defferHeight = this.$refs.swiper.$el.clientHeight + Number(window.getComputedStyle(this.$refs.tabBar).height.replace('px',''));
          this.scrollViewHeight = 'calc(100vh - '+defferHeight+'px)';
        });
      }else{
        Toast(res.resultMessage);
      }
    },
    /**
     * 显示产品列表项的佣金表格弹框
     * @param index
     */
    showBonusPopup(index){
        this.bonusPopup.title=this.productList[index].LXB_BASE.itemName;
        this.bonusPopup.content = this.productList[index].LXB_SHOW.list_bonus_desc;
        this.$set(this.bonusPopup,'show',true);
    },
    // 点击banner，页面跳转
    clickBanner(idx){
      window.location.href = this.banner[idx].linkUrl;
    },
    /**
     * 跳产品详情
     * @param idx
     */
    async gotoProductDetail(idx){
      let itemCode = this.productList[idx].LXB_BASE.itemCode;
      commonUtils.removeSessionStore('productDetail_' + itemCode);
      this.$router.push({name:'proposalComMake',query:{itemCode:itemCode}});
    },
    gotoProposalList(){
      this.$router.push({name:'proposalList'});
    }
  },
}
</script>
<style lang="less" scoped>
#productList {
  height:100%;
  background: #fff;
  .swiper{
    .banner-item{
      float: left;
      width: 100%;
      text-align: center;
      font-size: 28px;
      color: #FFF;
      box-align: center;
      align-items: center;
      box-pack: center;
      justify-content: center;
      text-decoration-line: none;
      img{
        width: 100%;
        height:220px;
      }
    }
  }


  .TitleBar {
    width: 100%;
    height: 78px;
    font-size: 34px;
    font-family: PingFangSC;
    font-weight: bold;
    color: rgba(55, 55, 55, 1);
    line-height: 78px;
    text-align: center;
    position: relative;
    .filter-btn {
      position: absolute;
      top: 25px;
      right: 30px;
      height: 30px;
      font-size: 22px;
      font-family: PingFangSC;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
      line-height: 30px;
      .filter {
        vertical-align: middle;
      }
    }
  }

  /** 导航栏 */
  .tab-container{
    position: relative;
    /deep/
    .md-tab-bar{background-color: transparent; border-bottom: 1px solid #EEEEEE; padding-left: 21px; padding-right: 80px; }
    /*     /deep/
   .md-tab-bar-end{width: 0}// 隐藏左右边框
      /deep/
      .md-tab-bar-start{width: 0}*/
    /deep/
    .md-tab-bar-item {font-size: 28px; font-family: PingFangSC; font-weight: 400; color: #999999; padding-left: 30px; padding-right: 30px;}
    /deep/
    .md-tab-bar-item.is-active {font-family: PingFangSC; font-weight: 600; color: #333333}
    /deep/
    .md-tab-bar-ink {
      width:68px;
      height:4px;
      background:rgba(97,161,237,1);
      border-radius:3px;
    }
    .icon-eye{position: absolute; color: #CCCCCC; right: 21px; top: calc((100% - 47px) / 2);}
  }

  // 产品列表
  .proScr {
    height: calc(100% - 128px);
    /deep/
    .scroll-view-container {
      height: auto;
    }
    .product-list {
      padding-bottom: 100px;
      .product-list-item{
        position: relative;
        padding: 30px 0 30px 0;
        margin: 0 28px 0 34px;
        .product-card {
          display: flex;
          justify-content: flex-start;
          min-height: 125px;
          // height: 156px;
          > div:nth-child(1) {
            img {
              width: 125px;
              height: 125px;
              background:rgba(216,216,216,1);
              border-radius:5px;
              vertical-align: middle;
            }
          }
          > div:nth-child(2) {
            text-align: left;
            padding-left: 30px;
            position: relative;
            min-width: 73.3%;
            .name_price {
              display: flex;
              justify-content: space-between;
              overflow: hidden;
              min-height: 20px;
              .product-name {
                // width: 190px;
                height: 36px;
                font-size: 28px;
                font-family: PingFangSC;
                font-weight:500;
                color:rgba(51,51,51,1);
                line-height: 36px;
                margin-bottom: 4px;
                white-space:nowrap; overflow:hidden; text-overflow:ellipsis;// 文字过多，显示...
              }
            }
            .product-detail {
              // width: 367px;
              /*height: 36px;*/
              font-size: 22px;
              font-family: PingFangSC;
              font-weight: 400;
              color: rgba(153,153,153,1);
              line-height: 36px;
              margin-bottom: 20px;
            }
            .extension-box{
              display: flex;
              justify-content: flex-start;
              align-items: center;
              z-index: 99999;
              .extension {
                font-size:24px;
                line-height: 24px;
                font-family:PingFangSC;
                font-weight:400;
                color:rgba(226,81,81,1);
                margin-right: 0.28rem;
              ;
              }
              .bonus-arrow{
                text-align: center;color: #CCCCCC;
                .md-icon.icon-font.lg{
                  font-size: 24px;
                }
              }
            }
          }
        }

      }
      // 列表项底部细线
      .product-list-item::after {
        content: "";
        pointer-events: none; /* 防止点击触发 */
        box-sizing: border-box;
        position: absolute;
        top: -50%;
        left: -50%;
        right: -50%;
        bottom: -50%;
        transform: scale(0.5);
        border-bottom: 1px solid #D8D8D8;
      }
      .no-data {
        font-size: 26px;
        color: #666666;
        text-align: center; 
        height: 80px;
        line-height: 80px;
        margin-top: 40px;
      }
    }
  }
  .proposal-history{
    position: fixed; z-index: 999; right: 0; bottom: 102px;
    width:181px;
    height:64px;
    background:rgba(0,0,0,0.4);
    box-shadow:0px 0px 4px 0px rgba(0,0,0,0.2);
    border-radius:100px 0px 0px 100px;
    display: flex; align-items: center; justify-content: space-between;

    img{display: block; width: 42px; height: 42px; margin-left: 11px;}
    span{display: block; color:white; font-family: PingFangSC; font-size: 22px; margin-right: 7px;}
  }
  #filterScroll /deep/ .scroll-view-container {
    height: auto;
  }

  // 佣金弹层
  .popup-bonus-content{
    position: relative;
    background-color: white;
    padding: 20px;
    .popup-bt-close{
      position: relative;
      text-align: center;
      border-bottom: 1px solid #e7e7e7;
      padding: 0.2rem 0.04rem;
      i{
        position: absolute;
        right:0;
        font-size: 0.32rem;
      }
    }
    .table-box{
      max-height: 4rem;
      overflow-y: scroll;
      padding: 0 0.08rem;
    }
  }

}
</style>
<style lang="less">
  #productList {
    .bonus-title{
      font-size: 0.32rem;
      font-family: PingFangSC-Regular;
    }
    table{
      border-collapse: collapse;
      border-spacing: 0;
      margin-top: 0.3rem;
      border: 1px solid #e2e2e2;
      font-size: 0.3rem;
      color:#333;
      .firstRow {
        background: #f2f2f2;
        td{
          border: 1px solid #f2f2f2;
          padding-top: 0.1rem;
          padding-bottom: 0.1rem;
        }
      }
      .tc td {
        border: 1px solid #f2f2f2;
        padding-top: 0.33rem;
        padding-bottom: 0.33rem;
      }
    }
  }
</style>