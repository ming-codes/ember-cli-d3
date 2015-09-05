import Ember from 'ember';
import d3 from 'd3';
import layout from './template';

import GraphicSupport from 'ember-cli-d3/mixins/d3-support';
import MarginConvention from 'ember-cli-d3/mixins/margin-convention';

import { join, translateX } from 'ember-cli-d3/utils/d3';

import { box } from 'ember-cli-d3/utils/css';

export default Ember.Component.extend(GraphicSupport, MarginConvention, {
  layout,

  model: null,

  stroke: d3.scale.category10(),

  defaultMargin: box(60),
  orient: null, // TODO

  width: 300,
  height: 150,

  xScale: Ember.computed('contentWidth', 'model.data', 'model.key', {
    get() {
      var width = this.get('contentWidth');
      var data = this.get('model.data');
      var key = this.get('model.key');

      return d3.scale.ordinal()
        .domain(!key ? data : data.map((data) => Ember.get(data, key)))
        .rangeBands([ 0, width ]);
    }
  }).readOnly(),
  yScale: Ember.computed('contentHeight', 'model.extent', {
    get() {
      var height = this.get('contentHeight');
      var extent = this.get('model.extent');

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
  zScale: Ember.computed('xScale', 'model.series', {
    get() {
      var series = this.get('model.series');
      var band = this.get('xScale').rangeBand();

      return d3.scale.ordinal()
        .domain(series.map(({ metricPath }) => metricPath))
        .rangePoints([ 0, band ], 1);
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
        .attr('transform', translateX(data => xScale(Ember.get(data, key))))
          .append('line')
        .attr('class', 'shape')
          .attr('x1', 0)
          .attr('x2', 0)
          .attr('y1', zero)
          .attr('y2', zero);
    },
    update(sel, series) {
      var xScale = this.get('xScale');
      var yScale = this.get('yScale');
      var zero = yScale(0);
      var key = this.get('model.key');

      d3.transition(sel)
          .attr('transform', translateX(data => xScale(Ember.get(data, key))))
        .select('.shape')
          .attr('x1', 0)
          .attr('x2', 0)
          .attr('y1', zero)
          .attr('y2', data => yScale(data[series.metricPath]));
    }
  })
});
