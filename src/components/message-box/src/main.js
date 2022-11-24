import Vue from 'vue'
import msgboxVue from './main.vue'
import merge from '@/utils/merge'

const defaults = {
  title: null,
  message: '',
  type: '',
  iconClass: '',
  showClose: true,
  closeOnClickModal: true,
  center: false,
  showConfrimButton: true,
  showCancelButton: false,
  confirmButtonText: '',
  cancelButtonText: ''
}

const MessageBoxConstructor = Vue.extend(msgboxVue)

let instance, currentMsg
let msgQueue = []

const defaultCallback = action => {
  if (currentMsg) {
    if (currentMsg.resolve) {
      if (action === 'confirm') {
        currentMsg.resolve(action)
      } else if (currentMsg.reject && (action === 'cancel' || action === 'close')) {
        currentMsg.reject(action)
      }
    }
  }
}

const initInstance = () => {
  instance = new MessageBoxConstructor({
    el: document.createElement('div')
  })
  instance.callback = defaultCallback
}

const MessageBox = function (options, callback) {
  if (typeof options === 'string') {
    options = {
      message: options
    }
    if (typeof arguments[1] === 'string') {
      options.title = arguments[1]
    }
  } else if (options.callback && !callback) {
    callback = options.callback
  }
  if (typeof Promise !== 'undefined') {
    return new Promise((resolve, reject) => {
      msgQueue.push({
        options: merge({}, defaults, options),
        callback: callback,
        resolve: resolve,
        reject: reject
      })
      showNextMsg()
    })
  } else {
    msgQueue.push({
      options: merge({}, defaults, options),
      callback: callback
    })
    showNextMsg()
  }
}

const showNextMsg = () => {
  if (!instance) {
    initInstance();
  }
  instance.action = '';

  if (!instance.visible) {
    if (msgQueue.length > 0) {
      currentMsg = msgQueue.shift();

      let options = currentMsg.options;
      for (let prop in options) {
        if (options.hasOwnProperty(prop)) {
          instance[prop] = options[prop];
        }
      }
      if (options.callback === undefined) {
        instance.callback = defaultCallback;
      }

      let oldCb = instance.callback;
      instance.callback = (action, instance) => {
        oldCb(action, instance);
        showNextMsg();
      };
      document.body.appendChild(instance.$el);

      Vue.nextTick(() => {
        instance.visible = true;
      });
    }
  }
};
MessageBox.alert = (message, title, options) => {
  if (typeof title === 'object') {
    options = title;
    title = '';
  } else if (title === undefined) {
    title = '';
  }
  return MessageBox(merge({
    title: title,
    message: message,
    $type: 'alert',
    closeOnClickModal: false
  }, options));
};

MessageBox.confirm = (message, title, options) => {
  if (typeof title === 'object') {
    options = title;
    title = '';
  } else if (title === undefined) {
    title = '';
  }
  return MessageBox(merge({
    title: title,
    message: message,
    $type: 'confirm',
    showCancelButton: true
  }, options));
};

export default MessageBox
export { MessageBox }