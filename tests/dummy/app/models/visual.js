import Ember from 'ember';
import DS from 'ember-data';

const VisualModel = DS.Model.extend({
  name: DS.attr('string'),
  alias: DS.attr('array'),
  route: Ember.computed.alias('id'),
  description: DS.attr('string'),
  variations: DS.hasMany('visual'),
  component: DS.attr('string'),
  modelType: DS.attr('string')
});

VisualModel.reopenClass({
  FIXTURES: [
    {
      id: 'gallery.bars',
      name: 'Grouped Bar Chart',
      alias: [],
      component: 'cart-grouped-bars',
      modelType: 'dimensional',
      variations: [ 'gallery.bars.stacked' ],
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
      modelType: 'dimensional',
      variations: [ 'gallery.bars' ],
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
      id: 'gallery.lines',
      name: 'Lines',
      alias: [],
      component: 'cart-lines',
      modelType: 'temporal',
      variations: [],
      description: `
        Line chart shows quantatative data over a numerical
        interval. The slope the lines gives you visual indication
        on the rate of change from one tick to the next
      `
    },
  ]
});

export default VisualModel;
