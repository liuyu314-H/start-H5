import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { HEADER_TOKEN, TIME_OUT } from '@/config'
import { Toast } from 'vant'
 

//创建axios实例
const http: AxiosInstance = axios.create({
  timeout: TIME_OUT,
  // baseURL:'/mxldtest/h5' //云下环境路径需要添加...
  // baseURL:'/assistant/bot/mxldtest/h5' //第二次云下环境路径需要添加...
})

// 请求拦截器
http.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    //设置请求头
    config.headers = Object.assign({ 'Content-Type': "application/json" }, config.headers);
     // 判断 data 是否为 FormData 实例
    if (config.data instanceof FormData) {
      delete config.headers['Content-Type'];
    }
    //设置token
    localStorage.getItem("tk") != null ? (config.headers[HEADER_TOKEN] = localStorage.getItem("tk") as string) : null
    // 增加时间戳防止服务器缓存
    const ts: number = new Date().getTime();
    config.params = { ...config.params, ts }
    // console.log(config, 'sdkjfksdjfksdjfkdfjskdfdkj')
    return config;
  },
  
  (error) => {
    console.log(error);
    return Promise.reject(error);
  });
// 响应拦截器
http.interceptors.response.use(
  (response: AxiosResponse) => {
     if (response.data.data?.token) {
      localStorage.setItem("tk", response.data.data.token);
      
    }
    return response.data
  },
  (error) => {
    console.log('========');
    
    return Promise.reject(error);
  });

export default http