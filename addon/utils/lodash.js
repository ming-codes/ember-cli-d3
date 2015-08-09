
export function scan(col, fn, init) {
  var ret = [];

  if (arguments.length === 3) {
    col.reduce((prev, item, index, arr) => {
      return ret[index] = fn(prev, item, index, arr);
    }, init);
  }
  else {
    col.reduce((prev, item, index, arr) => {
      ret[index] = fn
    });
  }

  return ret;
}
