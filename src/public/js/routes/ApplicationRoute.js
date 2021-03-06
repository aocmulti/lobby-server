define(function (require, exports, module) {

  var Ember = require('ember')
    , debug = require('debug')('aocmulti:route:application')

  var Promise = Ember.RSVP.Promise

  module.exports = Ember.Route.extend({

    addLadders: function () {
      if (window.__ladders) {
        debug('adding ladders')
        App.get('ladders').pushObjects(__ladders.map(function (ladder) {
          return App.Ladder.create(ladder)
        }))
      }
    }.on('init')

  , model: function () {
      var store = this.store

      return new Promise(function (resolve, reject) {
        socket.emit('users:me', App.promisify(resolve, reject))
      }).then(function (id) {
        return store.find('user', id)
      }).then(function (user) {
        debug('found', user)
        App.set('user', user)
        return user
      })
    }

  })

})