const mousewheel = function (element, callback) {
    if (element && element.addEventListener) {
        element.addEventListener('mousewheel', function (event) {
            callback && callback.apply(this, [event])
        })
    }
}

export default {
    bind(el, binding) {
        mousewheel(el, binding.value)
    }
}