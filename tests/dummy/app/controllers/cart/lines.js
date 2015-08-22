
import Ember from 'ember';
import DimensionalDataModel from 'ember-cli-d3/utils/model/dimensional';

export default Ember.Controller.extend({
  dataSource: Ember.inject.service('dimensional-data-source'),

  data: Ember.computed('dataSource.data', {
    get() {
      return this
        .get('dataSource.data')
        .sort((valueA, valueB) => valueA.timestamp - valueB.timestamp);
    }
  }),
  series: [ 'dogs', 'cats' ],
  key: 'timestamp',

  dim: Ember.computed('data', 'series', 'key', {
    get() {
      return DimensionalDataModel.create(this.getProperties('data', 'series', 'key'));
    }
  }),
});
