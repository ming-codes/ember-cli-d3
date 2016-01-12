
import Ember from 'ember';

const YieldSupportView = Ember.View.extend({
  tagName: '',
  isVirtual: true,

  yieldProperties: null,

  init() {
    let yieldProperties = this.get('yieldProperties') || '';
    let component = this.get('parentView');
    let content = component.get('content');

    Ember.assert('YieldSupportView can only be used in the component template of a component with YieldSupport', component.get('hasYieldSupport'));

    this._super(...arguments);

    yieldProperties.split(/\s+/).forEach(prop => {
      content[prop] = null;
      component[`${prop}Binding`] = Ember.Binding
        .from(prop)
        .to(`content.${prop}`)
        .connect(component);
    });

    this.templateBinding = this.templateBinding || Ember.Binding
      .from('_parentView.context.template')
      .to('template')
      .connect(this);

    this.contextBinding = this.contextBinding || Ember.Binding
      .from('_parentView.context.content')
      .to('context')
      .connect(this);

  }
});

export default Ember.Mixin.create({
  hasYieldSupport: true,

  YieldSupportView,

  content: Ember.computed('parentView', 'context', function () {
    let content = this.nearestWithProperty('hasYieldSupport') || this;

	  return Ember.ObjectProxy.create({
      content: content.get('origContext') || content.get('_parentView.context')
	  });
  }).readOnly(),

});

