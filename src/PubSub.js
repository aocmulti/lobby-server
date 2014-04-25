/**
 * Super-simple event system!
 * @constructor
 */
function PubSub() {
  /**
   * Event storage map
   * @type {Object.<string, function(*)>}
   */
  this.$events = {};
}
(function (p) {

  /**
   * Add a listener function to be executed on `evt`
   * @param {string} evt Event name.
   * @param {function(*)} fn Handler to be added.
   * @return {Evts}
   */
  p.subscribe = function (evt, fn) {
    (this.$events[evt] = this.$events[evt] || []).push(fn);
    return this;
  };

  /**
   * Add a listener function to be executed on `evt`, but only once; ie. remove
   * again after the first event.
   * @param {string} evt Event name.
   * @param {function(*)} fn Handler.
   * @return {Evts}
   */
  p.once = function (evt, fn) {
    var self = this;
    return self.on(evt, function onceFn() {
      fn.apply(this, arguments);
      self.off(evt, onceFn);
    });
  };

  /**
   * Remove an event listener.
   * @param {string} evt Event name.
   * @param {function(*)} fn Handler that should be removed.
   * @return {Evts}
   */
  p.unsubscribe = function (evt, fn) {
    if (this.$events[evt]) {
      helpers.remove(this.$events[evt], fn);
    }
    return this;
  };

  /**
   * Emit/trigger an event.
   * @param {string} evt Event name.
   * @param {...*} var_args Arguments to pass to the event handler.
   * @return {Evts}
   */
  p.publish = function (evt, var_args) {
    var self = this,
      e = self.$events && self.$events[evt];
    if (e) {
      var_args = [].slice.call(arguments, 1);
      process.nextTick(function () {
        for (var i = 0, l = e.length; i < l; i++) {
          e[i].apply(self, var_args);
        }
      });
    }
    return self;
  };

}(PubSub.prototype));

module.exports = new PubSub();