import { toggleRowStatus, getKeysMap, getRowIdentity } from "../util";

export default {
    data() {
        return {
            states: {
                defaultExpandAll: false,
                expandRows: []
            }
        }
    },
    methods: {
        updateExpandRows() {
            const { data = [], rowKey, defaultExpandAll, expandRows } = this.states
            if (defaultExpandAll) {
                this.states.expandRows = data.slice()
            } else if (rowKey) {
                const expandRowsMap = getKeysMap(expandRows, rowKey)
                this.states.expandRows = data.reduce((prev, row) => {
                    const rowId = getRowIdentity(row, rowKey)
                    const rowInfo = expandRowsMap[rowId]
                    if (rowInfo) {
                        prev.push(row)
                    }
                    return prev
                }, [])
            }else{
                this.states.expandRows = []
            }
        },
        toggleRowExpansion(row,expanded){
            const changed = toggleRowStatus(this.states.expandRows,row,expanded)
            if(changed){
                this.table.$emit('expand-change',row,this.states.expandRows.slice())
                this.scheduleLayout()
            }
        }
    }
}