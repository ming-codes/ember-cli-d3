import Ember from 'ember';
import layout from './template';

import EmberD3 from '../../mixins/d3-support';

import { join, translateX } from '../../utils/d3';

import { scan } from '../../utils/lodash';

import { box } from '../../utils/css';

export default Ember.Component.extend(EmberD3, {
  layout,

  contentWidth: Ember.computed('width', 'margin.left', 'margin.right', {
    get() {
      var width = this.get('width');
      var left = this.get('margin.left');
      var right = this.get('margin.right');

      return width - left - right;
    }
  }).readOnly(),
  contentHeight: Ember.computed('height', 'margin.top', 'margin.bottom', {
    get() {
      var height = this.get('height');
      var top = this.get('margin.top');
      var bottom = this.get('margin.bottom');

      return height - top - bottom;
    }
  }).readOnly(),

  margin: box.asComputed(),
  orient: null, // TODO

  signedValues: Ember.computed('model.data', 'model.series', {
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

  layoutValues: Ember.computed('signedValues', 'model.data', 'model.series', 'model.key', {
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

  xScale: Ember.computed('contentWidth', 'model.data', 'model.key', {
    get() {
      var width = this.get('contentWidth');
      var data = this.get('model.data');
      var key = this.get('model.key');

      return d3.scale.ordinal()
        .domain(!key ? data : data.map((data) => Ember.get(data, key)))
        .rangePoints([ 0, width ], 1);
    }
  }).readOnly(),
  yScale: Ember.computed('contentHeight', 'signedValues', {
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

  call(sel) {
    var context = this;
    var top = this.get('margin.top');
    var left = this.get('margin.left');
    var height = this.get('contentHeight');
    var elementId = context.elementId;

    sel.each(function () {
      context.series(d3.select(this).attr('id', elementId).attr('transform', `translate(${left} ${top + height})`));
    });
  },

  series: join('model.series', '.series', {
    enter(sel) {
      var context = this;
      var color = this.get('stroke');

      sel.append('g')
          .style('stroke', ({ metricPath }) => color(metricPath))
          .attr('class', 'series')
          .attr('transform', () => 'translate(0 0)')
        .each(function (data) {
          context.bars(d3.select(this), data);
        });
    },

    update(sel) {
      var context = this;
      var color = this.get('stroke');

      d3.transition(sel).attr('transform', () => `translate(0 0)`)
        .style('stroke', ({ metricPath }) => color(metricPath))
        .each(function (data) {
          context.bars(d3.select(this), data);
        });
    }
  }),

  bars: join('model.data[model.key]', '.bar', {
    enter(sel) {
      var xScale = this.get('xScale');
      var yScale = this.get('yScale');
      var key = this.get('model.key');
      var zero = yScale(0);

      sel
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
    update(sel, { metricPath }) {
      var xScale = this.get('xScale');
      var yScale = this.get('yScale');
      var key = this.get('model.key');

      var layout = this.get('layoutValues');

      d3.transition(sel)
          .attr('transform', translateX(record => xScale(Ember.get(record, key))))
        .select('.shape')
          .attr('x1', 0)
          .attr('x2', 0)
          .attr('y1', record => yScale(layout[record[key]][metricPath].start))
          .attr('y2', record => yScale(layout[record[key]][metricPath].end));
    }
  })
});
