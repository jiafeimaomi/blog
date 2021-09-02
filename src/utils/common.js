// 调用接口处理数据交互
/**
 * @param {*} api : 请求方法
 * @param {*} params : 请求参数
 * @param {*} info : 操作按钮的配置项
 * @param {*} confirm : 是否做二次提示
 * @param {*} formParams : 选择的筛选项
 * @param {*} refresh : 是否刷新列表
 * @param {*} callback : 操作之后的回调
 */
 export function handleData({ api, params, info = {}, confirm = false,}, callback) {
    // 是否弹出确认框
    if (confirm) {
      this.$confirm("确认是否" + info.label + "?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        api(params).then(res => {
          callback && callback();
          this.msgSuccess(info.label + '成功')
        }).catch(() => {
          console.log('处理错误')
        });
      });
    } else {
      api(params).then(res => {
        this.msgSuccess(res.data.msg);
      });
    }
  }