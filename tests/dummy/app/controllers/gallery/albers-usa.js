import Ember from 'ember';

export default Ember.Controller.extend({
  topojson: Ember.inject.service('geospatial-data-source')
});
