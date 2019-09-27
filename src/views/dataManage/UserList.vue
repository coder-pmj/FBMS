<template>
  <div>
    <el-table
      :data="userdata"
      style="width: 100%;margin-top:10px"
      height="600"
      :header-cell-style="{background:'#eef1f6',color:'#606266'}"
    >
      <el-table-column prop="id" label="#" width="92"></el-table-column>
      <el-table-column prop="date" label="注册日期" width="180"></el-table-column>
      <el-table-column prop="name" label="用户姓名" width="180"></el-table-column>
      <el-table-column prop="address" label="注册地址"></el-table-column>
    </el-table>
    <el-pagination
      :page-size="pageSize"
      :current-page="currentPage"
      :page-sizes="[20]"
      background
      :pager-count="11"
      layout="total,prev, pager, next,sizes,jumper"
      :total="total"
      @current-change="currentChange"
    ></el-pagination>
  </div>
</template>

<script>
import userApi from "@/api/userList";
export default {
  data() {
    return {
      userdata: [],
      total: 120,
      pageSize: 20,
      currentPage: 1
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      userApi.getUserList(this.currentPage, this.pageSize).then(res => {
        const resp = res.data;
        this.total = resp.data.total;
        this.userdata = resp.data.rows;
      });
    },
    currentChange(va) {
     this.currentPage = va;
      this.fetchData();
    }
  }
};
</script>