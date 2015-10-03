import Ember from 'ember';
import d3 from 'd3';
import topojson from 'd3/plugins/mbostock/topojson';
import hbs from 'htmlbars-inline-precompile';

import GraphicSupport from 'ember-cli-d3/mixins/d3-support';
import MarginConvention from 'ember-cli-d3/mixins/margin-convention';

export default Ember.Component.extend(GraphicSupport, MarginConvention, {
  requiredProperties: [ 'model' ],
  layout: hbs`{{yield}}`,

  albersProjection: Ember.computed('contentWidth', 'contentHeight', function () {
    var width = this.get('contentWidth');
    var height = this.get('contentHeight');

    return d3.geo.albers()
        .scale(500)
        .translate([width / 2 + this.get('margin.left'), height / 2 + this.get('margin.top')]);
  }).readOnly(),

  pathGenerator: Ember.computed('albersProjection', function () {
    var projection = this.get('albersProjection');

    return d3.geo.path()
        .projection(projection);
  }).readOnly(),

  call(context) {
    var us = this.get('model');
    var path = this.get('pathGenerator').context(context);

    path(topojson.feature(us, us.objects.states));

    context.stroke();
  }
});
