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
      id: 'gallery.bars.grouped',
      name: 'Grouped Bars',
      alias: [],
      component: 'cart-grouped-bars',
      modelType: 'dimensional',
      description: 'This is a grouped bar chart',
      variations: [ 'gallery.bars.stacked' ]
    },
    {
      id: 'gallery.bars.stacked',
      name: 'Stacked Bars',
      alias: [],
      component: 'cart-stacked-bars',
      modelType: 'dimensional',
      description: 'This is a stacked bar chart',
      variations: [ 'gallery.bars.grouped' ]
    },
    //{
    //  id: 2,
    //  name: 'Waterfall',
    //  id: 'gallery.bars/waterfall'
    //}
  ]
});

export default VisualModel;
