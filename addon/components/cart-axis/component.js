import Ember from 'ember';
import layout from './template';

import EmberD3 from '../../mixins/d3-support';

import { assign } from '../../utils/d3';

export default Ember.Component.extend(EmberD3, {
  layout,

  transform: null,

  tickSize: 6,
  tickFormat: null,
  tickPadding: null,

  scale: null,

  axis: Ember.computed('scale', 'orient', 'tickSize', 'tickFormat', 'tickPadding', {
    get() {
      var props = this.getProperties('scale', 'orient', 'tickSize', 'tickFormat', 'tickPadding');

      return props.scale && assign(d3.svg.axis(), props);
    }
  }).readOnly(),

  call(sel) {
    var axis = this.get('axis');
    var transform = this.get('transform');

    if (axis) {
      sel.attr('id', this.elementId)
        .attr('transform', transform)
        .call(axis)
        .each(function () {
          d3.select(this).selectAll('.tick')
            .classed('zero', (data) => !data);
        });
    }
  }

});
