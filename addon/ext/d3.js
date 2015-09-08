
import Ember from 'ember';
import d3 from 'd3';

import { wrap, slice } from 'ember-cli-d3/utils/lodash';

export function type() {
  d3.selection.prototype.isSelection = true;
  d3.transition.prototype.isTransition = true;
}

export function timer() {
  Ember.runInDebug(() => {
    var tProto = d3.transition.prototype;
    var sProto = d3.selection.prototype;
    var count = 0;
    var wrappees = [
      [ sProto, 'transition' ],
      [ tProto, 'transition' ],
      [ tProto, 'select' ],
      [ tProto, 'selectAll' ],
      [ tProto, 'filter' ]
    ];

    function increment() { count++; }
    function decrement() { count--; }

    wrappees.forEach(([ proto, method ]) => {
      proto[method] = wrap(proto[method], function (fn, ...args) {
        var selection = fn.apply(this, args);

        selection.each('start.ember-waiter', increment);
        selection.each('interrupt.ember-waiter', decrement);
        selection.each('end.ember-waiter', decrement);

        return selection;
      });
    });

    Ember.Test.registerWaiter(() => count === 0);
  });
}
