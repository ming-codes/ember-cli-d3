
var funnel = require('ember-cli/node_modules/broccoli-funnel');
var merge = require('ember-cli/node_modules/broccoli-merge-trees');

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
  treeForVendor: function (vendorPath) {
    var shim = funnel(path.join(__dirname, 'vendor', 'ember-d3-shim'), {
      destDir: path.join('ember-d3-shim'),
      files: [ 'ember-d3-shim.js' ]
    });

    var d3 = funnel(path.dirname(require.resolve('d3')), {
      destDir: path.join('d3'),
      files: [ 'd3.js', 'd3.min.js' ]
    });

    var pluginPath = path.join(path.dirname(require.resolve('d3-plugins-dist')), 'dist');
    var plugins = require('d3-plugins-dist').map(function (plugin) {
      return funnel(pluginPath, {
        destDir: path.join('d3-plugins-dist', 'dist'),
        files: [ path.join(plugin, 'named-amd', 'main.js' ) ]
      });
    });

    return merge([].concat(shim, d3, plugins));
  },
  treeForTestSupport: function () {
    return funnel(path.join(__dirname, 'tests'), {
      srcDir: 'helpers',
      destDir: 'helpers',
      files: exportedTestHelpers,
      annotation: 'testHelpers'
    });
  },
  included: function(app) {
    var options = app.options.d3 || {};

    this._super.included(app);

    app.import({
      development: path.join('vendor', 'd3', 'd3.js'),
      production: path.join('vendor', 'd3', 'd3.min.js')
    });
    app.import(path.join('vendor', 'ember-d3-shim', 'ember-d3-shim.js'));
    // DO NOT FORGET to include them in package.json too

    (options.plugins || []).forEach(function (plugin) {
      app.import(path.join('vendor', 'd3-plugins-dist', 'dist', plugin, 'named-amd', 'main.js'));
    });
  },
};
