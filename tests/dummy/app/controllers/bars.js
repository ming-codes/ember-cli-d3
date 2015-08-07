
import Ember from 'ember';
import DimensionalDataModel from 'ember-d3/utils/model/dimensional';

export default Ember.Controller.extend({

  app: Ember.inject.controller('application'),

  dataSource: Ember.inject.service('dimensional-data-source'),

  isStacked: Ember.computed.equal('app.currentRouteName', 'bars.stacked'),
  isGrouped: Ember.computed.equal('app.currentRouteName', 'bars.grouped'),
  isWaterfall: Ember.computed.equal('app.currentRouteName', 'bars.waterfall'),

  data: Ember.computed.alias('dataSource.data'),
  series: [ 'black', 'asian' ],
  key: '_id',

  dim: Ember.computed('data', 'series', 'key', {
    get() {
      return DimensionalDataModel.create(this.getProperties('data', 'series', 'key'));
    }
  }),

});
