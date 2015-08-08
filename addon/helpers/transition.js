import Ember from 'ember';

export function transition([ sel ], hash) {
  return Ember.tryInvoke(sel, 'transition', [ hash ]) || sel;
}

export default Ember.Helper.helper(transition);
