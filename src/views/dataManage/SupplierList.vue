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
            <el-form-item label="店铺名称">
              <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item label="店铺介绍">
              <span>{{ props.row.introduction }}</span>
            </el-form-item>
            <el-form-item label="联系电话">
              <span>{{ props.row.phone }}</span>
            </el-form-item>
            <el-form-item label="销售量">
              <span>{{ props.row.sales }}</span>
            </el-form-item>

            <el-form-item label="店铺地址">
              <span>{{ props.row.address }}</span>
            </el-form-item>
            <el-form-item label="店铺ID">
              <span>{{ props.row.id }}</span>
            </el-form-item>
            <el-form-item label="评分">
              <span>{{ props.row.score }}</span>
            </el-form-item>
            <el-form-item label="分类">
              <span>{{ props.row.category }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="店铺名称" prop="name"></el-table-column>
      <el-table-column label="店铺地址" prop="address"></el-table-column>
      <el-table-column label="店铺介绍" prop="introduction"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit( scope.row)">编辑</el-button>
          <el-button size="mini" @click="addgoods(scope.row)">添加食品</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
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

    <el-dialog title="修改店铺信息" :visible.sync="dialogFormVisible">
      <el-form :model="forms" ref="editForm" :rules="rules">
        <el-form-item label="店铺名称" label-width="100px" prop="name">
          <el-input v-model="forms.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="详细地址" label-width="100px" prop="address">
          <el-input v-model="forms.address" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="店铺介绍" label-width="100px" prop="introduction">
          <el-input v-model="forms.introduction" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" label-width="100px" prop="phone">
          <el-input v-model="forms.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="店铺分类" label-width="100px" prop="category">
          <el-select v-model="forms.category" placeholder>
            <el-option :label="d.content" :value="d.content" v-for="d in list" :key="d.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="店铺图片" label-width="100px" prop="image">
          <el-upload
            class="avatar-uploader"
            action
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="forms.image" :src="forms.image" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="save('editForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import SupplierListApi from "@/api/supplierList";
export default {
  data() {
    return {
      list: this.$store.state.SupplierList.category, //编辑表单类别下拉列表进行vuex管理
      dialogFormVisible: false, //编辑表单可见性
      //编辑表单数据
      forms: {
        id: null,
        name: "",
        address: "",
        introduction: "",
        phone: "",
        category: "",
        image: ""
      },
      //自定义验证规则
      rules: {
        name: [{ required: true, message: "店铺名必填", trigger: "blur" }],
        address: [{ required: true, message: "地址必填", trigger: "blur" }],
        introduction: [
          { required: true, message: "介绍必填", trigger: "blur" }
        ],
        phone: [{ required: true, message: "手机号必填", trigger: "blur" }]
      },
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
      SupplierListApi.getSupplierList(this.currentPage, this.pageSize).then(
        res => {
          // console.log(res);
          const resp = res.data.data;
          //console.log(resp);
          this.total = resp.total;
          this.tableData = resp.rows;
        }
      );
    },
    //处理当前页发生变化
    currentChange(va) {
      this.currentPage = va;
      this.fetchData();
    },
    //监听编辑按钮
    handleEdit(row) {
      //
      // alert(`第${row.id}行被编辑`);
      this.dialogFormVisible = true;

      this.$nextTick(() => {
        this.$refs["editForm"].resetFields();
      });

      SupplierListApi.getSupplierData(row.id).then(res => {
        const resp = res.data;
        // console.log(resp.data)
        this.forms = resp.data;
      });
    },
    addgoods(row) {
      this.$store.state.addfoodsInfo.supplierInfo = row;
     // console.log(row.name); //row为商家的信息
      this.$router.push("/addgoods/");
    },
    handleDelete() {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          SupplierListApi.deleteSupplier(this.forms.id).then(res => {
            const resp = res.data;
            this.$message({
              type: resp.flag ? "success" : "warning",
              message: resp.message
            });
            if (resp.flag) {
              this.fetchData();
            }
          });
        })
        .catch(() => {});
    },

    //编辑后保存数据
    save(fo) {
      this.$refs[fo].validate(va => {
        if (va) {
          //提交数据到后台
          SupplierListApi.updateSupplier(this.forms.id).then(res => {
            const resp = res.data;

            if (resp.flag) {
              this.CloseFetchData();
            }
          });
        } else {
          this.$message({
            type: "warning",
            message: "请完整填写信息"
          });
        }
      });
    },
    //关闭编辑页面返回promise对象
    Closedialog() {
      return new Promise(resolve => {
        this.dialogFormVisible = false;
        resolve();
      });
    },
    //确保页面关闭后，执行刷新页面
    async CloseFetchData() {
      try {
        await this.Closedialog(); //关闭页面
        this.fetchData(); //页面刷新
        // console.log("已隐藏");
      } catch (err) {
        this.$message(err);
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