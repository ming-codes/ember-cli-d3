import Ember from 'ember';
import DS from 'ember-data';

const VisualModel = DS.Model.extend({
  name: DS.attr('string'),
  alias: DS.attr('array'),
  route: Ember.computed.alias('id'),
  description: DS.attr('string'),
  variations: DS.hasMany('visual'),
  component: DS.attr('string'),
  stage: DS.attr(),
  modelType: DS.attr('string')
});

function use(type) {
  return { [ type ]: true };
}

VisualModel.reopenClass({
  FIXTURES: [
    {
      id: 'gallery.bars.grouped',
      name: 'Grouped Bar Chart',
      alias: [],
      component: 'cart-grouped-bars',
      stage: use('svg'),
      modelType: 'dimensional',
      variations: [ 'gallery.bars.stacked', 'gallery.bars.waterfall' ],
      description: `
        Bar chart uses either vertical or horizontal bars to
        compare quantatative data accross multiple categories.

        A grouped bar chart gives you one extra dimension
        to compare data with. Compare to a stacked bar chart,
        grouped bar chart has bars precisely aligned with
        the axis, giving you a precise visual comparison
        among bars.
      `
    },
    {
      id: 'gallery.bars.stacked',
      name: 'Stacked Bars',
      alias: [],
      component: 'cart-stacked-bars',
      stage: use('svg'),
      modelType: 'dimensional',
      variations: [ 'gallery.bars.grouped', 'gallery.bars.waterfall' ],
      description: `
        Bar chart uses either vertical or horizontal bars to
        compare quantatative data accross multiple categories.

        A stacked bar chart gives you one extra dimension
        to compare data with. Compare to a grouped bar chart,
        stacked bar chart has a cleaner look at the number of
        bars increase.
      `
    },
    {
      id: 'gallery.bars.waterfall',
      name: 'Waterfall',
      alias: [],
      component: 'cart-waterfall-bars',
      stage: use('svg'),
      modelType: 'dimensional',
      variations: [ 'gallery.bars.grouped', 'gallery.bars.stacked' ],
      description: `
      `
    },
    {
      id: 'gallery.lines',
      name: 'Lines',
      alias: [],
      component: 'cart-lines',
      stage: use('svg'),
      modelType: 'temporal',
      variations: [],
      description: `
        Line chart shows quantatative data over a numerical
        interval. The slope the lines gives you visual indication
        on the rate of change from one tick to the next
      `
    },
    {
      id: 'gallery.sunburst',
      name: 'Sunburst',
      alias: [],
      component: 'polar-sunburst',
      stage: use('svg'),
      modelType: 'partition',
      variations: [],
      description: `
      `
    },
    {
      id: 'gallery.albers-usa',
      name: 'Albers USA Projection',
      alias: [],
      component: 'geo-albers-usa',
      stage: use('canvas'),
      modelType: 'geospatial',
      variations: [],
      description: `
      `
    },
  ]
});

export default VisualModel;
