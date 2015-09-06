import Ember from 'ember';

import version, { hasGlimmer } from 'ember-cli-d3/utils/version';
import { timer, type } from '../ext/d3';

timer();
type();

const GraphicSupport = Ember.Mixin.create({
  tagName: '',

  select: null,
  model: null,

  call() {},

  didRender() {
    var selection = this.get('select');

    if (selection) {
      if (Ember.typeOf(selection) === 'instance') {
        selection = selection.get('selection');
      }

      this.get('call').call(this, selection);
    }
  }

});

if (!hasGlimmer) {
  GraphicSupport.reopen({
    init() {
      var key, index;

      this._super(...arguments);

      for (key in this) {
        if ((index = key.indexOf('Binding')) > 0 && key[0] !== '_') {
          this.addObserver(key.substring(0, index), this, () => {
            Ember.run.scheduleOnce('afterRender', this, this.didRender);
          });
        }
      }

    },

    didInsertElement() {
      this._super(...arguments);

      Ember.run.scheduleOnce('afterRender', this, this.didRender);
    }

  });
}

if (version.MAJOR === 1 && version.MINOR === 13) {
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
