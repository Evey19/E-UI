import Vue from 'vue';
import PopupManager from './popup-manager'

let id = 1
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    modal: {
      type: Boolean,
      default: false
    },
    closeOnClickModal: {
      type: Boolean,
      default: false
    },
    zIndex: {}
  },
  beforeMount() {
    this._popupId = 'popup-' + id++;
    PopupManager.register(this._popupId, this)
  },
  beforeDestroy() {
    PopupManager.deregister(this._popupId)
    PopupManager.closeModal(this._popupId)
  },
  data() {
    return {
      opened: false,
      rendered: false
    }
  },
  watch: {
    visible(val) {
      if (val) {
        if (this._opening) return
        if (!this.rendered) {
          this.rendered = true
          Vue.nextTick(() => {
            this.open()
          })
        } else {
          this.open()
        }
      } else {
        this.close()
      }
    }
  },
  methods: {
    open() {
      if (!this.rendered) {
        this.rendered = true
      }
      const props = this.$props
      this.doOpen(props)
    },
    doOpen(props) {
      if (this.opened) return
      this._opening = true
      const dom = this.$el
      const modal = props.modal
      const zIndex = props.zIndex
      if (zIndex) {
        PopupManager.zIndex = zIndex
      }
      if (modal) {
        PopupManager.openModal(this._popupId, PopupManager.nextZIndex(), dom)
      }
      dom.style.zIndex = PopupManager.nextZIndex()
      this.opened = true
      this.doAfterOpen()
    },
    doAfterOpen() {
      this._opening = false
    },
    close() {
      this.doClose()
    },
    doClose() {
      this._closing = true
      this.opened = false
      this.doAfterClose()
    },
    doAfterClose() {
      PopupManager.closeModal(this._popupId)
      this._closing = false
    }
  },
}

export {
  PopupManager
}