import DS from 'ember-data';

const VisualModel = DS.Model.extend({
  name: DS.attr('string')
});

VisualModel.reopenClass({
  FIXTURES: [
    {
      id: 0,
      name: 'Grouped Bars'
    },
    {
      id: 1,
      name: 'Stacked Bars'
    },
    {
      id: 2,
      name: 'Waterfall'
    }
  ]
});

export default VisualModel;
