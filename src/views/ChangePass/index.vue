<template>
  <el-dialog title="密码修改" :visible.sync="dialogVisible" width="420px" :before-close="handleClose">
    <el-form :model="form" ref="passForm" :rules="rules" status-icon>
      <el-form-item label="原密码" label-width="100px" prop="pwd">
        <el-input v-model="form.pwd" autocomplete="off" type="password"></el-input>
      </el-form-item>
      <el-form-item label="新密码" label-width="100px" prop="newPwd">
        <el-input v-model="form.newPwd" autocomplete="off" type="password"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" label-width="100px" prop="checkPwd">
        <el-input v-model="form.checkPwd" autocomplete="off" type="password"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="updatePass('passForm')">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import passApi from "@/api/password";
export default {
  data() {
    //原密码验证规则
    const tpwd = (rule, value, callback) => {
      if (value) {
        passApi
          .checkPwd(this.$store.state.user.userInfo.id, value)
          .then(res => {
            if (res.data.flag) {
              callback();
            } else {
              return callback(new Error("密码有误"));
            }
          });
      } else {
        return callback(new Error("原密码不能为空"));
      }
    };

    //新密码验证规则
    const tnewPwd = (rule, value, callback) => {
      if (value) {
        if (value == this.form.pwd) {
          callback(new Error("您设置的密码与原密码相同"));
        } else {
          callback();
        }
      } else {
        callback(new Error("密码不能为空"));
      }
    };

    //确认密码验证规则
    const tcheckpwd = (rule, value, callback) => {
      if (value) {
        if (value == this.form.newPwd) {
          callback();
        } else {
          callback(new Error("两次密码不一致"));
        }
      } else {
        callback(new Error("密码不能为空"));
      }
    };
    return {
      form: {
        pwd: "",
        newPwd: "",
        checkPwd: ""
      },
      rules: {
        pwd: [{ validator: tpwd, trigger: "change" }],
        newPwd: [{ validator: tnewPwd, trigger: "change" }],
        checkPwd: [{ validator: tcheckpwd, trigger: "change" }]
      }
    };
  },
  computed: {
    dialogVisible() {
      return this.$store.state.changepass.dialogVisible;
    }
  },
  methods: {
    handleClose() {
      this.$store.commit("changeVisable");
      this.$refs.passForm.resetFields();
    },
    updatePass(Formname) {
      // this.$refs[Formname].resetFields();
      this.$refs[Formname].validate(v => {
        if (v) {
          passApi
            .updatePwd(this.$store.state.user.userInfo.id, this.form.checkPwd)
            .then(res => {
              const resp = res.data;
              this.$message({
                type: resp.flag ? "success" : "warning",
                message: resp.message
              });
              //  this.$nextTick(() => {
              if (resp.flag) {
                //清空表单
                this.handleClose();

                //更新成功，退出系统
                this.$store.dispatch("store_logout").then(res => {
                  const resp = res.data;
                  if (resp.flag) {
                    this.$router.push("/login");
                  } else {
                    this.$message({
                      type: "warning",
                      message: res.message
                    });
                  }
                });
              }
              //});
            });
        }
      });
    }
  }
};
</script>

<style scoped>
</style>