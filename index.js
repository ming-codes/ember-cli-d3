/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-cli-d3',
  included: function(app) {
    this._super.included(app);

    this.app.import({
      development: app.bowerDirectory + '/d3/d3.js',
      production: app.bowerDirectory + '/d3/d3.min.js'
    });
  }
};
