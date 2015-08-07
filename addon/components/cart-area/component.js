import Ember from 'ember';
import layout from './template';

import EmberD3 from '../../mixins/d3-support';

import { join } from '../../utils/d3';

import { box } from '../../utils/css';

export default Ember.Component.extend(EmberD3, {
  layout,

  stroke: d3.scale.category10(),

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

  defaultMargin: { left: 50, right: 0, top: 0, bottom: 50 },
  margin: box.asComputed('defaultMargin'),
  orient: null, // TODO

  model: null,

  width: 300,
  height: 150,

  xScale: Ember.computed('contentWidth', 'model.data', 'model.key', {
    get() {
      var width = this.get('contentWidth');
      var data = this.get('model.data');
      var key = this.get('model.key');

      if (!data.length) {
        return d3.scale.linear();
      }

      return d3.scale.linear()
        .domain(!key ? data : d3.extent(data, record => Ember.get(record, key)))
        .range([ 0, width ])
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
      sel
        .append('g')
          .attr('class', 'series')
        .append('path');
    },

    update(sel) {
      var data = this.get('model.data');
      var key = this.get('model.key');
      var xScale = this.get('xScale');
      var yScale = this.get('yScale');

      var color = this.get('stroke');

      sel
        .style('stroke', color)
        .each(function (series) {
          d3.select(this)
            .select('path').datum(data)
          .attr('d', d3.svg.line()
            .x(record => xScale(record[key]))
            .y(record => yScale(record[series]))
          )
          .style('fill', 'none')
          .style('stroke-width', 5)
        });
    }
  })
});
