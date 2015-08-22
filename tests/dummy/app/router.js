import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('cart', function () {
    this.route('bars', function () {
      this.route('stacked');
      this.route('grouped');
      this.route('waterfall');
    });
    this.route('lines', function () {
      this.route('area');
      this.route('stacked');
    });
    this.route('histogram');
  });
});

export default Router;
