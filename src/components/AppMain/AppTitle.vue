<template>
  
  <el-breadcrumb
    v-show="$route.path !== '/home/'"
    class="bea"
  >
    <el-breadcrumb-item style="font-size:19px;" class="el-icon-price-tag">{{$route.meta.title}}</el-breadcrumb-item>
  </el-breadcrumb>
 
</template>