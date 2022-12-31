import { getValueByPath } from '@/src/utils/util'

const isObject = function (obj) {
    return obj !== null && typeof obj === 'object'
}

export function parseWidth(width) {
    if (width !== undefined) {
        width = parseInt(width, 10)
        if (isNaN(width)) {
            width = null
        }
    }
}

export function parseMinWidth(minWidth) {
    if (typeof minWidth !== 'undefined') {
        minWidth = parseWidth(minWidth)
        if (isNaN(minWidth)) {
            minWidth = 80
        }
    }
}

export const getRowIdentity = (row, rowKey) => {
    if (!row) throw new Error('row is required when get row identity');
    if (typeof rowKey === 'string') {
        if (rowKey.indexOf('.') < 0) {
            return row[rowKey];
        }
        let key = rowKey.split('.');
        let current = row;
        for (let i = 0; i < key.length; i++) {
            current = current[key[i]];
        }
        return current;
    } else if (typeof rowKey === 'function') {
        return rowKey.call(null, row);
    }
};

export const getKeysMap = function (array, rowKey) {
    const arrayMap = {};
    (array || []).forEach((row, index) => {
        arrayMap[getRowIdentity(row, rowKey)] = { row, index }
    })
    return arrayMap
}

export function toggleRowStatus(statusArr, row, newVal) {
    let changed = false
    const index = statusArr.indexOf(row)
    const included = index !== -1
    const addRow = () => {
        statusArr.push(row)
        changed = true
    }
    const removeRow = () => {
        statusArr.splice(index, 1)
        changed = true
    }
    if (typeof newVal === 'boolean') {
        if (newVal && !included) {
            addRow()
        } else if (!newVal && included) {
            removeRow()
        }
    } else {
        if (included) {
            removeRow()
        } else {
            addRow()
        }
    }
    return changed
}

export const getColumnById = function (table, columnId) {
    let column = null
    table.columns.forEach(item => {
        if (item.id == columnId) {
            column = item
        }
    })
    return column
}

export const orderBy = function (array, sortKey, reverse, sortMethod, sortBy) {
    if (!sortKey && !sortMethod && (!sortBy || Array.isArray(sortBy) && !sortBy.length)) {
        return array
    }
    if (typeof reverse === 'string') {
        reverse = reverse === 'descending' ? -1 : 1
    } else {
        reverse = (reverse && reverse < 0) ? -1 : 1
    }
    const getKey = sortMethod ? null : function (value, index) {
        if (sortBy) {
            if (!Array.isArray(sortBy)) {
                sortBy = [sortBy]
            }
            return sortBy.map(by => {
                if (typeof by === 'string') {
                    return getValueByPath(value, by)
                } else {
                    return by(value, index, array)
                }
            })
        }
        if (sortKey !== '$key') {
            if (isObject(value) && '$value' in value) value = value.$value
        }
        return [isObject(value) ? getValueByPath(value, sortKey) : value]
    }
    const compare = function (a, b) {
        if (sortMethod) {
            return sortMethod(a.value, b.value)
        }
        for (let i = 0, len = a.key.length; i < len; i++) {
            if (a.key[i] < b.key[i]) {
                return -1
            }
            if (a.key[i] > b.key[i]) {
                return 1
            }
        }
        return 0
    }
    return array.map((value, index) => {
        return {
            value: value,
            index: index,
            key: getKey ? getKey(value, index) : null
        }
    }).sort(function (a, b) {
        let order = compare(a, b)
        if (!order) {
            order = a.index - b.index
        }
        return order * reverse
    }).map(item => item.value)
}