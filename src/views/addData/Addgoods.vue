<template>
  <div>
    <el-form
      ref="form"
      :model="form"
      label-width="100px"
      :rules="rules"
      style="margin:20px auto;width:900px;border:1px cyan dashed;padding:15px"
    >
      <el-form-item label="商家">
        <el-input disabled :value="supplier"></el-input>
      </el-form-item>
      <el-form-item label="食品名称" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="食品种类" prop="category">
        <el-select v-model="form.category" placeholder="请选择食品种类">
          <el-option v-for="li in foodsCategory" :label="li.name" :key="li.id" :value="li.name"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="食品活动" prop="activity">
        <el-input v-model="form.activity"></el-input>
      </el-form-item>
      <el-form-item label="食品详情" prop="desc">
        <el-input v-model="form.desc"></el-input>
      </el-form-item>
      <el-form-item label="上传食品图片">
        <el-upload
          class="avatar-uploader"
          action
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="form.image" :src="form.image" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="食品特点" prop="characteristic">
        <el-select v-model="form.characteristic" placeholder="请选择食品特点">
          <el-option
            v-for="li in foodsCharacteristic"
            :label="li.name"
            :key="li.id"
            :value="li.name"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="食品规格" prop="spec">
        <el-radio-group v-model="form.spec">
          <el-radio label="单规格">单规格</el-radio>
          <el-radio label="多规格">多规格</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item v-show="form.spec=='多规格'">
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

      <el-form-item v-show="form.spec=='多规格'">
        <el-button type="primary" @click="addSpec">添加规格</el-button>
      </el-form-item>

      <el-form-item label="包装费" prop="packMoney">
        <el-input-number v-model="form.packMoney" :min="0" :max="100"></el-input-number>
      </el-form-item>
      <el-form-item label="价格" prop="price">
        <el-input-number v-model="form.price" :min="0" :max="100"></el-input-number>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('form')">确认添加</el-button>
      </el-form-item>
    </el-form>

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
import addgoodsApi from "@/api/addgoods";
export default {
  data() {
    return {
      suppliers: null,
      foodsCategory: null,
      foodsCharacteristic: null,
      form: {
        name: "", //食品名称
        category: "", //食品种类
        activity: "", //食品活动
        desc: "", //食品详情
        image: "", //食品图片
        characteristic: "", //食品特点
        spec: "单规格", //食品规格
        packMoney: "1", //食品包装费
        price: "" //食品价格
      },
      childTableData: [{ spec: "默认", packingPrice: "1", price: "20" }],
      dialogFormVisible2: false,
      form2: { id: 1, spec: "", packingPrice: "", price: "" },
      rules: {
        name: [{ required: true, message: "食品名称必填", trigger: "blur" }]
      },
      rules2: {
        spec: [{ required: true, message: "规格名必填", trigger: "blur" }],
        packingPrice: [
          { required: true, message: "包装费必填", trigger: "blur" }
        ],
        price: [{ required: true, message: "价格必填", trigger: "blur" }]
      }
    };
  },
  created() {
    this.suppliers = this.$store.state.addfoodsInfo.supplierInfo; //加载店铺
    this.foodsCategory = this.$store.state.addfoodsInfo.foodsCategory; //加载食品种类
    this.foodsCharacteristic = this.$store.state.addfoodsInfo.characteristic; //加载食品特点分类
  },
  mounted() {
    this.checkInfo();
  },
  computed: {
    supplier() {
      if (this.suppliers) {
        return this.suppliers.name;
      } else {
        return "未选择店铺 (您可以前往商家页面选择店铺) ";
      }
    }
  },
  methods: {
    handleAvatarSuccess() {},
    beforeAvatarUpload() {},
    //添加
    onSubmit(s) {
      this.$refs[s].validate(v => {
        if (v) {
          addgoodsApi.addGoods(this.form).then(res => {
            //console.log(res.data);
            this.$message({
              type: res.data.flag ? "success" : "warning",
              message: res.data.message
            });
            if (res.data.flag) {
              this.$refs[s].resetFields();
            }
          });
        } else {
          this.$message("填入必填项");
        }
      });
    },
    checkInfo() {
      if (!this.suppliers) {
        this.$confirm(
          "您没有选择店铺 或 店铺信息已失效 , 是否前往选择店铺?",
          "提示",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }
        )
          .then(() => {
            this.$router.push("/SupplierList/");
          })
          .catch(() => {});
      }
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

<style>
.avatar-uploader .el-upload {
  width: 150px;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 25px;
}
</style>