import Vue from 'vue'
import message from './message'
const components = [message]

const installComponents = function (Vue) {
  components.forEach(component => Vue.component(component.name, component))
  Vue.prototype.$message = message
}

installComponents(Vue)

export {
  message
}