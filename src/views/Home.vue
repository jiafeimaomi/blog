<template>
  <div class="home m-t-50">
    <el-form
      :model="formData"
      status-icon
      :rules="rules"
      ref="formData"
      label-width="100px"
      class="demo-formData"
    >
      <el-form-item
        label="用户名"
        prop="username"
        :rules="[
          {
            required: true,
            message: '请输入用户名',
            trigger: ['change', 'blur'],
          },
        ]"
      >
        <el-input v-model.trim="formData.username"></el-input>
      </el-form-item>
      <el-form-item
        label="密码"
        prop="password"
        :rules="[
          {
            required: true,
            message: '请输入密码',
            trigger: ['change', 'blur'],
          },
        ]"
      >
        <el-input
          v-model="formData.password"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="年龄"
        prop="age"
        :rules="[
          {
            required: true,
            message: '请输入年龄',
            trigger: ['change', 'blur'],
          },
        ]"
      >
        <el-input v-model="formData.age"/>
      </el-form-item>
      <el-row class="m-b-20">
        <router-link to="/register">用户注册</router-link>
      </el-row>
      <el-form-item>
        <el-button type="primary" @click="submitForm('formData')"
          >登录</el-button
        >
        <el-button @click="resetForm('formData')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// @ is an alias to /src
import * as api from "@/api/user.js";

export default {
  name: "Home",
  components: {},
  data() {
    return {
      loading: false,
      formData: {},
      rules: {},
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (!valid) return
        api.login({ ...this.formData }).then((res) => {
            console.log("---res------", res);
          });
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>
<style lang="scss" scoped>

</style>
