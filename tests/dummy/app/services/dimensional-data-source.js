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
    this.set('data', d3.range(0, 5).map(id => {
      return {
        _id: id,
        timestamp: this.random(),
        asian: this.random(16),
        black: this.random(16),
        white: this.random(16)
      };
    }));
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
