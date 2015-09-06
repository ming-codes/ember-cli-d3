
import Ember from 'ember';
import DimensionalDataModel from 'dummy/utils/model/dimensional';

import { computed } from 'ember-cli-d3/utils/version';

export default Ember.Controller.extend({
  visual: null,

  app: Ember.inject.controller('application'),

  dataSource: Ember.inject.service('dimensional-data-source'),

  isStacked: Ember.computed.equal('app.currentRouteName', 'gallery.bars.stacked'),
  isGrouped: Ember.computed.equal('app.currentRouteName', 'gallery.bars.grouped'),
  isWaterfall: Ember.computed.equal('app.currentRouteName', 'gallery.bars.waterfall'),

  data: Ember.computed.alias('dataSource.data'),
  series: [ 'dogs', 'cats' ],
  key: 'state',

  dimensionalData: computed('data', 'series', 'key', {
    get() {
      return DimensionalDataModel.create(this.getProperties('data', 'series', 'key'));
    }
  }),

});
