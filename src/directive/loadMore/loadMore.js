/**
 * loadMore指令
 */
export default {
  inserted(el, binding) {
    const SELECTDOWN_DOM = el.querySelector('.el-select-dropdown .el-select-dropdown__wrap')
    SELECTDOWN_DOM.addEventListener('scroll', function() {
      const CONDITION = this.scrollHeight - this.scrollTop <= this.clientHeight
      if (CONDITION) {
          binding.value()
      }
    })
  }
};
  
  
  
  
  