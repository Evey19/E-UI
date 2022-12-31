import Vue from 'vue'
import Watcher from './watcher'

Watcher.prototype.mutations = {
    setData(states, data) {
        const dataInstanceChanged = states._data !== data
        states._data = data

        // 根据filters与sort去过滤data
        this.execQuery()
    }
}

Watcher.prototype.commit = function (name, ...args) {
    const mutations = this.mutations
    if (mutations[name]) {
        mutations[name].apply(this, [this.states].concat(args))
    } else {
        throw new Error(`Action not found:${name}`)
    }
}