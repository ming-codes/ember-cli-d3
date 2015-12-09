
var funnel = require('broccoli-funnel');
var merge = require('broccoli-merge-trees');

var path = require('path');

var plugins = require('d3-plugins-dist');

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

    var ext = funnel(path.join(__dirname, 'vendor', 'ember-d3-ext'), {
      destDir: path.join('ember-d3-ext'),
      files: [ 'ember-d3-ext.js' ]
    });

    var d3 = funnel(path.dirname(require.resolve('d3')), {
      destDir: path.join('d3'),
      files: [ 'd3.js', 'd3.min.js' ]
    });

    return merge([].concat(d3, shim, ext, funnel(plugins.toTree(), {
      destDir: 'd3-plugins-dist',
      files: plugins.map(function (plugin) {
        return plugin.pathFor('named-amd')
      })
    })));
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

    var plugins = (function () {
      var list = app.options.d3.plugins || {};
      var ret = [];

      for (var author in list) {
        (list[author] || []).forEach(function (plugin) {
          ret.push(path.join(author, plugin));
        });
      }

      return ret;
    })();

    this._super.included(app);

    app.import({
      development: path.join('vendor', 'd3', 'd3.js'),
      production: path.join('vendor', 'd3', 'd3.min.js')
    });
    app.import(path.join('vendor', 'ember-d3-shim', 'ember-d3-shim.js'));
    app.import(path.join('vendor', 'ember-d3-ext', 'ember-d3-ext.js'));
    // DO NOT FORGET to include them in package.json too


    plugins.forEach(function (plugin) {
        app.import(path.join('vendor', 'd3-plugins-dist', plugin, 'named-amd', 'main.js'));
    });
  },
};
