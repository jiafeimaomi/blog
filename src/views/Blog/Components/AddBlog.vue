<template>
  <div class="app-dialog-container">
    <el-dialog
      v-bind="$attrs"
      :close-on-click-modal="false"
      :title="op.info.title"
      height="60%"
      width="900px"
      v-on="$listeners"
      @open="onOpen"
      @close="onClose"
    >
      <el-form ref="elForm" :model="formData" inline label-width="160px">
        <el-row>
          <el-col :span="20">
            <el-form-item
              label="标题"
              prop="title"
              :rules="[
                {
                  required: true,
                  message: '请输入标题',
                  trigger: ['change', 'blur'],
                },
              ]"
            >
              <el-input
                v-model.trim="formData.title"
                maxlength="50"
                placeholder="请输入标题"
                clearable
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item
              label="内容"
              prop="content"
              :rules="[
                {
                  required: true,
                  message: '请输入内容',
                  trigger: ['change', 'blur'],
                },
              ]"
            >
              <el-input
                v-model.trim="formData.content"
                maxlength="50"
                type="textarea"
                :rows="3"
                placeholder="请输入内容"
                clearable
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="bt-bottom">
        <el-button size="mini" @click="onClose">取消</el-button>
        <el-button v-preventReClick type="primary" size="mini" @click="confirm"
          >确认</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  components: {},
  props: {
    op: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      formData: {},
      loading: false,
    };
  },
  computed: {},
  watch: {},
  created() {
      if(this.op.info.prop!=='add'){
          this.formData = {
              ...this.formData,
              ...this.op.rowData,
          }
      }
  },
  methods: {
    onClose() {
      this.resetForm();
    },
    onOpen() {},
    confirm() {
      this.$refs["elForm"].validate((valid) => {
        if (!valid) return;
        const params = JSON.parse(JSON.stringify(this.formData));

        if (this.op.info.prop !== "add") {
          params.id = this.op.rowData.id;
        }
        if (this.loading) return;
        this.loading = true;
        this.op
          .api({
            ...params,
          })
          .then(
            () => {
              this.loading = false;
              this.$message.success(`配置成功`);
              this.$emit('cancel', true);
              this.resetForm();
            },
            () => {
              this.loading = false;
            }
          );
      });
    },
    resetForm() {
      this.$emit("update:visible", false);
    },
  },
};
</script>
<style lang="scss" scoped>
.app-dialog-container {
  /deep/ .el-form-item {
    width: 100%;
    display: flex;
    .el-form-item__content {
      flex: 1;
      display: flex;
      .el-input {
        width: 100%;
      }
    }
  }
}
</style>
