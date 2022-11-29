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
    columnKey:String,
    align:String,
    headerAlign:String,
    showTooltipWhenOverflow:Boolean,
    showOverflowTooltip:Boolean,
    fixed:[Boolean,String],
    formatter:Function,
    selectable:Function,
    reserveSelection:Boolean,
    filterMethod:Function,
    filteredValue:Array,
    filters:Array,
    filterPlacement:String,
    
  }
}