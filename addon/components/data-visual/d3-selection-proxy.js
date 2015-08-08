
import Ember from 'ember';

import { assign } from '../../utils/d3';

var SelectionProxy = Ember.Object.extend({
  unknownProperty(key) {
    return SelectionProxy.proxyElement(this, 'append', 'g', key);
  },

  transition(options) {
    var ret = TransitionSelectionProxy.create({});

    ret._selection = this.get('selection');
    ret._options = options;

    return ret;
  },

  toString() {
    return '<SelectionProxy>';
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
  _selection: null,
  _options: null,

  selection: Ember.computed({
    get() {
      return assign(this._selection.transition(), this._options);
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
