import Ember from 'ember';

import { timer, type } from '../ext/d3';

timer();
type();

export default Ember.Mixin.create({
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

