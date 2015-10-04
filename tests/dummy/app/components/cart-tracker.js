import Ember from 'ember';
import d3 from 'd3';
import GraphicSupport from 'ember-cli-d3/mixins/d3-support';
import hbs from 'htmlbars-inline-precompile';

import { join } from 'ember-cli-d3/utils/d3';

export default Ember.Component.extend(GraphicSupport, {
  requiredProperties: [ 'xScale', 'yScale', 'model' ],

  layout: hbs`{{yield}}`,

  model: null,

  width: null,
  height: null,
  xScale: null,
  yScale: null,
  offsetX: Ember.computed('xScale', function () {
    return d3.extent(this.get('xScale').range())[0];
  }),
  offsetY: Ember.computed('yScale', function () {
    return d3.extent(this.get('yScale').range())[0];
  }),

  line: join('model.data[model.key]', 'line.track-line', {
    update(selection) {
      var data = this.get('model.data');
      var key = this.get('model.key');
      var scale = this.get('xScale');

      selection
          .style('stroke', 'red')
          .style('stroke-width', 2)
          .attr('y1', 0)
          .attr('y2', this.get('height'))
          .attr('x1', xPos)
          .attr('x2', xPos);

          function xPos(datum) {
            return scale(datum[key]);
          }
    }
  }),

  call(selection) {
    selection
        .attr('transform', `translate(${this.get('offsetX')} ${this.get('offsetY')})`);

    this.line(selection);
  }
});
