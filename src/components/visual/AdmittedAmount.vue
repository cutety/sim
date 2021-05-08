<template>
  <div>
    <a-row>
      <a-col :span="12">
        <a-select :default-value="grade" v-model="grade" style="width: 120px" @change="getAdmittedAmount">
          <a-select-option v-for="option of gradeList"
                           :value="option" :key="option">{{option}}</a-select-option>
        </a-select>
        <ve-pie :data="pieData"></ve-pie>
      </a-col>
      <a-col :span="12">
        <div id="app" style="width:1rem;height:0.33rem;margin-left:20px;padding-top:50px">
          <div ref="chart" style="width:280px;height:300px"></div>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import echarts from 'echarts'
import userService from "../../service/userService"

export default {
  name: "AdmittedAmount",
  data() {

    return {
      gradeList: [],
      grade:17,
      pieData: {
        columns: ['name', 'value'],
        rows: [{'name': '上岸人数', 'value': 0},
          {'name': '报考人数', 'value': 0}]
      }
    }
  },
  mounted() {
    this.getGrade()
    this.getAdmittedAmount(this.grade)
    this.drawChart()
  },
  methods: {
    async getGrade() {
      const {data: res} = await userService.getGradeList()
      this.gradeList = res.data
    },
    async getAdmittedAmount(grade) {
      const {data: res} = await userService.getAdmittedAmount(grade)
      this.pieData.rows[0].value = res.data.admitted
      this.pieData.rows[1].value = res.data.total
    },
    drawChart() {
      let myCharts = echarts.init(this.$refs.chart)
      let option = {
        title: {
          text: ""
        },
        tooltip: {},
        legend: {
          data: ["人数"],
          textStyle:{
            color:'#48D1CC',
          }
        },
        xAxis: {
          data: [],
          axisLine:{
            lineStyle:{
              color:'#48D1CC',
              width:1
            }
          }
        },
        yAxis: {
          axisLine:{
            lineStyle:{
              color:'#48D1CC',
              width:1
            }
          }
        },
        series: [
          {
            name: "人数",
            type: "line",
            data: [],
            itemStyle:{
              normal: {
                label: {
                  show: true, //开启显示
                  position: 'top', //在上方显示
                  textStyle: { //数值样式
                    fontSize: 16
                  }
                }
              }
            }
          }
        ],
        color:'#48D1CC'
      }
      this.getAdmittedTendency().then(res => {
        option.xAxis.data = res.data.map(r => r.name)
        option.series[0].data=res.data.map(r => r.value)
        myCharts.setOption(option)
      })
    },
    async getAdmittedTendency() {
      const { data : res} = await userService.getAdmittedTendency()
      return res
    },
  },
}
</script>

<style scoped>

</style>
