import Vue from "vue"
import scrollbarWidth from '@/src/utils/scrollbar-width'

class TableLayout {
    constructor(options) {
        this.observers = []
        this.table = null
        this.store = null
        this.columns = null
        this.fit = true
        this.showHeader = true
        this.height = null
        this.scrollX = false
        this.scrollY = false
        this.bodyWidth = null
        this.fixedWidth = null
        this.rightFixedWidth = null
        this.bodyHeight = null
        this.tableHeight = null
        this.headerHeight = 44
        this.gutterWidth = scrollbarWidth()

        for (let name in options) {
            if (options.hasOwnProperty(name)) {
                this[name] = options[name]
            }
        }
        if (!this.table) {
            throw new Error('table is required for Table Layout')
        }
        if (!this.store) {
            throw new Error('store is required for Table Layout')
        }
    }
    updateScrollY() {
        const height = this.height
        if (height === null) return false
        const bodyWrapper = this.table.bodyWrapper
        if (this.table.$el && bodyWrapper) {
            const body = bodyWrapper.querySelector('.e-table__body')
            const prevScrollY = this.scrollY
            const scrollY = body.offsetHeight > this.bodyHeight
            this.scrollY = scrollY
            return prevScrollY !== scrollY
        }
        return false
    }
    setHeight(value, prop = 'height') {
        const el = this.table.$el
        value = parseHeight(value)
        this.height = value
        // if (!el && (value || value === 0)) return Vue.nextTick(() => this.setHeight(value, prop)
        if (typeof value === 'number') {
            el.style[prop] = value + 'px'
        } else if (typeof value === 'string') {
            el.style[prop] = value
        }
    }
    updateElsHeight() {
        const { headerWrapper, appendWrapper, footerWrapper } = this.table.$refs
        if (this.showHeader && !headerWrapper) return
        const headerTrElm = headerWrapper ? headerWrapper.querySelector('e-table__header tr') : null
        const noneHeader = this.headerDisplayNone(headerTrElm)
        const headerHeight = this.headerHeight=!this.showHeader?0:headerWrapper.offsetHeight
        const tableHeight = this.tableHeight=this.table.$el.clientHeight

    }
    headerDisplayNone(elm) {
        if (!elm) return true
        let headerChild = elm
        while (headerChild.tagName !== 'DIV') {
            if (getComputedStyle(headerChild).display === 'none') {
                return true
            }
            headerChild = headerChild.parentElement
        }
        return false
    }
}

export default TableLayout