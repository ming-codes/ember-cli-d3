import Ember from 'ember';
import layout from '../templates/components/block-thumb';

import DimensionalDataModel from 'dummy/utils/model/dimensional';
import { computed } from 'ember-cli-d3/utils/version';

export default Ember.Component.extend({
  layout,

  dimensionalDataSource: Ember.inject.service('dimensional-data-source'),

  visual: null,

  dataSource: computed('visual.modelType', function () {
    var type = this.get('visual.modelType');

    switch (type) {
      case 'dimensional': case 'temporal': return this.get('dimensionalDataSource');
    }
  }),

  model: computed('visual.modelType', 'dataSource.data', function () {
    var type = this.get('visual.modelType');
    var data = this.get('dataSource.data');

    switch (type) {
      case 'dimensional': return DimensionalDataModel.create({
        data, series: [ 'dogs', 'cats' ], key: 'state'
      });
      case 'temporal': return DimensionalDataModel.create({
        data, series: [ 'dogs', 'cats' ], key: 'timestamp'
      });
    }
  })
});
