import Ember from 'ember';



export default Ember.Service.extend({

  init() {
    this._super(...arguments);

    this.generate();
  },

  generate() {
    var generator = d3.random.normal(2000, 2000);

    this.set('data', [
      cityData('New York'),
      cityData('San Francisco'),
      cityData('Chicago'),
      cityData('Los Angeles')
    ]);

    function cityData(city) {
      return {
        city,
        asian: generator(),
        black: generator(),
        white: generator()
      };
    }
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
