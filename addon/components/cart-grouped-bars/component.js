import Ember from 'ember';
import layout from './template';

import EmberD3 from '../../mixins/d3-support';

import { join, translateX } from '../../utils/d3';

import { box } from '../../utils/css';

export default Ember.Component.extend(EmberD3, {
  layout,

  attrs: {
    model: null,
    margin: { left: 50, right: 0, top: 0, bottom: 50 },
    orient: null,
    width: 300,
    height: 150,

    stroke: d3.scale.category10()
  },

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

  width: null,
  height: null,

  xScale: Ember.computed('contentWidth', 'model.data', 'model.key', {
    get() {
      var width = this.get('contentWidth');
      var data = this.get('model.data');
      var key = this.get('model.key');

      return d3.scale.ordinal()
        .domain(!key ? data : data.map((data) => Ember.get(data, key)))
        .rangeBands([ 0, width ])
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
        .domain(series)
        .rangePoints([ 0, band ], 1)
    }
  }).readOnly(),

  call(sel) {
    var context = this;
    var top = this.get('margin.top');
    var left = this.get('margin.left');
    var height = this.get('contentHeight');

    sel.each(function () {
      context.series(d3.select(this).attr('transform', `translate(${left} ${top + height})`));
    });
  },

  series: join('model.series', '.series', {
    enter(sel) {
      var context = this;
      var color = this.get('stroke');
      var zScale = this.get('zScale');

      sel.append('g')
          .style('stroke', color)
          .attr('class', 'series')
          .attr('transform', series => `translate(${zScale(series)} 0)`)
        .each(function (data) {
          context.bars(d3.select(this), data);
        });
    },

    update(sel) {
      var context = this;
      var color = this.get('stroke');
      var zScale = this.get('zScale');

      sel.attr('transform', series => `translate(${zScale(series)} 0)`)
        .style('stroke', color)
        .each(function (data) {
          context.bars(d3.select(this), data);
        });
    }

  }),

  bars: join('model.data[model.key]', '.bar', {
    enter(sel, series) {
      var xScale = this.get('xScale');
      var yScale = this.get('yScale');
      var key = this.get('model.key');
      var zero = yScale(0);

      var entered = sel
          .append('g')
        .attr('class', 'bar')
        .attr('transform', translateX(data => xScale(Ember.get(data, key))))
          .append('line')
        .attr('class', 'shape')
          .attr('x1', 0)
          .attr('x2', 0)
          .attr('y1', zero)
          .attr('y2', zero);

      d3.transition(entered)
          .attr('y2', data => yScale(data[series]));
    },
    update(sel, series) {
      var xScale = this.get('xScale');
      var yScale = this.get('yScale');
      var zero = yScale(0);
      var key = this.get('model.key');

      sel
        .attr('transform', translateX(data => xScale(Ember.get(data, key))))
        .select('.shape')
          .attr('x1', 0)
          .attr('x2', 0)
          .attr('y1', zero)
          .attr('y2', data => yScale(data[series]));
    }
  })
});
