
export var slice = Array.prototype.slice;

export var concat = Array.prototype.concat;

// Create (and cache) an identity function that returns the
// argument at specified index.
export function identity(index = 0) {
  return identity[index] || (identity[index] = function () {
    return arguments[index];
  });
}

// like compose, but from left to right
export function flow(...fns) {
  return function () {
    return fns.reduce((result, fn) => {
      return [ fn.apply(this, result) ];
    }, arguments);
  };
}

export function scan(col, fn, init) {
  var ret = [];

  if (arguments.length === 3) {
    col.reduce((prev, item, index, arr) => {
      return ret[index] = fn(prev, item, index, arr);
    }, init);
  }
  else {
    col.reduce((prev, item, index, arr) => {
      return ret[index] = fn(prev, item, index, arr);
    });
  }

  return ret;
}

export function wrap(target, wrapper) {
  return function wrapped() {
    return wrapper.apply(this, [ target ].concat(slice.call(arguments)));
  };
}
