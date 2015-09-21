import Ember from 'ember';
import d3 from 'd3';
import hbs from 'htmlbars-inline-precompile';

import GraphicSupport from 'ember-cli-d3/mixins/d3-support';
import MarginConvention from 'ember-cli-d3/mixins/margin-convention';

import DimensionalModel from 'dummy/utils/model/dimensional';

import { join, accessor } from 'ember-cli-d3/utils/d3';
import { identity } from 'ember-cli-d3/utils/lodash';
import { computed } from 'ember-cli-d3/utils/version';
import { box } from 'ember-cli-d3/utils/css';

export default Ember.Component.extend(GraphicSupport, MarginConvention, {
  layout: hbs`{{yield seriesSel exportedXScale exportedYScale contentWidth contentHeight}}`,

  stroke: d3.scale.category10(),

  defaultMargin: { left: 50, right: 0, top: 0, bottom: 50 },
  orient: null, // TODO

  model: null,

  width: 300,
  height: 150,

  onhover: null,

  exportedXScale: null,
  computedXScale: computed('contentWidth', 'model.data', 'model.key', {
    get() {
      var width = this.get('contentWidth');
      var data = this.get('model.data');
      var key = this.get('model.key');
      var domain, scale;

      domain = !key ? data : d3.extent(data, record => Ember.get(record, key));
      domain = domain.length ? domain : [ 0, 1 ];

      scale = domain.reduce(((prev, cur) => prev && cur instanceof Date), true);
      scale = scale ? d3.time.scale() : d3.scale.linear();

      return scale.domain(domain).range([ 0, width ]);
    }
  }).readOnly(),
  exportedYScale: null,
  computedYScale: computed('contentHeight', 'model.extent', {
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

  call(selection) {
    var context = this;
    var top = this.get('margin.top');
    var left = this.get('margin.left');
    var height = this.get('contentHeight');
    var elementId = context.elementId;

    selection.each(function () {
      var selection = d3.select(this);

      context.series(selection.attr('id', elementId).attr('transform', `translate(${left} ${top + height})`));

      context.tracker(d3.select(this));
    });

  },

  tracker: join([0], 'rect.backdrop', {
    update(selection) {
      var self = this;
      var onhover = this.get('onhover');
      var data = this.get('model.data');
      var series = self.get('model.series');
      var key = this.get('model.key');

      var width = this.get('contentWidth');
      var height = this.get('contentHeight');
      var margin = this.get('margin');

      var xScale = this.get('computedXScale');
      var domain = xScale.range();
      var ticks = data.map(accessor(key));
      var band = (domain[1] - domain[0]) / ticks.length

      var scale = d3.scale.quantize()
        .domain([ domain[0] - band / 2, domain[1] + band / 2 ])
        .range(ticks.map(identity(1)));

      selection
          .style('fill', 'transparent')
          .attr('transform', `translate(0 ${-height})`)
          .attr('width', width)
          .attr('height', height);

      function closestData([ x, y ]) {
        return data[scale(x)];
      }

      // This is quite expensive; only do this if we're watching
      if (onhover) {
        selection.on('mousemove.tracker', function () {
          onhover({ data: [ closestData(d3.mouse(this)) ], series, key });
        });
        selection.on('mouseout.tracker', function () {
          onhover({ data: [], series, key });
        });
      }
    }
  }),

  series: join('model.series', '.series', {
    enter(sel) {
      sel
        .append('g')
          .attr('class', 'series')
        .append('path')
          .attr('class', 'shape');
    },

    update(sel) {
      var self = this;
      var data = this.get('model.data');
      var key = this.get('model.key');
      var xScale = this.get('computedXScale');
      var yScale = this.get('computedYScale');

      var color = this.get('stroke');

      sel
        .style('stroke', ({ metricPath }) => color(metricPath))
        .each(function (series) {
          var path = d3.transition(d3.select(this)
            .select('path').datum(data)
              .style('fill', 'none')
              .style('stroke-width', 5));

          var line = d3.svg.line()
              .x(record => xScale(record[key]))
              .y(record => yScale(Ember.get(record, series.metricPath)));

          if (!(path.delay && path.duration)) {
            path.attr('d', line);

            Ember.run.join(() => {
              self.set('exportedXScale', xScale);
              self.set('exportedYScale', yScale);
            });
          }
          else {
            d3.transition(path)
              .style('opacity', 0)
              .each('end', function () {
                Ember.run.join(() => {
                  self.set('exportedXScale', xScale);
                  self.set('exportedYScale', yScale);
                });

                d3.select(this)
                    .attr('d', line)
                  .transition()
                    .style('opacity', 1)
                    .styleTween('stroke-dasharray', function dashTween() {
                      var total = this.getTotalLength();
                      var interp = d3.interpolateString(`0,${total}`, `${total},${total}`);

                      return (time) => interp(time);
                    });
              });
          }
        });
    }
  })
});
