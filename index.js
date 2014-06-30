'use strict';

module.exports = function forwardEmitter(src, dest, filterFn) {
  // If no filter is passed, forward all events.
  if (typeof filterFn !== 'function') {
    filterFn = function() { return true; };
  }

  // Listeners bound to the destination emitter should be bound to the source emitter.
  dest.on('newListener', function(eventName, listener) {
    if (filterFn(eventName)) src.on(eventName, listener);
  });

  // When a listener is removed from the destination emitter, remove it from the source emitter
  // (otherwise it will continue to be called).
  dest.on('removeListener', function(eventName, listener) {
    src.removeListener(eventName, listener);
  });
};