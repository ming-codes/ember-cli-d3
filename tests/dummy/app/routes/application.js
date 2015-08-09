
import Ember from 'ember';

export default Ember.Route.extend({

  dataSource: Ember.inject.service('dimensional-data-source'),

  actions: {
    generate() {
      this.get('dataSource').generate();
    },
    reorder() {
      this.get('dataSource').reorder();
    }
  }
});
