
import Ember from 'ember';
import d3 from 'd3';

import { assign } from '../utils/d3';
import { computed } from '../utils/version';

const SelectionProxy = Ember.Object.extend({
  unknownProperty(key) {
    return SelectionProxy.proxyElement(this, 'g', key);
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
  proxyElement(proxy, tagName, className) {
    var selection = proxy.get('selection');
    var proxied = selection.select(`${tagName}.${className}`);

    if (proxied.empty()) {
      proxied = selection.append(tagName).classed(className, true);
    }

    return SelectionProxy.create({ selection: proxied });
  }
});

const TransitionSelectionProxy = SelectionProxy.extend({
  _selection: null,
  _options: null,

  selection: computed({
    get() {
      return assign(this._selection.transition(), this._options);
    }
  }).volatile(),

  toString() {
    return '<TransitionSelectionProxy>';
  }
});

export default Ember.Object.extend({
  container: null,

  select: Ember.computed('element', function () {
    const fragment = this.get('container');

    if (fragment.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
      Ember.run.scheduleOnce('afterRender', this, this.swapContainer);
    }

    return SelectionProxy.create({
      selection: d3.select({
        ownerDocument: document,
        namespaceURI: d3.ns.prefix.svg,
        querySelector(selector) {
          return fragment.querySelector(selector);
        },
        querySelectorAll(selector) {
          return fragment.querySelectorAll(selector);
        },
        appendChild(child) {
          return fragment.appendChild(child);
        }
      })
    });
  }).readOnly(),
  defs: Ember.computed('element', function () {
    debugger;
  }).readOnly(),

  init() {
    this._super(...arguments);

    this.set('container', document.createDocumentFragment());
  },

  swapContainer() {
    console.log('swap');
    var fragment = this.get('container');
    var svg = this.get('element').querySelector('svg');

    svg.appendChild(fragment);

    Ember.run.schedule('sync', () => {
      this.set('container', svg);
      this.set('select.selection', d3.select(svg));
    });
  }
});
