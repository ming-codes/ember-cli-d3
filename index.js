
var Funnel = require('ember-cli/node_modules/broccoli-funnel');

var path = require('path');

/* jshint node: true */
'use strict';

var exportedTestHelpers = [
  'data-generator.js',
  'graph.js'
  // DO NOT FORGET to include them in package.json too
];

module.exports = {
  name: 'ember-cli-d3',
  included: function(app) {
    this._super.included(app);

    this.app.import({
      development: app.bowerDirectory + '/d3/d3.js',
      production: app.bowerDirectory + '/d3/d3.min.js'
    });
    this.app.import('vendor/ember-d3-shim/ember-d3-shim.js');
    // DO NOT FORGET to include them in package.json too
  },
  treeForTestSupport: function () {
    return new Funnel(path.join(__dirname, 'tests'), {
      srcDir: 'helpers',
      destDir: 'helpers',
      files: exportedTestHelpers,
      annotation: 'testHelpers'
    });
  }
};
