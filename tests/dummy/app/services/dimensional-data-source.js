import Ember from 'ember';

export default Ember.Service.extend({

  init() {
    this._super(...arguments);

    this.generate();
  },

  random() {
    return Math.random() * Date.now() >> 16;
  },

  generate() {
    this.set('data', [ {
      _id: 1,
      asian: this.random(),
      black: this.random(),
      white: this.random()
    }, {
      _id: 2,
      asian: this.random(),
      black: this.random(),
      white: this.random()
    } ]);
  }

});
