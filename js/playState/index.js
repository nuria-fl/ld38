const init = require('./init')
const preload = require('./preload')
const create = require('./create')
const update = require('./update')
const God = require('./characters/god')
const methods = require('./methods')

const PlayState = Object.assign({}, {
  init,
  preload,
  create,
  update
}, methods)

module.exports = PlayState
