
import Ember from 'ember';

import { box } from 'ember-cli-d3/utils/css';
import { computed } from 'ember-cli-d3/utils/version';

export default Ember.Mixin.create({
  defaultMargin: 20,
  margin: computed('defaultMargin', function (name, newValue) {
    if (arguments.length === 1) {
      newValue = this.get('defaultMargin');
    }

    return box(newValue);
  }),

  width: null,
  contentWidth: computed('width', 'margin.{left,right}', function () {
    return this.get('width') - this.get('margin.left') - this.get('margin.right');
  }).readOnly(),

  height: null,
  contentHeight: computed('height', 'margin.{top,bottom}', function () {
    return this.get('height') - this.get('margin.top') - this.get('margin.bottom');
  }).readOnly(),

  call(selection) {
    selection.attr('transform', `translate(${this.get('margin.left')} ${this.get('margin.top')})`);
  }

});
