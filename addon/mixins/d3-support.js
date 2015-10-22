import Ember from 'ember';
import d3 from 'd3';
import { hasGlimmer } from 'ember-cli-d3/utils/version';

const GraphicSupport = Ember.Mixin.create({
  concatenatedProperties: [ 'requiredProperties' ],
  requiredProperties: [ 'select' ],

  tagName: '',

  select: null,
  model: null,

  call() {},

  didReceiveAttrs() {
    this._super(...arguments);
    var selection = this.get('select');

    if (selection && !this.isDestroying && this.get('requiredProperties').map(prop => Boolean(!!this.get(prop))).reduce(((prev, cur) => prev && cur), true)) {
      Ember.run.scheduleOnce('afterRender', selection, selection.call, this);
    }
  }
});

// if a base tag is present
if (!d3.select('head base').empty()) {
  GraphicSupport.reopen({
    didTransition() {
      Ember.run.scheduleOnce('render', this, this.didReceiveAttrs);
    },

    didInsertElement() {
      var router = this.container.lookup('router:main');

      this._super(...arguments);

      router.on('didTransition', this, this.didTransition);
    },

    willDestroyElement() {
      var router = this.container.lookup('router:main');

      this._super(...arguments);

      router.off('didTransition', this, this.didTransition);
    }
  });
}

if (!hasGlimmer) {
  GraphicSupport.reopen({
    init() {
      var key, index;

      this._super(...arguments);

      for (key in this) {
        if ((index = key.indexOf('Binding')) > 0 && key[0] !== '_') {
          this.addObserver(key.substring(0, index), this, () => {
            Ember.run.scheduleOnce('render', this, this.didReceiveAttrs);
          });
        }
      }

    },

    didInsertElement() {
      this._super(...arguments);

      Ember.run.scheduleOnce('render', this, this.didReceiveAttrs);
    }

  });
}
else {
  GraphicSupport.reopen({
    didInsertElement() {
      var index = this.container.lookup("-view-registry:main");

      this._super(...arguments);

      index[this.elementId] = this;
    },

    willDestroyElement() {
      var index = this.container.lookup("-view-registry:main");

      this._super(...arguments);

      delete index[this.elementId];
    }

  });
}

export default GraphicSupport;
