import Vue from 'vue'
import App from './App.vue'
import { Menu, MenuItem, Button, Table,TableColumn } from 'element-ui'
import router from './router/index'

Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Button)
Vue.use(Table)
Vue.use(TableColumn)

import './components/index'
import './common/common.scss'
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
