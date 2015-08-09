import Ember from 'ember';

export function translate([ x = 0, y = 0 ]) {
  return `translate(${x} ${y})`;
}

export default Ember.Helper.helper(translate);
