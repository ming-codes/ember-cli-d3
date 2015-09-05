
import Ember from 'ember';
import DimensionalDataModel from 'dummy/utils/model/dimensional';

import { computed } from 'ember-cli-d3/utils/version';

export default Ember.Controller.extend({

  app: Ember.inject.controller('application'),

  dataSource: Ember.inject.service('dimensional-data-source'),

  isStacked: Ember.computed.equal('app.currentRouteName', 'cart.bars.stacked'),
  isGrouped: Ember.computed.equal('app.currentRouteName', 'cart.bars.grouped'),
  isWaterfall: Ember.computed.equal('app.currentRouteName', 'cart.bars.waterfall'),

  data: Ember.computed.alias('dataSource.data'),
  series: [ 'dogs', 'cats' ],
  key: 'state',

  dim: computed('data', 'series', 'key', {
    get() {
      return DimensionalDataModel.create(this.getProperties('data', 'series', 'key'));
    }
  }),

});
