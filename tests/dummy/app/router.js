import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('home', { path: '/' });
  this.route('guides');
  this.route('gallery', function () {
    this.route('bars', function () {
      this.route('grouped');
      this.route('stacked');
      this.route('waterfall');
    });
    this.route('lines');
    this.route('area');
    this.route('stacked');
    //this.route('histogram');
    //this.route('scatter-plot');
    this.route('sunburst');
    this.route('albers-usa');
  });
});

export default Router;
