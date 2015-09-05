
import Ember from 'ember';

import { computed } from 'ember-cli-d3/utils/version';

export default Ember.Object.extend({
  key: null,
  data: null,
  // series contains metadata like format and labeling
  series: computed({
    set(name, newValue) {
      return newValue.map(series => {
        Ember.assert(`${name} must be a collection of strings or object { metricPath, labelPath, format }`, () => {
          return ~[ 'string', 'object' ].indexOf(typeof series);
        });

        if (typeof series === 'object') {
          return series;
        }

        return { metricPath: series, labelPath: series, format: series };
      });
    }
  }),

  min: computed('extent', {
    get() {
      return this.get('extent.0');
    }
  }).readOnly(),
  max: computed('extent', {
    get() {
      return this.get('extent.1');
    }
  }).readOnly(),
  extent: computed('data', 'series', {
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
          extent[0] = Math.min(extent[0], data[dataIndex][series[seriesIndex].metricPath]);
          extent[1] = Math.max(extent[1], data[dataIndex][series[seriesIndex].metricPath]);
        }
      }

      return extent;
    }
  }).readOnly()

});

