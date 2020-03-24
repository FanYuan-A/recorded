import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "@/assets/css/base.scss";
import "@/plugins/index.js";

import api from "@/api/index";
Vue.prototype.$api = api;

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: function(h) {
        return h(App);
    }
}).$mount("#app");