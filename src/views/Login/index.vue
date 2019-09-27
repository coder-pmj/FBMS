<template>
  <div class="login-wrap">
    <h3 style="margin:0 0 30px 100px">后台管理系统</h3>
    <el-form
      label-width="100px"
      class="demo-ruleForm"
      ref="loginForm"
      :rules="rules"
      :model="forms"
    >
      <el-form-item label="用户名" prop="user">
        <el-input v-model="forms.user" placeholder="请输入用户名" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="forms.pass" placeholder="请输入密码" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('loginForm')">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    //用户名判断
    const username = (rule, value, callback) => {
      if (value) {
        callback()
      } else {
        callback(new Error("用户名不能为空"));
      }
    };
    return {
      forms: {
        user: "",
        pass: ""
      },
      rules: {
        user: [{ validator: username, trigger: "change" }],
        pass: [{ required: true, message: "密码不能为空", trigger: "change" }]
      }
    };
  },
  methods: {
    onSubmit(Form) {
      this.$refs[Form].validate(v => {
        if (v) {
          this.$store
            .dispatch("store_login", this.forms)
            .then(resp => {
              if (resp.flag) {
                this.$router.push("/");
              } else {
                this.$message({
                  type: "warning",
                  message: resp.message
                });
              }
            })
           
        } else {
          this.$message({
            type: "warning",
            message: "请填写登录项"
          });
        }
      });
    }
  }
};
</script>
<style scoped>
.login-wrap {
  border-style: double;
  padding: 30px 30px 5px 5px;
  width: 300px;
  margin: 200px auto;
  border-radius: 15px;
}
</style>