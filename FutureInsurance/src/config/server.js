import axios from 'axios';
import {Toast} from 'mint-ui';
import {Indicator} from 'mint-ui';

// 创建axios实例
// 59.110.11.191
const Axios = axios.create({
  // baseURL: 'http://59.110.11.191:8082', // 线上
  baseURL: "http://101.201.55.187:8082", // 测试
  // baseURL: "http://192.168.2.50:8082",
  headers: {
    'Authorization': GETTOKEN()
  }
});


var num = 0;
// 请求拦截器
Axios.interceptors.request.use(config => {
      num++;
      Indicator.open({
        spinnerType: 'fading-circle'
      });

      return config;
    },
    error => {
      num--;
      Indicator.close();
      Toast({
        message: '网络异常,请联系管理员'
      });
      return Promise.reject(error);
    }
);

// 响应拦截器
Axios.interceptors.response.use(
    response => {
      num--;
      if (num <= 0) {
        Indicator.close();
      }
      // token过期
      if (response.data.code == '401') {
        Toast({message: '登录已失效,请重新登录'});
        tokenIsFailure();
      }
      return response;
    },
    error => {
      num--;
      Indicator.close();
      if (error.response) {
        switch (error.response.status) {
          case 403:
            Toast({message: '拒绝访问(403)'});
            break;
          case 500:
            Toast({message: '操作失败，已通知管理员'});
            break;
          case 502:
            Toast({message: '网络错误(502)'});
            break;
          case 404:
            Toast({message: '请求出错(404)'});
            break;
        }
      }
      return Promise.reject(error);
    }
);


/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */
export function fetch(url, params) {
  if (params) {
    params.userId = getUSERID();
  } else {
    params = {
      userId: getUSERID(),
    };
  }
  return new Promise((resolve, reject) => {
    Axios.get(url, {
      params: params
    }, {
      headers: {
        'Authorization': GETTOKEN()
      }
    })
        .then(response => {
          resolve(response.data);
        })
        .catch(err => {
          reject(err);
        });
  });
}


/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function post(url, data) {
  if (data) {
    data.userId = getUSERID();
  } else {
    data = {
      userId: getUSERID(),
    };
  }
  return new Promise((resolve, reject) => {
    Axios.post(url, data, {
      headers: {
        'Authorization': GETTOKEN()
      }
    })
        .then(response => {
          resolve(response.data);
        })
        .catch(err => {
          reject(err);
        });
  });
}

// 获取token
function GETTOKEN() {
  var token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NTg3NzA5MjU0NTUsInBheWxvYWQiOiJ7XCJpZFwiOlwiMTQ4NDhcIixcIm1vYmlsZVwiOlwiMTM1MjI1MDUzNzFcIixcInBhc3N3b3JkXCI6XCJENzg3Nzk5QTc1MzY0NDBGQzcyMDc1MDIyN0JDOUVBMlwiLFwiYWRkcmVzc1wiOm51bGwsXCJoZWFkVXJsXCI6XCJcIixcIm5hbWVcIjpcIlwiLFwiYmlydGhkYXlcIjpudWxsLFwic2V4XCI6bnVsbCxcImNhcmRUeXBlXCI6XCJcIixcImNhcmROdW1cIjpcIlwiLFwibGFzdExvZ2luVGltZVwiOm51bGwsXCJ1c2VybmFtZVwiOlwiXCIsXCJpc0Zyb3plblwiOlwiMVwiLFwidmVyc2lvblwiOlwiMS4wLjBcIixcImNoYW5uZWxTb3VyY2VcIjpcIkFYQVwiLFwibG9naW5UeXBlXCI6bnVsbCxcInByb3ZpbmNlXCI6XCJcIixcInByb3ZDb2RlXCI6XCJcIixcImNpdHlcIjpcIlwiLFwiY2l0eUNvZGVcIjpcIlwiLFwib3JnYW5pemF0aW9uQ29kZVwiOlwiMDAxMDAzXCIsXCJ0ZWFtSWRcIjpcIlwiLFwidGVhbUlkTGV2ZWxUd29cIjpcIlwiLFwib2ZmaWNlSWRcIjpudWxsLFwibmF0aW9uXCI6bnVsbCxcInBvbGl0aWNhbFwiOm51bGwsXCJlZHVjYXRpb25cIjpudWxsLFwiYWJpbGl0eUNhcmRJbWdcIjpcIlwiLFwiaXNBdXRoZW50aWNhdGlvblwiOlwiMVwiLFwiY2FyZEltZ090aGVyU2lkZVwiOlwiXCIsXCJjYXJkSW1nUG9zaXRpdmVcIjpcIlwiLFwiaXNQYXNzRXhhbVwiOlwiMVwiLFwiY3JlYXRlVGltZVwiOlwiMjAxOS0wNS0wOSAxMjowMTo0NlwiLFwidXBkYXRlVGltZVwiOlwiMjAxOS0wNS0yMCAxNTo1NDo0OVwiLFwidXNlckdyYWRlXCI6bnVsbCxcImluY2hJbWdcIjpudWxsLFwiam9iTnVtXCI6bnVsbH0ifQ.OtNjnbMn8nOgZKkpvJb1-X6ZkQKn-g0knSbu_lxbfzQ';
  if (window.android) {
    token = window.android.getToken();
  }
  if (window.getToken) {
    token = window.getToken();
  }
  return token;
}

// 获取userId
function getUSERID() {
  var userId = '14848';
  if (window.android) {
    userId = window.android.getUserId();
  }
  if (window.getUserId) {
    userId = window.getUserId();
  }
  return userId;
}

// create  orderNo
function createOrderNo() {
  const createOrderNoUrl = '/futureInsurance/insuredStart';
  Axios.post(createOrderNoUrl, {userId: getUSERID()})
      .then(response => {
        if (response.data.code == 200) {
          let orderNo = response.data.response.orderNo;
          if (orderNo) {
            sessionStorage.setItem('orderNo', orderNo);
          }
        }
      })
      .catch(err => {
      });
}

// token是否失效
function tokenIsFailure() {
  // alert('token失效,调用jumpLogin');
  if (window.android) {
    window.android.jumpLogin();
    return;
  }
  if (window.jumpLogin) {
    window.jumpLogin();
    return;
  }
}
