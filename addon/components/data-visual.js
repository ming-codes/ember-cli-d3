
import Ember from 'ember';

import Stage from '../system/stage';

const htmlbars = '{{yield content.stage content.width content.height}}';
const handlebars = '{{view template=template context=content tagName=""}}';

const layout = Ember.tryInvoke(Ember.HTMLBars, 'compile', [ htmlbars ]) || Ember.tryInvoke(Ember.Handlebars, 'compile', [ handlebars ]);

export default Ember.Component.extend({
  classNames: [ 'data-visual' ],
  layout,

  content: Ember.computed(function () {
	  return Ember.ObjectProxy.create({
		  content: this.get('context'),

		  width: 300,
		  height: 150,

		  stage: null
	  });
  }).readOnly(),

  initializeGraphicsContext() {
    var element = this.element;
    var fragment = document.createDocumentFragment();

    Stage.stages.forEach(stage => {
      fragment.appendChild(document.createComment(stage));
    });

    element.insertBefore(fragment, element.firstChild);

    this.set('content.stage', Stage.create({ element }));
    this.measure();
  },

  measure() {
    this.set('content.width', this.$().width());
    this.set('content.height', this.$().height());
  },

  didInsertElement() {
    Ember.$(window).on(`resize.${this.get('elementId')}`, Ember.run.bind(this, this.measure));

    Ember.run.scheduleOnce('render', this, this.initializeGraphicsContext);
  },

  willDestroyElement() {
    Ember.$(window).off(`resize.${this.get('elementId')}`);
  }

});
