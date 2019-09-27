<template>
  <div id="myChart" :style="{width: '1150px', height: '600px',padding:'20px'}"></div>
</template>

<script>
import userdistributionApi from "@/api/userdistribution";
export default {
  mounted() {
    this.drawthem();
  },

  methods: {
    drawthem() {
      let dom = this.$echarts.init(document.getElementById("myChart"));
      let option;
      userdistributionApi.getuserData().then(res => {
        const resp = res.data;

        if (resp.flag) {
          option = {
            title: {
              text: "用户分布",
              x: "center"
            },
            tooltip: {
              trigger: "item",
              formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
              orient: "vertical",
              left: "20",
              data: resp.legend_data //获取接口数据
            },
            series: [
              {
                name: "分布",
                type: "pie",
                radius: "55%",
                center: ["50%", "60%"],
                data: resp.series_data, //获取接口数据
                itemStyle: {
                  emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: "rgba(0, 0, 0, 0.5)"
                  }
                }
              }
            ]
          };
        }

        dom.setOption(option);
      });
    }
  }
};
</script>

<style scoped>
</style>