import Ember from 'ember';



export default Ember.Service.extend({

  init() {
    this._super(...arguments);

    this.generate();
  },

  data: Ember.computed({
    set(name, value) {
      return value
        .sort((valueA, valueB) => valueA.timestamp - valueB.timestamp)
        .map(({ city, timestamp, asian, black, white }) => {
          return { city, asian, black, white,
            timestamp: new Date(timestamp)
          };
        });
    }
  }),

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
        timestamp: Math.floor(Date.now() * Math.random()),
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
