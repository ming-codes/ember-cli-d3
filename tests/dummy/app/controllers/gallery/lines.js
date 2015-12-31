
import Ember from 'ember';

import { computed } from 'ember-cli-d3/utils/version';

export default Ember.Controller.extend({
  visual: null,

  dimensional: Ember.inject.service('dimensional-data-source'),

  actions: {
    track(model) {
      this.set('tracked', model);
    }
  }
});
