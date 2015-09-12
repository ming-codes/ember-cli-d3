import Ember from 'ember';
import d3 from 'd3';
import layout from './template';

import GraphicSupport from 'ember-cli-d3/mixins/d3-support';
import MarginConvention from 'ember-cli-d3/mixins/margin-convention';

import { join, translateX } from 'ember-cli-d3/utils/d3';
import { scan } from 'ember-cli-d3/utils/lodash';
import { computed } from 'ember-cli-d3/utils/version';
import { box } from 'ember-cli-d3/utils/css';

export default Ember.Component.extend(GraphicSupport, MarginConvention, {
  layout,

  defaultMargin: box(60),
  orient: null, // TODO

  signedValues: computed('model.data', 'model.series', {
    get() {
      var data = this.get('model.data');
      var series = this.get('model.series');

      return data.map(record => {
        var positives = [];
        var negatives = [];

        positives.length = negatives.length = series.length;

        series.forEach(({ metricPath }, index) => {
          var value = Ember.get(record, metricPath);

          (value > 0 ? positives : negatives)[index] = value;
        });

        return { negatives, positives };
      });
    }
  }).readOnly(),

  layoutValues: computed('signedValues', 'model.data', 'model.series', 'model.key', {
    get() {
      var data = this.get('model.data');
      var series = this.get('model.series');
      var key = this.get('model.key');
      var signedValues = this.get('signedValues');

      function layout(col) {
        return scan(col, (prev, value, index) => {
          var start = prev.end;
          var end = start + value;

          return { start, end, series: series[index] };
        }, { end: 0 });
      }
      return signedValues
        .map(({ negatives, positives }) => {
          positives = layout(positives);
          negatives = layout(negatives);

          return series.map((_, index) => {
            return positives[index] || negatives[index];
          });
        })
        .reduce((accum, bySeries, index) => {
          var keyValue = Ember.get(data[index], key);

          accum[keyValue] = bySeries.reduce((accum, { series, start, end }) => {
            accum[series.metricPath] = { start, end };

            return accum;
          }, {});

          return accum;
        }, {});

    }
  }).readOnly(),

  xScale: computed('contentWidth', 'model.data', 'model.key', {
    get() {
      var width = this.get('contentWidth');
      var data = this.get('model.data');
      var key = this.get('model.key');

      return d3.scale.ordinal()
        .domain(!key ? data : data.map((data) => Ember.get(data, key)))
        .rangePoints([ 0, width ], 1);
    }
  }).readOnly(),
  yScale: computed('contentHeight', 'signedValues', {
    get() {
      var height = this.get('contentHeight');
      var data = this.get('signedValues');
      var extent = [ Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY ];

      data.forEach(({ negatives, positives }) => {
        extent[0] = Math.min(extent[0], d3.sum(negatives));
        extent[1] = Math.max(extent[1], d3.sum(positives));
      });

      extent[0] = Math.min(extent[0], 0);
      extent[1] = Math.max(extent[1], 0);

      if (extent[0] === extent[1]) {
        extent[1]++;
      }

      return d3.scale.linear()
        .domain(extent)
        .range([ 0, -height ]);
    }
  }).readOnly(),

  call(selection) {
    var context = this;
    var top = this.get('margin.top');
    var left = this.get('margin.left');
    var height = this.get('contentHeight');
    var elementId = context.elementId;

    selection.each(function () {
      context.series(d3.select(this).attr('id', elementId).attr('transform', `translate(${left} ${top + height})`));
    });
  },

  series: join('model.series', '.series', {
    enter(selection) {
      var context = this;
      var color = this.get('stroke');

      selection.append('g')
          .style('stroke', ({ metricPath }) => color(metricPath))
          .attr('class', 'series')
          .attr('transform', () => 'translate(0 0)')
        .each(function (data) {
          context.bars(d3.select(this), data);
        });
    },

    update(selection) {
      var context = this;
      var color = this.get('stroke');

      d3.transition(selection).attr('transform', () => `translate(0 0)`)
        .style('stroke', ({ metricPath }) => color(metricPath))
        .each(function (data) {
          context.bars(d3.select(this), data);
        });
    }
  }),

  bars: join('model.data[model.key]', '.bar', {
    enter(selection) {
      var xScale = this.get('xScale');
      var yScale = this.get('yScale');
      var key = this.get('model.key');
      var zero = yScale(0);

      selection
        .append('g')
          .attr('class', 'bar')
          .attr('transform', translateX(record => xScale(Ember.get(record, key))))
        .append('line')
          .attr('class', 'shape')
          .attr('x1', 0)
          .attr('x2', 0)
          .attr('y1', zero)
          .attr('y2', zero);
    },
    update(selection, { metricPath }) {
      var xScale = this.get('xScale');
      var yScale = this.get('yScale');
      var key = this.get('model.key');

      var layout = this.get('layoutValues');

      d3.transition(selection)
          .attr('transform', translateX(record => xScale(Ember.get(record, key))))
        .select('.shape')
          .style('marker-start', null)
          .style('marker-mid', null)
          .style('marker-end', null)
          .attr('x1', 0)
          .attr('x2', 0)
          .attr('y1', record => yScale(layout[record[key]][metricPath].start))
          .attr('y2', record => yScale(layout[record[key]][metricPath].end));
    }
  })
});
