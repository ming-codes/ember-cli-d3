import Ember from 'ember';

export default Ember.Controller.extend({
  dataSource: Ember.inject.service('geospatial-data-source'),

  geospatialData: Ember.computed.alias('dataSource.content')
});
