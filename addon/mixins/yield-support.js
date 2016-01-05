
import Ember from 'ember';

export default Ember.Mixin.create({
  hasYieldSupport: true,

  yieldProperties: null,

  content: Ember.computed('parentView', 'context', function () {
	  return Ember.ObjectProxy.create({
		  content: this.nearestWithProperty('hasYieldSupport') || this.get('_parentView.context')
	  });
  }).readOnly(),

  layout: Ember.computed(function () {
    return Ember.Handlebars.compile('{{view template=template context=content tagName=""}}');
  }).readOnly(),

  init() {
    this._super(...arguments);

    this.getWithDefault('yieldProperties', []).forEach(prop => {
      this[`${prop}Binding`] = Ember.Binding.from(prop).to(`content.${prop}`).connect(this);
    });
  },

  destroy() {
    this._super(...arguments);

    this.getWithDefault('yieldProperties', []).forEach(prop => {
      this[`${prop}Binding`].disconnect(this);
    });
  }
});

