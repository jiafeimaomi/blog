import axios from 'axios'
import { Message } from 'element-ui'
axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'


// 创建axios实例
const service = axios.create({
  // axios中请求配置有baseURL选项，表示请求URL公共部分
  // baseURL: baseURL,
  // 超时
  timeout: 100000
});

// request拦截器
service.interceptors.request.use(
  config => {

    if (!config.baseURL) {
      config.baseURL = process.env.VUE_APP_BASE_USER_API;
    }
    // !config.url.includes('/findFillingsMake')
    // && process.env.NODE_ENV !== 'development'
    // if (process.env.VUE_APP_ORIGIN ) {
      
    //   config.baseURL = process.env.VUE_APP_ORIGIN + config.baseURL
    // }

    return config;
  },
  error => {
    console.log(error);
    Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  res => {
    const code = res.data.code;

    // 正常返参
    if (code == 200 || code == 0) {
      return res.data
    }
    const msg = res.data.message || res.data.msg
    // 错误处理
    msg && Message({
      message: msg,
      type: 'error',
      duration: 5 * 1000
    })

    return Promise.reject(res.data)
  },
  error => {
    //其他接口 状态码错误直接报错，不进行跳转
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })

    return Promise.reject(error.message);
  }
)


export default service
