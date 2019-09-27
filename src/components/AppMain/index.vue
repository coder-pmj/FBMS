<template>
  <div class="main">
    <app-title></app-title>
    <router-view></router-view>
    <changepass-dialog></changepass-dialog>
  </div>
</template>

<script>
import ChangePass from "@/views/ChangePass";
import AppTitle from "@/components/AppMain/AppTitle"
export default {
  components: {
    "changepass-dialog": ChangePass,
    "app-title":AppTitle
  }
};
</script>

<style lang="less" scoped>
@import "../../style/appMain.less";
</style>