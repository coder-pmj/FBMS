<template>
  <div class="setting">
    <p>管理员id:{{data.id}}</p>
    <p>管理员姓名:{{data.name}}</p>
    <p>管理员类型:{{data.roles[0]}}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: JSON.parse(localStorage.getItem("MANAGE_USER_KEY"))
    };
  }
};
</script>

<style scoped>
.setting {
  padding: 20px;
}
</style>