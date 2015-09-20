
# Introduction

`ember-cli-d3` is an Ember addon to aid with integrating D3 data visuals into Ember application. Like D3 itself, it is not the goal of this project be become a widget library. Therefore, there are no data visuals packaged along with the addon. Pre-built data visuals are available as part of the gallery to act as a starting point for you. They are, however, will not be officially maintained.

# Getting Started

The first thing you'll need is to install the addon.

<table>
  <tr>
    <th>ember-cli version</th>
    <th>cli command</th>
  </tr>
  <tr>
    <td>`> 0.2.3`</td>
    <td>`ember install ember-cli-d3`</td>
  </tr>
  <tr>
    <td>`> 0.1.5 < 0.2.3`</td>
    <td>`ember install:addon ember-cli-d3`</td>
  </tr>
  <tr>
    <td>`< 0.1.4`</td>
    <td>`npm install --save-dev ember-cli-d3`<br>`ember generate ember-cli-d3`</td>
  </tr>
</table>

# Concepts and Principles

`ember-cli-d3` follows the composiblity pattern of D3 while at the same time utilizes Ember's HTMLBars templates. The result is a very expressive composibility pattern that's also not too foreign to D3 people. This makes integrating existing D3 plugins and library a breeze.

# Core Classes

There are few classes that are considered to be core and will be used by most data visuals.

## `data-visual` Component

You'll need a `data-visual` component to act as a container for your visual. For the most part, this component is just an SVG element that also yields properies: `svg`, `width`, and `height`.

`svg` is a "magic" object. Accessing properties on this object will create a `<g>` element under the `<svg>` with class name automatically set. Property access can be nested. `svg.chart.axis` will create `<svg><g class="chart"><g class="axis"></g></g></svg>`.

`width` and `height` are the dimensions of the SVG container. Use these to calculate positioning of the inner content. They are bound properties and will update accordly when its size changes.

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

# Naming Convention

* ...Layer
* ...Layout
