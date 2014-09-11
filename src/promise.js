'use strict'

const Promise = require('promise')

require('./fn').install(global)

Promise.prototype.catch = function (fn) {
  return this.then(null, fn)
}
Promise.prototype.finally = function (fn) {
  return this.then(isolate(fn), fn)
}
Promise.prototype.spread = function (cb) {
  return this.then(function (arr) { return cb.apply(this, arr) })
}
Promise.prototype.map = Promise.prototype.then

module.exports = Promise