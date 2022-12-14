import { debounce } from "throttle-debounce"

const resizeHandler = function (entries) {
    for (let entry of entries) {
        const listeners = entry.target.__resizeListeners__ || []
        if (listeners.length) {
            listeners.forEach(fn => {
                fn()
            })
        }
    }
}

export const addResizeListener = function (element, fn) {
    if (!element.__resizeListeners__) {
        element.__resizeListeners__ = []
        element.__ro__ = new ResizeObserver(debounce(16, resizeHandler))
        element.__ro__.observe(element)
    }
    element.__resizeListeners__.push(fn)
}