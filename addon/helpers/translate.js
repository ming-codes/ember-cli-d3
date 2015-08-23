import Ember from 'ember';

export function translate([ x, y ]) {
  return `translate(${x || 0} ${y || 0})`;
}

export default Ember.Helper.helper(translate);
