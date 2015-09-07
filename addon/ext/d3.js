
import Ember from 'ember';
import d3 from 'd3';

import { wrap, slice } from 'ember-cli-d3/utils/lodash';

export function type() {
  d3.selection.prototype.isSelection = true;
  d3.transition.prototype.isTransition = true;
}

export function timer() {
  if (d3.timer.__extended__) { return; }

  var sem = 0;

  var timerFlush = d3.timer.flush;
  var wait = true;

  d3.timer = wrap(d3.timer, function() {
    var args = slice.call(arguments);
    var fn = args.shift();

    if (wait) {
      sem++;
    }

    wait = false;

    args[0] = wrap(args[0], function (fn, ...args) {
      var ret = fn.apply(this, args);

      wait = true;

      if (ret) {
        sem--;
      }

      return ret;
    });

    fn.apply(this, args);
  });

  d3.timer.flush = timerFlush;
  d3.timer.__extended__ = 1;

  Ember.Test.registerWaiter(() => !sem);
}
