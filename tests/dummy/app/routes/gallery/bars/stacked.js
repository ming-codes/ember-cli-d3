import Ember from 'ember';
import AttachClassName from 'dummy/mixins/route-class';

export default Ember.Route.extend(AttachClassName, {
  model() {
    return this.store.findRecord('visual', 1);
  },

  setupController(controller, model) {
    this.controllerFor('gallery/bars').setProperties({ model });
  }
});
