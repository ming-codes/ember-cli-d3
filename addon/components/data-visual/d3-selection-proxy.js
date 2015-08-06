
import Ember from 'ember';

var SelectionProxy = Ember.Object.extend({
  unknownProperty(key) {
    return SelectionProxy.proxyElement(this, 'append', 'g', key);
  },

  transition() {
    return TransitionSelectionProxy.create({
      selection: this.get('selection')
    });
  },

  toString() {
    return '<SelectionProxy>'
  }
});

SelectionProxy.reopenClass({
  proxyElement(proxy, method, tagName, className) {
    var selection = proxy.get('selection');
    var proxied = selection.select(`${tagName}.${className}`);

    if (proxied.empty()) {
      proxied = selection[method](tagName).classed(className, true);
    }

    return SelectionProxy.create({ selection: proxied });
  }
});

var TransitionSelectionProxy = SelectionProxy.extend({
  selection: Ember.computed({
    get() {
      return this._selection.transition();
    },

    set(name, value, cached) {
      this._selection = value;

      return value;
    }
  }).volatile(),

  toString() {
    return '<TransitionSelectionProxy>'
  }
});

var SVGSelectionProxy = SelectionProxy.extend({
  defs: Ember.computed({
    get() {
      return SelectionProxy.proxyElement(this, 'insert', 'defs', 'data-visual-defs');
    }
  }),

  toString() {
    return '<SVGSelectionProxy>'
  }
});

export default  SVGSelectionProxy;
