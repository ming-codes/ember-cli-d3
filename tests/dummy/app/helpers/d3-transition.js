import Ember from 'ember';

export function d3Transition([ sel ]) {
  return sel && sel.$el.transition();
}

export default Ember.Helper.helper(d3Transition);
