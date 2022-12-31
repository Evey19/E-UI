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
  {
    path: "/Notify",
    component: resolve => require(['@/views/notify.vue'], resolve),
  },
  {
    path: "/Dialog",
    component: resolve => require(['@/views/dialog.vue'], resolve),
  },
  {
    path: "/Input",
    component: resolve => require(['@/views/input.vue'], resolve),
  },
  {
    path: "/Button",
    component: resolve => require(['@/views/button.vue'], resolve),
  },
  {
    path: "/Alert",
    component: resolve => require(['@/views/alert.vue'], resolve),
  },
  {
    path: "/Radio",
    component: resolve => require(['@/views/radio.vue'], resolve),
  },
  {
    path: "/Checkbox",
    component: resolve => require(['@/views/checkbox.vue'], resolve),
  },
  {
    path: "/Tag",
    component: resolve => require(['@/views/tag.vue'], resolve),
  },
  {
    path: "/Badge",
    component: resolve => require(['@/views/badge.vue'], resolve),
  },
  {
    path: "/Link",
    component: resolve => require(['@/views/link.vue'], resolve),
  },
  {
    path: "/Image",
    component: resolve => require(['@/views/image.vue'], resolve),
  },
  {
    path: "/Rate",
    component: resolve => require(['@/views/rate.vue'], resolve),
  },
]

export default routeArr