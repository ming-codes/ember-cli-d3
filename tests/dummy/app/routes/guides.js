import Ember from 'ember';
import AttachClassName from '../mixins/route-class';

export default Ember.Route.extend(AttachClassName, {
  model() {
    return Ember.$.get('guides.html');
  }
});
