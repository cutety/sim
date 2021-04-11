<template>
  <div>
    <a-card>
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
                {{ studentsDetail.stu_id }}
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
import storageService from "../../service/storageService"

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
    title: "录取院校",
    dataIndex: "admission_school",
    key: "admission_school",
  },
  {
    title: "录取专业",
    dataIndex: "admission_major",
    key: "admission_major",
  },
  {
    title: "电话",
    key: "phone",
    dataIndex: "phone",
  },
  {
    title: "邮箱",
    key: "email",
    dataIndex: "email",
  },
  {
    title: "微信",
    key: "wechat",
    dataIndex: "wechat",
  },
  {
    title: "QQ",
    key: "qq",
    dataIndex: "qq",
  },
  {
    title: "操作",
    width: "20%",
    key: "action",
    align: "center",
    scopedSlots: {customRender: "action"},
  },
]
import userService from "../../service/userService"

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
      },
      visible: false,
      upUrl: process.env.VUE_APP_BASE_URL + 'upload',
    }
  },
  created() {
    this.queryParam.user_id = JSON.parse(
      storageService.get(storageService.USER_INFO)
    ).user_id
    this.getStudentsList()
  },
  methods: {
    selectGender(value) {
      this.queryParam.gender = parseInt(value)
    },
    async getStudentsList() {
      const {data: res} = await userService.getAdmissionHistory(this.queryParam)
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
