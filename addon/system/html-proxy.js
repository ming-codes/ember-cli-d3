import Ember from 'ember';
import d3 from 'd3';

const SelectionProxy = Ember.Object.extend({
  unknownProperty(key) {
    return SelectionProxy.proxyElement(this, 'div', key);
  },

  call(component) {
    if (!component.isDestroying) {
      return component.get('call').call(component, this.get('selection'));
    }
  },

  toString() {
    let guid = Ember.guidFor(this);
    let selection = this.get('_selection');
    let node = (SelectionProxy.detectInstance(selection) ? selection.get('selection') : selection).node();
    let tagName = node.tagName;
    let id = node.id ? `#${node.id}` : '';
    let cls = node.classList[0] ? `.${node.classList[0]}` : '';

    return `<ember-cli-d3@selection-proxy:${guid}::${tagName}${id}${cls}>`;
  }
});

SelectionProxy.reopenClass({
  proxyElement(proxy, tagName, className) {
    let selection = proxy.get('selection');
    let proxied = selection.select(`${tagName}.${className}`);

    if (proxied.empty()) {
      proxied = selection.append(tagName).classed(className, true);
    }

    return SelectionProxy.create({ selection: proxied });
  }
});

export default Ember.Object.extend({
  select: Ember.computed('element', function() {
    return SelectionProxy.create({
      selection: d3.select(this.get('element'))
    });
  }).readOnly(),

  call(component) {
    var element = this.get('element');

    return component.get('call').call(component, element);
  }

});
