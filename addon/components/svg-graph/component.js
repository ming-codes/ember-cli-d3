import Ember from 'ember';
import layout from './template';

var ElementProxy = Ember.Object.extend({
  unknownProperty(key) {
    return ElementProxy.proxyElement(this, 'append', 'g', key);
  },

  transition() {
    debugger;

    var ret = ElementProxy.create({
      $el: this.get('$el').transition()
    });

    return ret;
  }
});

ElementProxy.reopenClass({
  proxyElement(proxy, method, tagName, className) {
    var $el = proxy.get('$el');
    var $proxied = $el.select(`${tagName}.${className}`);

    if ($proxied.empty()) {
      $proxied = $el[method](tagName).classed(className, true);
    }

    return ElementProxy.create({ $el: $proxied });
  }
});

var SVGProxy = ElementProxy.extend({
  defs: Ember.computed({
    get() {
      return ElementProxy.proxyElement(this, 'insert', 'defs', 'svg-defs');
    }
  })
});

export default Ember.Component.extend({
  tagName: 'svg',
  classNames: [ 'svg-graph' ],
  layout: layout,

  width: 300,
  height: 150,

  initElementProxy() {
    this.set('proxy', SVGProxy.create({ $el: d3.select(this.element) }));
    this.measure();
  },

  measure() {
    this.set('width', this.$().width());
    this.set('height', this.$().height());
  },

  didInsertElement() {
    Ember.$(window).on('resize', Ember.run.bind(this, this.measure));

    Ember.run.scheduleOnce('afterRender', this, this.initElementProxy);
  }

});
