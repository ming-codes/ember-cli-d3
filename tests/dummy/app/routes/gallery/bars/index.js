import Ember from 'ember';
import AttachClassName from 'dummy/mixins/route-class';

export default Ember.Route.extend(AttachClassName, {
  redirect(visuals, transition) {
    this.transitionTo('gallery.bars.grouped');
  }
});
