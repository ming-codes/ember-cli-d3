
(function () {
  var slice = Array.prototype.slice;
  var urlStyles = [ 'fill', 'stroke', 'clip-path', 'marker-start', 'marker-mid', 'marker-end', 'mask', 'filter' ];

  function wrap(target, wrapper) {
    return function wrapped() {
      return wrapper.apply(this, [ target ].concat(slice.call(arguments)));
    };
  }

  var sProto = d3.selection.prototype;
  var tProto = d3.transition.prototype;

  sProto.constructor = d3.selection;
  tProto.constructor = d3.transition;

  d3.timer.flushAll = function flushAll() {
    var now = Date.now;
    Date.now = d3.functor(Infinity);
    d3.timer.flush();
    Date.now = now;
  };

  if (!d3.select('head base').empty()) {
    function urlRefShim(fn, name, value, priority) {
      if (~urlStyles.indexOf(name)) {
        value = d3.functor(value);
        value = wrap(value, function (fn, data, inner, outer) {
          var result = fn.call(this, data, inner, outer);
          var match = typeof result === 'string' && result[0] === 'u' && result.match(/^url\((#\w+)\)$/) || {};
          var name = match[1];

          if (name) {
            result = 'url(' + location.pathname + location.search + name + ')';
          }

          return result;
        });
      }

      return fn.call(this, name, value, priority);
    }
    
    sProto.style = wrap(sProto.style, urlRefShim);
    tProto.style = wrap(tProto.style, urlRefShim);
    sProto.attr = wrap(sProto.attr, urlRefShim);
    tProto.attr = wrap(tProto.attr, urlRefShim);
  }

  // TODO
  // Force layout are not usually implemented as
  // transition. This will fail in those cases.
  //
  // Normal usage of force layout always have
  // paired up `start` and `end` event
  //
  // If you call `.tick` without `.resume`, it
  // will only fire end
  Ember.runInDebug(function () {
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

    wrappees.forEach(function (args) {
      var proto = args[0];
      var method = args[1];

      proto[method] = wrap(proto[method], function () {
        var args = slice.call(arguments);
        var fn = args.shift();
        var selection = fn.apply(this, args);

        selection.each('start.ember-waiter', increment);
        selection.each('interrupt.ember-waiter', decrement);
        selection.each('end.ember-waiter', decrement);

        return selection;
      });
    });

    Ember.Test.registerWaiter(function () {
      return count === 0;
    });
  });
})();
