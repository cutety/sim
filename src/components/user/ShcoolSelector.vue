<template>
	<div>
    <a-select :default-value="0" @change="pickerChange">
      <a-select-option v-for="(item,index) in provinceDataList" :key="index">{{item.label}}</a-select-option>
    </a-select>
    <a-select :default-value="0" @change="cityPicked">
      <a-select-option v-for="(item,index) in cities" :key="index">{{item.label}}</a-select-option>
    </a-select>
    <a-select :default-value="0" @change="schoolPicked">
      <a-select-option v-for="(item,index) in schoolList" :key="index">{{item.name}}</a-select-option>
    </a-select>
	</div>
</template>

<script>
import provinceData from '../city-data/province.js'
import cityData from '../city-data/city.js'
import areaData from '../city-data/area.js'
export default {
  data() {
    return {
      pickerValue: [0, 0, 0],
      provinceDataList: provinceData,
      cities: cityData[0],
      secondCity: cityData[0],
      areaDataList: areaData[0][0],
      /* 是否显示控件 */
      showPicker: false,
      currentProvince:'',
      currentCity:'',
      schoolList:'',
    }
  },
  created() {
    this.getSchoolData()
  },
  methods: {
   
    pickerChange(e) {
      this.cities = cityData[e]
      this.pickerValue[0] = e
      this.getSchoolData()
    },
    cityPicked(e) {
      this.pickerValue[1] = e 
      this.getSchoolData()
    },
    schoolPicked() {

    },
   		/**
			 * 自定义根据省市过滤大学数据
			 */
    getSchoolData: async function() {
      this.currentProvince = this.provinceDataList[this.pickerValue[0]].label
      this.currentCity = this.cities[this.pickerValue[1]].label
      const {data: res} = await this.$http.get('https://api.hcfpz.cn/un/schools', {params:{province:this.currentProvince,city:this.currentCity}})
      this.schoolList = res.data
    },
    
  }
}
</script>

