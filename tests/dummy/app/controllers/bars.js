
import Ember from 'ember';

function random() {
  return Math.random() * Date.now() >> 16;
}

var DimensionalDataModel = Ember.Object.extend({
  data: null,
  series: null, // series contains metadata like format and labeling
  key: null,

  min: Ember.computed('extent', {
    get() {
      return this.get('extent.0');
    }
  }),
  max: Ember.computed('extent', {
    get() {
      return this.get('extent.1');
    }
  }),
  extent: Ember.computed('data', 'series', {
    get() {
      var data = this.get('data');
      var series = this.get('series');
      var extent = [ Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY ];
      var dataIndex;
      var dataLen = data.length;
      var seriesIndex;
      var seriesLen = series.length;

      for (dataIndex = 0; dataIndex < dataLen; dataIndex++) {
        for (seriesIndex = 0; seriesIndex < seriesLen; seriesIndex++) {
          extent[0] = Math.min(extent[0], data[dataIndex][series[seriesIndex]]);
          extent[1] = Math.max(extent[1], data[dataIndex][series[seriesIndex]]);
        }
      }

      return extent;
    }
  })
});

export default Ember.Controller.extend({

  app: Ember.inject.controller('application'),

  isStacked: Ember.computed.equal('app.currentRouteName', 'bars.stacked'),
  isGrouped: Ember.computed.equal('app.currentRouteName', 'bars.grouped'),
  isWaterfall: Ember.computed.equal('app.currentRouteName', 'bars.waterfall'),

  data: [ {
    _id: 1,
    asian: random(),
    black: random(),
    white: random()
  }, {
    _id: 2,
    asian: random(),
    black: random(),
    white: random()
  } ],
  series: [ 'black', 'asian' ],
  key: '_id',

  dim: Ember.computed('data', 'series', 'key', {
    get() {
      return DimensionalDataModel.create(this.getProperties('data', 'series', 'key'));
    }
  }),

  generate() {
    this.set('data', [ {
      _id: 1,
      asian: random(),
      black: random(),
      white: random()
    }, {
      _id: 2,
      asian: random(),
      black: random(),
      white: random()
    } ]);
  }

});
