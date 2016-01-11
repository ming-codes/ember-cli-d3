
import Ember from 'ember';

export default Ember.Mixin.create({
  hasYieldSupport: true,

  yieldProperties: null,

  content: Ember.computed('parentView', 'context', 'yieldProperties', function () {
    let properties = this.get('yieldProperties').reduce((accum, prop) => {
      accum[prop] = null;

      return accum;
    }, {});
    let content = this.nearestWithProperty('hasYieldSupport') || this;

	  return Ember.ObjectProxy.create(Ember.merge(properties, {
      content: content.get('origContext') || content.get('_parentView.context')
	  }));
  }).readOnly(),

  layout: Ember.computed(function () {
    return Ember.Handlebars.compile('{{view template=template context=content tagName="" isVirtual=true}}');
  }).readOnly(),

  init() {
    this._super(...arguments);

    this.getWithDefault('yieldProperties', []).forEach(prop => {
      this[`${prop}Binding`] = Ember.Binding
        .from(prop)
        .to(`content.${prop}`)
        .connect(this);
    });
  },

  destroy() {
    this._super(...arguments);

    this.getWithDefault('yieldProperties', []).forEach(prop => {
      this[`${prop}Binding`].disconnect(this);
    });
  }
});

