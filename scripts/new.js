if (!process.argv[2]) {
  console.error('组件名必填 - Please enter new component name')
  process.exit(1)
}

const path = require('path')
const fs = require('fs')
const fileSave = require('file-save')
const uppercamelcase = require('uppercamelcase')
const componentname = process.argv[2]
const chineseName = process.argv[3]||componentname
const ComponentName = uppercamelcase(componentname)
