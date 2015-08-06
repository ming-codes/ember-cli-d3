import Ember from 'ember';
import layout from './template';

import SelectionProxy from './d3-selection-proxy';

export default Ember.Component.extend({
  tagName: 'svg',
  classNames: [ 'data-visual' ],
  layout,

  width: 300,
  height: 150,

  initElementProxy() {
    this.set('proxy', SelectionProxy.create({ selection: d3.select(this.element) }));
    this.measure();
  },

  measure() {
    this.set('width', this.$().width());
    this.set('height', this.$().height());
  },

  didInsertElement() {
    Ember.$(window).on('resize', Ember.run.bind(this, this.measure));

    Ember.run.scheduleOnce('afterRender', this, this.initElementProxy);
  }

});
