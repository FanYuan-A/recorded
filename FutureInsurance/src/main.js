import Vue from 'vue'
import App from './App.vue'
import router from './router'
import "mint-ui/lib/style.css";
import Mint from "mint-ui";
import {Toast, MessageBox, Loadmore} from "mint-ui";
import "./assets/css/reset.css";
import "./assets/css/style.css";
import "./api";
import "./assets/js";
import fastclick from 'fastclick'

Vue.component(Loadmore.name, Loadmore);
Vue.config.productionTip = false

Vue.use(Mint);
Vue.prototype.Toast = Toast;
Vue.prototype.MessageBox = MessageBox;

fastclick.prototype.focus = function (targetElement) {
  var length;
  var u = navigator.userAgent;
  var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
  if (isiOS && targetElement.setSelectionRange && targetElement.type.indexOf('date') !== 0 && targetElement.type !== 'time' && targetElement.type !== 'month') {
    length = targetElement.value.length;
    targetElement.focus();
    targetElement.setSelectionRange(length, length);
  } else {
    targetElement.focus();
  }
};

fastclick.prototype.onTouchStart = function (event) {
  var targetElement, touch, selection;

  // Ignore multiple touches, otherwise pinch-to-zoom is prevented if both fingers are on the FastClick element (issue #111).
  if (event.targetTouches.length > 1) {
    return true;
  }

  targetElement = this.getTargetElementFromEventTarget(event.target);
  touch = event.targetTouches[0];
  var nodeName = targetElement.nodeName.toLowerCase();
  if (nodeName === "select") {
    return false;
  }
}

if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function () {
    fastclick.attach(document.body)
  }, false)
}
new Vue({
  render: h => h(App),
  router
}).$mount('#app')
