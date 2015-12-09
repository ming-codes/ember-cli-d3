/* jshint node: true */
/* global require, module */

var EmberAddon = require('ember-cli/lib/broccoli/ember-addon');
var plugins = require('d3-plugins-dist');
var writer = require('broccoli-caching-writer');
var md = require('commonmark');
var fs = require('fs');
var path = require('path');

var Parser = md.Parser;
var HtmlRenderer = md.HtmlRenderer;

var DocWriter = function DocWriter(inputNodes, options) {
  options = options || {};
  writer.call(this, inputNodes, {
    annotation: options.annotation
  });

  this.parser = new Parser();
  this.renderer = new HtmlRenderer();
};

DocWriter.prototype = Object.create(writer.prototype);
DocWriter.prototype.constructor = DocWriter;

DocWriter.prototype.build = function() {
  // Read 'foo.txt' from the third input node
  var inputBuffer = fs.readFileSync(path.join(this.inputPaths[0], 'guides/guides.md'), 'utf8');
  var outputBuffer = this.parser.parse(inputBuffer);
  // Write to 'bar.txt' in this node's output
  fs.writeFileSync(path.join(this.outputPath, 'guides.html'), this.renderer.render(outputBuffer));
};

/*
  This Brocfile specifes the options for the dummy test app of this
  addon, located in `/tests/dummy`

  This Brocfile does *not* influence how the addon or the app using it
  behave. You most likely want to be modifying `./index.js` or app's Brocfile
*/
module.exports = function(defaults) {
  var app = new EmberAddon(defaults, {
    d3: {
      plugins: plugins.reduce(function (accum, plugin) {
        accum[plugin.author] = accum[plugin.author] || [];
        accum[plugin.author].push(plugin.name);

        return accum;
      }, {})
    },
    sassOptions: {
      extension: 'scss'
    }
  });

  app.import('bower_components/bootstrap/dist/css/bootstrap.css');
  app.import('bower_components/github-markdown-css/github-markdown.css');
  app.import('bower_components/bootstrap/dist/js/bootstrap.js');

  return app.toTree(new DocWriter([ 'docs' ]));
};
