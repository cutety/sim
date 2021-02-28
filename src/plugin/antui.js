import Vue from 'vue'
import {
  Button,
  Form,
  Input,
  Row,
  Col,
  Icon,
  FormModel,
  message,
  Layout,
  Menu,
  Card,
  InputNumber,
  Radio,
  Switch,
  List,
  Space,
  Select,
  Table,
  Tag,
  Modal,
  Descriptions,
  Upload,
  Alert
} from 'ant-design-vue'

message.config({
  top: `100px`,
  duration: 2,
  maxCount: 3,
})

Vue.prototype.$message = message
Vue.use(Button)
Vue.use(Form)
Vue.use(Input)
Vue.use(Row)
Vue.use(Col)
Vue.use(Icon)
Vue.use(FormModel)
Vue.use(Layout)
Vue.use(Menu)
Vue.use(Card)
Vue.use(InputNumber)
Vue.use(Radio)
Vue.use(Switch)
Vue.use(List)
Vue.use(Space)
Vue.use(Select)
Vue.use(Table)
Vue.use(Tag)
Vue.use(Modal)
Vue.use(Descriptions)
Vue.use(Upload)
Vue.use(Alert)

