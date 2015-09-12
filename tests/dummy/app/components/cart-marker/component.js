import Ember from 'ember';
import d3 from 'd3';
import layout from './template';

import GraphicSupport from 'ember-cli-d3/mixins/d3-support';

import { join } from 'ember-cli-d3/utils/d3';

export default Ember.Component.extend(GraphicSupport, {
  layout,

  shape: null,
  applyTo: null,
  applyAt: Ember.computed({
    set(name, value) {
      if (Ember.typeOf(value) === 'string') {
        return value.split(/\s*,\s*/);
      }

      return value;
    }
  }),

  tick(selection) {
    selection
        .attr('id', 'tick')
        .attr('viewBox', '0 0 10 10')
        .attr('refX', 0)
        .attr('refY', 5)
        .attr('markerWidth', 2)
        .attr('markerHeight', 4)
        .attr('orient', 'auto')
      .append('line')
        .classed(`${this.get('shape')}-marker`, true)
        .attr('x1', 0)
        .attr('y1', 0)
        .attr('x2', 0)
        .attr('y2', 10)
        .style('stroke', 'black')
        .style('stroke-width', 1);
  },

  marker: join([ 0 ], 'marker', {
    enter(selection) {
      var shape = this.get('shape');

      selection
        .append('marker')
          .call(marker => {
            this[shape](marker);
          });
    }
  }),

  apply(selection) {
    if (!selection) { return; }

    selection = selection.selectAll('.shape');

    this.get('applyAt').forEach(styleName => {
      selection.style(styleName, 'url(/gallery/bars/waterfall#tick)');
    });
  },

  call(selection) {
    this.marker(selection);

    this.apply(this.get('applyTo'));
  }

});
