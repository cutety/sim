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
        <span
          slot="gender"
          slot-scope="data"
        >{{ data == 1 ? '男' : '女' }}</span>
        <template
          slot="action"
          slot-scope="text, record, index"
        >
          <div class="actionSlot">
            <a-button
              size="small"
              type="primary"
              icon="info-circle"
              @click="getStudentInfo(index)"
            >详情</a-button>
            <a-button
              style="margin-left: 15px"
              size="small"
              type="danger"
              icon="heart"
              @click="chooseStudent(index)"
            >同意</a-button>
            <a-button
              style="margin-left: 15px"
              size="small"
              type="danger"
              icon="heart"
              @click="popNote(index)"
            >拒绝</a-button>
          </div>
          <a-modal
            width="900px"
            :column="{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }"
            v-model="visible"
            title="详细资料"
            ok-text="确认"
            cancel-text="取消"
            @ok="handleOk"
          >
            <a-descriptions
              title="学生信息"
              bordered
            >
              <a-descriptions-item label="姓名">
                {{studentsDetail.stu_name}}
              </a-descriptions-item>
              <a-descriptions-item label="学号">
                {{studentsDetail.user_id}}
              </a-descriptions-item>
              <a-descriptions-item label="性别">
                {{studentsDetail.gender == 1 ? '男' : '女'}}
              </a-descriptions-item>
              <a-descriptions-item label="电话">
                {{studentsDetail.phone}}
              </a-descriptions-item>
              <a-descriptions-item label="邮箱">
                {{studentsDetail.email}}
              </a-descriptions-item>
              <a-descriptions-item label="微信">
                {{studentsDetail.wechat}}
              </a-descriptions-item>
              <a-descriptions-item label="QQ">
                {{studentsDetail.qq}}
              </a-descriptions-item>
              <a-descriptions-item label="专业">
                {{studentsDetail.major}}
              </a-descriptions-item>
              <a-descriptions-item label="报考院校">
                {{studentsDetail.apply_school}}
              </a-descriptions-item>
              <a-descriptions-item label="报考专业">
                {{studentsDetail.apply_major}}
              </a-descriptions-item>
              <a-descriptions-item label="初试成绩">
                {{studentsDetail.preliminary_result}}
              </a-descriptions-item>
              <a-descriptions-item label="复试成绩">
                {{studentsDetail.retrail_result}}
              </a-descriptions-item>
              <a-descriptions-item label="录取学校">
                {{studentsDetail.admission_school}}
              </a-descriptions-item>
              <a-descriptions-item label="录取专业">
                {{studentsDetail.admission_major}}
              </a-descriptions-item>
              <a-descriptions-item label="是否被录取">
                {{studentsDetail.gender == 1 ? '是' : '否'}}
              </a-descriptions-item>
              <a-descriptions-item label="申请">
                {{studentsDetail.note}}
              </a-descriptions-item>
            </a-descriptions>
          </a-modal>
        </template>
      </a-table>
    </a-card>
    <a-modal
      width="900px"
      :column="{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }"
      v-model="noteVisible"
      title="拒绝原因"
      ok-text="确认"
      cancel-text="取消"
      @ok="reject"
      @cancel="handleCancel"
    >
      <a-textarea
        placeholder="在这里输入拒绝原因"
        :auto-size="{ minRows: 3, maxRows: 6 }"
        v-model="dualSelection.note"
      >

      </a-textarea>
    </a-modal>
  </div>
</template>

<script>
const columns = [
  {
    title: "姓名",
    dataIndex: "stu_name",
    key: "stu_name",
    width: "5%",
  },
  {
    title: "性别",
    dataIndex: "gender",
    key: "gender",
    scopedSlots: { customRender: "gender" },
    width: "5%",
  },
  {
    title: "年级",
    dataIndex: "grade",
    key: "grade",
    width: "5%",
  },
  {
    title: "专业",
    dataIndex: "major",
    key: "major",
    width: "15%",
  },
  {
    title: "报考院校",
    dataIndex: "apply_school",
    key: "apply_school",
    width: "10%",
  },
  {
    title: "报考专业",
    dataIndex: "apply_major",
    key: "apply_major",
    width: "15%",
  },
  {
    title:"申请",
    width: "20%",
    dataIndex:"note",
    key:"note",
  },
  {
    title: "操作",
    width: "20%",
    key: "action",
    align: "center",
    scopedSlots: { customRender: "action" },
  },
]
import mentorService from "@/service/mentorService"
import userService from "@/service/userService"

import storageService from "@/service/storageService"
export default {
  data() {
    return {
      noteVisible:false,
      pagination: {
        pageSizeOption: ["5", "10", "15"],
        pageSize: 5,
        total: 0,
        showSizeChanger: true,
        showTotal: (total) => `共${total}条`,
      },
      student_user_id:'',
      students: [],
      studentsDetail: {},
      dualSelection: {
        note:''
      },
      columns,
      queryParam: {
        page_size: 5,
        page_number: 1,
        user_id: "",
      },
      visible: false,
      upUrl: process.env.VUE_APP_BASE_URL + "upload",
    }
  },
  created() {
    this.queryParam.user_id = JSON.parse(
      storageService.get(storageService.USER_INFO)
    ).user_id
    this.getMentorList()
  },
  methods: {
    async chooseStudent(index) {
      this.dualSelection.user_id = this.students[index].user_id
      this.dualSelection.mentor_user_id = this.queryParam.user_id
      this.dualSelection.status = 1
      const { data: res } = await userService.dualSelect(this.dualSelection)
      if (res.status !== 200) {
        return this.$message.error(res.msg)
      }
      this.getMentorList()
      return this.$message.success(res.msg)
    },
    async getMentorList() {
      const { data: res } = await mentorService.instructRequest(
        this.queryParam
      )
      this.students = res.data.items
      this.pagination.total = res.data.total
    },
    async getStudentInfo(index) {
      this.visible = true
      this.studentsDetail = this.students[index]
    },
    popNote(index) {
      this.student_user_id = this.students[index].user_id
      this.noteVisible = true
    },
    async reject() {
      this.dualSelection.user_id = this.student_user_id
      this.dualSelection.mentor_user_id = ''
      this.dualSelection.status = 2
      const { data: res } = await userService.dualSelect(this.dualSelection)
      if (res.status !== 200) {
        this.noteVisible = false
        return this.$message.error(res.msg)
      }
      this.noteVisible = false
      this.getMentorList()
      return this.$message.success(res.msg)
    },
    handleTableChange(pagination, filters, sorter) {
      var pager = { ...this.pagination }
      pager.current = pagination.current
      pager.pageSize = pagination.pageSize
      this.queryParam.page_size = pagination.pageSize
      this.queryParam.page_number = pagination.current

      if (pagination.pageSize !== this.pagination.pageSize) {
        this.queryParam.page_number = 1
        pager.current = 1
      }
      this.pagination = pager
      this.getMentorList()
    },
    handleOk() {
      this.detailVisible = false
    },
    handleCancel() {
      this.detailVisible = false
    },
  },
}
</script>