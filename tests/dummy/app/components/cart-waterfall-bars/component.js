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

  layoutValues: computed('model.data', 'model.series', 'model.key', {
    get() {
      var data = this.get('model.data');
      var series = this.get('model.series');
      var key = this.get('model.key');

      var base = 0;

      return data.reduce((accum, datum) => {
        accum[datum[key]] = series.reduce((accum, { metricPath }) => {
          var change = datum[metricPath];
          var start = base;
          var end = base + change;

          base += change;

          accum[metricPath] = { start, end, change };

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
        .rangeBands([ 0, width ], 0.5);
    }
  }).readOnly(),
  yScale: computed('contentHeight', 'model.data', 'model.series', {
    get() {
      var height = this.get('contentHeight');
      var data = this.get('model.data');
      var series = this.get('model.series');
      var base = 0;
      var extent = [ base, base ];

      data.forEach(datum => {
        series.forEach(({ metricPath }) => {
          base += datum[metricPath];

          extent[0] = Math.min(extent[0], base);
          extent[1] = Math.max(extent[1], base);
        });
      });

      return d3.scale.linear()
        .domain(extent)
        .range([ 0, -height ]);
    }
  }).readOnly(),
  zScale: computed('xScale', 'model.series', {
    get() {
      var series = this.get('model.series');
      var band = this.get('xScale').rangeBand();

      return d3.scale.ordinal()
        .domain(series.map(({ metricPath }) => metricPath))
        .rangePoints([ 0, band ], 1);
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

    this.set('seriesSelection', selection.selectAll('.series'));
  },

  series: join('model.series', '.series', {
    enter(sel) {
      var context = this;
      var color = this.get('stroke');
      var zScale = this.get('zScale');

      sel.append('g')
          .style('stroke', ({ metricPath }) => color(metricPath))
          .attr('class', 'series')
          .attr('transform', ({ metricPath }) => `translate(${zScale(metricPath)} 0)`)
        .each(function (data) {
          context.bars(d3.select(this), data);
        });
    },

    update(sel) {
      var context = this;
      var color = this.get('stroke');
      var zScale = this.get('zScale');

      d3.transition(sel).attr('transform', ({ metricPath }) => `translate(${zScale(metricPath)} 0)`)
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
