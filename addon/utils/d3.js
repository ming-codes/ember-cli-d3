
import Ember from 'ember';
import d3 from 'd3';

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
  fn = d3.functor(fn);

  return function translate() {
    return `translate(${fn.apply(this, arguments)} 0)`;
  };
}

export function rotate(fn) {
  fn = d3.functor(fn);

  return function rotate() {
    return `rotate(${fn.apply(this, arguments)})`;
  };
}


// TODO allow inlined data
join.parseDataExpr = function (expr) {
  if (typeof expr === 'string') {
    var [ , dataPath, , keyPath ] = expr.match(/([\w\.]+)(\[([\w\.]+)\])?/);

    keyPath = keyPath || null;
    dataPath = dataPath || null;

    return { dataPath, keyPath };
  }
  else {
    return { inlineData: expr };
  }
};

// TODO allow cssExpr to contain attributes
join.parseCssExpr = function (expr) {
  var [ tagName, cssName ] = expr.split('.');

  tagName = tagName || 'g';

  return { tagName, cssName };
};

export function join(dataExpr, cssExpr, { update, enter, exit }) {
  var { inlineData, dataPath, keyPath } = join.parseDataExpr(dataExpr);
  var { tagName, cssName } = join.parseCssExpr(cssExpr);

  function visual(sel, ...parentData) {
    var context = this;
    var data = [].concat(inlineData || this.get(dataPath) || []);
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

    enterSel.call(bind(visual.enter));
    updateSel.call(bind(visual.update));
    exitSel.call(bind(visual.exit));

    return updateSel;
  }

  visual.enter = enter || (sel => sel.append(tagName).classed(cssName, true));
  visual.exit = exit || (sel => sel.remove());
  visual.update = update || noop;

  return visual;
}
