
import Ember from 'ember';

import YieldSupport from '../mixins/yield-support';
import Stage from '../system/stage';

const Mixin = Ember.Mixin.create(YieldSupport, {
  yieldProperties: [ 'stage', 'width', 'height' ]
});

export default Ember.Component.extend(Mixin, {
  classNames: [ 'data-visual' ],

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
