import Ember from 'ember';

import SelectionProxy from '../system/selection-proxy';

export default Ember.Object.extend({
  has: null,

  svg: Ember.computed('element', function () {
    this.set('has.svg', true);

    return SelectionProxy.create({
      element: this.get('element')
    });
  }).readOnly(),

  canvas: null,
  webgl: null,

  init() {
    this._super(...arguments);

    this.set('has', Ember.Object.create({}));
  }

});
