import Ember from 'ember';
import layout from './template';

import EmberD3 from '../../mixins/d3-support';

//import { join, translateX } from '../../utils/d3';

export default Ember.Component.extend(EmberD3, {
  layout,

  tickSize: 6,
  transform: null,

  axis: Ember.computed('scale', 'tickSize', {
    get() {
      var tickSize = this.get('tickSize');
      var scale = this.get('scale');
      var orient = this.get('orient');

      return scale && d3.svg.axis()
        .scale(scale)
        .orient(orient)
        .tickSize(tickSize);
    }
  }).readOnly(),

  call(sel) {
    var axis = this.get('axis');
    var transform = this.get('transform');

    if (axis) {
      sel
        .attr('transform', transform)
        .call(axis)
        .each(function () {
          d3.select(this).selectAll('.tick')
            .classed('zero', (data) => !data);
        });
    }
  }

});
