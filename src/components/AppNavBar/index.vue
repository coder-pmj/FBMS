<template>
  <div class="navbar">
    <el-menu
      :default-active="this.$route.path"
      class="el-menu-vertical-demo"
      :unique-opened="true"
      background-color="#545c64"
      text-color="#fff"
      router
      active-text-color="#ffd04b"
    >
      <el-menu-item index="/home/">
        <i class="el-icon-s-home"></i>
        <span slot="title">首页</span>
      </el-menu-item>

      <el-submenu index="dataManage">
        <template slot="title">
          <i class="el-icon-s-operation"></i>
          <span>数据管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/userList/">用户列表</el-menu-item>
          <el-menu-item index="/supplierList/">商家列表</el-menu-item>
          <el-menu-item index="/foodsList/">食品列表</el-menu-item>
          <el-menu-item index="/odersList/">订单列表</el-menu-item>
          <el-menu-item index="/adminList/">管理员列表</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

      <el-submenu index="addData">
        <template slot="title">
          <i class="el-icon-plus"></i>
          <span>添加数据</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/addshop/">添加店铺</el-menu-item>
          <el-menu-item index="/addgoods/">添加食品</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

      <el-submenu index="userDistribution">
        <template slot="title">
          <i class="el-icon-document"></i>
          <span>图表</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/userDistribution/">用户分布</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

      <el-submenu index="edit">
        <template slot="title">
          <i class="el-icon-edit-outline"></i>
          <span>编辑</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/textEdit/">文本编辑</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

      <el-submenu index="setting">
        <template slot="title">
          <i class="el-icon-setting"></i>
          <span>设置</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/adminSetting/">管理员</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group>
          <el-menu-item @click="changepass">
            <span style="color:cyan">修改密码</span>
          </el-menu-item>
          <el-menu-item @click="exit">
            <span style="color:cyan">退出系统</span>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>

      <el-submenu index="explain">
        <template slot="title">
          <i class="el-icon-info"></i>
          <span>说明</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/explain/">说明</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>

    
  </div>
</template>

<script>
export default {
  methods: {
    changepass() {
      this.$store.commit("changeVisable");
    },
    exit() {
      // this.$store.dispatch("Logout");

      this.$confirm("确定退出系统?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
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
        })
        .catch(() => {});
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../style/appNavbar.less";
</style>