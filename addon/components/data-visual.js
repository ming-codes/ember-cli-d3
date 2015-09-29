import Ember from 'ember';
import layout from '../templates/components/data-visual';

import Context from '../system/context';

export default Ember.Component.extend({
  classNames: [ 'data-visual' ],
  layout,

  width: 300,
  height: 150,

  stage: null,

  initializeGraphicsContext() {
    this.set('stage', Context.create({ element: this.element }));
    this.measure();
  },

  measure() {
    this.set('width', this.$().width());
    this.set('height', this.$().height());
  },

  didInsertElement() {
    Ember.$(window).on(`resize.${this.get('elementId')}`, Ember.run.bind(this, this.measure));

    Ember.run.scheduleOnce('afterRender', this, this.initializeGraphicsContext);
  },

  willDestroyElement() {
    Ember.$(window).off(`resize.${this.get('elementId')}`);
  }

});
