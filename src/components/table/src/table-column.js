import { parseWidth, parseMinWidth } from "./util"
import { cellForced } from "./config"

export default {
  name: 'ETableColumn',
  props: {
    type: {
      type: String,
      default: 'default'
    },
    label: String,
    className: String,
    labelClassName: String,
    property: String,
    prop: String,
    width: {},
    minWidth: {},
    renderHeader: Function,
    sortable: {
      type: [Boolean, String],
      default: false
    },
    sortMethod: Function,
    sortBy: [String, Function, Array],
    resizable: {
      type: Boolean,
      default: true
    },
    columnKey: String,
    align: String,
    headerAlign: String,
    showTooltipWhenOverflow: Boolean,
    showOverflowTooltip: Boolean,
    fixed: [Boolean, String],
    formatter: Function,
    selectable: Function,
    reserveSelection: Boolean,
    filterMethod: Function,
    filteredValue: Array,
    filters: Array,
    filterPlacement: String,
    filterMultiple: {
      type: Boolean,
      default: true
    },
    index: [Number, Function],
    sortOrders: {
      type: Array,
      default() {
        return ['ascending', 'descending', null]
      }
    }
  },
  data() {
    return {
      isSubColumn: false,
      columns: []
    }
  },
  computed: {
    owner() {
      let parent = this.$parent
      while (parent && !parent.tableId) {
        parent = parent.$parent
      }
      return parent
    },
    columnOrTableParent() {
      let parent = this.$parent
      while (parent && !parent.tableId && !parent.columnId) {
        parent = parent.$parent
      }
      return parent
    },
    realWidth() {
      return parseWidth(this.width)
    },
    realMinWidth() {
      return parseMinWidth(this.minWidth)
    },
    realAlign() {
      return this.align ? 'is-' + this.align : null
    },
    realHeaderAlign() {
      return this.headerAlign ? 'is-' + this.headerAlign : this.realAlign
    }
  },
  methods: {
    getPropsData(...props) {
      return props.reduce((prev, cur) => {
        if (Array.isArray(cur)) {
          cur.forEach(key => {
            prev[key] = this[key]
          })
        }
        return prev
      }, {})
    },
    getColumnElIndex(children, child) {
      return [].indexOf.call(children, child)
    },
    setColumnWidth(column) {
      if (this.realWidth) {
        column.width = this.realWidth
      }
      if (this.realMinWidth) {
        column.minWidth = this.realMinWidth
      }
      if (!column.minWidth) {
        column.minWidth = 80
      }
      column.realWidth = column.width === undefined ? column.minWidth : column.width
      return column
    },
    setColumnForcedProps(column) {
      const type = column.type
      const source = cellForced[type] || {}
      Object.keys(source).forEach(prop => {
        let value = source[prop]
        if (value !== undefined) {
          column[prop] = prop === 'className' ? `${column[prop]} ${value}` : value
        }
      })
      return column
    },
    setColumnRenders(column) {
      if (this.renderHeader) {

      } else if (column.type !== 'selection') {
        column.renderHeader = (h, scope) => {
          const renderHeader = this.$scopedSlots.header
          return renderHeader ? renderHeader(scope) : column.label
        }
      }
      let originRenderCell = column.renderCell
      if (column.type === 'expand') {
        column.renderCell = (h, data) => (<div class='cell'>
          {originRenderCell(h, data)}
        </div>)
        this.owner.renderExpanded = (h, data) => {
          return this.$scopedSlots.default ? this.$scopedSlots.default(data) : this.$slots.default
        }
      }else{
        originRenderCell = originRenderCell || defaultRenderCell
      }
    }
  }
}