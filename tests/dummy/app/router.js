import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('home', { path: '/' });
  this.route('docs');
  this.route('gallery', function () {
    this.route('bars', function () {
      this.route('stacked');
      //this.route('waterfall');
    });
    this.route('lines', function () {
      this.route('area');
      this.route('stacked');
    });
    //this.route('histogram');
  });
});

export default Router;
