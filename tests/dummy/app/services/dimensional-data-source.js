import Ember from 'ember';

export default Ember.Service.extend({

  init() {
    this._super(...arguments);

    this.generate();
  },

  random(shifts = 0) {
    return Math.random() * Date.now() >> shifts;
  },

  generate() {
    this.set('data', [ {
      _id: 1,
      timestamp: this.random(),
      asian: this.random(16),
      black: this.random(16),
      white: this.random(16)
    }, {
      _id: 2,
      timestamp: this.random(),
      asian: this.random(16),
      black: this.random(16),
      white: this.random(16)
    }, {
      _id: 3,
      timestamp: this.random(),
      asian: this.random(16),
      black: this.random(16),
      white: this.random(16)
    }, {
      _id: 4,
      timestamp: this.random(),
      asian: this.random(16),
      black: this.random(16),
      white: this.random(16)
    } ]);
  }

});
