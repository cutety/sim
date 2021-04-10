<template>
  <div>
    <a-card>
      <a-row>
        <a-col style="margin-right: 5px" :span="4">
          <a-input v-model="queryParam.grade" placeholder="请输入年级" allowClear />
        </a-col>
        <a-col style="margin-right: 5px" :span="4">
          <a-input v-model="queryParam.major" placeholder="请输入专业" allowClear />
        </a-col>
        <a-col style="margin-right: 5px" :span="4">
          <a-input v-model="queryParam.stu_name" placeholder="请输入姓名" allowClear />
        </a-col>
        <a-col :span="2">
          <a-select placeholder="请选择性别" @change="selectGender" style="width: 125px">
            <a-select-option :value=1 :key="1">
              男
            </a-select-option>
            <a-select-option :value=0 :key="0">
              女
            </a-select-option>
          </a-select>
        </a-col>
        <a-col :span="4">
          <a-button type="primary" icon="search" @click="getStudentsList">
            搜索
          </a-button>
        </a-col>
      </a-row>

        <a-table
          rowKey="user_id"
          :columns="columns"
          :pagination="pagination"
          :data-source="students"
          bordere
          @change="handleTableChange"
        >
          <span slot="gender" slot-scope="data">{{ data == 1 ? '男' : '女' }}</span>
          <template
            slot="action"
            slot-scope="text, record, index"
          >
            <div class="actionSlot">
              <a-button
                size="small"
                type="primary"
                style="margin-right: 15px"
                icon="info-circle"
                @click="getStudentInfo(index)"
              >详情
              </a-button>
            </div>
            <a-modal
              width="900px"
              :column="{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }"
              v-model="visible"
              title="详细资料"
              ok-text="确认" cancel-text="取消"
              @ok="handleOk"
            >
              <a-descriptions
                title="学生信息"
                bordered
              >
                <a-descriptions-item label="姓名">
                  {{ studentsDetail.stu_name }}
                </a-descriptions-item>
                <a-descriptions-item label="学号">
                  {{ studentsDetail.user_id }}
                </a-descriptions-item>
                <a-descriptions-item label="性别">
                  {{ studentsDetail.gender == 1 ? '男' : '女' }}
                </a-descriptions-item>
                <a-descriptions-item label="电话">
                  {{ studentsDetail.phone }}
                </a-descriptions-item>
                <a-descriptions-item label="邮箱">
                  {{ studentsDetail.email }}
                </a-descriptions-item>
                <a-descriptions-item label="微信">
                  {{ studentsDetail.wechat }}
                </a-descriptions-item>
                <a-descriptions-item label="QQ">
                  {{ studentsDetail.qq }}
                </a-descriptions-item>
                <a-descriptions-item label="专业">
                  {{ studentsDetail.major }}
                </a-descriptions-item>
                <a-descriptions-item label="报考院校">
                  {{ studentsDetail.apply_school }}
                </a-descriptions-item>
                <a-descriptions-item label="报考专业">
                  {{ studentsDetail.apply_major }}
                </a-descriptions-item>
                <a-descriptions-item label="初试成绩">
                  {{ studentsDetail.preliminary_result }}
                </a-descriptions-item>
                <a-descriptions-item label="复试成绩">
                  {{ studentsDetail.retrail_result }}
                </a-descriptions-item>
                <a-descriptions-item label="录取学校">
                  {{ studentsDetail.admission_school }}
                </a-descriptions-item>
                <a-descriptions-item label="录取专业">
                  {{ studentsDetail.admission_major }}
                </a-descriptions-item>
                <a-descriptions-item label="是否被录取">
                  {{ studentsDetail.gender == 1 ? '是' : '否' }}
                </a-descriptions-item>
              </a-descriptions>
            </a-modal>
          </template>
        </a-table>
    </a-card>
  </div>
</template>

<script>
const columns = [
  {
    title: "姓名",
    dataIndex: "stu_name",
    key: "stu_name",
  },
  {
    title: "性别",
    dataIndex: "gender",
    key: "gender",
    scopedSlots: {customRender: 'gender'}
  },
  {
    title: "年级",
    dataIndex: "grade",
    key: "grade",
  },
  {
    title: "专业",
    dataIndex: "major",
    key: "major",
  },
  {
    title: "报考院校",
    dataIndex: "apply_school",
    key: "apply_school",
  },
  {
    title: "报考专业",
    dataIndex: "apply_major",
    key: "apply_major",
  },
  {
    title: "操作",
    width: "20%",
    key: "action",
    align: "center",
    scopedSlots: {customRender: "action"},
  },
]
import userService from '@/service/userService'

export default {
  data() {
    return {
      pagination: {
        pageSizeOption: ["5", "10", "15"],
        pageSize: 5,
        total: 0,
        showSizeChanger: true,
        showTotal: (total) => `共${total}条`,
      },
      students: [],
      studentsDetail: {},
      columns,
      queryParam: {
        page_size: 5,
        page_number: 1,
        user_id: '',
        stu_name: '',
        gender: -1,
        grade: '',
        major: '',
      },
      visible: false,
      upUrl: process.env.VUE_APP_BASE_URL + 'upload',
    }
  },
  created() {
    this.getStudentsList()
  },
  methods: {
    selectGender(value) {
      this.queryParam.gender = parseInt(value)
    },
    async getStudentsList() {
      const {data: res} = await userService.getStudentDetail(this.queryParam)
      this.students = res.data.items
      this.pagination.total = res.data.total
    },
    async getStudentInfo(index) {
      this.visible = true
      console.log(index)
      this.studentsDetail = this.students[index]
    },
    handleTableChange(pagination, filters, sorter) {
      var pager = {...this.pagination}
      pager.current = pagination.current
      pager.pageSize = pagination.pageSize
      this.queryParam.page_size = pagination.pageSize
      this.queryParam.page_number = pagination.current

      if (pagination.pageSize !== this.pagination.pageSize) {
        this.queryParam.page_number = 1
        pager.current = 1
      }
      this.pagination = pager
      this.getStudentsList()
    },
    handleOk() {
      this.detailVisible = false
    },
    handleCancel() {
      this.detailVisible = false
    },
  }
}
</script>
