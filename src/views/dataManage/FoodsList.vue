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
            <el-form-item label="食品名称">
              <span>{{ props.row.foods_name }}</span>
            </el-form-item>
            <el-form-item label="食品ID">
              <span>{{ props.row.foods_id }}</span>
            </el-form-item>
            <el-form-item label="食品介绍">
              <span>{{ props.row.introduction }}</span>
            </el-form-item>
            <el-form-item label="食品评分">
              <span>{{ props.row.score }}</span>
            </el-form-item>
            <el-form-item label="销售量">
              <span>{{ props.row.sales }}</span>
            </el-form-item>
            <el-form-item label="联系电话">
              <span>{{ props.row.phone }}</span>
            </el-form-item>
            <el-form-item label="餐馆名称">
              <span>{{ props.row.shop_name }}</span>
            </el-form-item>
            <el-form-item label="餐馆ID">
              <span>{{ props.row.shop_id }}</span>
            </el-form-item>
            <el-form-item label="餐馆地址">
              <span>{{ props.row.address }}</span>
            </el-form-item>
            <el-form-item label="食品分类">
              <span>{{ props.row.category }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="食品名称" prop="foods_name"></el-table-column>
      <el-table-column label="食品介绍" prop="introduction"></el-table-column>
      <el-table-column label="评分" prop="score"></el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit( scope.row)">编辑</el-button>
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

    <el-dialog title="修改食品信息" :visible.sync="dialogFormVisible">
      <el-form :model="forms" ref="editForm" :rules="rules">
        <el-form-item label="食品名称" label-width="100px" prop="name">
          <el-input v-model="forms.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="食品介绍" label-width="100px" prop="introduction">
          <el-input v-model="forms.introduction" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="食品分类" label-width="100px" prop="category">
          <el-select v-model="forms.category" placeholder>
            <el-option :label="d.content" :value="d.content" v-for="d in list" :key="d.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="食品图片" label-width="100px" prop="image">
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
        <!-- 此处加table-->
        <el-form-item>
          <el-table
            :data="childTableData"
            :header-cell-style="{background:'#eef1f6',color:'#606266'}"
          >
            <el-table-column label="规格">
              <template slot-scope="scope">{{scope.row.spec}}</template>
            </el-table-column>
            <el-table-column label="包装费" prop="packingPrice"></el-table-column>
            <el-table-column label="价格" prop="price"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button size="mini" type="danger" @click="DeleteSpec(scope.$index)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addSpec">添加规格</el-button>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="save('editForm')">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="添加规格" :visible.sync="dialogFormVisible2">
      <el-form :model="form2" :rules="rules2" ref="spec">
        <el-form-item label="规格" label-width="100px" prop="spec">
          <el-input v-model="form2.spec" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="包装费" label-width="100px" prop="packingPrice">
          <el-input v-model="form2.packingPrice" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="价格" label-width="100px" prop="price">
          <el-input v-model="form2.price" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="saveSpec">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import foodsListApi from "@/api/foodsList";

export default {
  data() {
    return {
      form2: { id: 1, spec: "", packingPrice: "", price: "" },
      dialogFormVisible2: false,
      childTableData: [{ spec: "默认", packingPrice: "1", price: "20" }],
      list: this.$store.state.foodslist.category, //编辑表单类别下拉列表进行vuex管理
      dialogFormVisible: false, //编辑表单可见性
      //编辑表单数据
      forms: {
        id: null,
        name: "",
        introduction: "",
        category: "",
        image: ""
      },
      //自定义验证规则
      rules: {
        name: [{ required: true, message: "名称必填", trigger: "blur" }],
        introduction: [{ required: true, message: "介绍必填", trigger: "blur" }]
      },
      rules2: {
        spec: [{ required: true, message: "规格名必填", trigger: "blur" }],
        packingPrice: [
          { required: true, message: "包装费必填", trigger: "blur" }
        ],
        price: [{ required: true, message: "价格必填", trigger: "blur" }]
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
      foodsListApi.getfoodsList(this.currentPage, this.pageSize).then(res => {
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
    },
    //监听编辑按钮
    handleEdit(row) {
      //  this.$refs['editForm'].resetFields();
      // alert(`第${row.id}行被编辑`);
      this.dialogFormVisible = true;

      this.$nextTick(() => {
        //必须让表单元素渲染
        this.$refs["editForm"].resetFields();
      });

      foodsListApi.getfoodsData(row.id).then(res => {
        const resp = res.data;
        // console.log(resp.data)
        this.forms = resp.data;
      });
    },
    addgoods() {
      this.$router.push("/addgoods/");
    },
    handleDelete() {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        foodsListApi.deletefoods(this.forms.id).then(res => {
          const resp = res.data;
          this.$message({
            type: resp.flag ? "success" : "warning",
            message: resp.message
          });
          if (resp.flag) {
            this.fetchData();
          }
        });
      });
    },
    //关闭页面并返回一个成功状态的Promise
    Closedialog() {
      return new Promise((resolve, reject) => {
        this.dialogFormVisible = false;
        resolve();
        //reject('123');
      });
    },
    //关闭页面后执行页面刷新
    async CloseFetchData() {
      try {
        await this.Closedialog();
        this.fetchData();
        // console.log("已隐藏");
      } catch (err) {
        this.$message({
          message:err
        });
      }
    },
    //编辑页面==保存操作
    save(fo) {
      this.$refs[fo].validate(va => {
        if (va) {
          //提交数据到后台
          foodsListApi.updatefoods(this.forms.id).then(res => {
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
    //规格删除按钮
    DeleteSpec(index) {
      // console.log(index);
      this.childTableData.splice(index, 1);
      //console.log(this.childTableData)
    },
    addSpec() {
      this.dialogFormVisible2 = true;

      this.$nextTick(() => {
        this.$refs["spec"].resetFields();
      });
    },
    saveSpec() {
      this.childTableData.push({
        spec: this.form2.spec ? this.form2.spec : "其他规格",
        packingPrice: this.form2.packingPrice,
        price: this.form2.price
      });

      this.dialogFormVisible2 = false;
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