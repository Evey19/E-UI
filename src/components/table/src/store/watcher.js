import Vue from 'vue'
import { getKeysMap, getRowIdentity, toggleRowStatus, getColumnById, orderBy } from '../util'

const sortData = (data, states) => {
    const sortingColumn = states.sortingColumn
    if (!sortingColumn || typeof sortingColumn.sortable === 'string') {
        return data
    }
}

const doFlattenColumns = (columns) => {
    const result = []
    columns.forEach(column => {
        if (column.children) {
            result.push.apply(result, doFlattenColumns(column.children))
        } else {
            result.push(column)
        }
    })
    return result
}

// 构造一个子类
export default Vue.extend({
    data() {
        return {
            states: {
                rowKey: null,
                data: [],
                isComplex: false,
                _columns: [],
                originColumns: [],
                columns: [],
                fixedColumns: [],
                rightFixedColumns: [],
                leafColumnsLength: 0,
                fixedLeafColumnsLength: 0,
                rightFixedLeafColumnsLength: 0,
                selection: [],
                isAllSelected: false,
                selectOnIndeterminate: false,
                selectable: null,
                filters: {},
                filteredData: null,
                sortingColumn: null,
                sortProp: null,
                sortOrder: null
            }
        }
    },
    methods: {
        assertRowKey() {
            const rowKey = this.states.rowKey
            if (!rowKey) throw new Error('[ElTable] prop row-key is required');
        },
        // 更新列
        updateColumns() {
            const states = this.states
            const _columns = states._columns || []
            states.fixedColumns = _columns.filter(column => column.fixed === true || column.fixed === 'left')
            states.rightFixedColumns = _columns.filter(column => column.fixed === 'right')
            if (states.fixedColumns.length > 0 && _columns[0] && _columns[0].type === 'selection' && !_columns[0].fixed) {
                _columns[0].fixed = true
                states.fixedColumns.unshift(_columns[0])
            }
            const notFixedColumns = _columns.filter(column => !column.fixed)
            states.originColumns = [].concat(states.fixedColumns).concat(notFixedColumns).concat(states.rightFixedColumns)
            const leafColumns = doFlattenColumns(notFixedColumns)
            const fixedLeafColumns = doFlattenColumns(states.fixedColumns)
            const rightFixedLeafColumns = doFlattenColumns(states.rightFixedColumns)

            states.leafColumnsLength = leafColumns.length
            states.fixedLeafColumnsLength = fixedLeafColumns.length
            states.rightFixedLeafColumnsLength = rightFixedLeafColumns.length

            states.columns = [].concat(fixedLeafColumns).concat(leafColumns).concat(rightFixedLeafColumns)
            states.isComplex = states.fixedColumns.length > 0 || states.rightFixedColumns.length > 0
        },
        // 更新dom doLayout
        scheduleLayout(needUpdateColumns) {
            if (needUpdateColumns) {
                this.updateColumns()
            }
            this.table.debouncedUpdateLayout()
        },
        isSelected(row) {
            const { selection = [] } = this.states
            return selection.indexOf(row) > -1
        },
        clearSelection() {
            const states = this.states
            states.isAllSelected = false
            const oldSelection = states.selection
            if (oldSelection.length) {
                states.selection = []
                this.table.$emit('selection-change', [])
            }
        },
        cleanSelection() {
            const states = this.states
            const { data, rowKey, selection } = states
            let deleted
            if (rowKey) {
                deleted = []
                const selectedMap = getKeysMap(selection, rowKey)
                const dataMap = getKeysMap(data, rowKey)
                for (let key in selectedMap) {
                    if (selectedMap.hasOwnProperty(key) && !dataMap[key]) {
                        deleted.push(selectedMap[key].row)
                    }
                }
            } else {
                deleted = selection.filter(item => data.indexOf(item) === -1)
            }
            if (deleted.length) {
                const newSelection = selection.filter(item => deleted.indexOf(item) === -1)
                states.selection = newSelection
                this.table.$emit('selection-change')
            }
        },
        toggleRowSelection(row, selected, emitChang = true) {
            const changed = toggleRowStatus(this.states.selection, row, selected)
            if (changed) {
                const newSelection = (this.states.selection || []).slice()
                if (emitChang) {
                    this.table.$emit('select', newSelection)
                }
                this.table.$emit('selection-change', newSelection)
            }
        },
        _toggleAllSelection() {
            const states = this.states
            const { data = [], selection } = states
            const value = states.selectOnIndeterminate ? !states.isAllSelected : !(states.isAllSelected || selection.length)
            states.isAllSelected = value

            let selectionChanged = false
            data.forEach((row, index) => {
                if (states.selectable) {
                    if (states.selectable.call(null, row, index) && toggleRowStatus(selection, row, value)) {
                        selectionChanged = true
                    }
                } else {
                    if (toggleRowStatus(selection, row, value)) {
                        selectionChanged = true
                    }
                }
            })
            if (selectionChanged) {
                this.table.$emit('selection-change', selection ? selection.slice() : [])
            }
            this.table.$emit('select-all', selection)
        },
        updateSelectionByRowKey() {
            const states = this.states
            const { selection, rowKey, data } = states
            const selectedMap = getKeysMap(selection, rowKey)
            data.forEach(row => {
                const rowId = getRowIdentity(row, rowKey)
                const rowInfo = selectedMap[rowId]
                if (rowInfo) {
                    selection[rowInfo.index] = row
                }
            })
        },
        updateAllSelected() {
            const states = this.states
            const { selection, rowKey, selectable } = states
            const data = states.data || []
            if (data.length === 0) {
                states.isAllSelected = false
                return
            }
            let selectedMap
            if (rowKey) {
                selectedMap = getKeysMap(selection, rowKey)
            }
            const isSelected = function (row) {
                if (selectedMap) {
                    return !!selectedMap[getRowIdentity(row, rowKey)]
                } else {
                    return selection.indexOf(row) !== -1
                }
            }
            let isAllSelected = true
            let selectedCount = 0
            for (let i = 0, j = data.length; i < j; i++) {
                const item = data[i]
                const isRowSelectable = selectable && selectable.call(null, item, i)
                if (!isSelected(item)) {
                    if (!selectable || isRowSelectable) {
                        isAllSelected = false
                        break
                    }
                } else {
                    selectedCount++
                }
            }
            if (selectedCount === 0) isAllSelected = false
            states.isAllSelected = isAllSelected
        },
        updateFilters(columns, values) {
            if (!Array.isArray(columns)) {
                columns = [columns]
            }
            const states = this.states
            const filters = {}
            columns.forEach(col => {
                states.filters[col.id] = values
                filters[col.columnKey || col.id] = values
            })
            return filters
        },
        updateSort(column, prop, order) {
            if (this.states.sortingColumn && this.states.sortingColumn !== column) {
                this.states.sortingColumn.order = null
            }
            this.states.sortingColumn = column
            this.states.sortProp = prop
            this.states.sortOrder = order
        },
        execFilter() {
            const states = this.states
            const { _data } = states
            let data = _data
            states.filteredData = data

        },
        execSort() {
            const states = this.states
            states.data = sortData(states.filteredData, states)
        },
        execQuery(ignore) {
            if (!(ignore && ignore.filter)) {
                this.execFilter()
            }
            this.execSort()
        }
    }
})