import DS from 'ember-data';

const VisualModel = DS.Model.extend({
  name: DS.attr('string'),
  alias: DS.attr('array'),
  route: DS.attr('string'),
  description: DS.attr('string'),
  variations: DS.hasMany('visual'),
  component: DS.attr('string'),
  modelType: DS.attr('string')
});

VisualModel.reopenClass({
  FIXTURES: [
    {
      id: 0,
      name: 'Grouped Bars',
      alias: [],
      route: 'gallery.bars.grouped',
      component: 'cart-grouped-bars',
      modelType: 'dimensional',
      description: 'This is a grouped bar chart',
      variations: [ 1 ]
    },
    {
      id: 1,
      name: 'Stacked Bars',
      alias: [],
      route: 'gallery.bars.stacked',
      component: 'cart-stacked-bars',
      modelType: 'dimensional',
      description: 'This is a stacked bar chart',
      variations: [ 0 ]
    },
    //{
    //  id: 2,
    //  name: 'Waterfall',
    //  route: 'gallery.bars/waterfall'
    //}
  ]
});

export default VisualModel;
