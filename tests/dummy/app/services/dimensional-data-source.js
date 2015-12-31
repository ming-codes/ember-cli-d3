import Ember from 'ember';
import crossfilter from 'd3/plugins/square/crossfilter';
import d3 from 'd3';

/* global faker, _ */

export const states = faker.definitions.address.state_abbr;
export const regions = (() => {
  let index = [ 'northeast', 'southeast', 'midwest', 'southwest', 'west' ];

  [ 'ME', 'MA', 'RI', 'CT', 'NH', 'VT', 'NY', 'PA', 'NJ', 'DE', 'MD' ].forEach(state => {
    index[state] = 'northeast';
  });

  [ 'WV', 'VA', 'KY', 'TN', 'NC', 'SC', 'GA', 'AL', 'MS', 'AR', 'LA', 'FL' ].forEach(state => {
    index[state] = 'southeast';
  });

  [ 'OH', 'IN', 'MI', 'IL', 'MO', 'WI', 'MN', 'IA', 'KS', 'NE', 'SD', 'ND' ].forEach(state => {
    index[state] = 'midwest';
  });

  [ 'TX', 'OK', 'NM', 'AZ' ].forEach(state => {
    index[state] = 'southwest';
  });

  [ 'CO', 'WY', 'MT', 'ID', 'WA', 'OR', 'UT', 'NV', 'CA', 'AK', 'HI' ].forEach(state => {
    index[state] = 'west';
  });

  return index;
})();

export const years = _.range(2012, 1900 + new Date().getYear());
export const months = faker.definitions.date.month.abbr;

export const industries = [ 'energy', 'education', 'technology' ];

const profit = d3.random.normal(0, 987);
const income = d3.random.normal(0, 987);
const expenses = d3.random.normal(0, 987);

function dimension(seq, ...collections) {
  var [ target, ...rest ] = collections.reverse();
  var len = rest.map(arr => arr.length).concat(1).reduce((accum, len) => accum * len);

  return target[Math.floor(seq / len) % target.length];
}

export class Record {
  constructor(id) {
    this._id = id;
    this.state = dimension(id, industries, months, years, states);
    this.region = regions[this.state];

    this.year = dimension(id, industries, months, years);
    this.month = dimension(id, industries, months);

    this.industry = dimension(id, industries);

    this.income = faker.random.number({ min: 987, max: 10946 });
    this.expenses = faker.random.number({ min: -6765, max: -1597 });
    this.bottomLine = this.income + this.expenses;
  }
}

export default Ember.Service.extend({

  seed: null,

  data: Ember.computed('seed', function () {
    let len = regions.length * states.length * years.length * months.length * industries.length;
    let data = new Array(len);

    while (len--) {
      data[len] = new Record(len);
    }

    return data;
  }),

  cube: Ember.computed('data', function () {
    return crossfilter(this.get('data'));
  }),

  dimensions: [ 'region', 'state', 'year', 'month', 'industry' ],

  state: Ember.computed('cube', function (name) {
    return Ember.merge(this.get('cube').dimension(item => item[name]), {
      values: states
    });
  }),
  region: Ember.computed('cube', function (name) {
    return Ember.merge(this.get('cube').dimension(item => item[name]), {
      values: regions
    });
  }),
  year: Ember.computed('cube', function (name) {
    return Ember.merge(this.get('cube').dimension(item => item[name]), {
      values: years
    });
  }),
  month: Ember.computed('cube', function (name) {
    return Ember.merge(this.get('cube').dimension(item => item[name]), {
      values: months
    });
  }),
  industry: Ember.computed('cube', function (name) {
    return Ember.merge(this.get('cube').dimension(item => item[name]), {
      values: industries
    });
  }),

  profit: Ember.computed('cube', function (name) {
    return this.get('cube').dimension(item => item[name]);
  }),
  market: Ember.computed('cube', function (name) {
    return this.get('cube').dimension(item => item[name]);
  }),

  generate() {
    this.set('seed', Date.now());
  },

  timeSeriesModel: Ember.computed('{year,month}.values', function () {
    let extent = [ Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY ];
    let year = this.get('year');
    let years = this.get('year.values');
    let month = this.get('month');
    let months = this.get('month.values');
    let key = 'id';

    let data = d3.transpose(years.map(dim => {
      year.filter(dim);

      return month.group().reduceSum(({ bottomLine }) => bottomLine).all().map(({ value }) => value);
    })).map((data, index) => {
      return d3.zip(years, data).reduce((accum, [ year, value ]) => {
        accum[year] = value;

        extent[0] = Math.min(extent[0], value);
        extent[1] = Math.max(extent[1], value);

        return accum;
      }, { [ key ]: index });
    });

    return { key, series: years, data, extent };
  }),

  crossSectionModel: Ember.computed('{industry,region}', function () {
    let extent = [ Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY ];
    let industry = this.get('industry');
    let industries = this.get('industry.values');
    let region = this.get('region');
    let regions = this.get('region.values');
    let key = 'id';

    let data = d3.transpose(industries.map(metric => {
      industry.filter(metric);

      return region.group().reduceSum(({ bottomLine }) => bottomLine).all().map(({ value }) => value);
    })).map((data, index) => {
      return d3.zip(industries, data).reduce((accum, [ metric, value ]) => {
        accum[metric] = value;

        extent[0] = Math.min(extent[0], value);
        extent[1] = Math.max(extent[1], value);

        return accum;
      }, { [ key ]: regions[index] });
    });

    return { key, series: industries, data, extent };
  }),

  partitionModel: Ember.computed('data', function () {
    let metric = 'income';
    let nest = d3.nest()
      .key(({ region }) => region)
      .key(({ state }) => state)
      .rollup(leaves => {
        return leaves.reduce((sum, datum) => {
          return sum + datum[metric];
        }, 0);
      })
      .entries(this.get('data'));

    function rollup({ key, values }) {
      let sum = 0;

      if (typeof values === 'number') {
        return {
          name: key,
          children: [],
          [ metric ]: values
        };
      }

      return {
        name: key,
        children: values.map(value => {
          value = rollup(value);

          sum += value[metric];

          return value;
        }),
        [ metric ]: sum
      };
    }

    return rollup({ key: 'root', values: nest });
  }),

});
