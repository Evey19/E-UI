import Vue from 'vue'
import message from './message'
import MessageBox from './message-box'
import Loading from './loading'
const components = [message]

const installComponents = function (Vue) {
  components.forEach(component => Vue.component(component.name, component))
  Vue.use(Loading)
  Vue.prototype.$message = message
  Vue.prototype.$alert = MessageBox.alert
  Vue.prototype.$confirm = MessageBox.confirm
}

installComponents(Vue)

// export deault{
//   message,
//   MessageBox
// }

export default{
  installComponents
}