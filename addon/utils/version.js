import Ember from 'ember';

const [ , MAJOR, MINOR, PATCH ] = Ember.VERSION.match(/^(\d+)\.(\d+)\.(\d+)/);

export default { MAJOR, MINOR, PATCH };

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
