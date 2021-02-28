<template>
  <div>
    <a-card>
      <a-table
        rowKey="ID"
        :columns="columns"
        :pagination="pagination"
        :data-source="MentorList"
        bordere
        @change="handleTableChange"
      >
        <a
          slot="name"
          slot-scope="text"
        >{{ text }}</a>
        <span slot="customTitle">
          <a-icon type="smile-o" /> 姓名
        </span>
        <template
          slot="action"
          slot-scope="text, record, index"
        >
          <div class="actionSlot">
            <a-button
              size="small"
              type="danger"
              icon="heart"
              style="margin-right: 15px"
              @click="popNote(index)"
              :disabled="record.status == 1 ? true : false"
            >{{record.status == 1 ? '已选择' : '选择'}}</a-button>
            <a-button
              size="small"
              type="primary"
              icon="info-circle"
              @click="getMentorInfo(index)"
            >详情</a-button>
          </div>
          <a-modal
            width="900px"
            :column="{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }"
            v-model="noteVisible"
            title="申请"
            ok-text="确认" cancel-text="取消"
            @ok="bindMentor(index)"
          >
          <a-textarea 
            placeholder="在这里输入申请内容"
            :auto-size="{ minRows: 3, maxRows: 6 }"
            v-model="dualSelection.note"
          >
            
          </a-textarea>
          </a-modal>
          <a-modal
            width="900px"
            :column="{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }"
            v-model="detailVisible"
            title="详细资料"
            ok-text="确认" cancel-text="取消"
            @ok="handleOk"
          >
            <a-descriptions
              title="导师信息"
              bordered
            >
              <a-descriptions-item label="姓名">
                {{mentorDetail.name}}
              </a-descriptions-item>
              <a-descriptions-item label="性别">
                {{mentorDetail.gender == 1 ? '男' : '女'}}
              </a-descriptions-item>
              <a-descriptions-item label="电话">
                {{mentorDetail.phone}}
              </a-descriptions-item>
              <a-descriptions-item label="邮箱">
                {{mentorDetail.email}}
              </a-descriptions-item>
              <a-descriptions-item label="微信">
                {{mentorDetail.wechat}}
              </a-descriptions-item>
              <a-descriptions-item label="QQ">
                {{mentorDetail.qq}}
              </a-descriptions-item>
              <a-descriptions-item label="学位">
                {{mentorDetail.degree}}
              </a-descriptions-item>
              <a-descriptions-item label="研究方向">
                {{mentorDetail.research_direction}}
              </a-descriptions-item>
              <a-descriptions-item label="本科">
                {{mentorDetail.undergraduate_university}}
                <br>
                {{mentorDetail.undergraduate_major}}
              </a-descriptions-item>
              <a-descriptions-item label="硕士">
                {{mentorDetail.graduate_school}}
                <br>
                {{mentorDetail.graduate_major}}
              </a-descriptions-item>
              <a-descriptions-item label="博士">
                {{mentorDetail.phd_school}}
                <br>
                {{mentorDetail.phd_major}}
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
    dataIndex: "name",
    key: "name",
    slots: { title: "customTitle" },
    scopedSlots: { customRender: "name" },
  },
  {
    title: "最高学位",
    dataIndex: "degree",
    key: "degree",
  },
  {
    title: "匹配学位",
    dataIndex: "match_degree",
    key: "match_degree",
  },
  {
    title: "匹配院校",
    dataIndex: "match_school",
    key: "match_school",
  },
  {
    title: "匹配专业",
    key: "match_major",
    dataIndex: "match_major",
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
    width: "15%",
    key: "action",
    align: "center",
    scopedSlots: { customRender: "action" },
  },
]
import userService from "@/service/userService"
import storageService from "@/service/storageService"
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
      MentorList: [],
      columns,
      queryParam: {
        page_size: 5,
        page_number: 1,
        user_id: "",
      },
      dualSelection:{
        note:'',
      },
      detailVisible: false,
      noteVisible: false,
      mentorDetail: {},
    }
  },
  created() {
    this.queryParam.user_id = JSON.parse(
      storageService.get(storageService.USER_INFO)
    ).user_id
    this.getMentorList()
  },
  methods: {
    popNote(index) {
      this.noteVisible = true
    },
    async bindMentor(index) {
      console.log(index)
      this.dualSelection.mentor_user_id = this.MentorList[index].user_id
      this.dualSelection.user_id = this.queryParam.user_id
      this.dualSelection.status = 0
      const { data: res } = await userService.dualSelect(this.dualSelection)
      if (res.status !== 200) {
        return this.$message.error(res.msg)
      }
      return this.$message.success(res.msg)
    },
    async getMentorList() {
      const { data: res } = await userService.getMentorList(this.queryParam)
      this.MentorList = res.data.items
      this.pagination.total = res.data.total
    },
    async getMentorInfo(mentor_user_id) {
      this.detailVisible = true
      const { data: res } = await userService.getMentorInfo(mentor_user_id)
      this.mentorDetail = res.data
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
      console.log(this.pagination)
      this.getMentorList()
    },
    handleOk() {
      this.detailVisible = false
    },
    handleCancel() {
      this.detailVisible = false
      this.noteVisible = false
    },
  },
}
</script>