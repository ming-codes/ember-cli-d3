
# Introduction

*ember-cli-d3* is an Ember addon to aid with integrating D3 data visuals into Ember application. Like D3 itself, it is not the goal of this project be become a widget library. Therefore, there are no data visuals packaged along with the addon. Pre-built data visuals are available as part of the gallery to act as a starting point for you. They are, however, will not be officially maintained.

# Getting Started

## Install

The first thing you'll need is to install the addon.

<table>
  <tr>
    <th>ember-cli version</th>
    <th>cli command</th>
  </tr>
  <tr>
    <td><code>> 0.2.3</code></td>
    <td><code>ember install ember-cli-d3</code></td>
  </tr>
  <tr>
    <td><code>> 0.1.5 < 0.2.3</code></td>
    <td><code>ember install:addon ember-cli-d3</code></td>
  </tr>
  <tr>
    <td><code>< 0.1.4</code></td>
    <td><code>npm install --save-dev ember-cli-d3</code><br><code>ember generate ember-cli-d3</code></td>
  </tr>
</table>

## Configuration

Starting from `0.3.0`, *ember-cli-d3* integrates with *d3-plugins-dist* to let you include plugins as ES6 modules by configuring an options.

```javascript
  var app = new EmberApp(defaults, {
    // Add options here
    d3: {
      // ember-cli-d3 version >= 0.3.0 and < 0.7.0
      plugins: [ 'sankey', 'hexbin' ]
      // ember-cli-d3 version >= 0.7.0
      plugins: {
        'mbostock': [ 'sankey' ],
        'emeeks': [ 'adjacency-matrix' ]
      }
    }
  });
```
# Concepts and Principles

*ember-cli-d3* follows the composiblity pattern of D3 while at the same time utilizes Ember's HTMLBars templates. The result is a very expressive composibility pattern that's also not too foreign to D3 people. This makes integrating existing D3 plugins and library a breeze.

# Core Classes

There are few classes that are considered to be core and will be used by most data visuals.

## `data-visual` Component

You'll need a `data-visual` component to act as a container for your visual. This component acts as the stage where you render your visual. It yields properies: `ctx`, `width`, and `height`.

`width` and `height` are the dimensions of the container. Use these to calculate positioning of the inner content. They are bound properties and will update accordly when its size changes.

`ctx` is a context object where you can access different kind of contexts. There are a few predefined contexts: `svg`, `canvas` and `webgl`. You can extend it to add your own. Context creation is lazily created where they're only created when you tries to access it.

### `svg` Context

The `svg` context contains two subcontext: `select` and `defs`.

* `select` is a "magic" object. Accessing properties on this object will create a `<g>` element under the `<svg>` with class name automatically set. Property access can be nested. For example, `ctx.svg.select.chart.axis` will create nested tags like this `<svg><g class="chart"><g class="axis"></g></g></svg>`. Passing these selections into `select` attribute of `d3-support` components will pass that selection into `call`. See `d3-support` for more on this.
* `defs` is the `<defs>` tag selection on the `svg`. You can pass this to `d3-support` components to generate markers or gradients.

## `d3-support` Mixin

All components that are going to render SVG elements must implement this mixin. There is only 1 method on it that must be implemented: `call`. The `call` method will be invoked with `select` element as argument, passed in as a D3 selection.

## `join` Util

The `join` util function in the `d3` utility module implements the fundamental D3 data-join pattern. It is used as a short hand to define the `call` method. It accepts 3 arguments: `dataExpr`, `cssExpr`, and an `options` hash. It returns a function that accepts elements wrapped inside a D3 selection.

### `dataExpr` parameter

`dataExpr` accepts 3 types of arguments:

* `string` will be interpreted as a path expression that tells `join` where to grab data on the component to do the join with. You may optionally specify a second key path to show where to grab the key path on the component to extract identifiers for each datum. For example, the `dataExpr` of `model.data[model.key]` with a will join the array found at `model.data` with key found at `model.key`.
* `array` will inline the data into the join.
* `function` will act as an accessor to pull data from parent selection.

Passing in `array` or `function` will not allow you to specify a key. If you have a need for key, please put the `array` or `function` on the enclosing object, then use a `string` path expression to specify key.

### `cssExpr` parameter

`cssExpr` is a subset of CSS selector expression that only supports tag name and class name. `cssExpr` is combined with `dataExpr` to perform data-join. First, elements are selected using `cssExpr` then joined with `dataExpr`. `cssExpr` also provides clues to how to provide reasonable defaults for your `options`. A `cssExpr` of `rect.bar` will select all `rect.bar`, join data with `dataExpr`, append `rect` element and set class `bar` on `enter` select and remove the elements on `exit` select.

### `options` parameter

The last `options` argument lets you define how `enter`, `update`, and `exit` should behave. Usually you only need to implement `update` since `cssExpr` already provided good defaults. You can override the default behavior by providing your own implementation here.

## `graph` Test Helper

TODO

# Patterns

TODO

## Interactivity

TODO

# Naming Convention

TODO

* ...Layer
* ...Layout
