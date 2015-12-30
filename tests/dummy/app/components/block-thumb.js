import Ember from 'ember';
import layout from '../templates/components/block-thumb';

import { computed } from 'ember-cli-d3/utils/version';

export default Ember.Component.extend({
  layout,

  dimensional: Ember.inject.service('dimensional-data-source'),
  geospatial: Ember.inject.service('geospatial-data-source'),

  visual: null,

  model: computed('visual.modelType', 'geospatial.data', 'dimensional.{crossSectionModel,timeSeriesModel,partitionModel}', function () {
    var type = this.get('visual.modelType');

    switch (type) {
      case 'dimensional': return this.get('dimensional.crossSectionModel');
      case 'temporal': return this.get('dimensional.timeSeriesModel');
      case 'partition': return this.get('dimensional.partitionModel');
      case 'geospatial': return this.get('geospatial.data');
    }
  })

});
