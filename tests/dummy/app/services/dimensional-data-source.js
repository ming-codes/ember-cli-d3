import Ember from 'ember';
import { dimensional } from '../tests/helpers/data-generator';

export default Ember.Service.extend({

  init() {
    this._super(...arguments);

    this.generate();
  },

  data: null,

  generate() {
    this.set('data', dimensional([ 'dogs', 'cats', 'birds', 'fishes', 'hamster' ]));
  },

  reorder() {
    var oldData = this.get('data');
    var newData = [];

    while (oldData.length) {
      newData = newData.concat(oldData.splice(Math.floor(Math.random() * oldData.length), 1));
    }

    this.set('data', newData);
  }

});
