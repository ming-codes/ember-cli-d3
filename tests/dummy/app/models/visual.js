import DS from 'ember-data';

const VisualModel = DS.Model.extend({
  name: DS.attr('string'),
  route: DS.attr('string'),
  description: DS.attr('string'),
  variations: DS.hasMany('visual')
});

VisualModel.reopenClass({
  FIXTURES: [
    {
      id: 0,
      name: 'Grouped Bars',
      route: 'gallery.bars.grouped',
      description: 'This is a grouped bar chart',
      variations: [ 1 ]
    },
    {
      id: 1,
      name: 'Stacked Bars',
      route: 'gallery.bars.stacked',
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
