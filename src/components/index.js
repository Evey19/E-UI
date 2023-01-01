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
import Checkbox from './checkbox'
import CheckboxGroup from './checkbox-group'
import CheckboxButton from './checkbox-button'
import ETag from './tag'
import Badge from './badge'
import Link from './link'
import Backtop from './backtop'
import Image from './image'
import Rate from './rate'
import Step from './step'
import Steps from './steps'
const components = [
  EDialog,
  EInput,
  EButton,
  EButtonGroup,
  EAlert,
  Radio,
  RadioGroup,
  RadioButton,
  Checkbox,
  CheckboxGroup,
  CheckboxButton,
  ETag,
  Badge,
  Link,
  Backtop,
  Image,
  Rate,
  Step,
  Steps
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
