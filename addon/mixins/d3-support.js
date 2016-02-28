import Ember from 'ember';
import getOwner from 'ember-getowner-polyfill';
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
      var router = getOwner(this).lookup('router:main');

      this._super(...arguments);

      router.on('didTransition', this, this.didTransition);
    },

    willDestroyElement() {
      var router = getOwner(this).lookup('router:main');

      this._super(...arguments);

      router.off('didTransition', this, this.didTransition);
    }
  });
}

if (!hasGlimmer) {
  GraphicSupport.reopen({
    init() {
      this._super(...arguments);

      Object.keys(this).forEach(key => {
        let index = key.indexOf('Binding');

        if (key[0] !== '_' && index > 0) {
          this.addObserver(key.substring(0, index), this, () => {
            Ember.run.scheduleOnce('render', this, this.didReceiveAttrs);
          });
        }
      });

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
      var index = getOwner(this).lookup("-view-registry:main");

      this._super(...arguments);

      index[this.elementId] = this;
    },

    willDestroyElement() {
      var index = getOwner(this).lookup("-view-registry:main");

      this._super(...arguments);

      delete index[this.elementId];
    }

  });
}

export default GraphicSupport;
