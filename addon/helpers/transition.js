import Ember from 'ember';

export function transition([ sel ]) {
  return Ember.tryInvoke(sel, 'transition') || sel;
}

export default Ember.Helper.helper(transition);
