import Vue from 'vue'
import message from './message'
import MessageBox from './message-box'
import Loading from './loading'
import Notification from './notification'
import EDialog from './dialog'
import EInput from './input'
import EButton from './button'
import EButtonGroup from './button-group'
import EAlert from './alert'
import Radio from './radio'
import RadioGroup from './radio-group'
import RadioButton from './radio-button'
const components = [
  EDialog,
  EInput,
  EButton,
  EButtonGroup,
  EAlert,
  Radio,
  RadioGroup,
  RadioButton
]

const installComponents = function (Vue) {
  components.forEach(component => Vue.component(component.name, component))
  Vue.use(Loading)
  Vue.prototype.$message = message
  Vue.prototype.$alert = MessageBox.alert
  Vue.prototype.$confirm = MessageBox.confirm
  Vue.prototype.$notify = Notification
}

installComponents(Vue)
