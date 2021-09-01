import request from '@/utils/request';

// 添加用户
export function register(data) {
    return request({
      url: "/addUser",
      method: "post",
      data,
      baseURL: process.env.VUE_APP_BASE_USER_API
    });
  }

// 登录
export function login(data) {
  return request({
    url: "/login",
    method: "post",
    data,
    baseURL: process.env.VUE_APP_BASE_USER_API
  });
}
