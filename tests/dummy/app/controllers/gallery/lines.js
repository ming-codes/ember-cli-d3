
import Ember from 'ember';
import DimensionalDataModel from 'dummy/utils/model/dimensional';

import { computed } from 'ember-cli-d3/utils/version';

export default Ember.Controller.extend({
  visual: null,

  dataSource: Ember.inject.service('dimensional-data-source'),

  data: computed('dataSource.data', {
    get() {
      return this
        .get('dataSource.data')
        .sort((valueA, valueB) => valueA.timestamp - valueB.timestamp);
    }
  }),
  series: [ 'dogs', 'cats' ],
  key: 'timestamp',

  dimensionalData: computed('data', 'series', 'key', {
    get() {
      return DimensionalDataModel.create(this.getProperties('data', 'series', 'key'));
    }
  }),
});
