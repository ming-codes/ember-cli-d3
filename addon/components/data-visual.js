import Ember from 'ember';

import Stage from '../system/stage';

export default Ember.Component.extend({
  classNames: [ 'data-visual' ],

  width: 300,
  height: 150,

  stage: null,

  initializeGraphicsContext() {
    var element = this.element;
    var fragment = document.createDocumentFragment();

    Stage.stages.forEach(stage => {
      fragment.appendChild(document.createComment(stage));
    });

    element.insertBefore(fragment, element.firstChild);

    this.set('stage', Stage.create({ element }));
    this.measure();
  },

  measure() {
    this.set('width', this.$().width());
    this.set('height', this.$().height());
  },

  didInsertElement() {
    Ember.$(window).on(`resize.${this.get('elementId')}`, Ember.run.bind(this, this.measure));

    Ember.run.scheduleOnce('render', this, this.initializeGraphicsContext);
  },

  willDestroyElement() {
    Ember.$(window).off(`resize.${this.get('elementId')}`);
  }

});
