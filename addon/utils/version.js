import Ember from 'ember';

const [ , MAJOR, MINOR, PATCH ] = Ember.VERSION.match(/^(\d+)\.(\d+)\.(\d+)/).map(Number);

export default { MAJOR, MINOR, PATCH };

export var hasGlimmer = MAJOR >= 2 || MINOR === 13;

export var hasHTMLBars = MAJOR >= 2 || MINOR >= 10;

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

  // old computed
  if (MAJOR === 1 && MINOR < 12) {
    return Ember.computed(...deps, options);
  }

  // new computed
  return Ember.computed(...deps, {
    get() {
      return options.apply(this, arguments);
    },

    set() {
      return options.apply(this, arguments);
    }
  });
}
