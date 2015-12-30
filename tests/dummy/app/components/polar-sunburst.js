import Ember from 'ember';
import d3 from 'd3';
import hbs from 'htmlbars-inline-precompile';

import GraphicSupport from 'ember-cli-d3/mixins/d3-support';
import MarginConvention from 'ember-cli-d3/mixins/margin-convention';

import { join, translateX } from 'ember-cli-d3/utils/d3';

export default Ember.Component.extend(GraphicSupport, MarginConvention, {
  layout: hbs`{{yield}}`,

  radius: Ember.computed('contentWidth', 'contentHeight', function () {
    return Math.min(this.get('contentWidth'), this.get('contentHeight')) / 2;
  }).readOnly(),

  xScale: Ember.computed(function () {
    return d3.scale.linear()
      .range([0, 2 * Math.PI]);
  }).readOnly(),

  yScale: Ember.computed('radius', function () {
    return d3.scale.sqrt()
      .range([0, this.get('radius')]);
  }).readOnly(),

  model: null,

  partitionLayout: Ember.computed(function () {
    return d3.layout.partition()
        .sort(null)
        .value(d3.functor(1));
  }),

  arcGenerator: Ember.computed('xScale', 'yScale', function () {
    var xScale = this.get('xScale');
    var yScale = this.get('yScale');

    return d3.svg.arc()
        .startAngle(({ x }) => Math.max(0, Math.min(2 * Math.PI, xScale(x))))
        .endAngle(({ x, dx }) => Math.max(0, Math.min(2 * Math.PI, xScale(x + dx))))
        .innerRadius(({ y }) => Math.max(0, yScale(y)))
        .outerRadius(({ y, dy }) => Math.max(0, yScale(y + dy)));
  }),

  call(selection) {
    var width = this.get('contentWidth');
    var height = this.get('contentHeight');

    selection.datum(this.get('model'))
        .classed('sunburst', true)
        .attr('transform', `translate(${width / 2} ${height / 2 + this.get('margin.top')})`);

    this.innerLayer(selection);
  },

  innerLayer: join('partitionLayout.nodes', 'path.arc', {
    update(selection) {
      var arc = this.get('arcGenerator');
      var color = d3.scale.category20c();
      var node;

      selection
          .attr('d', arc)
          .style('fill', (datum) => {
            return color((datum.children ? datum : datum.parent).name);
          })
          //.on("click", function (d) {
          //  node = d;
          //  path.transition()
          //    .duration(1000)
          //    .attrTween("d", arcTweenZoom(d));
          //})
          .each(stash);

      // Setup for switching data: stash the old values for transition.
      function stash(d) {
        d.x0 = d.x;
        d.dx0 = d.dx;
      }

      // When zooming: interpolate the scales.
      //function arcTweenZoom(d) {
      //  var xd = d3.interpolate(x.domain(), [d.x, d.x + d.dx]),
      //      yd = d3.interpolate(y.domain(), [d.y, 1]),
      //      yr = d3.interpolate(y.range(), [d.y ? 20 : 0, radius]);
      //  return function(d, i) {
      //    return i
      //        ? function(t) { return arc(d); }
      //        : function(t) { x.domain(xd(t)); y.domain(yd(t)).range(yr(t)); return arc(d); };
      //  };
      //}
    }
  })
});
