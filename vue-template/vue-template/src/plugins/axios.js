import axios from "axios";

// 请求拦截
axios.interceptors.request.use(
    function(config) {
        // if (config.url.toLowerCase() !== `login`) {
        //     如果不是login带上token
        //     var token = JSON.parse(sessionStorage.getItem('user')); //获取浏览器缓存的token信息
        //     var tokens = token.token;
        //     // 如果请求的地址不是login/in，设置token
        //     config.headers['xxxxx'] = tokens;
        // }
        return config;
    },
    function(error) {
        return Promise.reject(error);
    }
);

// 响应拦截
axios.interceptors.response.use(
    function(response) {
        return response;
    },
    function(error) {
        return Promise.reject(error);
    }
);

export default axios;