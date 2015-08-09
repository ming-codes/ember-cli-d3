
import Ember from 'ember';

export default Ember.Route.extend({

  dataSource: Ember.inject.service('dimensional-data-source'),

  setupController(controller, model, transition) {
    if (transition.targetName === 'index') {
      controller.set('isIndex', true);
    }
  },

  actions: {
    generate() {
      this.get('dataSource').generate();
    },
    reorder() {
      this.get('dataSource').reorder();
    }
  }
});
