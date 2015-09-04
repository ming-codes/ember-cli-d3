import Ember from 'ember';

const [ , MAJOR, MINOR, PATCH ] = Ember.VERSION.match(/^(\d+)\.(\d+)\.(\d+)/).map(Number);

export default { MAJOR, MINOR, PATCH };

export var hasGlimmer = MAJOR === 2 || MINOR === 13;

export function helper(fn) {
  if (Ember.Helper) {
    return Ember.Helper.helper(fn);
  }
  else if (Ember.HTMLBars) {
    return Ember.HTMLBars.makeBoundHelper(fn);
  }
  else {
    return Ember.Handlebars.makeBoundHelper(fn);
  }
}

export function computed(...deps) {
  var options = deps.pop();

  if (MAJOR === 1 && MINOR < 12) {
    return Ember.computed.apply(null, deps.concat(function () {
      var { set, get } = options;

      if (arguments.length > 1) {
        return set && set.apply(this, arguments);
      }

      return get && get.apply(this, arguments);
    }));
  }

  return Ember.computed.apply(null, deps.concat(options));
}
