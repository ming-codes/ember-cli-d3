import Ember from 'ember';

import VERSION from 'ember-cli-d3/utils/version';
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

if (VERSION.MAJOR < 2 && VERSION.MINOR < 13) {
  GraphicSupport.reopen({
    init() {
      var bindings = [];
      var key, index;

      this._super(...arguments);

      for (let key in this) {
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

export default GraphicSupport;
