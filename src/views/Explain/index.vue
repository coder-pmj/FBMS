<template>
  <div class="explain">
    <el-form
      :inline="true"
      :model="forms"
      class="demo-form-inline"
      ref="addForm"
      style="position:fixed;z-index:2000;margin-top:20px"
    >
      <el-form-item label="内容" prop="content">
        <el-input v-model="forms.content" placeholder="内容"></el-input>
      </el-form-item>
      <el-form-item label="时间" prop="timestamp">
        <el-input v-model="forms.timestamp" placeholder="时间"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="add('addForm')">添加</el-button>
      </el-form-item>
    </el-form>

    <el-divider content-position="left" class="header">项目进度</el-divider>
    <div style="margin-top:120px;z-index:1000">
      <el-timeline :reverse="true">
        <el-timeline-item
          v-for="(activity, index) in activities"
          :key="index"
          :timestamp="activity.timestamp"
        >{{activity.content}}</el-timeline-item>
      </el-timeline>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activities: this.$store.state.schedule.scheduleArr,
      forms: {
        content: "",
        timestamp: ""
      }
    };
  },
  methods: {
    add(Fo) {
      this.$store.commit("addSchedule", this.forms);
      this.$refs[Fo].resetFields();
    }
  }
};
</script>

<style scoped>
.explain {
  padding: 20px;
  overflow: auto;
  height: 600px;
}
.header {
  margin-top: 95px;
  position: fixed;
}
</style>