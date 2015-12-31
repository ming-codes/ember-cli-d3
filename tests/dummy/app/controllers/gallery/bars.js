
import Ember from 'ember';

import { computed } from 'ember-cli-d3/utils/version';

export default Ember.Controller.extend({
  visual: null,

  app: Ember.inject.controller('application'),

  dimensional: Ember.inject.service('dimensional-data-source'),

  isGrouped: Ember.computed.equal('app.currentRouteName', 'gallery.bars.grouped'),
  isStacked: Ember.computed.equal('app.currentRouteName', 'gallery.bars.stacked'),
  isWaterfall: Ember.computed.equal('app.currentRouteName', 'gallery.bars.waterfall')

});
