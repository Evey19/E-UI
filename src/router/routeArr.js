const routeArr = [
  {
    path: "/Message",
    component: resolve => require(['@/views/message.vue'], resolve),
  },
  {
    path: "/MessageBox",
    component: resolve => require(['@/views/messageBox.vue'], resolve),
  },
  {
    path: "/Loading",
    component: resolve => require(['@/views/loading.vue'], resolve),
  },
]

export default routeArr