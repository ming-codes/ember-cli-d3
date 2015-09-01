# ember-cli-d3

[![Build Status](https://travis-ci.org/ming-codes/ember-cli-d3.svg?branch=master)](https://travis-ci.org/ming-codes/ember-cli-d3)
[![npm version](https://badge.fury.io/js/ember-cli-d3.svg)](http://badge.fury.io/js/ember-cli-d3)
[![Code Climate](https://codeclimate.com/github/ming-codes/ember-cli-d3/badges/gpa.svg)](https://codeclimate.com/github/ming-codes/ember-cli-d3)
[![Dependency Status](https://david-dm.org/ming-codes/ember-cli-d3.svg)](https://david-dm.org/ming-codes/ember-cli-d3)
[![devDependency Status](https://david-dm.org/ming-codes/ember-cli-d3/dev-status.svg)](https://david-dm.org/ming-codes/ember-cli-d3#info=devDependencies)

`ember-cli-d3` is an [ember-cli](http://www.ember-cli.com/) addon to provide a framework
to integrate [d3](http://d3js.org) visualizations into Ember applications.

See [github pages](http://ming-codes.github.io/ember-cli-d3/) for demo.

Please note that this project is still in alpha stage and I'm seeking feedback on how it
can be improved.

## Composability

`ember-cli-d3` follows the composability pattern of d3 (`.call`) while utilizing the advantage of Ember's yielding components. The result is that it allows you to easily compose different components together while at the same time tap into the massive d3 plugin community to create ambitious visualization.

## Bundled Visuals

Currently, these visuals are bundled with the addon. However, it is not the goal of this project to become a widget library. It is possible that these visuals will be removed from the addon and exist only as part of demo in the dummy app. They will not be officially supported, but you are welcome to copy the source code from the dummy app to your own application.

* [ ] Cartesian
  * [ ] Bar Chart
    * [x] Grouped Bars
    * [x] Stacked Bars
    * [ ] Waterfall
  * [x] Line Chart
    * [ ] Area Chart
    * [ ] Stacked Area
  * [ ] Histogram
* [ ] Polar
  * [ ] Pie Chart
  * [ ] Donut Chart
  * [ ] Aster Plot

## Test Helpers

`ember-cli-d3` offers first class support on testing graphs. This includes integration with `d3.timer` to make Ember aware of any d3 transitions. See `tests/integration` for example on how to use the test helpers.

## Plugins

Starting from `0.3.0`, `ember-cli-d3` integrates with `d3-plugins-dist` to let you include plugins as ES6 modules by configuring an options.

```javascript
  var app = new EmberApp(defaults, {
    // Add options here
    d3: {
      plugins: [ 'sankey', 'hexbin' ]
    }
  });
```

## Resources

* [Data Viz Catalogue](http://www.datavizcatalogue.com) - Catalogues different visualization techniques.
* [Awesome D3](https://github.com/wbkd/awesome-d3) - Catalogues libraries/frameworks/plugins related to D3.
* [i want hue](http://tools.medialab.sciences-po.fr/iwanthue/) - Color palette generator. Great for making color scales.

# Usage

ember-cli version | cli command
-----------------|--------------
`> 0.2.3` | `ember install ember-cli-d3`
`> 0.1.5 < 0.2.3` | `ember install:addon ember-cli-d3`
`< 0.1.4` | `npm install --save-dev ember-cli-d3`<br>`ember generate ember-cli-d3`


# Contributing

* `git clone` this repository
* `npm install`
* `bower install`

## Running

* `ember server`
* Visit your app at http://localhost:4200.

## Running Tests

* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).

## License

MIT
