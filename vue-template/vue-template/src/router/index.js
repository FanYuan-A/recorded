/* eslint-disable */
import Vue from "vue";
import VueRouter from "vue-router";
import Index from "../views/Index.vue";

Vue.use(VueRouter);

const routes = [{
        path: '/',
        redirect: '/index'
    },
    {
        path: "/index",
        name: "Index",
        component: Index
    }
];

const router = new VueRouter({
    routes
});

// 路由守护，进行登录判断
// router.beforeEach((to, from, next) => {
//     var user = sessionStorage.getItem("user"); //获取浏览器缓存的用户信息
//     if (user) {
//         // 如果浏览器缓存了用户信息直接进入默认首页
//         next();
//     } else {
//         if (to.path === "/login") {
//             //如果是登录页面路径，就直接next()
//             next();
//         } else {
//             //不然就跳转到登录；
//             next({ path: '/login' })
//         }
//     }
// });

export default router;