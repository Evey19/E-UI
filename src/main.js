import Vue from 'vue'
import App from './App.vue'
import { Menu, MenuItem,Button } from 'element-ui'
import router from './router/index'

Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Button)

import './components/index'
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
