import request from '@/utils/request';

// 添加用户
export function getDataList(data) {
    return request({
      url: "/list",
      method: "post",
      data,
      baseURL: process.env.VUE_APP_BASE_BLOG_API
    });
  }

// 新增blog
export function addBlog(data) {
  return request({
    url: "/addBlog",
    method: "post",
    data,
    baseURL: process.env.VUE_APP_BASE_BLOG_API
  });
}


// 编辑blog
export function editBlog(data) {
    return request({
      url: "/editBlog",
      method: "post",
      data,
      baseURL: process.env.VUE_APP_BASE_BLOG_API
    });
  }


// 删除blog
export function delBlog(data) {
    return request({
      url: "/delBlog",
      method: "post",
      data,
      baseURL: process.env.VUE_APP_BASE_BLOG_API
    });
  }