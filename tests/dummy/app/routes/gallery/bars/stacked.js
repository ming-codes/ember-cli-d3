import Ember from 'ember';
import AttachClassName from 'dummy/mixins/route-class';

export default Ember.Route.extend(AttachClassName, {
  model() {
    return this.store.findRecord('visual', 'gallery.bars.stacked');
  },

  setupController(controller, model) {
    this.controllerFor('gallery/bars').setProperties({ model });
  }
});
