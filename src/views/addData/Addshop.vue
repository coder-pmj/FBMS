<template>
  <div>
    <el-form
      ref="form"
      :model="form"
      label-width="100px"
      :rules="rules"
      style="margin:20px auto;width:900px;border:1px cyan dashed;padding:15px"
    >
      <el-form-item label="店铺名称" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="详细地址" prop="address">
        <el-input v-model="form.address"></el-input>
      </el-form-item>
      <el-form-item label="联系电话" prop="phone">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="店铺简介" prop="desc">
        <el-input v-model="form.desc"></el-input>
      </el-form-item>
      <el-form-item label="店铺标语" prop="flag">
        <el-input v-model="form.flag"></el-input>
      </el-form-item>
      <el-form-item label="店铺分类" prop="category">
        <el-select v-model="form.category" placeholder="请选择">
          <el-option v-for="item in categoryOptions" :key="item.id" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="店铺特点" prop="characteristic">
        <el-switch v-model="form.characteristic[0]" inactive-text="美团外卖"></el-switch>
        <el-switch v-model="form.characteristic[1]" inactive-text="蜂鸟专送"></el-switch>
        <el-switch v-model="form.characteristic[2]" inactive-text="准时达"></el-switch>
        <el-switch v-model="form.characteristic[3]" inactive-text="开发票"></el-switch>
        <el-switch v-model="form.characteristic[4]" inactive-text="新开店铺"></el-switch>
      </el-form-item>
      <el-form-item label="配送费" prop="distributionFee">
        <el-input-number v-model="form.distributionFee" :min="0" :max="100"></el-input-number>
      </el-form-item>
      <el-form-item label="起送价" prop="beginningDeliveryPrice">
        <el-input-number v-model="form.beginningDeliveryPrice" :min="0" :max="100"></el-input-number>
      </el-form-item>
      <el-form-item label="营业时间" prop="workTime">
        <el-time-select
          placeholder="起始时间"
          v-model="form.workTime[0]"
          :picker-options="{
      start: '08:30',
      step: '00:15',
      end: '18:30'
    }"
        ></el-time-select>
        <el-time-select
          placeholder="结束时间"
          v-model="form.workTime[1]"
          :picker-options="{
      start: '08:30',
      step: '00:15',
      end: '18:30',
      minTime: form.workTime[0]
    }"
        ></el-time-select>
      </el-form-item>
      <el-form-item label="上传店铺头像">
        <el-upload
          class="avatar-uploader"
          action
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="form.image1" :src="form.image" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>

      <el-form-item label="上传营业执照">
        <el-upload
          class="avatar-uploader"
          action
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="form.image2" :src="form.image" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>

      <el-form-item label="上传餐饮服务许可证">
        <el-upload
          class="avatar-uploader"
          action
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="form.image3" :src="form.image" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>

      <el-form-item label="优惠活动" prop="activity">
        <el-select v-model="form.activity" placeholder="请选择">
          <el-option v-for="item in activities" :key="item.id" :value="item.value"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-table
          :data="childTableData"
          :header-cell-style="{background:'#eef1f6',color:'#606266'}"
        >
          <el-table-column label="活动标题">
            <template slot-scope="scope">{{scope.row.title}}</template>
          </el-table-column>
          <el-table-column label="活动名称" prop="name"></el-table-column>
          <el-table-column label="活动详情" prop="desc"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" type="danger" @click="DeleteSpec(scope.$index)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit('form')">立即创建</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import addsoopsApi from "@/api/addshops";
export default {
  data() {
    return {
      category: null,
      form: {
        image1: "",
        image2: "",
        image3: "",
        name: "",
        address: "",
        phone: "",
        desc: "",
        flag: "",
        characteristic: [true, true, true, true, true],
        category: "",
        distributionFee: "0", //配送费
        beginningDeliveryPrice: "10", //起送价
        workTime: [],
        activity: ""
      },
      childTableData: [
        { title: "减", name: "满减优惠", desc: "满30减5，满60减8" }
      ],

      rules: {
        name: [{ required: true, message: "店铺名称必填", trigger: "blur" }],
        address: [{ required: true, message: "店铺地址必填", trigger: "blur" }],
        phone: [{ required: true, message: "联系方式必填", trigger: "blur" }]
      }
    };
  },
  computed: {
    categoryOptions() {
      return this.$store.state.addshop.category;
    },
    activities() {
      return this.$store.state.addshop.activities;
    }
  },
  methods: {
    handleAvatarSuccess() {},
    beforeAvatarUpload() {},
    //添加
    onSubmit(s) {
      this.$refs[s].validate(v => {
        if (v) {
          addsoopsApi.addShops(this.form).then(res => {
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

    //规格删除按钮
    DeleteSpec(index) {
      // console.log(index);
      this.childTableData.splice(index, 1);
      //console.log(this.childTableData)
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