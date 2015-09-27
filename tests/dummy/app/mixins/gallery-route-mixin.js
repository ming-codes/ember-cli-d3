import Ember from 'ember';

export default Ember.Mixin.create({
  model() {
    return this.store.findRecord('visual', this.routeName);
  },
  setupController(controller, model) {
    this.controllerFor(this.routeName.split('.').slice(0, 2).join('/')).setProperties({ model });
  }
});
