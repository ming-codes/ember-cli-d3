import Ember from 'ember';
import d3 from 'd3';
import hbs from 'htmlbars-inline-precompile';

import GraphicSupport from 'ember-cli-d3/mixins/d3-support';
import MarginConvention from 'ember-cli-d3/mixins/margin-convention';

import { assign } from 'ember-cli-d3/utils/d3';
import { computed } from 'ember-cli-d3/utils/version';

export default Ember.Component.extend(GraphicSupport, MarginConvention, {
  layout: hbs`{{yield}}`,

  transform: null,

  ticks: 4,
  tickSize: 6,
  tickFormat: null,
  tickPadding: null,

  scale: null,

  axis: computed('scale', 'orient', 'tickCount', 'tickSize', 'tickFormat', 'tickPadding', {
    get() {
      var props = this.getProperties('scale', 'orient', 'tickSize', 'tickFormat', 'tickPadding', 'ticks');

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
