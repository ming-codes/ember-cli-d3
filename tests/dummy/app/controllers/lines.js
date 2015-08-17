
import Ember from 'ember';
import DimensionalDataModel from 'ember-cli-d3/utils/model/dimensional';

export default Ember.Controller.extend({
  dataSource: Ember.inject.service('dimensional-data-source'),

  data: Ember.computed.alias('dataSource.data'),
  series: [ 'black', 'asian' ],
  key: 'timestamp',

  dim: Ember.computed('data', 'series', 'key', {
    get() {
      return DimensionalDataModel.create(this.getProperties('data', 'series', 'key'));
    }
  }),
});
