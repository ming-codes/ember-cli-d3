
import Ember from 'ember';

var noop = d3.functor();

var guidCounter = 0;

export function guid() {
  return `ember-cli-d3-${guidCounter++}`;
}

export function accessor(path) {
  if (typeof path === 'function') { return path; }

  var deep = ~path.indexOf('.');

  return function (data) {
    return deep ? Ember.get(data, path) : data[path];
  };
}

export function assign(target, values) {
  var key;

  for (key in values) {
    if (typeof target[key] === 'function') {
      target[key](values[key]);
    }
  }

  return target;
}

export function translateX(fn) {
  return function translate() {
    return `translate(${fn.apply(this, arguments)} 0)`;
  };
}

// TODO allow cssExpr to contain attributes
export function join(dataExpr, cssExpr, { update, enter, exit }) {
  var [ , dataPath, , keyPath ] = dataExpr.match(/([\w\.]+)(\[([\w\.]+)\])?/);

  var [ tagName, cssName ] = cssExpr.split('.');

  keyPath = keyPath || null;

  tagName = tagName || 'g';
  enter = enter || (sel => sel.append(tagName).classed(cssName, true));
  exit = exit || (sel => sel.remove());
  update = update || noop;

  return function (sel, ...parentData) {
    var context = this;
    var data = this.get(dataPath);
    var key = keyPath && this.get(keyPath);

    if (keyPath) {
      key = this.get(keyPath);
    }
    if (typeof key === 'string') {
      key = accessor(key);
    }

    var bind = joined => sel => joined.apply(context, [ sel ].concat(parentData));

    var updateSel = sel.selectAll(cssExpr).data(data, key);
    var enterSel = updateSel.enter();
    var exitSel = updateSel.exit();

    enterSel.call(bind(enter));
    updateSel.call(bind(update));
    exitSel.call(bind(exit));

    return updateSel;
  };
}

