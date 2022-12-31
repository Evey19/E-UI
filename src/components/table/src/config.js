import { getPropByPath } from "../../../utils/util"

export const cellForced = {
    selection: {
        renderHeader: function (h, { store }) {
            return <e-checkbox
                disabled={store.states.data && store.states.data.length === 0}
                indeterminate={store.states.selection.length > 0 && !this.isAllSelected}
                on-input={this.toggleAllSelection}
                value={this.isAllSelected}
            />
        },
        renderCell: function (h, { row, column, isSelected, store, $index }) {
            return <e-checkbox
                nativeOn-click={(event) => event.stopPropagation()}
                value={isSelected}
                disabled={column.selectable ? !column.selectable.call(null, row, $index) : false}
                on-input={() => { store.commit('rowSelectedChanged', row) }}
            />
        },
        sortable: false,
        resizable: false
    },
    index: {

    },
    expand: {

    }
}

export function defaultRenderCell(h, { row, column, $index }) {
    const property = column.property
    const value = property && getPropByPath(row, property).v
    if (column && column.formatter) {
        return column.formatter(row, column, value, $index)
    }
    return value
}