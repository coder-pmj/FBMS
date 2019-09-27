<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%;margin-top:10px"
      height="600"
      :header-cell-style="{background:'#eef1f6',color:'#606266'}"
    >
      <el-table-column type="expand">
        <template #default="props">
          <el-form label-position="left" class="demo-table-expand" :inline="true">
            <el-form-item label="用户名">
              <span>{{ props.row.user_name }}</span>
            </el-form-item>
            <el-form-item label="店铺名称">
              <span>{{ props.row.shop_name }}</span>
            </el-form-item>
            <el-form-item label="店铺ID">
              <span>{{ props.row.shop_id }}</span>
            </el-form-item>
            <el-form-item label="店铺地址">
              <span>{{ props.row.shop_address }}</span>
            </el-form-item>
            <el-form-item label="收货地址">
              <span>{{ props.row.give_address }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="订单ID" prop="order_id"></el-table-column>
      <el-table-column label="总价格" prop="price"></el-table-column>

      <el-table-column label="订单状态" prop="order_status">
        <template #default="scope">
          {{scope.row.order_status|statusFilter}}
          <i
            v-if="scope.row.order_status=='1'"
            class="el-icon-success"
          ></i>
          <i v-else class="el-icon-circle-close"></i>
        </template>
      </el-table-column>
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
import orderListApi from "@/api/orderList";

export default {
  data() {
    return {
      tableData: [], //表格数据
      pageSize: 20, //表格数据量
      currentPage: 1, //当前页
      total: 200 //总记录数
    };
  },
  created() {
    this.fetchData();
  },

  methods: {
    beforeAvatarUpload() {},
    handleAvatarSuccess() {},
    fetchData() {
      orderListApi.getOrderList(this.currentPage, this.pageSize).then(res => {
        // console.log(res);
        const resp = res.data.data;
        //console.log(resp);
        this.total = resp.total;
        this.tableData = resp.rows;
      });
    },
    //处理当前页发生变化
    currentChange(va) {
      this.currentPage = va;
      this.fetchData();
    }
  },
  filters: {
    statusFilter(v) {
      if (v == "1") {
        return "支付成功";
      } else {
        return "支付超时";
      }
    }
  }
};
</script>

<style scoped>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>