
import { wrap, slice } from 'ember-d3/utils/lodash';

export function type() {
  d3.selection.prototype.isSelection = true;
  d3.transition.prototype.isTransition = true;
}

export function timer() {
  var timerFlush = d3.timer.flush;

  d3.timer = wrap(d3.timer, function() {
    var args = slice.call(arguments);
    var fn = args.shift();
    var callbacks = args[0];

    args[0] = function () {
      var context = this;
      var callbackArgs = slice.call(arguments);
      var ret;

      Ember.run(function () {
        ret = callbacks.apply(context, callbackArgs);
      });

      return ret;
    };

    fn.apply(this, args);
  });

  d3.timer.flush = timerFlush;
}
