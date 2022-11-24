import Vue from 'vue'
import Loading from './loading.vue'

const Mask = Vue.extend(Loading)

const loadingDirective = {}

loadingDirective.install = Vue => {
  const toggleLoading = (el, binding) => {
    if (binding.value) {
      if (binding.modifiers.body) {
        insertDom(document.body, el, binding)
      } else {
        insertDom(el, el, binding)
      }
    } else {
      el.instance.visible = false
      el.domVisible = false
    }
  }
  const insertDom = (parent, el, binding) => {
    if (!el.domVisible) {
      el.domVisible = true
      parent.appendChild(el.mask)
      el.instance.visible = true
    }
  }
  Vue.directive('loading', {
    bind: function (el, binding, vnode) {
      const textExr = el.getAttribute('e-loading-text')
      const spinnerExr = el.getAttribute('e-loading-spinner')
      const vm = vnode.context
      const mask = new Mask({
        el: document.createElement('div'),
        data: {
          text: vm && vm[textExr] || textExr,
          spinner: vm && vm[spinnerExr] || spinnerExr
        }
      })
      el.instance = mask
      el.mask = mask.$el
      binding.value && toggleLoading(el, binding)
    },
    update: function (el, binding) {
      el.instance.setText(el.getAttribute('e-loading-text'))
      if (binding.oldValue !== binding.value) {
        toggleLoading(el, binding)
      }
    },
    unbind: function (el) {
      el.mask && el.mask.parentNode && el.mask.parentNode.removeChild(el.mask)
      toggleLoading(el, { value: false })
      el.instance && el.instance.$destroy()
    }
  })
}



export default loadingDirective