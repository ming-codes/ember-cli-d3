import Ember from 'ember';
import { helper } from '../utils/version';

export function transition([ sel ], hash) {
  return Ember.tryInvoke(sel, 'transition', [ hash ]) || sel;
}

export default helper(transition);
