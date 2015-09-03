import Ember from 'ember';
import d3 from 'd3';
import layout from './template';

import SelectionProxy from '../system/selection-proxy';

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
    Ember.$(window).on(`resize.${this.get('elementId')}`, Ember.run.bind(this, this.measure));

    Ember.run.scheduleOnce('afterRender', this, this.initElementProxy);
  },

  willDestroyElement() {
    Ember.$(window).off(`resize.${this.get('elementId')}`);
  }

});
