<template>
  <div>
    <a-upload
    name="file"
    list-type="picture-card"
    :show-upload-list="false"
    :action="upUrl"
    @change="handleChange"
  >
    <a-button>
      <a-icon type="upload"/>
      添加导师
    </a-button>
  </a-upload>
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
          slot-scope="data"
        >
          <div class="actionSlot">
            <a-button
              size="small"
              type="primary"
              icon="info-circle"
              @click="getMentorInfo(data.user_id)"
            >详情</a-button>
          </div>
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
      <a-modal
         title="导入结果"
        :visible="visible"
        @ok="visible=false"
        @cancel="visible=false"
        
      >
        <a-alert 
        v-for="(item, index) in response" 
        :key="index" 
        :message="item.user_id + item.msg" 
        :type="item.status == 0 ? 'info' : 'error'"></a-alert>
      </a-modal>
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
    title: "学位",
    dataIndex: "degree",
    key: "degree",
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
import adminService from '@/service/adminService'
import userService from '@/service/userService'
export default {
  data() {
    return {
      response:[{msg:'',status:'',user_id:''}],
      visible:false,
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
      },
      detailVisible: false,
      mentorDetail: {},
      upUrl: process.env.VUE_APP_BASE_URL+ 'upload',
    }
  },
  created() {
    this.getMentorList()
  },
  methods: {
    handleChange(info) {
      if (info.file.status !== 'uploading') {
      }
      if (info.file.status === 'done') {
        this.visible = true
        this.response = info.file.response.data
      } else if (info.file.status === 'error') {
        this.$message.error(`上传失败`)
      }
    },
    async bindMentor(mentor_user_id) {
      const { data: res } = await userService.bindMentor(mentor_user_id)
      if (res.status !== 200) {
        return this.$message.error(res.msg)
      }
      return this.$message.success(res.msg)
    },
    async getMentorList() {
      const { data: res } = await adminService.getMentors(this.queryParam)
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
      this.getMentorList()
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